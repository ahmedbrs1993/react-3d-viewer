import React from "react";
import { ShoppingCart, User, Home, Package, Settings } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

type NavLinkProps = {
  to: string;
  text: string;
  icon: React.ReactNode;
};

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { items } = useCart();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  return (
    <nav className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">
                ETT
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" icon={<Home size={20} />} text="Accueil" />
                <NavLink
                  to="/catalog"
                  icon={<Package size={20} />}
                  text="Catalogue"
                />
                {isAuthenticated && (
                  <NavLink
                    to="/machines"
                    icon={<Settings size={20} />}
                    text="Mes Machines"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-blue-800"
              onClick={handleAuthClick}
            >
              <User size={20} />
            </button>
            <button
              className="p-2 rounded-full hover:bg-blue-800 relative"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={20} />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ icon, text, to }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "bg-blue-800 text-white"
          : "text-gray-300 hover:bg-blue-800 hover:text-white"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Navbar;
