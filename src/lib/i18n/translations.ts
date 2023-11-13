import i18n, { type Modifier } from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'en';

const config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
    cs: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'common',
      loader: async () => (await import('./en/common.json')).default,
    },
    {
      locale: 'th',
      key: 'common',
      loader: async () => (await import('./th/common.json')).default,
    },
    {
      locale: 'en',
      key: 'console',
      routes: ['/console'],
      loader: async () => (await import('./en/console.json')).default,
    },
    {
      locale: 'th',
      key: 'console',
      routes: ['/console'],
      loader: async () => (await import('./th/console.json')).default,
    },
    {
      locale: 'en',
      key: 'sidebar',
      loader: async () => (await import('./en/sidebar.json')).default,
    },
    {
      locale: 'th',
      key: 'sidebar',
      loader: async () => (await import('./th/sidebar.json')).default,
    },
    {
      locale: 'en',
      key: 'pagination',
      loader: async () => (await import('./en/pagination.json')).default,
    },
    {
      locale: 'th',
      key: 'pagination',
      loader: async () => (await import('./th/pagination.json')).default,
    },
    {
      locale: 'en',
      key: 'report',
      loader: async () => (await import('./en/report.json')).default,
    },
    {
      locale: 'th',
      key: 'report',
      loader: async () => (await import('./th/report.json')).default,
    },
  ],
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const { t, locale, locales, loading, loadTranslations } = new i18n<any, Modifier.DefaultModifiers>(config);
