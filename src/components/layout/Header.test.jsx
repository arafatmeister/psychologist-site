import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('Header', () => {
  test('toggles mobile menu and closes on Escape', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);

    const trigger = screen.getByRole('button', { name: /відкрити меню/i });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document.getElementById('mobile-nav'), { key: 'Escape' });

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
