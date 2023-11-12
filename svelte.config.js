// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      strict: true,
      fallback: 'index.html',
    }),
    alias: {
      $components: 'src/components',
      $types: 'src/types',
    },
    version: {
      name: process.env.npm_package_version,
    },
    csp: {
      mode: 'hash',
      directives: { 'script-src': ['self'] },
    },
  },
};

export default config;
