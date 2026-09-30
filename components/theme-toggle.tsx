"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function resolvedTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle() {
  const [label, setLabel] = useState("Toggle color theme");

  useEffect(() => {
    const sync = () => {
      setLabel(resolvedTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };
    sync();
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function toggle() {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setLabel(next === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="icon-sun size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="icon-moon size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.5 13.5A6.5 6.5 0 0 1 10 4.2 7 7 0 1 0 19.8 14a6.5 6.5 0 0 1-3.3-.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
