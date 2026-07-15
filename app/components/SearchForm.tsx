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
      display: "flex", gap: 0, width: "100%",
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
          flex: 1, padding: "14px 16px",
          border: "none", outline: "none",
          fontSize: "0.95rem", fontWeight: 500,
          fontFamily: "var(--font-inter), system-ui",
          color: "#0D1525", minWidth: 0,
          background: "transparent",
        }}
      />
      <button
        type="submit"
        className="search-btn"
        style={{
          flexShrink: 0, padding: "14px 20px",
          background: "#FFB800", border: "none", cursor: "pointer",
          fontWeight: 800, fontSize: "0.875rem", color: "#0D1525",
          fontFamily: "var(--font-inter), system-ui",
          display: "flex", alignItems: "center", gap: 6,
          transition: "background 0.15s", whiteSpace: "nowrap",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Chercher
      </button>
    </form>
  );
}
