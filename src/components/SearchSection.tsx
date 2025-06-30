import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une pièce détachée..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Toutes les catégories</option>
              <option>Compresseurs</option>
              <option>Échangeurs de chaleur</option>
              <option>Ventilateurs</option>
              <option>Filtres</option>
            </select>
            <button className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
