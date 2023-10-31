<script>
  import tippy from "./lib/actions/tippy.js";

  let content = 'Hello';
</script>

<input type="text" bind:value={content} />

<button use:tippy={{ content, placement: "right", theme: "light" }}
  >Button</button
>

<style>
</style>
