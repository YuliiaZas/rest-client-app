'use client';
import { useTranslations } from 'next-intl';
import {
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ErrorMessage, Input, Spinner } from '@/components';
import {
  FORM_FIELD,
  ILoginForm,
  SignInForm,
  SignUpForm,
} from './login-form.entities';
import {
  characterSet,
  passwordLength,
  signInFormSchema,
  signUpFormSchema,
} from './login-form.consts';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { firebaseSignup } from '@/utils';
import { AppError } from '@/entites';
import { NotificationsContext } from '@/context';

interface LoginFormProps {
  isSignUp?: boolean;
}

export const LoginForm = ({ isSignUp = false }: LoginFormProps) => {
  const t = useTranslations('login');
  const [loginError, setLoginError] = useState<string>('');
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { addNotification } = useContext(NotificationsContext);

  const fields = useMemo(
    () =>
      isSignUp
        ? (Object.values(FORM_FIELD) as Array<keyof SignUpForm>)
        : (Object.values(FORM_FIELD).slice(0, -1) as Array<keyof SignInForm>),
    [isSignUp]
  );

  const formSchema = useMemo(
    () => (isSignUp ? signUpFormSchema : signInFormSchema),
    [isSignUp]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<ILoginForm>({
    resolver: yupResolver(formSchema),
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (response?.error) {
        setLoginError(response.error);
        return;
      }

      router.push('/client/GET');
    } catch {
      addNotification(new AppError('login'));
    }
  };

  const onSubmit = async (data: ILoginForm) => {
    try {
      if (isSignUp) {
        startTransition(async () => {
          const firebaseUser = await firebaseSignup(data.email, data.password);
          if (!firebaseUser) {
            setLoginError('signUpError');
            return;
          }
          await login(data.email, data.password);
        });
      } else {
        startTransition(async () => {
          await login(data.email, data.password);
        });
      }
    } catch {
      addNotification({ message: isSignUp ? 'signUp' : 'login' });
    }
  };

  const passwordParams = {
    set: characterSet,
    length: passwordLength,
  };

  const getErrorMessages = useCallback(
    (field: keyof ILoginForm) => {
      if (errors[field]?.message) {
        const isErrorRequired = errors[field].type === 'required';
        const key = isErrorRequired ? 'required' : errors[field].message;
        const parameters = {
          ...(isErrorRequired && { field: t(field) }),
          ...(field === FORM_FIELD.PASSWORD && passwordParams),
        };
        return t(key, parameters);
      }
      return '';
    },
    [errors, t]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isPending && <Spinner />}
      {fields.map((field) => {
        const fieldName = field as keyof ILoginForm;
        return (
          <Input<ILoginForm>
            id={fieldName}
            typeClass="primary"
            colors="dark"
            placeholder={t(fieldName)}
            type={fieldName === FORM_FIELD.EMAIL ? 'text' : 'password'}
            withValidation={true}
            register={register}
            error={getErrorMessages(fieldName)}
            trigger={trigger}
            key={fieldName}
          />
        );
      })}
      <div>
        <Button
          text={t(isSignUp ? 'signUp' : 'signIn')}
          isDisabled={!isValid}
        />
        {loginError && <ErrorMessage errorMessage={t(loginError)} />}
      </div>
    </form>
  );
};
