import React from "react";

type Props = {
  loading: boolean;
  onReset: () => void;
  onMenuToggle: () => void;
  showMenuToggle: boolean;
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
}: Props) {
  return (
    <>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingText}>Chargement en cours...</div>
        </div>
      )}

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
