import { useState } from "react";
import {
  Building2,
  ChevronRight,
  Settings,
  PenTool as Tool,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parks } from "@/data/Machines";

const MachineParksList = () => {
  const [selectedPark, setSelectedPark] = useState<number | null>(null);
  const selectedParkData = parks.find((park) => park.id === selectedPark);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Mes parcs machines
            </h2>
          </div>

          {!selectedPark ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parks.map((park) => (
                <div
                  key={park.id}
                  onClick={() => setSelectedPark(park.id)}
                  className="border border-gray-200 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Building2 size={24} className="text-blue-900" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {park.name}
                      </h3>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{park.location}</span>
                    <span>{park.machines.length} machines</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedPark(null)}
                  className="text-gray-600 hover:text-blue-900 font-medium"
                >
                  ← Retour aux parcs
                </button>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedParkData?.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedParkData?.machines.map((machine) => (
                  <div
                    key={machine.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {machine.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            SN: {machine.serialNumber}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${
                            machine.status === "En fonctionnement"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {machine.status}
                        </div>
                      </div>

                      <div className="mt-4">
                        <img
                          src={machine.image}
                          alt={machine.name}
                          className="w-full h-48 object-contain rounded-lg bg-gray-50"
                        />
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Date d'installation</p>
                          <p className="font-medium">
                            {machine.installationDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Dernière maintenance</p>
                          <p className="font-medium">
                            {machine.lastMaintenance}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex space-x-4">
                        <button
                          onClick={() =>
                            navigate(`/machines/${machine.id}`, {
                              state: { machineName: machine.name },
                            })
                          }
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                        >
                          <Settings size={18} />
                          <span>Voir les détails</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50">
                          <Tool size={18} />
                          <span>Maintenance</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineParksList;
