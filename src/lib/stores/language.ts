import { LANGUAGE } from '$lib/constants';
import { storage } from '$lib/utils/local-storage';
import { writable, type Writable } from 'svelte/store';

type LanguageType = 'en' | 'th';

const language: Writable<LanguageType> = writable('en');

function reload() {
  const locale = (storage(LANGUAGE) || 'en') as LanguageType;
  language.set(locale);
  return locale;
}

function toggle() {
  const locale = storage(LANGUAGE) || 'en';

  switch (locale) {
    case 'th':
      storage(LANGUAGE, 'en');
      language.set('en');
      break;

    default:
      storage(LANGUAGE, 'th');
      language.set('th');
      break;
  }
}

export default { reload, toggle, ...language };
