import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ContactForm } from './ContactForm';
import { createContactSchema } from './schema';
import { submitContact } from './submit';
import { renderWithProviders } from '../../test/renderWithProviders';

vi.mock('@marsidev/react-turnstile', () => ({
  Turnstile: ({ onSuccess }) => (
    <button type="button" onClick={() => onSuccess('token')}>
      turnstile-verify
    </button>
  ),
}));

vi.mock('./submit', () => ({
  submitContact: vi.fn(async () => ({ ok: true, stub: true })),
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows validation errors on empty submit', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /надіслати заявку/i }));

    expect(await screen.findByText(/ім.?я має містити щонайменше 2 символи/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/введіть валідний email або telegram username/i),
    ).toBeInTheDocument();
  });

  test('rejects non-empty honeypot in schema', () => {
    const t = (key) => key;
    const schema = createContactSchema(t);

    const result = schema.safeParse({
      name: 'Тест Користувач',
      contact: 'test@example.com',
      message: 'Це валідне повідомлення довше 10 символів.',
      consent: true,
      website: 'spam',
      _csrf: 'token',
    });

    expect(result.success).toBe(false);
  });

  test('submits successfully with stub', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText(/ваше ім.?я/i), 'Тест Користувач');
    await user.type(screen.getByLabelText(/email або telegram/i), 'test@example.com');
    await user.type(
      screen.getByLabelText(/коротко опишіть запит/i),
      'Це валідне повідомлення довше 10 символів.',
    );
    await user.click(screen.getByLabelText(/я погоджуюсь/i));
    await user.click(screen.getByRole('button', { name: /turnstile-verify/i }));
    await user.click(screen.getByRole('button', { name: /надіслати заявку/i }));

    expect(await screen.findByText(/дякую\. відповім протягом 24/i)).toBeInTheDocument();
    expect(submitContact).toHaveBeenCalledTimes(1);
  });

  test('blocks submit when rate limited', async () => {
    const user = userEvent.setup();
    window.sessionStorage.setItem('last_submit_at', String(Date.now()));

    renderWithProviders(<ContactForm />);
    await user.type(screen.getByLabelText(/ваше ім.?я/i), 'Тест Користувач');
    await user.type(screen.getByLabelText(/email або telegram/i), 'test@example.com');
    await user.type(
      screen.getByLabelText(/коротко опишіть запит/i),
      'Це валідне повідомлення довше 10 символів.',
    );
    await user.click(screen.getByLabelText(/я погоджуюсь/i));
    await user.click(screen.getByRole('button', { name: /turnstile-verify/i }));

    await user.click(screen.getByRole('button', { name: /надіслати заявку/i }));

    expect(await screen.findByText(/спробуйте пізніше/i)).toBeInTheDocument();
    expect(submitContact).not.toHaveBeenCalled();
  });
});
