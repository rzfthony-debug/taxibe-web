"use client";

import dynamic from "next/dynamic";

const LigneMap = dynamic(() => import("./LigneMap"), { ssr: false });

interface Stop {
  arret: string;
  lat: number | null;
  lng: number | null;
}

export default function LigneMapWrapper({ arrets, color }: { arrets: Stop[]; color: string }) {
  return <LigneMap arrets={arrets} color={color} />;
}
