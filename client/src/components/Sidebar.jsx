import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiTruck,
  FiShoppingCart,
  FiGrid,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; // Importa el hook useAuth

const menuItems = [
  { path: "/dashboard/categories", name: "Categorias", icon: FiGrid },
  { path: "/dashboard/products", name: "Productos", icon: FiBox },
  { path: "/dashboard/suppliers", name: "Proveedores", icon: FiTruck },
  { path: "/dashboard/customers", name: "Clientes", icon: FiUsers },
  { path: "/dashboard/purchases", name: "Compras", icon: FiShoppingCart },
  { path: "/dashboard/sales", name: "Ventas", icon: FiShoppingBag },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <button
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white'
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:relative lg:translate-x-0`}
      >
        <div className='flex-1 p-5 pt-16 lg:pt-5'>
          <h1 className='text-2xl font-bold mb-8'>Dashboard</h1>
          <nav>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile and Logout Section */}
        <div className='p-5 border-t border-gray-700'>
          <Link to='/dashboard/profile'>
            <div className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer'>
              <FiUser size={20} />
              <span>{user.name}</span>
            </div>
          </Link>
          <div
            className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer text-red-400'
            onClick={logout} // Añade el manejador de eventos para logout
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}
