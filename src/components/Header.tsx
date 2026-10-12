"use client";

import { formatLong, greeting } from "@/lib/date";
import { useTodoStore } from "@/store/todoStore";
import { SearchIcon } from "./Icons";

export default function Header() {
  const query = useTodoStore((s) => s.query);
  const setQuery = useTodoStore((s) => s.setQuery);
  const now = new Date();

  return (
    <header className="header">
      <div>
        <p className="header__date">{formatLong(now)}</p>
        <h1 className="header__title">{greeting(now)}, bugungi ishlar</h1>
      </div>
      <label className="search">
        <SearchIcon />
        <span className="sr-only">Vazifalarni qidirish</span>
        <input
          type="search"
          placeholder="Vazifa qidirish"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
    </header>
  );
}
