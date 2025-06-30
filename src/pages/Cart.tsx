import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeItem } = useCart();

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600">
            Ajoutez des articles à votre panier pour les voir ici.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          {items.map((item) => {
            const totalPrice = item.price * item.quantity;

            return (
              <div
                key={item.id}
                className="flex items-center py-6 border-b border-gray-200 last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Prix unitaire : {item.price} €
                  </p>
                  <p className="text-sm text-gray-600">
                    Total : {totalPrice.toFixed(2)} €
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-8 flex justify-end text-lg font-semibold text-gray-800">
            Total général : {getTotal().toFixed(2)} €
          </div>

          <div className="mt-4 flex justify-end">
            <button className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
              Passer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
