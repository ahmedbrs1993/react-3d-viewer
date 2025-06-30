import * as THREE from "three";

export interface MeshNode {
  mesh: THREE.Mesh;
  children: MeshNode[];
}

type Props = {
  meshTree: MeshNode[];
  selectedMeshId: string;
  onMeshSelected: (mesh: THREE.Mesh) => void;
};

const MeshNavigator = ({ meshTree, selectedMeshId, onMeshSelected }: Props) => {
  return (
    <div style={{ width: 300, overflowY: "auto", backgroundColor: "#f0f0f0" }}>
      <ul>
        {meshTree.map((node) => (
          <li
            key={node.mesh.uuid}
            style={{
              cursor: "pointer",
              padding: 8,
              backgroundColor:
                selectedMeshId === node.mesh.uuid ? "#ddd" : "transparent",
            }}
            onClick={() => onMeshSelected(node.mesh)}
          >
            {node.mesh.name || "Unnamed Mesh"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeshNavigator;
