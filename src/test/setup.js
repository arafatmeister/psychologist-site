import '@testing-library/jest-dom/vitest';
import i18n from '../i18n';

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

beforeEach(() => {
  window.localStorage.clear();
  window.sessionStorage.clear();
  i18n.changeLanguage('uk');
});
