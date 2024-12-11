import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { Task } from "../styles/Task";

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
  
    // Crée une copie des tâches
    const updatedTasks = Array.from(tasks);
    
    // Retire la tâche déplacée
    const [movedTask] = updatedTasks.splice(source.index, 1);
  
    // Met à jour le statut de la tâche selon la colonne de destination
    movedTask.status = destination.droppableId as Task["status"];
  
    // Insère la tâche déplacée à sa nouvelle position
    updatedTasks.splice(destination.index, 0, movedTask);
  
    // Met à jour l'état des tâches
    setTasks(updatedTasks);
  };
  

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Math.random().toString(),
      title,
      description: "",
      status: "todo",
      priority: "medium",
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const getTasksByStatus = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", display: "flex",}}>
      <div>
      <button className="buttonAddTask" onClick={() => addTask("Nouvelle tâche")}>Ajouter une tâche</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="column">
          <TaskColumn
            title="À faire"
            tasks={getTasksByStatus("todo")}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
          <TaskColumn
            title="En cours"
            tasks={getTasksByStatus("in-progress")}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
          <TaskColumn
            title="Terminé"
            tasks={getTasksByStatus("done")}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
