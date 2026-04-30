import { createContext, useContext } from 'react';

export const SanityContentContext = createContext({
  homePage: null,
  services: [],
  faqs: [],
  posts: [],
  isLoading: true,
  error: null,
});

export const useSanityContent = () => useContext(SanityContentContext);
