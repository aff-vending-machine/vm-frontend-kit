<!-- Breadcrumb -->
<script lang="ts">
  import { generateBreadcrumbItems } from '$lib/utils/breadcrumb';
  export let home = true;
  export let path: string;

  let items = generateBreadcrumbItems(path, home);
</script>

<!-- HTML -->
<nav aria-label="breadcrumb">
  <ol class="inline-flex items-center space-x-4 py-2 text-sm font-medium">
    {#each items as item, i (item.link)}
      <li class="inline-flex items-center">
        {#if i === items.length - 1}
          <span class="text-white">/</span>
          <p class="capitalize text-white hover:text-white">{item.text}</p>
        {:else}
          <a href={item.link} class="capitalize text-white hover:text-white">{item.text}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
