import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={classNames(
        'w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900',
        className,
      )}
      {...props}
    />
  );
});
