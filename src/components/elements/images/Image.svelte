<!-- Image -->
<script lang="ts">
  export let src: string;
  export let alt = '-';

  const handleImageError = () => {
    src = 'https://placehold.co/512x512?text=No+Image';
  };
</script>

<!-- HTML -->
<img class={$$props.class} {alt} {src} on:error={handleImageError} />
