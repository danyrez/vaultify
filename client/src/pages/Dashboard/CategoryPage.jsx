import { useEffect, useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import { useProducts } from "../../context/ProductContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import Modal from "../../components/Modal";

export default function CategoryPage() {
  const {
    categories,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const { createProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedCategory({ name: "" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct({ name: "", description: "", price: 0, stock: 0 });
  };

  const handleDeleteClick = async (id) => {
    await deleteCategory(id);
    getCategories(); // Refrescar la lista de categorías
  };

  const handleAddProductClick = (category) => {
    setSelectedCategory(category);
    setIsProductModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await updateCategory(selectedCategory.id, selectedCategory);
    } else {
      await createCategory(selectedCategory);
    }
    handleCloseModal();
    getCategories(); // Refrescar la lista de categorías
  };

  const handleProductFormSubmit = async (e) => {
    e.preventDefault();
    await createProduct({
      ...selectedProduct,
      categoryId: selectedCategory.id,
    });
    handleCloseProductModal();
    getCategories(); // Refrescar la lista de categorías
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>CATEGORIAS</h1>
      <button
        className='bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 mb-4'
        onClick={handleCreateClick}
      >
        Crear Categoría
      </button>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Productos</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
              <th className='py-2 px-4 border-b'>Añadir Producto</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{category.id}</td>
                <td className='py-2 px-4 border-b'>{category.name}</td>
                <td className='py-2 px-4 border-b'>{category.totalProducts}</td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEditClick(category)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2'
                    onClick={() => handleDeleteClick(category.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600'
                    onClick={() => handleAddProductClick(category)}
                  >
                    <AiFillProduct />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className='text-xl font-semibold mb-4'>
          {isEditMode ? "Edit Category" : "Create Category"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              value={selectedCategory?.name || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
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
            <button
              type='button'
              onClick={handleCloseModal}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2'
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isProductModalOpen} onClose={handleCloseProductModal}>
        <h2 className='text-xl font-semibold mb-4 text-center'>
          Añadir Producto
        </h2>
        <form onSubmit={handleProductFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Nombre
            </label>
            <input
              type='text'
              value={selectedProduct.name}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Descripción
            </label>
            <input
              type='text'
              value={selectedProduct.description}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Precio
            </label>
            <input
              type='number'
              value={selectedProduct.price}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  price: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Stock
            </label>
            <input
              type='number'
              value={selectedProduct.stock}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  stock: parseInt(e.target.value, 10),
                })
              }
            />
          </div>
          <div className='flex justify-around'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              Add Product
            </button>
            <button
              type='button'
              onClick={handleCloseProductModal}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-2'
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
