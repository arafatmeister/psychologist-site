import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function HashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let attempts = 0;
    let timeoutId;

    const tryScroll = () => {
      const id = decodeURIComponent(hash.slice(1));
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (attempts < 10) {
        attempts += 1;
        timeoutId = window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [hash, pathname]);

  return null;
}
