import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { parks } from "@/data/Machines";

type HeroProps = {
  isAuthenticated: boolean;
};

const Hero: React.FC<HeroProps> = ({ isAuthenticated }) => {
  const [serialNumber, setSerialNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    if (!isAuthenticated) {
      setError("Veuillez vous connecter pour rechercher une machine.");
      return;
    }
    const match = parks
      .flatMap((park) => park.machines.map((m) => ({ ...m, parkId: park.id })))
      .find((machine) => machine.serialNumber === serialNumber);

    if (match) {
      setError("");
      navigate(`/machines/${match.id}`, {
        state: { machineName: match.name },
      });
    } else {
      setError("Aucune machine trouvée avec ce numéro.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative bg-blue-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1581093458791-9d42cc605a57?auto=format&fit=crop&q=80"
          alt="HVAC Background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
            Trouvez les pièces détachées pour votre machine
          </h1>
          <div className="bg-white p-4 rounded-lg shadow-lg">
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
                onKeyDown={handleKeyPress}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-400 hover:text-blue-900"
                onClick={handleSearch}
              >
                <Search size={20} />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Format: XXXXX-XX (exemple: AB123-4X)
            </p>
            {error && (
              <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
