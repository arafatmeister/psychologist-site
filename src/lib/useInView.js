import { useCallback, useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.1, once = true } = options;
  const [inView, setInView] = useState(false);
  const observerRef = useRef(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const ref = useCallback(
    (node) => {
      cleanup();
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setInView(true);
          if (once) cleanup();
        },
        { root, rootMargin, threshold },
      );
      observerRef.current.observe(node);
    },
    [root, rootMargin, threshold, once, cleanup],
  );

  useEffect(() => cleanup, [cleanup]);

  return { ref, inView };
}
