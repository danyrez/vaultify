import { useEffect, useState } from "react";
import { useSuppliers } from "../../context/SupplierContext";
import Modal from "../../components/Modal";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function SupplierPage() {
  const {
    suppliers,
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
  } = useSuppliers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getSuppliers();
  }, []);

  const handleEditClick = (supplier) => {
    setSelectedSupplier(supplier);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedSupplier({ name: "", email: "", phone: "", address: "" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleDeleteClick = async (id) => {
    await deleteSupplier(id);
    getSuppliers(); // Refrescar la lista de proveedores
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await updateSupplier(selectedSupplier.id, selectedSupplier);
    } else {
      await createSupplier(selectedSupplier);
    }
    handleCloseModal();
    getSuppliers(); // Refrescar la lista de proveedores
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>PROVEEDORES</h1>
      <button
        className='bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 mb-4'
        onClick={handleCreateClick}
      >
        Crear Proveedor
      </button>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Correo</th>
              <th className='py-2 px-4 border-b'>Teléfono</th>
              <th className='py-2 px-4 border-b'>Dirección</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{supplier.id}</td>
                <td className='py-2 px-4 border-b'>{supplier.name}</td>
                <td className='py-2 px-4 border-b'>{supplier.email}</td>
                <td className='py-2 px-4 border-b'>{supplier.phone}</td>
                <td className='py-2 px-4 border-b'>{supplier.address}</td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEditClick(supplier)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2'
                    onClick={() => handleDeleteClick(supplier.id)}
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
          {isEditMode ? "Edit Supplier" : "Create Supplier"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              value={selectedSupplier?.name || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedSupplier({
                  ...selectedSupplier,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input
              type='email'
              value={selectedSupplier?.email || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedSupplier({
                  ...selectedSupplier,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Phone
            </label>
            <input
              type='text'
              value={selectedSupplier?.phone || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedSupplier({
                  ...selectedSupplier,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Address
            </label>
            <input
              type='text'
              value={selectedSupplier?.address || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedSupplier({
                  ...selectedSupplier,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              {isEditMode ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
