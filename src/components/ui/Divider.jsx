import { classNames } from '../../lib/classNames';

export function Divider({ ornament = false, className }) {
  if (!ornament) {
    return <hr className={classNames('my-0 border-0 border-t border-ink-200', className)} />;
  }

  return (
    <div
      className={classNames('flex items-center justify-center py-6', className)}
      aria-hidden="true"
    >
      <span className="italic-display text-lg text-ink-300">—</span>
    </div>
  );
}
