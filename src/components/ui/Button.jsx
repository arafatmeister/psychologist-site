import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

const variants = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-700',
  secondary: 'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100',
  ghost: 'text-zinc-800 hover:bg-zinc-100',
  light: 'bg-white text-zinc-900 hover:bg-zinc-100',
  outlineLight: 'border border-white bg-transparent text-white hover:bg-white/10',
};

export const Button = forwardRef(function Button(
  { as: Component = 'button', className, variant = 'primary', type = 'button', ...props },
  ref,
) {
  return (
    <Component
      ref={ref}
      type={Component === 'button' ? type : undefined}
      className={classNames(
        'inline-flex items-center justify-center text-center cursor-pointer motion-safe:transition-colors rounded-lg px-5 py-3 text-sm font-medium',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
