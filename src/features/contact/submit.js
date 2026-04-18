import { SITE } from '../../config/site';
import { logger } from '../../lib/logger';

export async function submitContact(payload) {
  if (!SITE.form.endpoint) {
    logger.info('[contact] submit stub', payload);
    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });
    return { ok: true, stub: true };
  }

  const res = await fetch(SITE.form.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': payload._csrf,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('submit_failed');
  }

  return res.json();
}
