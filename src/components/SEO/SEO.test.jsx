import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { SEO } from './SEO';
import i18n from '../../i18n';

describe('SEO', () => {
  test('renders basic meta tags', async () => {
    i18n.changeLanguage('uk');

    render(
      <HelmetProvider>
        <I18nextProvider i18n={i18n}>
          <SEO title="Тестовий title" description="Тестовий опис" path="/" image="/og-image.jpg" />
        </I18nextProvider>
      </HelmetProvider>,
    );

    await waitFor(() => {
      expect(document.title).toBe('Тестовий title');
    });

    const canonical = document.head.querySelector('link[rel="canonical"]');
    const description = document.head.querySelector('meta[name="description"]');

    expect(canonical).toHaveAttribute('href', 'https://divineweed.club/');
    expect(description).toHaveAttribute('content', 'Тестовий опис');
  });
});
