import i18n, { type Modifier } from 'sveltekit-i18n';
import lang from './i18n/lang.json';

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
      loader: async () => (await import('./i18n/en/common.json')).default,
    },
    {
      locale: 'th',
      key: 'common',
      loader: async () => (await import('./i18n/th/common.json')).default,
    },
    {
      locale: 'en',
      key: 'console',
      routes: ['/console'],
      loader: async () => (await import('./i18n/en/console.json')).default,
    },
    {
      locale: 'th',
      key: 'console',
      routes: ['/console'],
      loader: async () => (await import('./i18n/th/console.json')).default,
    },
  ],
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const { t, locale, locales, loading, loadTranslations } = new i18n<any, Modifier.DefaultModifiers>(config);

loading.subscribe(async $loading => {
  if ($loading) await loading.toPromise();
});
