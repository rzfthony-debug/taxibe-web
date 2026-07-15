"use client";

import { useState, useRef } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/recherche?q=${encodeURIComponent(query.trim())}`;
    }
  }

  return (
    <form onSubmit={handleSearch} style={{
      display: "flex", gap: 0, maxWidth: 480, margin: "0 0 0 0",
      background: "white", borderRadius: 12, overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
    }}>
      <input
        ref={inputRef}
        className="search-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Numéro de ligne — ex : 147"
        style={{
          flex: 1, padding: "16px 20px",
          border: "none", outline: "none",
          fontSize: "1rem", fontWeight: 500,
          fontFamily: "var(--font-inter), system-ui",
          color: "#0D1525", minWidth: 0,
          background: "transparent",
        }}
      />
      <button
        type="submit"
        className="search-btn"
        style={{
          flexShrink: 0, padding: "16px 24px",
          background: "#FFB800", border: "none", cursor: "pointer",
          fontWeight: 800, fontSize: "0.875rem", color: "#0D1525",
          fontFamily: "var(--font-inter), system-ui",
          display: "flex", alignItems: "center", gap: 8,
          transition: "background 0.15s",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Chercher
      </button>
    </form>
  );
}
