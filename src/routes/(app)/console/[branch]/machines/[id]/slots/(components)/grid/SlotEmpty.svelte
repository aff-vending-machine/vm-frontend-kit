<script lang="ts">
  let { code, isExist, oncreate } = $props<{
    code: string;
    isExist: boolean;
    oncreate?: (code: string) => void;
  }>();

  function handleCreate(e: MouseEvent) {
    e.preventDefault();
    !isExist && oncreate && oncreate(code);
  }
</script>

<button
  class="bg-transaction flex h-48 w-40 flex-col items-center rounded-md border border-gray-300 p-2"
  onclick={handleCreate}
>
  <div class="font-bold text-gray-300">{code}</div>
</button>
