import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

export const Checkbox = forwardRef(function Checkbox({ className, ...props }, ref) {
  return (
    <span className={classNames('relative inline-flex h-5 w-5 shrink-0', className)}>
      <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
      <span className="pointer-events-none inline-flex h-5 w-5 items-center justify-center rounded-sm border border-ink-900 bg-transparent transition-colors peer-checked:bg-ink-900 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink-900">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5 text-paper opacity-0 transition-opacity peer-checked:opacity-100"
        >
          <path
            d="M5 10.5l3.2 3.2L15 7"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </span>
    </span>
  );
});
