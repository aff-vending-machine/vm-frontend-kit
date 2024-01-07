<script lang="ts">
  import type { PaymentEntity } from '$lib/types/payment';

  let { source, onaction } = $props<{
    index: number;
    source: PaymentEntity;
    onaction: (mode: 'enable' | 'disable', source: PaymentEntity) => void;
  }>();

  function onchange(e: Event) {
    e.preventDefault();
    const checked = (e.target as HTMLInputElement).checked;
    onaction(checked ? 'enable' : 'disable', source);
  }
</script>

<div class="flex space-x-1">
  <div class="inline-flex items-center">
    <div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
      <input
        id={source.channel}
        type="checkbox"
        class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-primary-lightest transition-colors duration-300 checked:bg-neutral-darkest peer-checked:border-neutral-darkest peer-checked:before:bg-neutral-darkest"
        checked={source.is_enable}
        {onchange}
      />
      <label
        for={source.channel}
        class="before:content[''] before:bg-blue-gray-500 absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-primary-lightest bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-neutral-darkest peer-checked:before:bg-neutral-darkest"
      >
        <div class="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"></div>
      </label>
    </div>
    <label for={source.channel} class="mb-0 ml-3 mt-px cursor-pointer select-none font-light text-neutral-dark">
      {source.is_enable ? 'Enable' : 'Disable'}
    </label>
  </div>
</div>
