import {
  ArcRotateCamera,
  Vector3,
  Scene,
  HemisphericLight,
  Color3,
  FramingBehavior,
  Mesh,
  HighlightLayer,
  Material,
} from "@babylonjs/core";
import { AppendSceneAsync } from "@babylonjs/core/Loading/sceneLoader";
import { CAMERA_RADIUS_LIMIT, LIGHT_INTENSITY } from "@/constants/3D";

export const getFraming = (camera: ArcRotateCamera) =>
  camera.getBehaviorByName("Framing") as FramingBehavior | null;

export const createCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  const camera = new ArcRotateCamera(
    "Camera",
    Math.PI / 2,
    Math.PI / 4,
    10,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  camera.lowerRadiusLimit = 0;
  camera.upperRadiusLimit = CAMERA_RADIUS_LIMIT;

  camera.useFramingBehavior = true;
  const framing = getFraming(camera);
  if (framing) {
    framing.framingTime = 0;
    framing.elevationReturnTime = -1;
  }

  return camera;
};

export const createLight = (scene: Scene) => {
  const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
  light.intensity = LIGHT_INTENSITY;
  light.diffuse = new Color3(1, 1, 1);
  light.specular = new Color3(1, 1, 1);
  light.groundColor = new Color3(0.5, 0.5, 0.5);
};

export const showEntireScene = (meshes: Mesh[], camera: ArcRotateCamera) => {
  if (!meshes.length || !camera) return;

  const bounds = meshes.reduce((acc, mesh) => {
    const b = mesh.getHierarchyBoundingVectors();
    return acc
      ? {
          min: Vector3.Minimize(acc.min, b.min),
          max: Vector3.Maximize(acc.max, b.max),
        }
      : b;
  }, null as { min: Vector3; max: Vector3 } | null);

  if (bounds) {
    const sizeVec = bounds.max.subtract(bounds.min);
    const radius = sizeVec.length() / 2;
    camera.radius = radius * 2;
    camera.target = bounds.min.add(bounds.max).scale(0.5);
  }
};

export const zoomToMesh = (mesh: Mesh, camera: ArcRotateCamera) => {
  const bounds = mesh.getHierarchyBoundingVectors();
  const sizeVec = bounds.max.subtract(bounds.min);
  camera.radius = sizeVec.length() * 1.5;
  camera.target = bounds.min.add(bounds.max).scale(0.5);
};

export const makeOthersTransparent = (meshList: Mesh[], target: Mesh) => {
  meshList.forEach((mesh) => {
    if (!mesh.material) return;
    if (mesh === target) {
      mesh.material.alpha = 1;
      mesh.material.transparencyMode = Material.MATERIAL_OPAQUE;
      mesh.material.needDepthPrePass = false;
    } else {
      mesh.material.alpha = 0.15;
      mesh.material.transparencyMode = Material.MATERIAL_ALPHABLEND;
      mesh.material.needDepthPrePass = true;
    }
  });
};

export const resetTransparency = (meshList: Mesh[]) => {
  meshList.forEach((mesh) => {
    if (!mesh.material) return;
    mesh.material.alpha = 1;
    mesh.material.transparencyMode = Material.MATERIAL_OPAQUE;
    mesh.material.needDepthPrePass = false;
  });
};

export const setupPointerInteraction = (
  scene: Scene,
  onMeshPick: (mesh: Mesh) => void,
  hl: HighlightLayer,
  setSelectionSource: (source: "canvas" | "list" | null) => void
) => {
  scene.onPointerObservable.add((pointerInfo) => {
    if (
      pointerInfo.pickInfo?.hit &&
      pointerInfo.pickInfo.pickedMesh instanceof Mesh
    ) {
      const mesh = pointerInfo.pickInfo.pickedMesh;
      onMeshPick(mesh);
      setSelectionSource("canvas");
      hl.removeAllMeshes();
      hl.addMesh(mesh, Color3.Red());
    }
  });
};

export const loadModel = async (
  scene: Scene,
  camera: ArcRotateCamera
): Promise<Mesh[]> => {
  await AppendSceneAsync("/models/Unnamed8.gltf", scene);
  return new Promise<Mesh[]>((resolve) => {
    scene.executeWhenReady(() => {
      const meshes = scene.meshes.filter(
        (m): m is Mesh => m instanceof Mesh && m.name !== "__root__"
      );

      const worldExtends = scene.getWorldExtends();
      const framing = getFraming(camera);
      if (framing) {
        camera.lowerRadiusLimit = null;
        framing.zoomOnBoundingInfo(worldExtends.min, worldExtends.max);
      }

      resolve(meshes);
    });
  });
};
