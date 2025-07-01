import { useEffect, useRef, useState } from "react";
import {
  Engine,
  ArcRotateCamera,
  HighlightLayer,
  Color4,
  Mesh,
  Scene,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { useCart } from "@/context/CartContext";
import { generatePartFromMesh, formatMeshName } from "@/components/PartUtils";
import type { Part } from "@/types/Machine";
import { ViewerOverlay } from "@/components/ViewerOverlay";
import { CLEAR_COLOR } from "@/constants/3D";
import PartSidebar from "@/components/PartSidebar";
import MeshList from "@/components/MeshList";
import {
  createCamera,
  createLight,
  setupPointerInteraction,
  loadModel,
  showEntireScene,
  makeOthersTransparent,
  resetTransparency,
  zoomToMesh,
} from "@/helpers/BabylonUtils";
import { AppendSceneAsync } from "@babylonjs/core/Loading/sceneLoader";

function MachineViewer3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cameraRef = useRef<ArcRotateCamera | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const hlRef = useRef<HighlightLayer | null>(null);
  const [selectedMesh, setSelectedMesh] = useState<Mesh | null>(null);
  const [meshList, setMeshList] = useState<Mesh[]>([]);
  const [hiddenMeshes, setHiddenMeshes] = useState<string[]>([]);
  const [menuVisible, setMenuVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const { addItem } = useCart();
  const meshItemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [selectionSource, setSelectionSource] = useState<
    "canvas" | "list" | null
  >(null);

  // Update selectedPart when a mesh is selected
  useEffect(() => {
    if (selectedMesh) {
      setSelectedPart(generatePartFromMesh(selectedMesh));
    }
  }, [selectedMesh]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !sceneRef.current) return;

    const url = URL.createObjectURL(file);
    setLoading(true);

    try {
      await AppendSceneAsync(url, sceneRef.current);
      const loadedMeshes = sceneRef.current.meshes.filter(
        (m): m is Mesh => m instanceof Mesh && m.name !== "__root__"
      );
      setMeshList(loadedMeshes);
      showEntireScene(loadedMeshes, cameraRef.current!);
    } catch (err) {
      console.error("Erreur lors du chargement du modèle :", err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  // Initialize BabylonJS scene and engine
  useEffect(() => {
    let engine: Engine | null = null;

    const initializeScene = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      engine = new Engine(canvas, true);
      const scene = new Scene(engine);
      scene.clearColor = Color4.FromHexString(CLEAR_COLOR);
      sceneRef.current = scene;

      const camera = createCamera(scene, canvas);
      cameraRef.current = camera;

      createLight(scene);

      const hl = new HighlightLayer("hl1", scene);
      hlRef.current = hl;

      setupPointerInteraction(scene, setSelectedMesh, hl, setSelectionSource);

      const meshes = await loadModel(scene, camera);
      setMeshList(meshes);
      showEntireScene(meshes, camera);

      setTimeout(() => setLoading(false), 500);

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener("resize", handleResize);
    };

    // Handle canvas resize on window resize
    const handleResize = () => {
      if (engine) {
        engine.resize();
      }
    };

    initializeScene().catch(console.error);

    return () => {
      window.removeEventListener("resize", handleResize);
      engine?.dispose();
    };
  }, []);

  // Toggle mesh visibility and update UI state
  const toggleMeshVisibility = (mesh: Mesh) => {
    mesh.setEnabled(!mesh.isEnabled());
    setHiddenMeshes((prev) =>
      mesh.isEnabled()
        ? prev.filter((name) => name !== mesh.name)
        : [...prev, mesh.name]
    );
    setSelectedMesh(null);
    hlRef.current?.removeAllMeshes();
  };

  // Scroll selected mesh into view if selected from canvas
  useEffect(() => {
    if (selectedMesh && selectionSource === "canvas") {
      const el = meshItemRefs.current[selectedMesh.name];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setSelectionSource(null);
      }
    }
  }, [selectedMesh, selectionSource]);

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <canvas ref={canvasRef} style={{ height: "100%", width: "100%" }} />

      <ViewerOverlay
        loading={loading}
        onReset={() =>
          cameraRef.current && showEntireScene(meshList, cameraRef.current)
        }
        onMenuToggle={() => setMenuVisible(true)}
        showMenuToggle={!menuVisible}
        onUpload={handleFileUpload}
      />

      {menuVisible && (
        <MeshList
          meshes={meshList}
          selectedMesh={selectedMesh}
          hiddenMeshes={hiddenMeshes}
          onSelect={(mesh) => {
            setSelectedMesh(mesh);
            setSelectionSource("list");
          }}
          onToggleVisibility={toggleMeshVisibility}
          onZoom={(mesh) =>
            cameraRef.current && zoomToMesh(mesh, cameraRef.current)
          }
          onFocusTemporary={(mesh) => makeOthersTransparent(meshList, mesh)}
          onResetTransparency={() => resetTransparency(meshList)}
          meshItemRefs={meshItemRefs}
          hlRef={hlRef}
          formatMeshName={formatMeshName}
          onCloseMenu={() => setMenuVisible(false)}
        />
      )}
      {selectedMesh && (
        <div style={{ position: "absolute", top: 10, right: 10, zIndex: 3 }}>
          <PartSidebar
            selectedMesh={selectedMesh}
            selectedPart={selectedPart}
            toggleMeshVisibility={toggleMeshVisibility}
            addItem={addItem}
          />
        </div>
      )}
    </div>
  );
}

export default MachineViewer3D;
