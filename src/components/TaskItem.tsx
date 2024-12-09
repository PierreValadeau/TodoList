import React, { useState } from "react";
import { Task } from "../styles/Task";

interface TaskItemProps {
  task: Task;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleSave = () => {
    // Met à jour la tâche avec les nouvelles valeurs
    updateTask(task.id, {
      ...task,
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: task.priority === "high" ? "#ffe4e1" : "#f8f8f8",
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
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            Supprimer
          </button>
          <button onClick={() => setIsEditing(true)}>Modifier</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
