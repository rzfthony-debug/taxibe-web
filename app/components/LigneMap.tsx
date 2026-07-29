"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Map } from "leaflet";

interface Stop {
  arret: string;
  lat: number | null;
  lng: number | null;
}

interface LigneMapProps {
  arrets: Stop[];
  color: string;
}

export default function LigneMap({ arrets, color }: LigneMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const valid = arrets.filter(
      (a): a is Stop & { lat: number; lng: number } => a.lat != null && a.lng != null
    );
    if (valid.length < 2) return;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, { zoomControl: true });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const coords: [number, number][] = valid.map((a) => [a.lat, a.lng]);

      L.polyline(coords, { color, weight: 5, opacity: 0.85 }).addTo(map);

      valid.forEach((stop, i) => {
        const isFirst = i === 0;
        const isLast = i === valid.length - 1;
        const isTerm = isFirst || isLast;

        L.circleMarker([stop.lat, stop.lng], {
          radius: isTerm ? 9 : 5,
          fillColor: isFirst ? "#22c55e" : isLast ? "#FFB800" : "white",
          color: isTerm ? "white" : color,
          weight: 2.5,
          fillOpacity: 1,
        })
          .bindPopup(`<b style="font-size:13px">${stop.arret}</b>`)
          .addTo(map);
      });

      map.fitBounds(coords, { padding: [24, 24] });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={containerRef}
      style={{
        height: 340,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #E8ECF0",
        background: "#F1F5F9",
      }}
    />
  );
}
