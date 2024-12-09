import React, { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { Task } from "../styles/Task";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
}

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

    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      const updatedTasks = Array.from(tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId as Task["status"];
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks(updatedTasks);
    }
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

  const getTasksByStatus = (status: Task["status"]) => tasks.filter((task) => task.status === status);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={() => addTask("Nouvelle tâche")}>Ajouter une tâche</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {["todo", "in-progress", "done"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} style={{ margin: "10px" }}>
                  <TaskColumn
                    title={status === "todo" ? "À faire" : status === "in-progress" ? "En cours" : "Terminé"}
                    tasks={getTasksByStatus(status as Task["status"])}
                    deleteTask={deleteTask}
                    updateTask={updateTask} // Ajoute updateTask ici
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
