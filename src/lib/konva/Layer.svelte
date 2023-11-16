<script>
  import Konva from "konva";
  import {
    getContext,
    onDestroy,
    setContext,
    createEventDispatcher,
  } from "svelte";
  import { layerKey, stageKey } from "./context-key.js";

  const layer = new Konva.Layer($$props);
  const { getStage } = getContext(stageKey);
  const stage = getStage();
  stage.add(layer);

  setContext(layerKey, layer);

  $: layer.setAttrs($$props);

  const dispatch = createEventDispatcher();

  layer.on("dragmove click mousedown", (e) => {
    dispatch(e.type, e);
  });

  onDestroy(layer.destroy.bind(layer));
</script>

<slot />
