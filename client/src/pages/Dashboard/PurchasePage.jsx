import { useEffect, useState } from "react";
import { usePurchases } from "../../context/PurchaseContext";
import { useSuppliers } from "../../context/SupplierContext";
import { useProducts } from "../../context/ProductContext";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Modal from "../../components/Modal";

dayjs.extend(utc);

export default function PurchasePage() {
  const {
    purchases,
    getPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
  } = usePurchases();
  const { suppliers, getSuppliers } = useSuppliers();
  const { products, getProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [supplierId, setSupplierId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseDetails, setPurchaseDetails] = useState([
    { productId: "", quantity: "", price: "" },
  ]);

  useEffect(() => {
    getPurchases();
    getSuppliers();
    getProducts();
  }, []);

  const handleAddDetail = () => {
    setPurchaseDetails([
      ...purchaseDetails,
      { productId: "", quantity: "", price: "" },
    ]);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = purchaseDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );

    // Si el campo cambiado es el producto, actualizar el precio automáticamente
    if (field === "productId") {
      const selectedProduct = products.find(
        (product) => product.id === parseInt(value)
      );
      if (selectedProduct) {
        updatedDetails[index].price = selectedProduct.price;
      }
    }

    setPurchaseDetails(updatedDetails);
  };

  const handleCreatePurchase = async () => {
    const formattedDate = dayjs(purchaseDate).toISOString();
    const purchase = {
      supplierId: parseInt(supplierId),
      purchaseDate: formattedDate,
      purchaseDetails: purchaseDetails.map((detail) => ({
        productId: parseInt(detail.productId),
        quantity: parseInt(detail.quantity),
        price: parseFloat(detail.price),
      })),
    };
    try {
      await createPurchase(purchase);
      setIsModalOpen(false);
      resetForm();
      getPurchases();
    } catch (error) {
      console.error("Error al crear la compra:", error.response.data);
    }
  };

  const handleUpdatePurchase = async () => {
    const formattedDate = dayjs(purchaseDate).toISOString();
    const updatedPurchase = {
      supplierId: parseInt(supplierId),
      purchaseDate: formattedDate,
      purchaseDetails: purchaseDetails.map((detail) => ({
        productId: parseInt(detail.productId),
        quantity: parseInt(detail.quantity),
        price: parseFloat(detail.price),
      })),
    };
    try {
      await updatePurchase(selectedPurchase.id, updatedPurchase);
      setIsModalOpen(false);
      resetForm();
      getPurchases();
    } catch (error) {
      console.error("Error al actualizar la compra:", error);
      alert(
        "Hubo un error al actualizar la compra. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleDeletePurchase = async (id) => {
    try {
      await deletePurchase(id);
      getPurchases();
    } catch (error) {
      console.error("Error al eliminar la compra:", error.response.data);
    }
  };

  const handleEditClick = (purchase) => {
    setSelectedPurchase(purchase);
    setSupplierId(purchase.supplierId);
    setPurchaseDate(dayjs(purchase.purchaseDate).format("YYYY-MM-DD"));
    setPurchaseDetails(purchase.purchaseDetails);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewDetails = (purchase) => {
    setSelectedPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
  };

  const resetForm = () => {
    setSupplierId("");
    setPurchaseDate("");
    setPurchaseDetails([{ productId: "", quantity: "", price: "" }]);
    setSelectedPurchase(null);
    setIsEditMode(false);
  };

  const getSupplierName = (id) => {
    const supplier = suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : "Desconocido";
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>COMPRAS</h1>
      <div className='py-5'>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Crear Compra
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className='text-xl font-bold mb-4'>
          {isEditMode
            ? "Editar Compra"
            : selectedPurchase
            ? "Detalles de Compra"
            : "Nueva Compra"}
        </h2>
        {selectedPurchase && !isEditMode ? (
          <div>
            <p>
              <strong>Proveedor:</strong>{" "}
              {getSupplierName(selectedPurchase.supplierId)}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {dayjs(selectedPurchase.purchaseDate)
                .utc()
                .format("MMMM DD, YYYY")}
            </p>
            <p>
              <strong>Monto Total:</strong> {selectedPurchase.totalAmount}
            </p>
            <h3 className='font-semibold mb-2'>Detalles de Productos:</h3>
            <table className='min-w-full bg-white border border-gray-200 rounded-xl'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b'>Producto</th>
                  <th className='py-2 px-4 border-b'>Cantidad</th>
                  <th className='py-2 px-4 border-b'>Precio</th>
                </tr>
              </thead>
              <tbody>
                {selectedPurchase.purchaseDetails.map((detail) => (
                  <tr key={detail.id} className='text-center'>
                    <td className='py-2 px-4 border-b'>
                      {products.find(
                        (product) => product.id === detail.productId
                      )?.name || "Producto no encontrado"}
                    </td>
                    <td className='py-2 px-4 border-b'>{detail.quantity}</td>
                    <td className='py-2 px-4 border-b'>{detail.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div className='mb-4'>
              <label className='block'>Proveedor:</label>
              <select
                value={supplierId}
                onChange={(e) => setSupplierId(e.target.value)}
                className='w-full p-2 border rounded mb-2'
              >
                <option value=''>Seleccione Proveedor</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              <label className='block'>Fecha de Compra:</label>
              <input
                type='date'
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className='w-full p-2 border rounded mb-2'
              />
              <h3 className='font-semibold mb-2'>Detalles de Compra:</h3>
              {purchaseDetails.map((detail, index) => (
                <div key={index} className='mb-4'>
                  <label className='block'>Producto:</label>
                  <select
                    value={detail.productId}
                    onChange={(e) =>
                      handleDetailChange(index, "productId", e.target.value)
                    }
                    className='w-full p-2 border rounded mb-2'
                  >
                    <option value=''>Seleccione un producto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <label className='block'>Cantidad:</label>
                  <input
                    type='number'
                    value={detail.quantity}
                    onChange={(e) =>
                      handleDetailChange(index, "quantity", e.target.value)
                    }
                    className='w-full p-2 border rounded mb-2'
                  />
                  <label className='block'>Precio:</label>
                  <input
                    type='number'
                    step='0.01'
                    onChange={(e) =>
                      handleDetailChange(index, "price", e.target.value)
                    }
                    className='w-full p-2 border rounded mb-2'
                  />
                </div>
              ))}
              <button
                onClick={handleAddDetail}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4'
              >
                Agregar Detalle
              </button>
              <div className='flex justify-end'>
                <button
                  onClick={handleCloseModal}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
                >
                  Cancelar
                </button>
                <button
                  onClick={
                    isEditMode ? handleUpdatePurchase : handleCreatePurchase
                  }
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  {isEditMode ? "Actualizar Compra" : "Crear Compra"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Proveedor</th>
              <th className='py-2 px-4 border-b'>Monto Total</th>
              <th className='py-2 px-4 border-b'>Fecha</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{purchase.id}</td>
                <td className='py-2 px-4 border-b'>
                  {getSupplierName(purchase.supplierId)}
                </td>
                <td className='py-2 px-4 border-b'>{purchase.totalAmount}</td>
                <td className='py-2 px-4 border-b'>
                  {dayjs(purchase.purchaseDate).utc().format("MMMM DD, YYYY")}
                </td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleViewDetails(purchase)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEditClick(purchase)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    onClick={() => handleDeletePurchase(purchase.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
