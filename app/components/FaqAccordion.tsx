"use client";
import { useState } from "react";

type Question = { q: string; r: string };
type Section = { theme: string; questions: Question[] };

export default function FaqAccordion({ sections }: { sections: Section[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {sections.map((section) => (
        <div
          key={section.theme}
          style={{
            background: "white",
            borderRadius: 14,
            border: "1px solid #E8ECF0",
            boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 28px",
              borderBottom: "1px solid #F1F5F9",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 16,
                background: "#FFB800",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <h2
              style={{
                margin: 0,
                fontSize: "0.78rem",
                fontWeight: 800,
                color: "#0D1525",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {section.theme}
            </h2>
          </div>

          <div style={{ padding: "0 28px" }}>
            {section.questions.map((item, i) => {
              const key = `${section.theme}-${i}`;
              const isOpen = openKey === key;
              const isLast = i === section.questions.length - 1;
              return (
                <div
                  key={key}
                  style={{ borderBottom: isLast ? "none" : "1px solid #F1F5F9" }}
                >
                  <button
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "20px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: isOpen ? "#FFB800" : "#0D1525",
                      transition: "color 0.15s ease",
                    }}
                  >
                    <span>{item.q}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFB800"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        flexShrink: 0,
                        transition: "transform 0.22s ease",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen && (
                    <p
                      style={{
                        margin: "0 0 20px",
                        fontSize: "0.875rem",
                        color: "#64748B",
                        lineHeight: 1.8,
                      }}
                    >
                      {item.r}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
