import { type Writable, writable } from 'svelte/store';

type ThemeType = 'light' | 'dark';

const theme: Writable<ThemeType> = writable('dark');

function toggle() {
  theme.update(s => {
    if (s === 'dark') return 'light';
    return 'dark';
  });
}

export default { toggle, ...theme };
