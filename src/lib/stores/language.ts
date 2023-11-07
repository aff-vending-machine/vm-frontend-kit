import { writable, type Writable } from 'svelte/store';

type LanguageType = 'en-US' | 'th-TH';

const language: Writable<LanguageType> = writable('en-US');

function toggle() {
  language.update(s => {
    if (s === 'en-US') return 'th-TH';
    return 'en-US';
  });
}

export default { toggle, ...language };
