import { createElement } from 'react';
import { classNames } from '../../lib/classNames';

const variants = {
  plain: 'bg-paper-2 p-8 md:p-12',
  outlined: 'border-t border-ink-200 pt-8',
};

export function Card({ as = 'article', className, children, variant = 'plain', ...props }) {
  return createElement(
    as,
    {
      className: classNames(variants[variant] ?? variants.plain, className),
      ...props,
    },
    children,
  );
}
