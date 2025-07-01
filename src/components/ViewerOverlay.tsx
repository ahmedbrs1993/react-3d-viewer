import React from "react";

type Props = {
  loading: boolean;
  onReset: () => void;
  onMenuToggle: () => void;
  showMenuToggle: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const styles: { [key: string]: React.CSSProperties } = {
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgba(255,255,255,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingText: {
    fontSize: "24px",
    color: "#333",
  },
  resetButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 3,
    padding: "10px 15px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
  },
  menuToggle: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 3,
    padding: "10px",
    fontSize: "24px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

export function ViewerOverlay({
  loading,
  onReset,
  onMenuToggle,
  showMenuToggle,
  onUpload,
}: Props) {
  return (
    <>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingText}>Chargement en cours...</div>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 10,
          zIndex: 4,
        }}
      >
        <input
          id="file-upload"
          type="file"
          accept=".gltf,.glb"
          onChange={onUpload}
          style={{ display: "none" }}
        />
        <label
          htmlFor="file-upload"
          style={{
            display: "inline-block",
            background: "#fff",
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Choisir un nouveau fichier
        </label>
        <div
          style={{
            textAlign: "end",
            fontSize: "12px",
            marginRight: 8,
            color: "#666",
            marginTop: "4px",
          }}
        >
          Formats acceptés : .gltf, .glb
        </div>
      </div>
      <button style={styles.resetButton} onClick={onReset}>
        Reset Camera
      </button>

      {!showMenuToggle && (
        <button onClick={onMenuToggle} style={styles.menuToggle}>
          ☰
        </button>
      )}
    </>
  );
}
