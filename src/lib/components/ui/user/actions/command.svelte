<script lang="ts">
  import Icon from '@iconify/svelte';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';

  let { oncreate } = $props<{
    oncreate: () => void;
  }>();

  function onCreate(e: MouseEvent) {
    e.preventDefault();
    oncreate();
  }
</script>

<div class="flex justify-start">
  <Button outline class="group" onclick={onCreate}>
    <Icon icon="mdi:plus" class="h-4 w-4 text-primary group-hover:text-white" />
    <span class="ml-2">{$t('common.button.add-user')}</span>
  </Button>
</div>
