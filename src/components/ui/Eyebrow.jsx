import { classNames } from '../../lib/classNames';

export function Eyebrow({ children, className, ...props }) {
  return (
    <span
      className={classNames(
        'inline-block text-xs font-medium uppercase tracking-[0.12em] text-ink-500',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
