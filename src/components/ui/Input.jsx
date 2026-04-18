import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

export const Input = forwardRef(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={classNames(
        'w-full rounded-none border-0 border-b border-ink-300 bg-transparent px-0 py-3 text-ink-900 placeholder:text-ink-400',
        'focus:border-ink-900 focus:outline-none',
        'aria-[invalid=true]:border-danger',
        className,
      )}
      {...props}
    />
  );
});
