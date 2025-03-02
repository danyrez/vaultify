import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "../../components/Modal";
import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";

export default function ProductPage() {
  const {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
  } = useProducts();
  const { categories, getCategories } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      getProductsByCategory(selectedCategory);
    } else {
      getProducts();
    }
  }, [selectedCategory]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct({ name: "", description: "", price: 0, stock: 0 });
  };

  const handleDeleteClick = async (id) => {
    await deleteProduct(id);
    getProducts(); // Refrescar la lista de productos
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await updateProduct(selectedProduct.id, selectedProduct);
    } else {
      await createProduct(selectedProduct);
    }
    handleCloseModal();
    getProducts(); // Refrescar la lista de productos
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>PRODUCTOS</h1>
      <div className='mb-4 flex items-center gap-4'>
        <label className='block text-gray-700 text-xl font-bold mb-2'>
          Filtro:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='shadow appearance-none border rounded w-30 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Descripción</th>
              <th className='py-2 px-4 border-b'>Precio</th>
              <th className='py-2 px-4 border-b'>Stock</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{product.id}</td>
                <td className='py-2 px-4 border-b'>{product.name}</td>
                <td className='py-2 px-4 border-b'>{product.description}</td>
                <td className='py-2 px-4 border-b'>{product.price}</td>
                <td className='py-2 px-4 border-b'>{product.stock}</td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEditClick(product)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2'
                    onClick={() => handleDeleteClick(product.id)}
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
          {isEditMode ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
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
              Description
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
              Price
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
