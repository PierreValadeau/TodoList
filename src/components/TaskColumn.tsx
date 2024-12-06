import React from "react";
import { Task } from "../styles/Task";
import TaskItem from "./TaskItem";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks }) => {
  return (
    <div style={{ width: "300px", margin: "10px" }}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
