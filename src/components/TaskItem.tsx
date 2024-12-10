import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../styles/Task";

interface TaskItemProps {
  task: Task;
  index: number; // On ajoute l'index comme prop
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    updateTask(task.id, {
      ...task,
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            backgroundColor: task.priority === "high" ? "#ffe4e1" : "#f8f8f8",
            marginBottom: "10px",
          }}
        >
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <button onClick={handleSave}>Enregistrer</button>
            </div>
          ) : (
            <div>
              <h4>{task.title}</h4>
              <p>{task.description || "Pas de description"}</p>
              <p>
                <strong>Priorité :</strong> {task.priority}
              </p>
              <div className="buttons">
              <button onClick={() => deleteTask(task.id)}>Supprimer</button>
              <button onClick={() => setIsEditing(true)}>Modifier</button>

              </div>
             
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItem;
