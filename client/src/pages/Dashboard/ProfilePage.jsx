import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/solid";
import {
  FiGrid,
  FiBox,
  FiTruck,
  FiUsers,
  FiShoppingCart,
  FiShoppingBag,
} from "react-icons/fi";

import Card from "../../components/Card";
import { getCountsRequest } from "../../api/stats";

export default function ProfilePage() {
  const { user, getUser } = useAuth();
  const [counts, setCounts] = useState({
    categoriesCount: 0,
    productsCount: 0,
    suppliersCount: 0,
    customersCount: 0,
    purchasesCount: 0,
    salesCount: 0,
  });

  useEffect(() => {
    getUser();
    const fetchCounts = async () => {
      try {
        const res = await getCountsRequest();
        setCounts(res.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className='min-h-screen  py-2 px-2'>
      <div className='max-w-8xl mx-auto'>
        <div className='h-52 bg-gradient-to-r from-blue-500 to-indigo-600 border rounded-xl'></div>
        <div className='px-6 py-4'>
          <div className='flex flex-col items-center -mt-16'>
            <img
              src='https://api.dicebear.com/7.x/avataaars/svg?seed=John'
              alt='Profile'
              className='w-52 h-52 rounded-full border-4 border-white bg-white'
            />
            <h2 className='mt-4 text-2xl font-bold text-gray-900'>
              {user.name}
            </h2>
            <p className='text-gray-600'>{user.email}</p>
            <div className='mt-4 flex items-center text-gray-600'>
              <BriefcaseIcon className='h-5 w-5 mr-2' />
              <span>Empresa Gestor de inventario</span>
            </div>
            <div className='mt-2 flex items-center text-gray-600'>
              <MapPinIcon className='h-5 w-5 mr-2' />
              <span>San Francisco, CA</span>
            </div>
            <div className='mt-6 flex space-x-4'>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
                Edit Profile
              </button>
              <button className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50'>
                Share Profile
              </button>
            </div>
            <div className='pt-10 gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full'>
              <Card
                count={counts.categoriesCount}
                icon={FiGrid}
                name='Categorías'
              />
              <Card
                count={counts.productsCount}
                icon={FiBox}
                name='Productos'
              />
              <Card
                count={counts.suppliersCount}
                icon={FiTruck}
                name='Proveedores'
              />
              <Card
                count={counts.customersCount}
                icon={FiUsers}
                name='Clientes'
              />
              <Card
                count={counts.purchasesCount}
                icon={FiShoppingCart}
                name='Compras'
              />
              <Card
                count={counts.salesCount}
                icon={FiShoppingBag}
                name='Ventas'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
