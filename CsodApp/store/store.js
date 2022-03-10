import { createStore, action, persist } from "easy-peasy";

export default createStore(
  persist({
    todos: ["Create store", "Wrap application", "Use store"],
    progress: 0,
    addTodo: action((state) => {
      state.todos.push("Progress");
    }),
    addProgress: action((state) => {
      state.progress += 1;
    }),
  })
);
