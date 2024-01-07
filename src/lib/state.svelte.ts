import { Media } from './hooks/media.svelte';
import { Persisted } from './hooks/persisted.svelte';
import type { Profile } from './types/auth';

export const profile = new Persisted<Profile>('profile', null);
export const accessToken = new Persisted<string>('access-token', null);
export const refreshToken = new Persisted<string>('refresh-token', null);
export const rememberMe = new Persisted<boolean>('remember-me', null);
export const language = new Persisted<string>('language', 'en');
export const theme = new Persisted<string>('theme', 'light');
export const media = new Media();
