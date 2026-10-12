export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "today" | "active" | "completed";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string | null; // YYYY-MM-DD
  createdAt: number;
}
