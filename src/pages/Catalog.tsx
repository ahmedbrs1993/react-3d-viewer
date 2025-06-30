import { Filter, Plus } from "lucide-react";
import { parts } from "@/data/Parts";
import { useCart } from "@/context/CartContext";

const Catalog = () => {
  const { addItem } = useCart();

  // Filtered list: only subParts with price OR full part if no subParts and has price
  const catalogItems = parts.flatMap((part) => {
    if (part.subParts && part.subParts.length > 0) {
      return part.subParts.filter((sub) => sub.price !== undefined);
    } else if (part.price !== undefined) {
      return [part];
    } else {
      return [];
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Catalogue des produits
        </h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-900 text-white rounded-lg">
          <Filter size={20} />
          <span>Filtres</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-contain bg-gray-100"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                Prix: {item.price + " €"}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => addItem(item)}
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
    </div>
  );
};

export default Catalog;
