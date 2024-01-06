<script lang="ts">
  import { PortalState } from './state.svelte';
  import { page } from '$app/stores';
  import Sidebar from '$lib/components/sections/sidebars/Sidebar.svelte';
  import Header from '$lib/components/sections/headers/Header.svelte';
  import Footer from '$lib/components/sections/footers/Footer.svelte';
  import { t } from '$lib/i18n/translations';
  import BranchSelection from '$lib/components/ui/home/BranchSelection.svelte';

  let { data, children } = $props();
  let sidebar = $state(true);

  const internal = new PortalState($page.url, $page.route?.id, $page.params.id);

  function toggleSidebar() {
    sidebar = !sidebar;
  }
</script>

<div class="flex h-screen w-screen bg-neutral-lightest">
  <Sidebar title="Portal Center" branch={data.branch || 'all'}  bind:sidebar />
  <div class="flex w-0 flex-1 flex-col overflow-x-hidden xl:px-8 xl:py-2">
    <Header let:Content>
      <Content let:Hamburger>
        <span class="xl:hidden">
          <Hamburger bind:open={sidebar} --color="gray" on:click={toggleSidebar} />
        </span>
        <BranchSelection
          label="branch"
          placeholder={$t('options.branch.all')}
          options={data.options.branches}
          value={$page.params.branch}
          onchange={internal.onChange}
        />
        {#if !!internal.machine}
          <div class="flex flex-col rounded-lg border border-neutral-light px-4 py-2">
            <span class="text-xs text-neutral">machine</span>
            <span class="text-sm">{internal.machine?.name} ({internal.machine?.location})</span>
          </div>
        {/if}
      </Content>
      <Content let:Language let:Theme let:Profile>
        <Language class="hidden sm:block" />
        <Theme class="hidden sm:block" />
        <Profile username={internal.username} role={internal.role} />
      </Content>
    </Header>
    <main class="my-2 w-full max-w-full flex-1 lg:p-4 lg:px-0">
      {@render children()}
    </main>
    <Footer />
  </div>
</div>
