import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Filter, Priority, Todo } from "@/types/todo";
import { addDays, toISO } from "@/lib/date";

export interface NewTodo {
  title: string;
  priority: Priority;
  dueDate: string | null;
}

interface TodoState {
  todos: Todo[];
  filter: Filter;
  query: string;
  addTodo: (input: NewTodo) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, title: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: Filter) => void;
  setQuery: (query: string) => void;
}

const makeId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const now = new Date();
const seed: Todo[] = [
  {
    id: "seed-1",
    title: "Haftalik hisobotni tayyorlash",
    completed: false,
    priority: "high",
    dueDate: toISO(now),
    createdAt: Date.now() - 3000,
  },
  {
    id: "seed-2",
    title: "Mijoz bilan uchrashuv vaqtini kelishish",
    completed: false,
    priority: "medium",
    dueDate: toISO(addDays(now, 1)),
    createdAt: Date.now() - 2000,
  },
  {
    id: "seed-3",
    title: "Jamoa uchun yangi vazifalarni taqsimlash",
    completed: true,
    priority: "low",
    dueDate: null,
    createdAt: Date.now() - 1000,
  },
];

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: seed,
      filter: "all",
      query: "",
      addTodo: ({ title, priority, dueDate }) =>
        set((s) => ({
          todos: [
            { id: makeId(), title: title.trim(), completed: false, priority, dueDate, createdAt: Date.now() },
            ...s.todos,
          ],
        })),
      toggleTodo: (id) =>
        set((s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)) })),
      removeTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
      editTodo: (id, title) =>
        set((s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, title: title.trim() } : t)) })),
      clearCompleted: () => set((s) => ({ todos: s.todos.filter((t) => !t.completed) })),
      setFilter: (filter) => set({ filter }),
      setQuery: (query) => set({ query }),
    }),
    {
      name: "ofis-todos-v1",
      partialize: (s) => ({ todos: s.todos }),
    }
  )
);
