"use client";

import { useState, useTransition } from "react";
import { saveParam } from "@/app/gestion/actions";

export default function ParamTextInput({
  cle,
  label,
  description,
  placeholder,
  type = "text",
  currentValue,
}: {
  cle: string;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
  currentValue: string | null;
}) {
  const [value, setValue] = useState(currentValue ?? "");
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("cle", cle);
    fd.append("valeur", value);
    startTransition(async () => {
      await saveParam(fd);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 12, padding: "16px 18px" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#374151", marginBottom: 6 }}>
        {label}
        {description && (
          <span style={{ display: "block", fontSize: "0.72rem", fontWeight: 400, color: "#94A3B8", marginTop: 2, lineHeight: 1.5 }}>
            {description}
          </span>
        )}
      </label>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          type={type}
          value={value}
          onChange={(e) => { setValue(e.target.value); setSaved(false); }}
          placeholder={placeholder}
          style={{
            flex: 1, padding: "9px 12px",
            border: "1.5px solid #E2E8F0", borderRadius: 8,
            fontSize: "0.84rem", fontFamily: "inherit",
            color: "#0D1525", outline: "none", boxSizing: "border-box",
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "9px 18px", border: "none", borderRadius: 8,
            fontWeight: 800, fontSize: "0.82rem", cursor: "pointer",
            fontFamily: "inherit", flexShrink: 0, whiteSpace: "nowrap",
            background: saved ? "#22c55e" : "#FFB800",
            color: saved ? "white" : "#0D1525",
            transition: "background 0.2s",
          }}
        >
          {isPending ? "…" : saved ? "Enregistré ✓" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}
