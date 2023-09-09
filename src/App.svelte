<script>
  const name = 'Svelte'
  const src = 'src/assets/svelte.svg'
  const string = 'Some <strong>string</strong> with html.'
</script>

<img alt="{name} logo" {src} />
<h1>Hello {name.toUpperCase()}!</h1>
<p>{@html string}</p>

<style>
  h1 {
    color: red;
  }
</style>