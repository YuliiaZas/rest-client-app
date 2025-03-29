type ButtonType = 'primary' | 'secondary' | 'transparent';

interface ButtonProps {
  buttonType?: ButtonType;
  text: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  buttonType = 'primary',
  text,
  isDisabled = false,
  onClick,
}: ButtonProps) => {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    if (onClick) onClick();
  };

  return (
    <button
      className={`button_${buttonType}`}
      disabled={isDisabled}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
};
