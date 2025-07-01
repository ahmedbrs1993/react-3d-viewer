import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { parts } from "@/data/Parts";
import { useCart } from "@/context/CartContext";
import type { Part, SubPart } from "@/types/Machine";

type PartResult = Part & { type: "part" };
type SubPartResult = SubPart & { type: "subPart"; parent: string };

export type SearchResult = PartResult | SubPartResult;

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState("");
  const { addItem } = useCart();

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Veuillez saisir un terme de recherche.");
      return;
    }

    setError("");

    const lower = query.toLowerCase();

    const flatResults: SearchResult[] = parts.flatMap((part) => {
      const matches: SearchResult[] = [];

      if (
        part.name.toLowerCase().includes(lower) &&
        !part.subParts?.length &&
        part.price
      ) {
        matches.push({ ...part, type: "part" });
      }

      if (part.subParts) {
        const subMatches = part.subParts
          .filter((sp) => sp.name.toLowerCase().includes(lower) && sp.price)
          .map(
            (sp) =>
              ({ ...sp, parent: part.name, type: "subPart" } as SubPartResult)
          );
        matches.push(...subMatches);
      }

      return matches;
    });

    setResults(flatResults);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher une pièce détachée..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400 cursor-pointer"
                size={20}
                onClick={handleSearch}
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 h-full"
            >
              Rechercher
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Exemple : <span className="italic">disjoncteur</span>
          </p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="bg-white w-full h-48 object-contain bg-gray-100"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                {item.type === "subPart" && (
                  <p className="text-sm text-gray-500 mb-1 italic">
                    Dans : {item.parent}
                  </p>
                )}
                <p className="mt-2 text-sm font-semibold text-gray-800">
                  Prix: {item.price ? `${item.price} €` : "N/A"}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      addItem(item);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                  >
                    <Plus size={16} />
                    <span>Ajouter au panier</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
