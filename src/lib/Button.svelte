<script context="module">
  let totalButtons = 0;

  export function getTotalButtons() {
    return totalButtons;
  }
</script>

<script>
  import {onDestroy} from "svelte";

  export let size = "small";
  export let shadow = false;
  export let bgColor = undefined;
  export let textColor = undefined;
  let isLeftHovered;

  totalButtons++;

  onDestroy(() => totalButtons--)
</script>

<button
  on:click
  style:--buttonBgColor={bgColor}
  style:color={textColor}
  class:size-lg={size === "large"}
  class:size-sm={size === "small"}
  class:has-left={$$slots.left}
  class:shadow
  {...$$restProps}
>
  {#if $$slots.left}
    <div
      class="left-content"
      on:mouseenter={() => (isLeftHovered = true)}
      on:mouseleave={() => (isLeftHovered = false)}
    >
      <slot name="left" {isLeftHovered} />
    </div>
  {/if}
  <slot isLeftHovered>Fallback</slot>
</button>

<style lang="scss">
  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: var(--buttonBgColor);
    color: var(--buttonTextColor);
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    .left-content {
      margin-right: 10px;
    }
    &.size-sm {
      padding: 1rem 1.5rem;
    }
    &.size-lg {
      padding: 1.5rem 2rem;
      font-size: 1.5rem;
    }
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    &.shadow {
      box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
    }
    &:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
    }
    &:active {
      background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
    }
  }
</style>
