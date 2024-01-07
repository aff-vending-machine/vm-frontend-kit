<script lang="ts">
  import type { Snippet } from 'svelte';
  import Loading from './loading.svelte';
  import Data from './data.svelte';
  import Pagination from './pagination.svelte';

  type Components = {
    Loading: typeof Loading;
    Data: typeof Data;
    Pagination: typeof Pagination;
  };

  let { children } = $props<{
    children: Snippet<Components>;
  }>();
</script>

{@render children({ Loading, Data, Pagination })}
