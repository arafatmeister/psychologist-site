import { createElement } from 'react';

export function Container({ as = 'div', className = '', children }) {
  return createElement(
    as,
    { className: `mx-auto w-full max-w-6xl px-6 ${className}`.trim() },
    children,
  );
}
