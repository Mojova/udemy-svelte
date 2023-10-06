<script>
  import Button from "./lib/Button.svelte";
  import FaAngellist from "svelte-icons/fa/FaAngellist.svelte";
  import FaAllergies from "svelte-icons/fa/FaAllergies.svelte";
</script>

<Button disabled on:click={(event) => alert(true)} let:isLeftHovered size="small" shadow bgColor="blue" textColor="white">
  <div style:width="20px" slot="left" let:isLeftHovered>
    {#if isLeftHovered}
      <FaAngellist />
    {:else}
      <FaAllergies />
    {/if}
  </div>
  Button Text {isLeftHovered}
</Button>

<style>
</style>
