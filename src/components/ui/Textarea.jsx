import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

export const Textarea = forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={classNames(
        'w-full min-h-36 rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900',
        className,
      )}
      {...props}
    />
  );
});
