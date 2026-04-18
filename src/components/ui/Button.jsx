import { forwardRef } from 'react';
import { classNames } from '../../lib/classNames';

const variants = {
  primary:
    'inline-flex min-h-12 items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[15px] font-medium tracking-normal text-paper transition-colors duration-300 ease-out hover:bg-ink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink-900',
  primaryInverted:
    'inline-flex min-h-12 items-center gap-2 rounded-full bg-paper px-6 py-3 text-[15px] font-medium tracking-normal text-ink-900 transition-colors duration-300 ease-out hover:bg-ink-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper',
  secondary:
    'inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-300 px-6 py-3 text-[15px] font-medium text-ink-900 transition-colors duration-300 ease-out hover:border-ink-900 hover:bg-ink-100/50',
  ghost:
    'inline-flex min-h-12 items-center gap-2 px-0 py-3 text-[15px] font-medium text-ink-900 transition-colors duration-300 ease-out hover:text-ink-700 hover:underline hover:underline-offset-4',
  link: 'inline-flex min-h-12 items-baseline gap-1 py-3 text-[15px] font-medium text-ink-900 underline decoration-ink-300 decoration-1 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-ink-900',
};

export const Button = forwardRef(function Button(
  {
    as: Component = 'button',
    className,
    variant = 'primary',
    invert = false,
    type = 'button',
    ...props
  },
  ref,
) {
  const variantClass =
    variant === 'primary' && invert
      ? variants.primaryInverted
      : (variants[variant] ?? variants.primary);

  return (
    <Component
      ref={ref}
      type={Component === 'button' ? type : undefined}
      className={classNames(
        'cursor-pointer justify-center text-center disabled:cursor-not-allowed disabled:opacity-60',
        variantClass,
        className,
      )}
      {...props}
    />
  );
});
