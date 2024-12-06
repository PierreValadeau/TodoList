import React, { useState } from "react";
import { Task } from "../styles/Task";
import TaskColumn from "./TaskColumn";

const TaskBoard: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Apprendre TypeScript",
      description: "Se familiariser avec la syntaxe et les concepts",
      status: "todo",
      priority: "high",
    },
    {
      id: "2",
      title: "Créer une application React",
      description: "Utiliser TypeScript et React pour construire un projet",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "3",
      title: "Réviser le Kanban",
      description: "Améliorer les fonctionnalités de drag-and-drop",
      status: "done",
      priority: "low",
    },
  ]);

  const getTasksByStatus = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

  return (
    <div style={{ display: "flex", justifyContent: "space-around", color: "black" }}>
      <TaskColumn title="À faire" tasks={getTasksByStatus("todo")} />
      <TaskColumn title="En cours" tasks={getTasksByStatus("in-progress")} />
      <TaskColumn title="Terminé" tasks={getTasksByStatus("done")} />
    </div>
  );
};

export default TaskBoard;
