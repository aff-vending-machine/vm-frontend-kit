<!-- Breadcrumb -->
<script lang="ts">
  let { home = true, path } = $props<{
    home: boolean;
    path: string;
  }>();

  const items = $derived(generateBreadcrumbItems(path, home));

  function generateBreadcrumbItems(path: string, home: boolean) {
    const items = path.split('/').map((p: string, index: number, a: string[]) => {
      path = '';
      for (let i = 0; i < index; i++) {
        path += a[i] + '/';
      }
      path += p;
      return {
        link: path,
        text: p,
      };
    });
    items.shift();

    if (home) {
      items.unshift({
        link: '/',
        text: 'Home',
      });
    }

    return items;
  }
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
