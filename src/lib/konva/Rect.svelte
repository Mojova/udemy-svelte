<script>
  import Konva from "konva";
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { layerKey } from "./context-key.js";

  const layer = getContext(layerKey);

  export const rect = new Konva.Rect($$props);

  layer.add(rect);

  $: rect.setAttrs($$props);

  const dispatcher = createEventDispatcher();

  rect.on("click mousedown", (e) => {
    dispatcher(e.type, e);
  });

  onDestroy(rect.destroy.bind(rect));
</script>
