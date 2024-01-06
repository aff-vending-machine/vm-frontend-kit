<script lang="ts">
  import { version } from '$app/environment';

  let year = new Date().getFullYear();
</script>

<footer class="flex w-full items-center justify-center whitespace-nowrap lg:justify-between">
  <small class="text-sm text-neutral dark:text-neutral-light">
    Copyright © {year} <a href="https://www.at44.co.th/" class="mx-1 hover:underline">AT44 co., ltd.</a> All Rights Reserved.
  </small>
  <ul class="hidden space-x-4 text-sm text-neutral dark:text-neutral-light lg:flex">
    <li>
      <a href="https://www.at44.co.th/about-us/" class="hover:underline">About</a>
    </li>
    <li>
      <a href="https://www.at44.co.th/contact-us/" class="hover:underline">Contact</a>
    </li>
    <li>
      <span>v{version}</span>
    </li>
  </ul>
</footer>
