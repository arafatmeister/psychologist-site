import { createElement } from 'react';
import { classNames } from '../../lib/classNames';

export function Card({ as = 'article', className, children, ...props }) {
  return createElement(
    as,
    {
      className: classNames('rounded-xl border border-zinc-200 bg-white p-6', className),
      ...props,
    },
    children,
  );
}
