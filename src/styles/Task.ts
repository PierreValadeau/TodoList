export interface Task {
  id: string;       // Identifiant unique
  title: string;    // Titre de la tâche
  description?: string; // Description (optionnelle)
  status: "todo" | "in-progress" | "done"; // Statut de la tâche
  priority: "low" | "medium" | "high"; // Priorité
}
