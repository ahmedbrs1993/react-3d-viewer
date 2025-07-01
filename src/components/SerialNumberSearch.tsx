import React, { useState } from "react";
import { parks } from "@/data/Machines";
import type { MachineResult } from "@/types/Machine";

const SerialNumberSearch = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [result, setResult] = useState<MachineResult | null>(null);

  const handleSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase();
    if (value.length > 5 && !value.includes("-")) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    if (value.length <= 9) {
      setSerialNumber(value);
    }
  };

  const handleSearch = () => {
    const allMachines = parks.flatMap((park) => {
      return park.machines.map((machine) => {
        const machineWithPark = { ...machine, parkName: park.name };
        return machineWithPark;
      });
    });

    const found = allMachines.find((machine) => {
      return machine.serialNumber === serialNumber;
    });

    setResult(found ?? null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
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
              Numéro de série
            </label>
            <div className="relative">
              <input
                type="text"
                id="serial-number"
                placeholder="XXXXX-XX"
                value={serialNumber}
                onChange={handleSerialNumberChange}
                className="w-full pl-4 pr-10 py-2 border rounded-lg"
              />
              <button
                className="absolute right-2 top-2 text-gray-400 hover:text-blue-900"
                onClick={handleSearch}
                type="button"
              ></button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format: XXXXX-XX (ex: AB123-4X)
            </p>
          </div>
          {result ? (
            <div className="mt-4 bg-blue-50 border p-4 rounded">
              <p className="font-semibold">Résultat trouvé :</p>
              <p>
                <strong>Machine:</strong> {result.name}
                <br />
                <strong>Parc:</strong> {result.parkName}
                <br />
                <strong>Status:</strong> {result.status}
              </p>
            </div>
          ) : (
            serialNumber && (
              <p className="text-red-500">Aucune machine trouvée.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SerialNumberSearch;
