<script lang="ts">
</script>

<div class="flex h-screen items-center justify-center bg-gray-100">
  <div class="min-w-[24rem] rounded-lg bg-white p-6 shadow">
    <div class="my-2 text-center">
      <h1 class="text-xl font-bold tracking-wider text-gray-500">Vending Machine</h1>
    </div>
    <div class="h-8"></div>
    <form class="flex flex-col space-y-4">
      <div class="flex flex-col space-y-2">
        <label for="username" class="text-sm uppercase"> Username </label>
        <input id="username" type="text" placeholder="Enter your username" class="rounded-md border-gray-300 text-sm" />
      </div>
      <div class="flex flex-col space-y-2">
        <div class="flex justify-between">
          <label for="password" class="text-sm uppercase"> Password </label>
          <a class="text-xs underline" href="/#">Forgot Password?</a>
        </div>
        <input
          id="password"
          type="password"
          placeholder="****************"
          class="rounded-md border-gray-300 text-sm"
        />
      </div>
      <div>
        <input type="checkbox" class="rounded border-gray-300" />
        <label for="password" class="text-sm"> Remember Me </label>
      </div>
      <button class="w-full rounded-md bg-purple-500 p-2 text-sm text-white shadow shadow-purple-300"> Sign in</button>
    </form>
  </div>
</div>
