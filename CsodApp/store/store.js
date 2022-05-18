import {createStore, action, persist} from "easy-peasy";

export default createStore(
    persist({
        /* DEPRECATED */
        todos: ["Create store", "Wrap application", "Use store"],
        progress: 0,
        addTodo: action((state) => {
            state.todos.push("Progress");
        }),
        addProgress: action((state) => {
            state.progress += 1;
        }),
        /* DEPRECATED */

        exercises: [],
        setExercises: action((state, exercises) => {
            state.exercises = exercises;
            state.exercises.map(exercise => exercise.store = 'store');
        }),
        currentlyViewedExercise: 0,
        setCurrentlyViewedExercise: action((state, exercise) => {
            state.currentlyViewedExercise = exercise;
        }),
    })
);
