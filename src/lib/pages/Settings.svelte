<script>
  import { settings } from "./../stores/settings.js";
  import { direction } from "./../stores/direction.js";
</script>

<h2>Settings</h2>

<button on:click={settings.toggleColorScheme}>Toggle Color Scheme</button>

<button on:click={() => settings.updateSetting("language", Math.random())}
  >Update language</button
>

<button on:click={settings.reset}>Reset settings</button>

<p>{$settings.language}</p>
<p>{$direction}</p>

<fieldset>
  <legend>Color scheme</legend>
  <label>
    <input
      type="radio"
      name="colorScheme"
      bind:group={$settings.colorScheme}
      value="dark"
    /> Dark
  </label>
  <label>
    <input
      type="radio"
      name="colorScheme"
      bind:group={$settings.colorScheme}
      value="light"
    /> Light
  </label>
</fieldset>

<select bind:value={$settings.language}>
  <option value="en">English</option>
  <option value="ar">Arabic</option>
</select>
