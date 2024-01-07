<!-- Image -->
<script lang="ts">
  let {
    class: className,
    src,
    alt,
  } = $props<{
    class?: string;
    src?: string;
    alt?: string;
  }>();

  const onerror = (e: Event) => {
    e.preventDefault();

    src = 'https://placehold.co/512x512?text=No+Image';
  };
</script>

<!-- HTML -->
<img class={className} {alt} {src} placeholder="https://placehold.co/512x512?text=No+Image" {onerror} />
