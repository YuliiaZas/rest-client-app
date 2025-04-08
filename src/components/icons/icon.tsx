import { PhosphorIcons, phosphorIcons } from './phosphorIcons';
import clsx from 'clsx';
import style from './icon.module.scss';

export type IconProps = {
  iconName: PhosphorIcons;
  size?: string;
  color?: string;
  text?: string;
  customClass?: string;
  onClick?: () => void;
};

export function Icon({
  iconName,
  size = '1.5rem',
  color,
  text,
  customClass,
  onClick,
}: IconProps) {
  return (
    <div
      role="img"
      style={{
        width: size,
        height: size,
        color: color,
        fontSize: `calc(${size} * 0.5)`,
        cursor: onClick && 'pointer',
      }}
      onClick={onClick}
      className={clsx(style.container, customClass)}
    >
      {text ? text.slice(0, 2).toUpperCase() : phosphorIcons[iconName]}
    </div>
  );
}
