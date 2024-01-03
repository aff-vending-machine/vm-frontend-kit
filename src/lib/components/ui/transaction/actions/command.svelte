<script lang="ts">
  import Icon from '@iconify/svelte';

  import Button from '$lib/components/elements/buttons/Button.svelte';
  import { t } from '$lib/i18n/translations';

  let { onsync } = $props<{
    onsync: () => void;
  }>();

  function onSync(e: MouseEvent) {
    e.preventDefault();
    onsync();
  }
</script>

<div class="flex justify-end"></div>
