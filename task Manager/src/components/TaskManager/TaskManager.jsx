import React, { useState, useEffect, useReducer, useRef, useContext, useMemo, useCallback } from "react";
import { taskReducer } from "../../reducers/taskReducer";
import { ThemeContext } from "../../context/ThemeContext";
import TaskItem from "../Tasks/TaskItem";
import "./TaskManager.css";

const TaskManager = () => {
  const [newTask, setNewTask] = useState("");
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const inputRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const activeTasksCount = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const handleToggle = useCallback((id) => dispatch({ type: "TOGGLE_TASK", id }), [dispatch]);
  const handleDelete = useCallback((id) => dispatch({ type: "DELETE_TASK", id }), [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    dispatch({ type: "ADD_TASK", payload: { id: Date.now(), title: newTask, completed: false } });
    setNewTask("");
    inputRef.current.focus();
  };

  return (
    <div className={`task-manager ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme ({theme})</button>
      <h2>Active Tasks: {activeTasksCount}</h2>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add new task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;