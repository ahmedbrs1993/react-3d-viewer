import { useState } from "react";
import {
  Fan,
  Thermometer,
  Filter,
  Wrench,
  CircuitBoard,
  Gauge,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";

type SubCategory = {
  name: string;
  path: string;
};

type Category = {
  name: string;
  icon: JSX.Element;
  subCategories: SubCategory[];
};

const categories: Category[] = [
  {
    name: "Compresseurs",
    icon: <Gauge className="w-8 h-8" />,
    subCategories: [
      {
        name: "Compresseurs Scroll",
        path: "/catalog?category=compresseurs-scroll",
      },
      {
        name: "Compresseurs à Piston",
        path: "/catalog?category=compresseurs-piston",
      },
      {
        name: "Compresseurs à Vis",
        path: "/catalog?category=compresseurs-vis",
      },
      {
        name: "Accessoires Compresseurs",
        path: "/catalog?category=accessoires-compresseurs",
      },
    ],
  },
  {
    name: "Échangeurs de chaleur",
    icon: <Thermometer className="w-8 h-8" />,
    subCategories: [
      {
        name: "Échangeurs à Plaques",
        path: "/catalog?category=echangeurs-plaques",
      },
      {
        name: "Échangeurs Tubulaires",
        path: "/catalog?category=echangeurs-tubulaires",
      },
      {
        name: "Batteries à Ailettes",
        path: "/catalog?category=batteries-ailettes",
      },
      { name: "Pièces Détachées", path: "/catalog?category=pieces-echangeurs" },
    ],
  },
  {
    name: "Ventilateurs",
    icon: <Fan className="w-8 h-8" />,
    subCategories: [
      {
        name: "Ventilateurs Axiaux",
        path: "/catalog?category=ventilateurs-axiaux",
      },
      {
        name: "Ventilateurs Centrifuges",
        path: "/catalog?category=ventilateurs-centrifuges",
      },
      {
        name: "Moteurs de Ventilation",
        path: "/catalog?category=moteurs-ventilation",
      },
      {
        name: "Accessoires Ventilation",
        path: "/catalog?category=accessoires-ventilation",
      },
    ],
  },
  {
    name: "Filtres",
    icon: <Filter className="w-8 h-8" />,
    subCategories: [
      { name: "Filtres à Air", path: "/catalog?category=filtres-air" },
      { name: "Filtres à Eau", path: "/catalog?category=filtres-eau" },
      {
        name: "Filtres Déshydrateurs",
        path: "/catalog?category=filtres-deshydrateurs",
      },
      { name: "Média Filtrants", path: "/catalog?category=media-filtrants" },
    ],
  },
  {
    name: "Pièces électroniques",
    icon: <CircuitBoard className="w-8 h-8" />,
    subCategories: [
      { name: "Régulateurs", path: "/catalog?category=regulateurs" },
      { name: "Sondes", path: "/catalog?category=sondes" },
      {
        name: "Cartes Électroniques",
        path: "/catalog?category=cartes-electroniques",
      },
      { name: "Capteurs", path: "/catalog?category=capteurs" },
    ],
  },
  {
    name: "Outils et accessoires",
    icon: <Wrench className="w-8 h-8" />,
    subCategories: [
      {
        name: "Outillage Spécialisé",
        path: "/catalog?category=outillage-specialise",
      },
      {
        name: "Équipements de Test",
        path: "/catalog?category=equipements-test",
      },
      { name: "Consommables", path: "/catalog?category=consommables" },
      { name: "Pièces d'Usure", path: "/catalog?category=pieces-usure" },
    ],
  },
];

const CategoryCard = ({ category }: { category: Category }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900">
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {category.name}
            </h3>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>

      {isExpanded && (
        <div className="mt-4 pl-16 space-y-2">
          {category.subCategories.map((subCategory: SubCategory) => (
            <Link
              key={subCategory.path}
              to={subCategory.path}
              className="block text-gray-600 hover:text-blue-900 hover:bg-blue-50 py-2 px-3 rounded-md transition-colors duration-150"
            >
              {subCategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Catégories de produits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
