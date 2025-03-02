import { useEffect, useState } from "react";
import { useCustomers } from "../../context/CustomerContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../components/Modal";

export default function CustomerPage() {
  const {
    customers,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedCustomer({ firstName: "", lastName: "", email: "", phone: "" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleDeleteClick = async (id) => {
    await deleteCustomer(id);
    getCustomers(); // Refrescar la lista de clientes
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await updateCustomer(selectedCustomer.id, selectedCustomer);
    } else {
      await createCustomer(selectedCustomer);
    }
    handleCloseModal();
    getCustomers(); // Refrescar la lista de clientes
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>CLIENTES</h1>
      <button
        className='bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 mb-4'
        onClick={handleCreateClick}
      >
        Crear cliente
      </button>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Apellidos</th>
              <th className='py-2 px-4 border-b'>Correo</th>
              <th className='py-2 px-4 border-b'>Teléfono</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className='text-center hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{customer.id}</td>
                <td className='py-2 px-4 border-b'>{customer.firstName}</td>
                <td className='py-2 px-4 border-b'>{customer.lastName}</td>
                <td className='py-2 px-4 border-b'>{customer.email}</td>
                <td className='py-2 px-4 border-b'>{customer.phone}</td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEditClick(customer)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    onClick={() => handleDeleteClick(customer.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className='text-xl font-semibold mb-4'>
          {isEditMode ? "Editar Cliente" : "Crear Cliente"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Nombre
            </label>
            <input
              type='text'
              value={selectedCustomer?.firstName || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  firstName: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Apellidos
            </label>
            <input
              type='text'
              value={selectedCustomer?.lastName || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  lastName: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Correo
            </label>
            <input
              type='email'
              value={selectedCustomer?.email || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Teléfono
            </label>
            <input
              type='text'
              value={selectedCustomer?.phone || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedCustomer({
                  ...selectedCustomer,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              {isEditMode ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
