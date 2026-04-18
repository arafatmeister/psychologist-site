import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={classNames(
        'w-full min-h-[160px] resize-y rounded-none border-0 border-b border-ink-300 bg-transparent px-0 py-3 text-ink-900 placeholder:text-ink-400',
        'focus:border-ink-900 focus:outline-none',
        'aria-[invalid=true]:border-danger',
        className,
      )}
      {...props}
    />
  );
});
