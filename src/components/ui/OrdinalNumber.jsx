import { classNames } from '../../lib/classNames';

export function OrdinalNumber({ n, className }) {
  return (
    <span
      className={classNames(
        'mr-4 text-xl font-serif font-light italic text-ink-300 tabular-nums [font-feature-settings:"lnum","tnum"]',
        className,
      )}
    >
      {String(n).padStart(2, '0')}
    </span>
  );
}
