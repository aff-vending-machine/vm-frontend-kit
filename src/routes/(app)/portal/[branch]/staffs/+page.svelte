<script lang="ts">
  import { t } from '$lib/i18n/translations';
  import Table from '$lib/components/elements/tables/Table.svelte';
  import Card from '$lib/components/sections/cards/Card.svelte';

  import { columns } from './table';
  import { ActionState, Command, Filter } from '$lib/components/ui/user/actions';
  import { UserState } from './state.svelte';
  import { Modal, Drawer, Alert, OverlayState } from '$lib/components/ui/user/overlays';
  import SharePaginationTable from '$lib/components/shares/SharePaginationTable.svelte';

  let { data } = $props();

  const action = new ActionState(data.query);
  const overlay = new OverlayState();
  const state = new UserState(action, overlay);
</script>

<Card>
  {#snippet children({ Header, Content })}
    <Content>
      <Header>{$t('common.search-filter')}</Header>
      <Filter perPage={action.data.perPage} />
    </Content>
    <Content>
      <Header>{$t('common.search-action')}</Header>
      <Command oncreate={overlay.onOpenCreator} />
    </Content>
    <Content>
      <Table>
        {#snippet children({ Header, Body, Footer, Loading })}
          <Header {columns} />
          {#if state.loading}
            <Loading {columns} />
          {/if}

          {#if state.error}
            <div>{state.error}</div>
          {/if}
          {#if state.ready}
            <Body {columns} bind:source={state.data} onaction={state.onAction} onselect={state.onSelect} />
            <Footer>
              <SharePaginationTable {...state.pagination} colspan={columns.length} />
            </Footer>
          {/if}
        {/snippet}
      </Table>
    </Content>
  {/snippet}
</Card>

{#if overlay.mode.display === 'drawer'}
  <Drawer
    title={overlay.data?.username}
    subtitle={overlay.data?.role?.name}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ Creator, Viewer })}
      <Creator roleOptions={data.options.roles} oncreate={state.onCreate} oncancel={overlay.onCancel} />
      <Viewer
        user={overlay.data}
        onchangepassword={overlay.onOpenPasswordChanger}
        onchangerole={overlay.onOpenRoleChanger}
        ondelete={overlay.onOpenEraser}
        oncancel={overlay.onCancel}
      />
    {/snippet}
  </Drawer>
{/if}

{#if overlay.mode.display === 'modal'}
  <Modal
    title={overlay.data?.username}
    subtitle={overlay.data?.role?.name}
    mode={overlay.mode.view}
    onclose={overlay.onCancel}
  >
    {#snippet children({ RoleChanger, PasswordChanger })}
      <RoleChanger
        user={overlay.data}
        roleOptions={data.options.roles}
        onchangerole={state.onChangeRole}
        oncancel={overlay.onCancel}
      />
      <PasswordChanger onchangepassword={state.onChangePassword} oncancel={overlay.onCancel} />
    {/snippet}
  </Modal>
{/if}

{#if overlay.mode.display === 'alert'}
  <Alert mode={overlay.mode.view} user={overlay.data} ondelete={state.onDelete} onclose={overlay.onCancel} />
{/if}
