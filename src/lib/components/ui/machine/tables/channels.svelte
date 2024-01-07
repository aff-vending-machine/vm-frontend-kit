<script lang="ts">
  import type { MachineEntity } from '$lib/types/machine';
  import { goto } from '$app/navigation';
  import ButtonLink from '$lib/components/elements/buttons/ButtonLink.svelte';
  import { t } from '$lib/i18n/translations';

  let { source } = $props<{
    index: number;
    source: MachineEntity;
  }>();
</script>

<div class="flex justify-center space-x-1">
  <ButtonLink outline color="accent" href="machines/{source.id}/slots">
    {$t('common.button.slots')}
  </ButtonLink>
  <ButtonLink outline color="secondary" href="machines/{source.id}/payments">
    {$t('common.button.payments')}
  </ButtonLink>
</div>
