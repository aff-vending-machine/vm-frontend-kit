<script lang="ts">
  let { code, isExist, minimal, oncreate } = $props<{
    code: string;
    isExist: boolean;
    minimal: boolean;
    oncreate?: (code: string) => void;
  }>();

  function handleCreate(e: MouseEvent) {
    e.preventDefault();
    !isExist && oncreate && oncreate(code);
  }
</script>

<button
  class="relative flex flex-col items-center rounded-md border-neutral-light p-2 transition-all"
  style="grid-column: span 1 / span 1;min-width: 10rem;"
  class:h-48={!minimal}
  class:h-24={minimal}
  onclick={handleCreate}
>
  <div class="font-bold text-neutral-light">{code}</div>
</button>
