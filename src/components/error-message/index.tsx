import styles from './error-message.module.scss';

interface ErrorMessageProps {
  errorMessage?: string;
}

export const ErrorMessage = ({ errorMessage = '' }: ErrorMessageProps) => {
  return (
    <div
      className={`${styles['error-message']} ${errorMessage ? '' : 'hidden'}`}
    >
      {errorMessage}
    </div>
  );
};
