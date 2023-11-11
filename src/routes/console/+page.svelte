<script lang="ts">
  import Card from '$components/sections/cards/Card.svelte';
</script>

<Card let:Content>
  <Content>
    <h3>Quick Access</h3>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      <button class="h-16 w-full bg-blue-200">Report</button>
      <button class="h-16 w-full bg-blue-200">Report</button>
      <button class="h-16 w-full bg-blue-200">Report</button>
      <button class="h-16 w-full bg-blue-200">Report</button>
    </div>
  </Content>
  <Content>
    <h3>Quick Access</h3>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      <button class="h-16 w-full bg-blue-200">Report</button>
      <button class="h-16 w-full bg-blue-200">Report</button>
      <button class="h-16 w-full bg-blue-200">Report</button>
      <button class="h-16 w-full bg-blue-200">Report</button>
    </div>
  </Content>
</Card>
