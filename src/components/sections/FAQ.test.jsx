import { screen } from '@testing-library/react';
import { FAQ } from './FAQ';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('FAQ', () => {
  test('renders details and custom chevron icon', () => {
    const { container } = renderWithProviders(<FAQ />);

    expect(container.querySelector('details')).toBeInTheDocument();
    expect(container.querySelector('summary')).toBeInTheDocument();
    expect(container.querySelector('summary svg')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
