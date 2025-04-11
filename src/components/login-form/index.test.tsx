import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { useRouter } from 'next/navigation';
import { mockContext } from '@/__tests__/mocks/mockContext';
import { LoginForm } from './index';
import { Path, UseFormRegister } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { firebaseSignup } from '@/utils';
import { ILoginForm } from './login-form.entities';

mockContext();
vi.mock('next-auth/react', () => ({
  signIn: vi.fn().mockResolvedValue({
    error: null,
    status: 0,
    ok: false,
    url: null,
  }),
}));

vi.mock('@/utils', () => ({
  firebaseSignup: vi.fn().mockReturnValue({}),
}));

vi.mock('@/components', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...(original as object),
    Button: ({ text, onClick }: { text: string; onClick?: () => void }) => {
      return <button onClick={onClick}>{text}</button>;
    },
    Input: ({
      id,
      placeholder,
      register,
      error,
    }: {
      id: Path<ILoginForm>;
      placeholder: string;
      defaultValue?: string;
      register: UseFormRegister<ILoginForm>;
      error?: string;
    }) => (
      <>
        <input {...register(id)} placeholder={placeholder} key={id} />
        <span>{error}</span>
      </>
    ),
  };
});

const email = 'test@example.com';
const password = 'Pas1-Pas2';
const redirectUrl = '/client/GET';
const credentials = {
  redirect: false,
  email,
  password,
};

describe('LoginForm', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  it('renders the form fields correctly', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    expect(getByPlaceholderText('email')).toBeDefined();
    expect(getByPlaceholderText('password')).toBeDefined();
    expect(getByText('signIn')).toBeDefined();
  });

  it('shows validation errors', async () => {
    const { getByPlaceholderText, container, getByText } = render(
      <LoginForm isSignUp={true} />
    );
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: 'password' },
    });
    fireEvent.change(getByPlaceholderText('passwordRepeat'), {
      target: { value: password },
    });

    const form = container.querySelector('form');
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => {
      expect(getByText('required')).toBeDefined();
      expect(getByText('passwordWeak')).toBeDefined();
      expect(getByText('passwordMismatch')).toBeDefined();
    });
  });

  it('submits the form and calls signIn for login', async () => {
    const { getByPlaceholderText, container } = render(<LoginForm />);
    fireEvent.change(getByPlaceholderText('email'), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: password },
    });

    const form = container.querySelector('form');
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', credentials);
      expect(mockPush).toHaveBeenCalledWith(redirectUrl);
    });
  });

  it('displays an error message when login fails', async () => {
    vi.mocked(signIn).mockResolvedValueOnce({
      error: 'Invalid credentials',
      status: 0,
      ok: false,
      url: null,
    });

    const { getByPlaceholderText, getByText, container } = render(
      <LoginForm />
    );
    fireEvent.change(getByPlaceholderText('email'), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: password },
    });

    const form = container.querySelector('form');
    fireEvent.submit(form as HTMLFormElement);

    await waitFor(() => {
      expect(getByText('Invalid credentials')).toBeDefined();
    });
  });

  it('handles sign-up flow and calls firebaseSignup', async () => {
    (firebaseSignup as Mock).mockResolvedValue(true);

    const { getByPlaceholderText, getByText } = render(
      <LoginForm isSignUp={true} />
    );
    fireEvent.change(getByPlaceholderText('email'), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: password },
    });
    fireEvent.change(getByPlaceholderText('passwordRepeat'), {
      target: { value: password },
    });

    fireEvent.click(getByText('signUp'));

    await waitFor(() => {
      expect(firebaseSignup).toHaveBeenCalledWith(email, password);
      expect(signIn).toHaveBeenCalledWith('credentials', credentials);
      expect(mockPush).toHaveBeenCalledWith(redirectUrl);
    });
  });

  it('shows an error notification when sign-up fails', async () => {
    (firebaseSignup as Mock).mockResolvedValue(false);

    const { getByPlaceholderText, getByText } = render(
      <LoginForm isSignUp={true} />
    );
    fireEvent.change(getByPlaceholderText('email'), {
      target: { value: email },
    });
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: password },
    });
    fireEvent.change(getByPlaceholderText('passwordRepeat'), {
      target: { value: password },
    });

    fireEvent.click(getByText('signUp'));

    await waitFor(() => {
      expect(getByText('signUpError')).toBeDefined();
    });
  });
});
