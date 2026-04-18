import { useEffect, useState } from 'react';

export function useScrollTrigger(threshold = 80) {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const onScroll = () => setTriggered(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return triggered;
}
