import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import {
  FiGrid,
  FiBox,
  FiTruck,
  FiUsers,
  FiShoppingCart,
  FiShoppingBag,
} from "react-icons/fi";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className='grid justify-center bg-white'>
        <div>
          <section
            id='start'
            className='w-full py-52 md:py-24 lg:py-32 xl:py-48'
          >
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <h1 className='text-3xl font-bold py-20 tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                    Gestiona tu inventario con facilidad
                  </h1>
                  <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                    Optimiza tu negocio con nuestro potente gestor de inventario
                    stock, realiza seguimientos y genera informes en tiempo
                    real.
                  </p>
                </div>
                <div className='space-x-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <Link to='/login'>
                      <button className='px-6 py-3 text-white bg-black rounded-lg hover:bg-gray-950'>
                        Comenzar ahora
                      </button>
                    </Link>
                    <Link>
                      <button className='px-6 py-3 text-black bg-white rounded-lg hover:bg-gray-100'>
                        Ver demo
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section id='features' className='w-full py-20 bg-gray-100'>
        <div className='px-20 pb-4'>
          <div className='grid justify-center pt-10'>
            <div className='w-full'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
                Características principales
              </h2>
            </div>
          </div>
          <div className='py-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <Card count={1000} icon={FiGrid} name='Categorías' />
            <Card count={3500} icon={FiBox} name='Productos' />
            <Card count={500} icon={FiTruck} name='Proveedores' />
            <Card count={1500} icon={FiUsers} name='Clientes' />
            <Card count={2000} icon={FiShoppingCart} name='Compras' />
            <Card count={5000} icon={FiShoppingBag} name='Ventas' />
          </div>
        </div>
        <div id='contact' className='px-20 pb-4 bg-white'>
          <div className='grid justify-center pt-10'>
            <div className='w-full'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
                Contacto
              </h2>
            </div>
          </div>
          <div className='flex justify-center'>
            <form className='w-full max-w-lg'>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Nombre
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Tu nombre'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='email'
                >
                  Correo Electrónico
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Tu correo electrónico'
                />
              </div>
              <div className='mb-6'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='message'
                >
                  Mensaje
                </label>
                <textarea
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none'
                  id='message'
                  rows='5'
                  placeholder='Tu mensaje'
                ></textarea>
              </div>
              <div className='flex items-center justify-between'>
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='button'
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className='w-full py-6 bg-gray-100 grid justify-center'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center justify-between text-center gap-4 md:flex-row'>
            <div className='flex items-center gap-2'>
              <span className='font-bold'>InvManager</span>
            </div>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              © 2023 InvManager. Todos los derechos reservados.
            </p>
            <nav className='flex gap-4 sm:gap-6'>
              <Link
                className='text-sm hover:underline underline-offset-4'
                to='#'
              >
                Términos de Servicio
              </Link>
              <Link
                className='text-sm hover:underline underline-offset-4'
                to='#'
              >
                Política de Privacidad
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
