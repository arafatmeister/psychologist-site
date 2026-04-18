import { createElement } from 'react';

export function Container({ as = 'div', className = '', children }) {
  return createElement(
    as,
    { className: `mx-auto w-full max-w-[1180px] px-6 md:px-10 lg:px-16 ${className}`.trim() },
    children,
  );
}
