<script>
  import { settings } from "./stores/settings.js";
</script>

<svelte:head>
  {#if $settings.colorScheme === "dark"}
    <style>
      :root {
        --backgroundColor: #1d1d1d;
        --textColor: #fff;
      }
    </style>
  {:else}
      <style>
          :root {
              --backgroundColor: #fff;
              --textColor: #000;
          }
      </style>
  {/if}
</svelte:head>
