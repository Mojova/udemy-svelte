<svelte:options immutable={true} />

<script>
  import Button from "./Button.svelte";
  import { afterUpdate, createEventDispatcher } from "svelte";
  import { FaRegTrashAlt } from "svelte-icons/fa";
  import { scale, crossfade } from "svelte/transition";
  import { flip } from "svelte/animate";

  const [send, receive] = crossfade({
    fallback: scale
  });

  export let todos = null;
  export let error = null;
  export let isLoading = false;
  export let disableAdding = false;
  export let disabledItems = [];
  export let scrollOnAdd = undefined;

  $: done = todos ? todos.filter((t) => t.completed) : [];
  $: todo = todos ? todos.filter((t) => !t.completed) : [];

  let input, listDiv, autoscroll, listDivScrollHeight;
  const dispatch = createEventDispatcher();
  let inputText = "";
  let prevTodos = todos;

  $: {
    autoscroll = todos && prevTodos && todos.length > prevTodos.length;
    prevTodos = todos;
  }

  afterUpdate(() => {
    if (scrollOnAdd) {
      let pos;
      if (scrollOnAdd === "top") {
        pos = 0;
      }
      if (scrollOnAdd === "bottom") {
        pos = listDiv.scrollHeight;
      }
      if (autoscroll) {
        listDiv.scrollTo(0, pos);
      }
    }
    autoscroll = false;
  });
  export function clearInput() {
    inputText = "";
  }
  export function focusInput() {
    input.focus();
  }

  function handleAddTodo() {
    const isNotCancelled = dispatch(
      "addTodo",
      {
        title: inputText,
      },
      { cancelable: true },
    );
    if (isNotCancelled) {
      inputText = "";
    }
  }

  function handleRemoveTodo(id) {
    dispatch("removetodo", {
      id,
    });
  }

  function handleCheck(id, value) {
    dispatch("toggletodo", {
      id,
      value,
    });
  }
</script>

<div class="todo-list-wrapper">
  {#if isLoading}
    <p>Loading…</p>
  {:else if error}
    <p>{error}</p>
  {:else if todos}
    <div
      class="todo-list"
      bind:offsetHeight={listDivScrollHeight}
      bind:this={listDiv}
    >
      <div bind:offsetHeight={listDivScrollHeight}>
        {#if todos.length === 0}
          <p class="state-text">No todos yet</p>
        {:else}
          <div style:display="flex">
            {#each [todo, done] as list, index}
              <div class="list-wrapper">
                <h2>{index === 0 ? "Todo" : "Done"}</h2>
                <ol>
                  {#each list as todo (todo.id)}
                    {@const { id, completed, title } = todo}
                    <li animate:flip>
                      <slot name="todo-item" {todo} {handleCheck}>
                        <div
                          class:completed
                          in:receive={{ key: id }}
                          out:send={{ key: id }}
                        >
                          <label>
                            <input
                              type="checkbox"
                              checked={completed}
                              disabled={disabledItems.includes(id)}
                              on:input={(event) => {
                                event.currentTarget.checked = completed;
                                handleCheck(id, !completed);
                              }}
                            />
                            <slot name="title">{title}</slot>
                          </label>
                          <button
                            class="remove-todo-button"
                            aria-label="Remove todo: {title}"
                            disabled={disabledItems.includes(id)}
                            on:click={() => handleRemoveTodo(id)}
                            ><span
                              style:width="10px"
                              style:display="inline-block"
                              ><FaRegTrashAlt /></span
                            ></button
                          >
                        </div>
                      </slot>
                    </li>
                  {/each}
                </ol>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/if}
  <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
    <input
      bind:value={inputText}
      type="text"
      bind:this={input}
      placeholder="New todo"
      disabled={disableAdding || !todos}
    />
    <Button
      class="add-todo-button"
      type="submit"
      disabled={!inputText || disableAdding || !todos}>Add</Button
    >
  </form>
</div>

<style lang="scss">
  .todo-list {
    max-height: 400px;
    overflow: auto;
    .list-wrapper {
      padding: 10px;
      flex: 1;
      h2 {
        margin: 0 0 10px;
      }
      ol {
        margin: 0;
        padding: 0;
        list-style: none;
        li > div {
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          background-color: #303030;
          border-radius: 5px;
          padding: 10px;
          position: relative;
          label {
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: baseline;
            padding-right: 20px;
            input[type="checkbox"] {
              margin: 0 10px 0 0;
              cursor: pointer;
            }
          }
          &.completed > label {
            opacity: 0.5;
            text-decoration: line-through;
          }
          .remove-todo-button {
            border: 0;
            background: none;
            padding: 5px;
            position: absolute;
            right: 10px;
            cursor: pointer;
            display: none;
            :global(svg) {
              fill: #bd1414;
            }
            &:disabled {
              opacity: 0.4;
              cursor: not-allowed;
            }
          }
          &:hover {
            .remove-todo-button {
              display: block;
            }
          }
        }
      }
    }
  }
  .todo-list-wrapper {
    background-color: #424242;
    border: 1px solid #4b4b4b;

    .state-text {
      margin: 0;
      padding: 15px;
      text-align: center;
    }
  }
  .add-todo-form {
    padding: 15px;
    background-color: #303030;
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #4b4b4b;
    :global(.add-todo-button) {
      background-color: aqua;
    }
    input {
      flex: 1;
      background-color: #424242;
      border: 1px solid #4b4b4b;
      padding: 10px;
      color: white;
      border-radius: 5px;
      margin-right: 10px;
    }
  }
</style>
