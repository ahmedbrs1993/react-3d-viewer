import React, { useMemo } from "react";
import { Mesh } from "@babylonjs/core";
import type { Part } from "@/types/Machine";
import { toCartItem } from "@/helpers/AddItem";
import { generatePartFromMesh } from "@/components/PartUtils";

interface PartSidebarProps {
  selectedMesh: Mesh | null;
  selectedPart: Part | null;
  toggleMeshVisibility: (mesh: Mesh) => void;
  addItem: (item: Omit<ReturnType<typeof toCartItem>, "quantity">) => void;
}

const PartSidebar: React.FC<PartSidebarProps> = ({
  selectedMesh,
  selectedPart,
  toggleMeshVisibility,
  addItem,
}) => {
  const part: Part | null = useMemo(() => {
    try {
      if (selectedPart) return selectedPart;
      return selectedMesh ? generatePartFromMesh(selectedMesh) : null;
    } catch (e) {
      console.error("Erreur dans generatePartFromMesh", e);
      return null;
    }
  }, [selectedMesh, selectedPart]);

  if (!part) {
    return (
      <aside
        className="text-sm italic text-gray-500 flex-shrink-0"
        style={{
          width: "300px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          border: "1px solid #ddd",
        }}
      >
        Aucun composant sélectionné
      </aside>
    );
  }

  return (
    <aside
      style={{
        width: "300px",
        maxHeight: "85vh",
        overflowY: "auto",
        background: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        border: "1px solid #ddd",
      }}
    >
      <h3 className="text-xl font-bold text-gray-900 mb-2">{part.name}</h3>
      <p className="text-sm text-gray-600 mb-1">Réf: {part.reference}</p>
      <p className="text-sm text-gray-700 mb-2">{part.description}</p>
      <p className="text-sm font-semibold text-gray-800 mb-4">
        Prix: {part.price} €
      </p>

      <button
        onClick={() => addItem(part)}
        className="w-full px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 text-sm mb-2"
      >
        Ajouter au panier
      </button>

      {selectedMesh && (
        <button
          onClick={() => toggleMeshVisibility(selectedMesh)}
          className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm"
        >
          {selectedMesh.isEnabled() ? "Masquer" : "Afficher"}
        </button>
      )}
    </aside>
  );
};

export default PartSidebar;
