<script>
  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";
  import { onMount, tick } from "svelte";
  import { fly } from "svelte/transition";
  import spin from './lib/transitions/spin';
  import fade from './lib/transitions/fade';

  let todoList;
  let showList = true;
  let isLoading = true;
  let isAdding = false;
  let disabledItems = [];

  let todos = null;
  let error = null;

  onMount(loadTodos);

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(
      async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "An error has occured.";
        }
      },
    );
    isLoading = false;
  }

  async function handleAddTodo(event) {
    isAdding = true;
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10", {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.title,
        completed: false,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();
        todos = [{ ...todo, id: uuid() }, ...todos];
        todoList.clearInput();
      } else {
        alert("An error has occured.");
      }
      isAdding = false;
      await tick();
      todoList.focusInput();
    });
    event.preventDefault();
  }

  function handleRemoveTodo(event) {
    const { id } = event.detail;
    if (disabledItems.includes(id)) {
      return;
    }
    disabledItems = [...disabledItems, id];
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        todos = todos.filter((t) => t.id !== id);
      } else {
        alert("An error has occured.");
      }
      disabledItems = disabledItems.filter((i) => i !== id);
    });
  }

  function handleToggleTodo(event) {
    const { id, value } = event.detail;
    if (disabledItems.includes(id)) {
      return;
    }
    disabledItems = [...disabledItems, id];
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.ok) {
        todos = todos.map((t) => {
          if (t.id !== id) {
            return t;
          }
          return { ...t, completed: !t.completed };
        });
      } else {
        alert("An error has occured.");
      }
      disabledItems = disabledItems.filter((i) => i !== id);
    });
  }
</script>

<label>
  <input type="checkbox" bind:checked={showList} />
  Show/Hide list
</label>
{#if showList}
  <div transition:fade style:max-width="800px">
    <TodoList
      {todos}
      {error}
      {isLoading}
      disableAdding={isAdding}
      {disabledItems}
      bind:this={todoList}
      scrollOnAdd="top"
      on:addTodo={handleAddTodo}
      on:removetodo={handleRemoveTodo}
      on:toggletodo={handleToggleTodo}
    >
      <!--  <div slot="todo-item" let:todo let:handleCheck>
        {@const { id, completed, title } = todo}
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
          {title}
        </label>{title}
      </div>-->
    </TodoList>
  </div>
  {#if todos}
    <p>
      Number of todos: {#key todos.length}<span
          style:display="inline-block"
          in:fly|local={{ y: -10 }}>{todos.length}</span
        >{/key}
    </p>
  {/if}
{/if}

<button on:click={todoList.focusInput}>Focus Input</button>

<style>
</style>
