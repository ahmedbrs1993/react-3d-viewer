import { Settings, PenTool as Tool } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parks } from "@/data/Machines";

const Machines = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes Machines</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg">
          <Tool size={20} />
          <span>Ajouter une machine</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parks
          .flatMap((park) => park.machines)
          .map((machine) => (
            <div
              key={machine.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
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
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date d'installation</p>
                    <p className="font-medium">{machine.installationDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Dernière maintenance</p>
                    <p className="font-medium">{machine.lastMaintenance}</p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                    onClick={() =>
                      navigate(`/machines/${machine.id}`, {
                        state: { machineName: machine.name },
                      })
                    }
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
  );
};

export default Machines;
