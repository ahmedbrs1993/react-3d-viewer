import React, { useState, useRef } from "react";
import { parts as initialParts } from "@/data/Parts";
import type { Part, SubPart } from "@/types/Machine";
import { useCart } from "@/context/CartContext";

const MachineViewer2D: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [selectedSubPart, setSelectedSubPart] = useState<SubPart | null>(null);
  const [transform, setTransform] = useState<string>("scale(1)");
  const [zoomedPartId, setZoomedPartId] = useState<string | null>(null);
  const [focusedPartId, setFocusedPartId] = useState<string | null>(null);
  const [zoomedSubPartId, setZoomedSubPartId] = useState<string | null>(null);
  const [focusedSubPartId, setFocusedSubPartId] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const { addItem } = useCart();

  const handlePartClick = (part: Part) => {
    if (focusedPartId === part.id) return;
    if (zoomedPartId === part.id) {
      setFocusedPartId(part.id);
      setZoomedPartId(null);
      setTransform("scale(1)");

      setSelectedSubPart(null);
      setZoomedSubPartId(null);
      setFocusedSubPartId(null);
    } else {
      setZoomedPartId(part.id);
      setFocusedPartId(null);
      zoomToPart(part);

      setSelectedSubPart(null);
      setZoomedSubPartId(null);
      setFocusedSubPartId(null);
    }
    setSelectedPart(part);
    setSelectedSubPart(null);
  };

  const handleSubPartClick = (sub: SubPart) => {
    if (focusedSubPartId === sub.id) return;

    if (zoomedSubPartId === sub.id) {
      setFocusedSubPartId(sub.id);
      setZoomedSubPartId(null);
      setTransform("scale(1)");
    } else {
      setZoomedSubPartId(sub.id);
      setFocusedSubPartId(null);
      const parent = initialParts.find((p) => p.id === focusedPartId);
      if (parent) {
        zoomToPart(parent, sub);
      }
    }

    setSelectedSubPart(sub);
  };

  const handleBack = () => {
    if (focusedSubPartId) {
      // Go back from subPart image to zoomed-in parent part
      setFocusedSubPartId(null);
      setZoomedSubPartId(selectedSubPart?.id || null);
      setTransform("scale(1)");
      const parent = initialParts.find((p) => p.id === focusedPartId);
      if (parent && selectedSubPart) {
        zoomToPart(parent, selectedSubPart);
      }
    } else if (zoomedSubPartId) {
      // Go back from subPart zoom to part image
      setZoomedSubPartId(null);
      setFocusedSubPartId(null);
      setFocusedPartId(selectedPart?.id || null);
      setSelectedSubPart(null);
      setTransform("scale(1)");
    } else if (focusedPartId) {
      // Go back from part image to zoomed part
      setFocusedPartId(null);
      setZoomedPartId(selectedPart?.id || null);
      zoomToPart(selectedPart!);
    } else if (zoomedPartId) {
      // Back to global full view
      setZoomedPartId(null);
      setSelectedPart(null);
      setTransform("scale(1)");
    }
  };

  const focusedPart = initialParts.find((p) => p.id === focusedPartId);

  const zoomToPart = (part: Part, sub?: SubPart) => {
    const scale = 1.5;
    const centerX = 400;
    const centerY = 250;

    const source = sub || part;

    const partCenterX = source.x + source.width / 2;
    const partCenterY = source.y + source.height / 2;

    const translateX = centerX - partCenterX * scale;
    const translateY = centerY - partCenterY * scale;

    setTransform(`translate(${translateX}, ${translateY}) scale(${scale})`);
  };

  return (
    <div className="flex gap-6 w-full h-full ">
      <aside className="min-w-[250px] max-w-[300px] bg-white p-4 shadow rounded space-y-4 flex-shrink-0">
        {focusedPart?.subParts?.length ? (
          <>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Sous-composants
            </h3>
            <ul className="space-y-2">
              {focusedPart.subParts.map((sub) => (
                <li
                  key={sub.id}
                  className="cursor-pointer p-2 rounded hover:bg-blue-100"
                  onClick={() => handleSubPartClick(sub)}
                >
                  {sub.name}
                </li>
              ))}
            </ul>
          </>
        ) : !focusedPartId ? (
          <>
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Liste des pièces
            </h3>
            <ul className="space-y-2">
              {initialParts.map((part) => (
                <li
                  key={part.id}
                  className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${
                    selectedPart?.id === part.id
                      ? "bg-blue-200 font-semibold"
                      : ""
                  }`}
                  onClick={() => handlePartClick(part)}
                >
                  {part.name}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {(zoomedPartId ||
          focusedPartId ||
          zoomedSubPartId ||
          focusedSubPartId) && (
          <button
            onClick={handleBack}
            className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
          >
            Retour
          </button>
        )}
      </aside>

      <div className="relative flex-grow flex justify-center">
        <svg
          ref={svgRef}
          width="800"
          height="500"
          viewBox="0 0 800 500"
          className="border rounded bg-white"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="red" />
            </marker>
          </defs>
          <g transform={transform}>
            <image
              href={
                focusedSubPartId
                  ? selectedSubPart?.image
                  : focusedPartId
                  ? initialParts.find((p) => p.id === focusedPartId)?.image
                  : "/images/machine.png"
              }
              x="0"
              y="0"
              width="800"
              height="500"
              pointerEvents={
                focusedPartId || focusedSubPartId ? "none" : "auto"
              }
            />
            {!focusedPartId &&
              initialParts.map((part) => (
                <g key={part.id}>
                  {selectedPart?.id === part.id && (
                    <>
                      <line
                        x1={part.arrowX}
                        y1={part.arrowY}
                        x2={part.x + part.width / 2}
                        y2={part.y + part.height / 2}
                        stroke="red"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        className="cursor-pointer animate-pulseFast"
                        pointerEvents="none"
                      />
                      <text
                        x={part.arrowX}
                        y={part.arrowY - 8}
                        textAnchor="middle"
                        className="text-xs fill-black-700 font-semibold"
                      >
                        {part.name}
                      </text>
                    </>
                  )}

                  <rect
                    x={part.x}
                    y={part.y}
                    width={part.width}
                    height={part.height}
                    fill="transparent"
                    onClick={() => handlePartClick(part)}
                    className="cursor-pointer"
                    pointerEvents="auto"
                  />
                </g>
              ))}

            {focusedPart?.subParts?.map(
              (sub) =>
                zoomedSubPartId === sub.id &&
                !focusedSubPartId && (
                  <g key={sub.id}>
                    <line
                      x1={sub.arrowX}
                      y1={sub.arrowY}
                      x2={sub.x + sub.width / 2}
                      y2={sub.y + sub.height / 2}
                      stroke="red"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                      className="cursor-pointer animate-pulseFast"
                      pointerEvents="none"
                    />
                    <text
                      x={sub.arrowX}
                      y={sub.arrowY - 8}
                      textAnchor="middle"
                      className="text-xs fill-black-700 font-semibold"
                    >
                      {sub.name}
                    </text>
                  </g>
                )
            )}
            {focusedPart?.subParts?.map(
              (sub) =>
                !focusedSubPartId && (
                  <rect
                    key={sub.id}
                    x={sub.x}
                    y={sub.y}
                    width={sub.width}
                    height={sub.height}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => handleSubPartClick(sub)}
                    pointerEvents="auto"
                  />
                )
            )}
          </g>
        </svg>
      </div>

      <aside className="w-96 bg-white p-6 rounded shadow space-y-4 flex-shrink-0">
        {selectedPart || selectedSubPart ? (
          <>
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-gray-1200">
                {selectedSubPart ? selectedSubPart.name : selectedPart?.name}
              </h3>
            </div>

            <p className="text-sm text-gray-600">
              Réf: {selectedSubPart?.reference || selectedPart?.reference}
            </p>
            <p className="text-sm text-gray-700">
              {selectedSubPart?.description || selectedPart?.description}
            </p>

            {(selectedSubPart || (selectedPart && !selectedPart.subParts)) && (
              <>
                <p className="text-sm font-semibold text-gray-800">
                  Prix: {(selectedSubPart?.price || selectedPart?.price) + " €"}
                </p>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    onClick={() => addItem(selectedSubPart || selectedPart!)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                  >
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </>
            )}

            {selectedPart?.subParts && !selectedSubPart && (
              <div>
                <h4 className="mt-4 font-semibold text-gray-800">
                  Sous-composants :
                </h4>
                <ul className="space-y-2 mt-2">
                  {selectedPart.subParts.map((sub) => (
                    <li
                      key={sub.id}
                      className="text-sm text-blue-700 hover:underline cursor-pointer"
                      onClick={() => handleSubPartClick(sub)}
                    >
                      {sub.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="text-gray-400 italic text-sm">
            Aucun composant sélectionné
          </div>
        )}
      </aside>
    </div>
  );
};

export default MachineViewer2D;
