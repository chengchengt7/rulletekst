"use client";

import { useRef, useState, type ReactNode } from "react";

export default function HeaderNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  return (
    <div className="header-nav" onKeyDown={event => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    }}>
      <button ref={button} type="button" className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open} aria-controls="header-navigation"
        onClick={() => setOpen(!open)}>
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <nav id="header-navigation" className={open ? "is-open" : undefined}
        onClick={event => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
        {children}
      </nav>
    </div>
  );
}
