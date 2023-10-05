<script>
    export let initialCount
    export let maxCount
    let count = initialCount

    console.log($$props, $$restProps)



    function increment() {
        if (count < maxCount) {
            count++
        }
    }
</script>

<button on:click={increment}>Clicks {count}</button>


<style>
    button {
        padding: 1rem;
    }
</style>