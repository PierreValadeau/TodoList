import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { Task } from "../styles/Task";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Task) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  title,
  tasks =[],
  deleteTask,
  updateTask,
}) => {
  return (
    <div style={{ flex: 1, margin: "10px" }}>
      <h3
        style={{
          textAlign: "center",
          padding: "10px 0",
          fontWeight: "bold",
          color: "black",
        }}
      >
        {title}
      </h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index} // Passer l'index pour Draggable
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
