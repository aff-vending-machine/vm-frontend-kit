<script lang="ts">
  import Card from './(components)/Card.svelte';
  export let data;
</script>

<div class="flex flex-col space-y-4 rounded-lg bg-white">
  {#await data}
    <div>Loading . . .</div>
  {:then { branches, machines }}
    <Card let:Branch title="Select a Branch" allSelects="All Branches">
      <Branch {branches} {machines} />
    </Card>
    <Card let:Machine title="Select a Machine" allSelects="All Machines">
      <Machine {branches} {machines} />
    </Card>
  {/await}
</div>
