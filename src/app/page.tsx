"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Page() {
  // persist localStorage'dan o'qigani uchun hydration mosligini ta'minlaymiz
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  if (!ready) return <div className="app app--loading" aria-busy="true" />;

  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Header />
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}
