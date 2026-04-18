import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

export const Checkbox = forwardRef(function Checkbox({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={classNames(
        'h-4 w-4 rounded border-zinc-400 text-zinc-900',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900',
        className,
      )}
      {...props}
    />
  );
});
