import { classNames } from '../../lib/classNames';

export function Chevron({ open = false, className }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={classNames(
        'h-4 w-4 stroke-current stroke-[1.5] transition-transform',
        open && 'rotate-180',
        className,
      )}
      fill="none"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
