<script>
  import Konva from "konva";
  import { onDestroy, onMount, setContext } from "svelte";
  import { stageKey } from "./context-key.js";

  let container, stage;

  $: stage && stage.setAttrs($$props)

  setContext(stageKey, { getStage: () => stage });

  onMount(() => {
    stage = new Konva.Stage({ container, ...$$props });
  });
  onDestroy(() => {
    if (stage) {
      stage.destroy();
    }
  });
</script>

<div bind:this={container}>
  {#if stage}
    <slot />
  {/if}
</div>
