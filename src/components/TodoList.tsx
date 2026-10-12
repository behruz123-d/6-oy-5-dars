"use client";

import { useMemo } from "react";
import type { Filter } from "@/types/todo";
import { toISO } from "@/lib/date";
import { useTodoStore } from "@/store/todoStore";
import TodoItem from "./TodoItem";

const titles: Record<Filter, string> = {
  all: "Barcha vazifalar",
  today: "Bugungi vazifalar",
  active: "Jarayondagi vazifalar",
  completed: "Bajarilgan vazifalar",
};

const emptyText: Record<Filter, string> = {
  all: "Hali vazifa yo'q. Yuqoridagi maydonga birinchisini yozing.",
  today: "Bugunga muddat qo'yilgan vazifa yo'q.",
  active: "Hamma ish bajarilgan.",
  completed: "Hali hech narsa bajarilmagan.",
};

export default function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const query = useTodoStore((s) => s.query);
  const clearCompleted = useTodoStore((s) => s.clearCompleted);

  const visible = useMemo(() => {
    const today = toISO(new Date());
    const q = query.trim().toLowerCase();
    return todos
      .filter((t) => {
        if (filter === "today") return t.dueDate === today && !t.completed;
        if (filter === "active") return !t.completed;
        if (filter === "completed") return t.completed;
        return true;
      })
      .filter((t) => (q ? t.title.toLowerCase().includes(q) : true))
      .sort((a, b) => Number(a.completed) - Number(b.completed) || b.createdAt - a.createdAt);
  }, [todos, filter, query]);

  const hasCompleted = todos.some((t) => t.completed);

  return (
    <section className="list" aria-labelledby="list-title">
      <div className="list__head">
        <h2 id="list-title">{titles[filter]}</h2>
        {hasCompleted && (
          <button type="button" className="btn btn--ghost" onClick={clearCompleted}>
            Bajarilganlarni tozalash
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="empty">{query ? `“${query}” bo'yicha hech narsa topilmadi.` : emptyText[filter]}</p>
      ) : (
        <ul className="list__items">
          {visible.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </section>
  );
}
