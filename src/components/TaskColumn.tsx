import React from "react";
import { Task } from "../styles/Task";
import TaskItem from "./TaskItem";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Task) => void;  // Ajoute cette ligne
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, deleteTask, updateTask }) => {
  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
      ))}
    </div>
  );
};

export default TaskColumn;
