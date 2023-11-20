<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import SelectField from '$components/forms/inputs/SelectField.svelte';
  import Footer from '$components/sections/footers/Footer.svelte';
  import Header from '$components/sections/headers/Header.svelte';
  import Sidebar from '$components/sections/sidebars/Sidebar.svelte';
  import { t } from '$lib/i18n/translations';
  import access from '$lib/stores/access';
  import sidebar from '$lib/stores/sidebar';
  import { genKey } from '$lib/utils/generate';

  export let data;

  function handleChangeBranch(event: Event) {
    const newBranch = (event.target as HTMLSelectElement).value;
    const url = $page.route.id?.replace('[branch]', newBranch);
    goto(`${url}?${$page.url.searchParams.toString()}`);
  }
</script>

<div class="flex h-screen bg-gray-100">
  <Sidebar title="Portal Center" branch={$page.params.branch || 'all'} />
  <div class="flex flex-1 flex-col xl:px-8 xl:py-2">
    <Header let:Content>
      <Content let:Hamburger>
        <span class="xl:hidden"> <Hamburger open={$sidebar} --color="gray" on:click={sidebar.toggle} /></span>
        {#if $page.params.branch && data.branches}
          <SelectField
            id="branches"
            value={$page.params.branch}
            options={[{ name: 'test' }].map(b => ({ label: b.name, value: genKey(b.name) }))}
            unselected="all"
            placeholder={$t('options.branch.all')}
            disabled={true}
            on:change={handleChangeBranch}
          />
        {/if}
      </Content>
      <Content let:Language let:Theme let:Profile>
        <Language class="hidden sm:block" />
        <Theme class="hidden sm:block" />
        <Profile username={$access.name} role={$access.role} />
      </Content>
    </Header>
    <main class="my-2 flex-1 overflow-y-auto lg:p-4 lg:px-0">
      <slot />
    </main>
    <Footer />
  </div>
</div>
