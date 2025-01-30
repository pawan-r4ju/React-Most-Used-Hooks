export const taskReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK":
        return [...state, action.payload];
      case "TOGGLE_TASK":
        return state.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        );
      case "DELETE_TASK":
        return state.filter((task) => task.id !== action.id);
      default:
        return state;
    }
  };