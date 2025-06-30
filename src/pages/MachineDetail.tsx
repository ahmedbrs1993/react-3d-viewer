import { useState } from "react";
import { Plus, Eye } from "lucide-react";
import { useLocation } from "react-router-dom";
import MachineViewer3D from "@/components/MachineViewer3D";
import MachineViewer2D from "@/components/MachineViewer2D";
import { useCart } from "@/context/CartContext";
import { parts } from "@/data/Parts";
import { toCartItem } from "@/helpers/AddItem";

const MachineDetail = () => {
  const { addItem } = useCart();
  const location = useLocation();

  const machineName = location.state?.machineName || "Machine inconnue";
  const [showModal, setShowModal] = useState(false);
  const [viewerMode, setViewerMode] = useState<"2D" | "3D" | null>(null);

  const openViewer = (mode: "2D" | "3D") => {
    setViewerMode(mode);
    setShowModal(true);
  };

  const closeViewer = () => {
    setViewerMode(null);
    setShowModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Image + Description in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start bg-white rounded-lg shadow-lg overflow-hidden p-6">
        {/* Left: Machine Image + View buttons */}
        <div>
          <img
            src="/images/rts.png"
            alt={machineName}
            className="w-full h-[500px] object-contain bg-gray-50"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => openViewer("2D")}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center gap-2"
            >
              <Eye size={16} />
              Vue 2D
            </button>
            <button
              onClick={() => openViewer("3D")}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 flex items-center gap-2"
            >
              <Eye size={16} />
              Vue 3D
            </button>
          </div>
        </div>

        {/* Right: Description */}
        <div className="space-y-4 text-gray-800">
          <h2 className="text-2xl font-bold text-gray-900">{machineName}</h2>

          <div className="flex flex-wrap gap-2">
            {[
              "Traitement d'air",
              "Pompe à chaleur",
              "Rooftop / Traitement process",
            ].map((flag) => (
              <span
                key={flag}
                className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
              >
                {flag}
              </span>
            ))}
          </div>

          <p className="font-semibold">
            Le Rooftop pour Shelter (RTS) est un climatiseur industriel conçu
            pour la ventilation, le chauffage et la climatisation des shelters.
          </p>

          <p>
            Ce rooftop combine les toutes dernières avancées technologiques afin
            d’assurer une consommation optimale de l’énergie. Sa performance et
            simplicité d’installation en font une solution modulaire qui ajuste
            ses performances à son environnement (rénovation ou neuf).
          </p>

          <p>
            Cette gamme répond parfaitement aux contraintes de poids et
            d’encombrement pour des machines existantes à remplacer.
          </p>

          <p>
            La RTS est un rooftop disponible avec différents fluides R410A,
            R134a ou R513A. Le R513A est un fluide à faible GWP. L’utilisation
            de ce fluide permet de minimiser l’impact sur l’effet de serre.
          </p>

          <div className="text-lg font-bold">
            <p>Performance (selon la norme EN 14511)</p>
            <ul className="list-disc list-inside mt-1 text-base font-semibold">
              <li>Plage de débit : 2 500 – 4 000 m³/h</li>
              <li>Plage de puissance frigorifique : 10 - 20 kW</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-8">
          <div className="relative w-[90%] h-[65%] bg-white rounded-xl overflow-hidden p-6">
            <button
              onClick={closeViewer}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full z-50"
            >
              ✕
            </button>
            <div className="w-full h-full">
              {viewerMode === "2D" ? (
                <MachineViewer2D />
              ) : viewerMode === "3D" ? (
                <MachineViewer3D />
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Components section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Composants disponibles
        </h2>
        <div className="space-y-8">
          {parts.map((part) => (
            <div key={part.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {part.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {part.subParts && part.subParts.length > 0 ? (
                  part.subParts.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex flex-col border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={sub.image}
                        alt={sub.name}
                        className="w-full h-48 object-contain bg-gray-50"
                      />
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {sub.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Réf: {sub.reference}
                        </p>
                        <p className="text-sm text-gray-500">
                          {sub.description}
                        </p>
                        <p className="text-sm text-gray-800 font-semibold mt-1">
                          Prix: {sub.price}
                        </p>
                        <div className="mt-4 flex items-center justify-end">
                          <button
                            onClick={() => addItem(toCartItem(sub))}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                          >
                            <Plus size={16} />
                            <span>Ajouter au panier</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={part.image}
                      alt={part.name}
                      className="w-full h-48 object-contain bg-gray-50"
                    />
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {part.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Réf: {part.reference}
                      </p>
                      <p className="text-sm text-gray-500">
                        {part.description}
                      </p>
                      <p className="text-sm text-gray-800 font-semibold mt-1">
                        Prix: {part.price}
                      </p>
                      <div className="mt-4 flex items-center justify-end">
                        <button
                          onClick={() => addItem(toCartItem(part))}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                        >
                          <Plus size={16} />
                          <span>Ajouter au panier</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MachineDetail;
