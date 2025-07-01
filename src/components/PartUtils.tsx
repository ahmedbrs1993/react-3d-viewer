import { Mesh } from "@babylonjs/core";
import type { Part } from "@/types/Machine";

export function formatMeshName(raw: string): string {
  let cleaned = raw.replace(/<.*?>/g, "").trim();
  cleaned = cleaned.replace(/[_-]?primitive(\d+)/gi, " $1");
  const match = cleaned.match(/^([\d-]+)\s*(.*)$/);
  if (match) {
    const [, ref, name] = match;
    return `${ref} ${name.trim()}`;
  }
  return cleaned;
}

export function generatePartFromMesh(mesh: Mesh): Part {
  const randomCoord = () => Math.floor(Math.random() * 1000);
  const descriptions = [
    "Pièce haute performance pour usage industriel.",
    "Composant certifié pour usage prolongé.",
    "Élément robuste et fiable.",
    "Compatible avec systèmes modulaires.",
    "Optimisé pour maintenance rapide.",
  ];

  return {
    id: mesh.id,
    name: formatMeshName(mesh.name) || "Sans nom",
    reference: `REF-${Math.floor(Math.random() * 100000)}`,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    image: "/images/carrosserie.png",
    x: randomCoord(),
    y: randomCoord(),
    width: randomCoord(),
    height: randomCoord(),
    arrowX: randomCoord(),
    arrowY: randomCoord(),
    price: Math.floor(Math.random() * (500 - 50) + 50),
  };
}
