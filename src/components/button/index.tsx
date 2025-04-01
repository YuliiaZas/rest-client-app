import { useCallback, useMemo } from 'react';
import { Icon, PhosphorIcons } from '../icons';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

type ButtonType = 'primary' | 'secondary' | 'transparent';
const actionButtonTypes = ['add', 'edit', 'delete', 'save', 'cancel'] as const;
type ActionButtonType = (typeof actionButtonTypes)[number];

interface ButtonProps {
  buttonType?: ButtonType;
  text?: string;
  icon?: PhosphorIcons;
  fontSize?: string;
  title?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  buttonType = 'primary',
  text,
  icon,
  fontSize,
  title = '',
  isDisabled = false,
  onClick,
}: ButtonProps) => {
  const t = useTranslations('actions');

  const isIconButton = useMemo(() => icon && !text, [icon, text]);

  const isActionButton = useMemo(
    () => icon && !text && actionButtonTypes.includes(icon as ActionButtonType),
    [icon, text]
  );

  const translatedTitle = useMemo(() => {
    if (title) return title;
    if (isActionButton && t) return t(icon as string);
    return '';
  }, [title, isActionButton, icon]);

  const iconSize = useMemo(() => {
    if (fontSize) return fontSize;
    if (isActionButton) return '1.25rem';
    return '1rem';
  }, [isIconButton, fontSize]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.blur();
      if (onClick) onClick();
    },
    [onClick]
  );

  return (
    <button
      className={clsx(
        `button_${buttonType}`,
        isIconButton && 'button_icon',
        isActionButton && `button_action button_action_${icon}`
      )}
      style={{ fontSize }}
      title={translatedTitle}
      disabled={isDisabled}
      onClick={handleButtonClick}
    >
      {icon && <Icon iconName={icon} size={iconSize} />}
      {text}
    </button>
  );
};
