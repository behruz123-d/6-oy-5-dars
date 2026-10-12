"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Priority } from "@/types/todo";
import { useTodoStore } from "@/store/todoStore";
import { CalendarIcon, PlusIcon } from "./Icons";

const priorities: { key: Priority; label: string }[] = [
  { key: "low", label: "Past" },
  { key: "medium", label: "O'rta" },
  { key: "high", label: "Yuqori" },
];

export default function TodoForm() {
  const addTodo = useTodoStore((s) => s.addTodo);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, priority, dueDate: dueDate || null });
    setTitle("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <form className="composer" onSubmit={submit}>
      <input
        className="composer__title"
        type="text"
        placeholder="Yangi vazifa yozing…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Vazifa nomi"
        maxLength={140}
      />
      <div className="composer__row">
        <div className="segmented" role="radiogroup" aria-label="Muhimlik darajasi">
          {priorities.map((p) => (
            <button
              key={p.key}
              type="button"
              role="radio"
              aria-checked={priority === p.key}
              className={`segmented__item segmented__item--${p.key}${priority === p.key ? " is-on" : ""}`}
              onClick={() => setPriority(p.key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label className="date">
          <CalendarIcon />
          <span className="sr-only">Muddat</span>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>

        <button type="submit" className="btn btn--primary" disabled={!title.trim()}>
          <PlusIcon />
          Vazifa qo&apos;shish
        </button>
      </div>
    </form>
  );
}
