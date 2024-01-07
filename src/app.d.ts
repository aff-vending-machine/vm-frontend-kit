// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      profile: string | null;
    }
    // interface PageData {}
    // interface Platform {}
  }
  declare namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:click-outside'?: CompositionEventHandler<T>;
      'on:mouse-press'?: CompositionEventHandler<T>;
    }
  }
}

export {};
