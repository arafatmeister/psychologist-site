import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from './LanguageSwitcher';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('LanguageSwitcher', () => {
  test('switches language and updates html lang', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LanguageSwitcher />);

    await user.click(screen.getByRole('button', { name: /en/i }));

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('en');
    });
  });
});
