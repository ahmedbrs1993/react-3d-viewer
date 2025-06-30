import React, { useState } from "react";
import { Search } from "lucide-react";

const SerialNumberSearch = () => {
  const [serialNumber, setSerialNumber] = useState("");

  const handleSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();

    // Format as XXXXX-XX
    if (value.length > 5 && !value.includes("-")) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }

    // Limit to XXXXX-XX format
    if (value.length <= 8) {
      setSerialNumber(value);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Rechercher votre machine
        </h2>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="serial-number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Numéro de série de votre machine
            </label>
            <div className="relative">
              <input
                type="text"
                id="serial-number"
                placeholder="XXXXX-XX"
                value={serialNumber}
                onChange={handleSerialNumberChange}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                className="absolute right-2 top-2 text-gray-400 hover:text-blue-900"
                onClick={() => console.log("Recherche:", serialNumber)}
              >
                <Search size={20} />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format: XXXXX-XX (exemple: AB123-4X)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerialNumberSearch;
