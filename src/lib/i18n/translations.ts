import i18n, { type Modifier } from 'sveltekit-i18n';

import lang from './lang.json';

export type TranslationType = (key: string) => string;
export const defaultLocale = 'en';

const locales = ['en', 'th'];
const keys = ['auth', 'common', 'console', 'options', 'pagination', 'report', 'sidebar', 'slot'];

const loaders = [];

for (const locale of locales) {
  for (const key of keys) {
    const mergedObject = {
      locale,
      key,
      loader: async () => (await import(`./${locale}/${key}.json`)).default,
    };
    loaders.push(mergedObject);
  }
}

const config = {
  fallbackLocale: 'en',
  translations: {
    en: { lang },
    cs: { lang },
  },
  loaders,
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const { t, locale, loading, loadTranslations } = new i18n<any, Modifier.DefaultModifiers>(config);
