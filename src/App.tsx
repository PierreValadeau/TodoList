import React from "react";
import TaskBoard from "./components/TaskBoard";

const App: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Gestionnaire de Tâches</h1>
      <TaskBoard />
    </div>
  );
};

export default App;
