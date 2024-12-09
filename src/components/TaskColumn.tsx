import React from "react";
import { Task } from "../styles/Task";
import TaskItem from "./TaskItem";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  deleteTask: (id: string) => void; // La fonction deleteTask doit être passée comme prop
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, deleteTask }) => {
  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />  
      ))}
    </div>
  );
};


export default TaskColumn;
