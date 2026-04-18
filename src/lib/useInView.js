import { useEffect, useRef, useState } from 'react';

export function useInView(options = {}) {
  const { root = null, rootMargin = '0px 0px -10% 0px', threshold = 0.1, once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        if (once) observer.disconnect();
      },
      { root, rootMargin, threshold },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, once]);

  return { ref, inView };
}
