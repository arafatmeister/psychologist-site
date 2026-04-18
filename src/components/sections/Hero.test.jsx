import { screen } from '@testing-library/react';
import { Hero } from './Hero';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('Hero', () => {
  test('renders italic emphasis inside h1', () => {
    const { container } = renderWithProviders(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    const em = heading.querySelector('em');

    expect(heading).toBeInTheDocument();
    expect(em).toBeInTheDocument();
    expect(container.querySelector('h1 em')).toBeTruthy();
  });
});
