"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import type { Filter } from "@/types/todo";
import { toISO } from "@/lib/date";
import { useTodoStore } from "@/store/todoStore";
import { CheckCircleIcon, ClockIcon, InboxIcon, SunIcon } from "./Icons";

const items: { key: Filter; label: string; icon: ReactNode }[] = [
  { key: "all", label: "Barchasi", icon: <InboxIcon /> },
  { key: "today", label: "Bugun", icon: <SunIcon /> },
  { key: "active", label: "Jarayonda", icon: <ClockIcon /> },
  { key: "completed", label: "Bajarilgan", icon: <CheckCircleIcon /> },
];

const RADIUS = 34;
const CIRC = 2 * Math.PI * RADIUS;

export default function Sidebar() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);

  const { counts, done, total, pct } = useMemo(() => {
    const today = toISO(new Date());
    const total = todos.length;
    const done = todos.filter((t) => t.completed).length;
    return {
      total,
      done,
      pct: total === 0 ? 0 : Math.round((done / total) * 100),
      counts: {
        all: total,
        today: todos.filter((t) => t.dueDate === today && !t.completed).length,
        active: total - done,
        completed: done,
      } as Record<Filter, number>,
    };
  }, [todos]);

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__name">Vazifalar</span>
      </div>

      <nav className="nav" aria-label="Filtrlar">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`nav__item${filter === item.key ? " is-active" : ""}`}
            aria-current={filter === item.key ? "page" : undefined}
            onClick={() => setFilter(item.key)}
          >
            {item.icon}
            <span className="nav__label">{item.label}</span>
            <span className="nav__count">{counts[item.key]}</span>
          </button>
        ))}
      </nav>

      <div className="progress" role="group" aria-label="Umumiy jarayon">
        <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
          <circle cx="42" cy="42" r={RADIUS} className="progress__track" />
          <circle
            cx="42"
            cy="42"
            r={RADIUS}
            className="progress__bar"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - pct / 100)}
            transform="rotate(-90 42 42)"
          />
        </svg>
        <div className="progress__text">
          <strong>{pct}%</strong>
          <span>
            {done} / {total} bajarildi
          </span>
        </div>
      </div>
    </aside>
  );
}
