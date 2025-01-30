import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import TaskManager from "./components/TaskManager/TaskManager";
import "./styles/theme.css";

const App = () => {
  return (
    <ThemeProvider>
      <TaskManager />
    </ThemeProvider>
  );
};
export default App;