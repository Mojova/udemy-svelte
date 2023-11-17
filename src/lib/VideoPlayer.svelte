<script context="module">
  let allVideos = new Set();

  export function playAll() {
    allVideos.forEach((v) => v.play());
  }

  export function pauseAll() {
      allVideos.forEach((v) => v.pause());
  }
</script>

<script>
  import { onDestroy, onMount } from "svelte";

  export let src = undefined;

  let video;
  let paused = true;
  let currentTime = 0;
  let volume = 0;
  onMount(() => {
    allVideos.add(video);
  });
  onDestroy(() => {
    allVideos.delete(video);
  });
</script>

<video
  class:playing={!paused}
  {src}
  bind:this={video}
  controls
  muted
  bind:paused
  bind:volume
  bind:currentTime
/>

<button on:click={() => (paused = !paused)}>{paused ? "Play" : "Pause"}</button>

<style>
  video.playing {
    outline: 4px solid #ff3e00;
  }
</style>
