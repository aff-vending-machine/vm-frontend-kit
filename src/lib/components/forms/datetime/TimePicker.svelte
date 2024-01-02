<script lang="ts">
  import { onMount } from 'svelte';

  export let value: Date;
  export let increment: number = 5;

  const h = value.getHours().toString().padStart(2, '0');
  const m = (Math.floor(value.getMinutes() / increment) * increment).toString().padStart(2, '0');
  let time = `${h}:${m}`;

  const hours: string[] = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes: string[] = Array.from({ length: Math.floor(60 / increment) }, (_, i) =>
    (i * increment).toString().padStart(2, '0'),
  );

  function fixTimeFormat(event: Event): void {
    const [hour, minute] = (event.target as HTMLInputElement).value.split(':').map(Number);
    if (isNaN(hour) || isNaN(minute)) {
      time = '00:00';
      return;
    }

    const fixedHours: number = Math.min(23, Math.max(0, hour));
    const fixedMinutes: number = Math.min(
      Math.floor(60 / increment) * increment,
      Math.max(0, Math.floor(minute / increment) * increment),
    );

    time = `${fixedHours.toString().padStart(2, '0')}:${fixedMinutes.toString().padStart(2, '0')}`;
  }

  onMount(() => {
    const hours = value.getHours().toString().padStart(2, '0');
    const minutes = (Math.floor(value.getMinutes() / increment) * increment).toString().padStart(2, '0');
    time = `${hours}:${minutes}`;
  });

  $: {
    const [hours, minutes] = time.split(':').map(Number);
    value.setHours(hours, minutes);
  }
</script>

<div class="relative p-2">
  <input
    type="text"
    bind:value={time}
    on:blur={fixTimeFormat}
    maxlength={5}
    placeholder="hh:mm"
    class="rounded-md border-2 border-neutral-light p-1 text-center"
  />

  <div class="mt-2 grid max-h-40 grid-cols-2 divide-x divide-neutral-light overflow-hidden">
    <div class="hide-scrollbar overflow-auto" style="max-height: 10rem;">
      {#each hours as hour (hour)}
        <button
          class="block w-full px-4 py-2 text-left hover:bg-neutral-lightest {time.split(':')[0] === hour
            ? 'bg-neutral-lightest font-semibold'
            : ''}"
          on:click={() => (time = `${hour}:${time.split(':')[1]}`)}>{hour}</button
        >
      {/each}
    </div>
    <div class="hide-scrollbar overflow-auto" style="max-height: 10rem;">
      {#each minutes as minute (minute)}
        <button
          class="block w-full px-4 py-2 text-left hover:bg-neutral-lightest {time.split(':')[1] === minute
            ? 'bg-neutral-lightest font-semibold'
            : ''}"
          on:click={() => (time = `${time.split(':')[0]}:${minute}`)}>{minute}</button
        >
      {/each}
    </div>
  </div>
</div>

<style>
  .hide-scrollbar {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
</style>
