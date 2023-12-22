<script lang="ts">
  import { handle } from './handle';

  import { page } from '$app/stores';
  import SelectField from '$lib/components/forms/inputs/SelectField.svelte';
  import Sidebar from '$lib/components/sections/sidebars/Sidebar.svelte';
  import Header from '$lib/components/sections/headers/Header.svelte';
  import Footer from '$lib/components/sections/footers/Footer.svelte';
  import { t } from '$lib/i18n/translations';
  import access from '$lib/stores/access';
  import sidebar from '$lib/stores/sidebar';

  let { data } = $props();
</script>

<div class="flex h-screen w-screen bg-gray-100">
  <Sidebar title="Portal Center" branch={$page.params.branch || 'all'} />
  <div class="flex w-0 flex-1 flex-col xl:px-8 xl:py-2">
    <Header let:Content>
      <Content let:Hamburger>
        <span class="xl:hidden"> <Hamburger open={$sidebar} --color="gray" on:click={sidebar.toggle} /></span>
        {#if $page.params.branch}
          <SelectField
            id="branches"
            value={$page.params.branch}
            options={data.options.branches}
            unselected="all"
            placeholder={$t('options.branch.all')}
            disabled={data.options.branches.length < 2}
            on:change={handle.changeBranch}
          />
        {/if}
      </Content>
      <Content let:Language let:Theme let:Profile>
        <Language class="hidden sm:block" />
        <Theme class="hidden sm:block" />
        <Profile username={$access.name} role={$access.role} />
      </Content>
    </Header>
    <main class="my-2 w-full max-w-full flex-1 overflow-y-auto lg:p-4 lg:px-0">
      <slot />
    </main>
    <Footer />
  </div>
</div>
