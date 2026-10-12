"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Priority, Todo } from "@/types/todo";
import { formatShort, toISO } from "@/lib/date";
import { useTodoStore } from "@/store/todoStore";
import { CalendarIcon, CheckIcon, PencilIcon, TrashIcon } from "./Icons";

const priorityLabel: Record<Priority, string> = {
  low: "Past",
  medium: "O'rta",
  high: "Yuqori",
};

export default function TodoItem({ todo }: { todo: Todo }) {
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const removeTodo = useTodoStore((s) => s.removeTodo);
  const editTodo = useTodoStore((s) => s.editTodo);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const save = () => {
    const value = draft.trim();
    if (value && value !== todo.title) editTodo(todo.id, value);
    else setDraft(todo.title);
    setEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") {
      setDraft(todo.title);
      setEditing(false);
    }
  };

  const overdue = !!todo.dueDate && !todo.completed && todo.dueDate < toISO(new Date());

  return (
    <li className={`todo todo--${todo.priority}${todo.completed ? " is-done" : ""}`}>
      <button
        type="button"
        className="check"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={todo.completed ? "Bajarilmagan deb belgilash" : "Bajarildi deb belgilash"}
        onClick={() => toggleTodo(todo.id)}
      >
        <CheckIcon />
      </button>

      <div className="todo__body">
        {editing ? (
          <input
            ref={inputRef}
            className="todo__edit"
            value={draft}
            maxLength={140}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={onKeyDown}
            aria-label="Vazifani tahrirlash"
          />
        ) : (
          <span className="todo__title" onDoubleClick={() => setEditing(true)}>
            {todo.title}
          </span>
        )}

        <div className="todo__meta">
          <span className={`chip chip--${todo.priority}`}>{priorityLabel[todo.priority]}</span>
          {todo.dueDate && (
            <span className={`chip chip--date${overdue ? " is-overdue" : ""}`}>
              <CalendarIcon width={13} height={13} />
              {formatShort(todo.dueDate)}
              {overdue && " · muddati o'tgan"}
            </span>
          )}
        </div>
      </div>

      <div className="todo__actions">
        <button type="button" className="icon-btn" aria-label="Tahrirlash" onClick={() => setEditing(true)}>
          <PencilIcon />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--danger"
          aria-label="O'chirish"
          onClick={() => removeTodo(todo.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </li>
  );
}
