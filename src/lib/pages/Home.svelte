<script>
  import Stage from "../konva/Stage.svelte";
  import Layer from "../konva/Layer.svelte";
  import Rect from "../konva/Rect.svelte";

  let showCanvas = true;
  let x = 20;
  let width = 300;

  let rect1, rect2;
</script>

<button
  on:click={() => {
    console.log(rect1.rect.getAttrs());
    console.log(rect2.rect.getAttrs());
    console.log(rect2.rect.getStage());
  }}>Get rect info</button
>

<label for="showCanvas">Show canvas</label>
<input id="showCanvas" type="checkbox" bind:checked={showCanvas} />
<label for="x">X</label>
<input id="x" type="range" bind:value={x} min={0} max={300} />
<label for="width">Width</label>
<input id="width" type="range" bind:value={width} min={0} max={1000} />
<Stage {width} height={400}>
  <Layer draggable on:dragmove={console.log} on:click={console.log}>
    {#if showCanvas}
      <Rect bind:this={rect1} {x} y={20} fill="aqua" width={100} height={100} />
    {/if}
    <Rect
      on:click={() => {
        console.log("purple clicked");
      }}
      x={50}
      y={50}
      fill="purple"
      width={50}
      height={100}
    />
  </Layer>
  <Layer {x}>
    <Rect
      x={100}
      y={80}
      fill="green"
      width={100}
      height={100}
      stroke="white"
      strokeWidth={4}
      bind:this={rect2}
    />
  </Layer>
</Stage>
