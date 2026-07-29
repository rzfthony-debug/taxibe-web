"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LMap, Marker, DivIcon } from "leaflet";
import { saveArrets } from "@/app/gestion/actions";

type Dir = "aller" | "retour" | "unique";

interface ArretRow {
  key: string;
  arret: string;
  denomination: string;
  lat: number | null;
  lng: number | null;
}

interface Props {
  ligneId: string;
  allerArrets: Omit<ArretRow, "key">[];
  retourArrets: Omit<ArretRow, "key">[];
  isAllerRetour: boolean;
  color: string;
}

let keyCounter = 0;
const newKey = () => `k${++keyCounter}`;

function toRows(arrets: Omit<ArretRow, "key">[]): ArretRow[] {
  return arrets.map((a) => ({ ...a, key: newKey() }));
}

function MapEditor({
  arrets,
  selectedKey,
  color,
  onPlaceStop,
}: {
  arrets: ArretRow[];
  selectedKey: string | null;
  color: string;
  onPlaceStop: (lat: number, lng: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const markersRef = useRef<globalThis.Map<string, Marker>>(new globalThis.Map());
  const onPlaceRef = useRef(onPlaceStop);
  onPlaceRef.current = onPlaceStop;

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current, { zoomControl: true });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      // Default center: Antananarivo
      map.setView([-18.9137, 47.5361], 13);

      map.on("click", (e) => {
        onPlaceRef.current(e.latlng.lat, e.latlng.lng);
      });
    });
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync markers when arrets change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    import("leaflet").then((L) => {
      const existing = markersRef.current;
      const currentKeys = new Set(arrets.map((a) => a.key));

      // Remove deleted markers
      existing.forEach((marker: Marker, key: string) => {
        if (!currentKeys.has(key)) {
          marker.remove();
          existing.delete(key);
        }
      });

      const placed = arrets.filter((a) => a.lat != null && a.lng != null);

      arrets.forEach((a, i) => {
        if (a.lat == null || a.lng == null) return;
        const isSelected = a.key === selectedKey;
        const icon: DivIcon = L.divIcon({
          className: "",
          html: `<div style="
            width:26px;height:26px;border-radius:50%;
            background:${isSelected ? "#FFB800" : color};
            border:2.5px solid white;
            box-shadow:0 2px 6px rgba(0,0,0,0.35);
            display:flex;align-items:center;justify-content:center;
            font-size:10px;font-weight:900;color:white;
          ">${i + 1}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });

        const existing = markersRef.current.get(a.key);
        if (existing) {
          existing.setLatLng([a.lat, a.lng]);
          existing.setIcon(icon);
        } else {
          const m = L.marker([a.lat, a.lng], { icon, draggable: true }).addTo(map);
          m.bindPopup(`<b>${a.arret || "Arrêt " + (i + 1)}</b>`);
          markersRef.current.set(a.key, m);
        }
      });

      // Fit bounds if placed stops exist and map hasn't been moved much
      if (placed.length >= 2 && placed.every((a) => a.lat != null)) {
        const coords = placed.map((a) => [a.lat!, a.lng!] as [number, number]);
        try { map.fitBounds(coords, { padding: [24, 24], maxZoom: 15 }); } catch {}
      }
    });
  }, [arrets, selectedKey, color]);

  return (
    <div
      ref={containerRef}
      style={{ height: "100%", minHeight: 420, borderRadius: 12, overflow: "hidden", border: "1px solid #E2E8F0" }}
    />
  );
}

export default function ArretEditor({ ligneId, allerArrets, retourArrets, isAllerRetour, color }: Props) {
  const [dir, setDir] = useState<Dir>(isAllerRetour ? "aller" : "unique");
  const [allerRows, setAllerRows] = useState<ArretRow[]>(() => toRows(allerArrets));
  const [retourRows, setRetourRows] = useState<ArretRow[]>(() => toRows(retourArrets));
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const rows = dir === "retour" ? retourRows : allerRows;
  const setRows = dir === "retour" ? setRetourRows : setAllerRows;

  const update = (key: string, patch: Partial<ArretRow>) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const addRow = () => {
    const row: ArretRow = { key: newKey(), arret: "", denomination: "", lat: null, lng: null };
    setRows((prev) => [...prev, row]);
    setSelectedKey(row.key);
  };

  const removeRow = (key: string) => {
    setRows((prev) => prev.filter((r) => r.key !== key));
    if (selectedKey === key) setSelectedKey(null);
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    setRows((prev) => { const a = [...prev]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; });
  };

  const moveDown = (i: number) => {
    setRows((prev) => {
      if (i >= prev.length - 1) return prev;
      const a = [...prev]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a;
    });
  };

  const handlePlaceStop = (lat: number, lng: number) => {
    if (!selectedKey) return;
    update(selectedKey, { lat: parseFloat(lat.toFixed(6)), lng: parseFloat(lng.toFixed(6)) });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveArrets(
        ligneId,
        dir,
        rows.map((r, i) => ({
          arret: r.arret.trim() || `Arrêt ${i + 1}`,
          denomination: r.denomination.trim() || null,
          lat: r.lat,
          lng: r.lng,
        }))
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <style>{`
        .ae-tab { padding: 7px 18px; border-radius: 8px; border: 1px solid #E2E8F0; background: white; font-size: 0.82rem; font-weight: 600; color: #64748B; cursor: pointer; }
        .ae-tab.active { background: #0D1525; color: white; border-color: #0D1525; }
        .ae-row { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-radius: 8px; border: 1.5px solid #E2E8F0; cursor: pointer; transition: border-color 0.12s; }
        .ae-row:hover { border-color: #CBD5E0; }
        .ae-row.selected { border-color: #FFB800; background: #FFFBF0; }
        .ae-row input { border: none; background: transparent; padding: 2px 4px; font-size: 0.83rem; font-weight: 600; color: #0D1525; outline: none; width: 100%; }
        .ae-row input::placeholder { color: #CBD5E0; }
        .ae-row input.denom { font-weight: 400; font-size: 0.75rem; color: #94A3B8; }
        .ae-btn-icon { width: 26px; height: 26px; border: 1px solid #E2E8F0; background: white; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748B; font-size: 0.75rem; flex-shrink: 0; }
        .ae-btn-icon:hover { background: #F1F5F9; }
        .ae-pos { width: 22px; height: 22px; border-radius: 50%; background: #0D1525; color: white; font-size: 0.65rem; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .ae-coords { font-size: 0.62rem; color: #94A3B8; white-space: nowrap; flex-shrink: 0; }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {isAllerRetour ? (
            <>
              <button className={`ae-tab${dir === "aller" ? " active" : ""}`} onClick={() => { setDir("aller"); setSelectedKey(null); }}>
                Aller ({allerRows.length})
              </button>
              <button className={`ae-tab${dir === "retour" ? " active" : ""}`} onClick={() => { setDir("retour"); setSelectedKey(null); }}>
                Retour ({retourRows.length})
              </button>
            </>
          ) : (
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0D1525" }}>Arrêts ({rows.length})</span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-yellow"
          style={{ padding: "8px 18px", fontSize: "0.82rem" }}
        >
          {saving ? "Enregistrement…" : saved ? "✓ Enregistré" : "Enregistrer"}
        </button>
      </div>

      {selectedKey && (
        <p style={{ fontSize: "0.75rem", color: "#64748B", background: "#F8F9FB", border: "1px solid #E8ECF0", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
          Cliquez sur la carte pour positionner l&apos;arrêt sélectionné.
        </p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>

        {/* Liste arrêts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 480, overflowY: "auto", paddingRight: 4 }}>
          {rows.map((row, i) => (
            <div
              key={row.key}
              className={`ae-row${selectedKey === row.key ? " selected" : ""}`}
              onClick={() => setSelectedKey(row.key)}
            >
              <div className="ae-pos">{i + 1}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <input
                  className="ae-row input"
                  value={row.arret}
                  placeholder={`Arrêt ${i + 1}`}
                  onChange={(e) => update(row.key, { arret: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                />
                <input
                  className="ae-row input denom"
                  value={row.denomination}
                  placeholder="Dénomination (optionnel)"
                  onChange={(e) => update(row.key, { denomination: e.target.value })}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {row.lat != null ? (
                <span className="ae-coords">{row.lat.toFixed(4)}, {row.lng!.toFixed(4)}</span>
              ) : (
                <span className="ae-coords" style={{ color: "#CBD5E0" }}>—</span>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button className="ae-btn-icon" onClick={(e) => { e.stopPropagation(); moveUp(i); }} title="Monter">▲</button>
                <button className="ae-btn-icon" onClick={(e) => { e.stopPropagation(); moveDown(i); }} title="Descendre">▼</button>
              </div>
              <button
                className="ae-btn-icon"
                style={{ color: "#EF4444" }}
                onClick={(e) => { e.stopPropagation(); removeRow(row.key); }}
                title="Supprimer"
              >✕</button>
            </div>
          ))}

          <button
            onClick={addRow}
            style={{
              padding: "9px", borderRadius: 8, border: "1.5px dashed #CBD5E0",
              background: "white", color: "#64748B", fontSize: "0.82rem",
              fontWeight: 600, cursor: "pointer", marginTop: 4,
            }}
          >
            + Ajouter un arrêt
          </button>
        </div>

        {/* Carte */}
        <MapEditor
          arrets={rows}
          selectedKey={selectedKey}
          color={color}
          onPlaceStop={handlePlaceStop}
        />
      </div>
    </div>
  );
}
