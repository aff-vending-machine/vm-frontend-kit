import { Root } from './state.svelte';

export const ssr = false;

export async function load({ url }) {
  const root = new Root(url.pathname);

  return {
    isAuthenticated: await root.checkAuthentication(),
    query: url.searchParams,
  };
}
