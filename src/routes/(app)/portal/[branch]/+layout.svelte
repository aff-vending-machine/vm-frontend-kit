<script lang="ts">
  import { PortalState } from './state.svelte';
  import { page } from '$app/stores';
  import Sidebar from '$lib/components/sections/sidebars/Sidebar.svelte';
  import Header from '$lib/components/sections/headers/Header.svelte';
  import Footer from '$lib/components/sections/footers/Footer.svelte';
  import { t } from '$lib/i18n/translations';
  import sidebar from '$lib/stores/sidebar';
  import BranchSelection from '$lib/components/ui/home/BranchSelection.svelte';

  let { data, children } = $props();

  const state = new PortalState($page.url, $page.route?.id, $page.params.id);
</script>

<div class="flex h-screen w-screen bg-neutral-lightest">
  <Sidebar title="Portal Center" branch={$page.params.branch || 'all'} />
  <div class="flex w-0 flex-1 flex-col overflow-x-hidden xl:px-8 xl:py-2">
    <Header let:Content>
      <Content let:Hamburger>
        <span class="xl:hidden">
          <Hamburger open={$sidebar} --color="gray" on:click={sidebar.toggle} />
        </span>
        <BranchSelection
          label="branch"
          placeholder={$t('options.branch.all')}
          options={data.options.branches}
          value={$page.params.branch}
          onchange={state.onChange}
        />
        {#if !!state.machine}
          <div class="flex flex-col rounded-lg border border-neutral-light px-4 py-2">
            <span class="text-xs text-neutral">machine</span>
            <span class="text-sm">{state.machine?.name} ({state.machine?.location})</span>
          </div>
        {/if}
      </Content>
      <Content let:Language let:Theme let:Profile>
        <Language class="hidden sm:block" />
        <Theme class="hidden sm:block" />
        <Profile username={state.username} role={state.role} />
      </Content>
    </Header>
    <main class="my-2 w-full max-w-full flex-1 lg:p-4 lg:px-0">
      {@render children()}
    </main>
    <Footer />
  </div>
</div>
