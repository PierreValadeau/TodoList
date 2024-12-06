import React from "react";
import { Task } from "../styles/Task";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: task.priority === "high" ? "#ffe4e1" : "#f8f8f8",
      }}
    >
      <h4>{task.title}</h4>
      <p>{task.description || "Pas de description"}</p>
      <p>
        <strong>Priorité :</strong> {task.priority}
      </p>
    </div>
  );
};

export default TaskItem;
