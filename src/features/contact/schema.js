import { z } from 'zod';

const telegramPattern = /^@?[a-zA-Z0-9_]{5,32}$/;

function isValidContact(value) {
  if (!value) return false;

  const email = z.string().email().safeParse(value).success;
  if (email) return true;

  return telegramPattern.test(value);
}

export function createContactSchema(t) {
  return z.object({
    name: z
      .string({ required_error: t('form.errors.required') })
      .trim()
      .min(2, t('form.errors.nameShort'))
      .max(60, t('form.errors.nameLong')),
    contact: z
      .string({ required_error: t('form.errors.required') })
      .trim()
      .refine((value) => isValidContact(value), t('form.errors.contactInvalid')),
    message: z
      .string({ required_error: t('form.errors.required') })
      .trim()
      .min(10, t('form.errors.messageShort'))
      .max(2000, t('form.errors.messageLong')),
    consent: z.literal(true, {
      errorMap: () => ({ message: t('form.errors.consentRequired') }),
    }),
    website: z.string().max(0, t('form.errors.honeypot')).default(''),
    _csrf: z.string().min(1),
  });
}
