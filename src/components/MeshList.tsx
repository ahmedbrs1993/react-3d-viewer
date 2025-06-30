import React from "react";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Color3, HighlightLayer } from "@babylonjs/core";
import { ZoomIn } from "lucide-react";

interface MeshListProps {
  meshes: Mesh[];
  selectedMesh: Mesh | null;
  hiddenMeshes: string[];
  onSelect: (mesh: Mesh) => void;
  onToggleVisibility: (mesh: Mesh) => void;
  onZoom: (mesh: Mesh) => void;
  onFocusTemporary: (mesh: Mesh) => void;
  onResetTransparency: () => void;
  meshItemRefs: React.MutableRefObject<Record<string, HTMLLIElement | null>>;
  hlRef: React.MutableRefObject<HighlightLayer | null>;
  formatMeshName: (raw: string) => string;
  onCloseMenu: () => void;
}

const MeshList: React.FC<MeshListProps> = ({
  meshes,
  selectedMesh,
  hiddenMeshes,
  onSelect,
  onToggleVisibility,
  onZoom,
  onFocusTemporary,
  onResetTransparency,
  meshItemRefs,
  hlRef,
  formatMeshName,
  onCloseMenu,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        width: "20%",
        maxHeight: "95%",
        overflowY: "auto",
        background: "#f5f5f5",
        padding: "10px",
        zIndex: 3,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Meshes</h3>
        <button
          onClick={onCloseMenu}
          style={{
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
          title="Fermer"
        >
          ✕
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
        {meshes.map((mesh) => (
          <li
            key={mesh.name}
            ref={(el) => {
              meshItemRefs.current[mesh.name] = el;
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor:
                selectedMesh?.name === mesh.name ? "#ccc" : "transparent",
              padding: "4px 0",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              onSelect(mesh);
              hlRef.current?.removeAllMeshes();
              hlRef.current?.addMesh(mesh, Color3.Red());
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: "0.9em",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formatMeshName(mesh.name)}
            </span>
            <input
              type="checkbox"
              checked={!hiddenMeshes.includes(mesh.name)}
              onChange={(e) => {
                e.stopPropagation();
                onToggleVisibility(mesh);
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onZoom(mesh);
              }}
              title="Zoom"
              style={{
                marginLeft: "5px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ZoomIn size={16} />
            </button>
            <button
              onMouseDown={(e) => {
                e.stopPropagation();
                onSelect(mesh);
                onFocusTemporary(mesh);
                hlRef.current?.removeAllMeshes();
                hlRef.current?.addMesh(mesh, Color3.Red());
              }}
              onMouseUp={(e) => {
                e.stopPropagation();
                onResetTransparency();
                hlRef.current?.removeAllMeshes();
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                onResetTransparency();
                hlRef.current?.removeAllMeshes();
              }}
              title="Focus temporaire (maintenir)"
              style={{ marginLeft: "5px", color: "red" }}
            >
              🔴
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeshList;
