import { useEffect, useState } from "react";
import { useSales } from "../../context/SaleContext";
import { useCustomers } from "../../context/CustomerContext";
import { useProducts } from "../../context/ProductContext";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Modal from "../../components/Modal";

dayjs.extend(utc);

export default function SalePage() {
  const { sales, getSales, createSale, updateSale, deleteSale } = useSales();
  const { customers, getCustomers } = useCustomers();
  const { products, getProducts } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [customerId, setCustomerId] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [saleDetails, setSaleDetails] = useState([
    { productId: "", quantity: "", price: "" },
  ]);

  useEffect(() => {
    getSales();
    getCustomers();
    getProducts();
  }, []);

  const handleAddDetail = () => {
    setSaleDetails([
      ...saleDetails,
      { productId: "", quantity: "", price: "" },
    ]);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = saleDetails.map((detail, i) =>
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

    setSaleDetails(updatedDetails);
  };

  const handleCreateSale = async () => {
    const formattedDate = dayjs(saleDate).toISOString();
    const sale = {
      customerId: parseInt(customerId),
      saleDate: formattedDate,
      saleDetails: saleDetails.map((detail) => ({
        productId: parseInt(detail.productId),
        quantity: parseInt(detail.quantity),
        price: parseFloat(detail.price),
      })),
    };
    try {
      await createSale(sale);
      setIsModalOpen(false);
      resetForm();
      getSales();
    } catch (error) {
      console.error("Error al crear la venta:", error.response.data);
    }
  };

  const handleUpdateSale = async () => {
    const formattedDate = dayjs(saleDate).toISOString();
    const updatedSale = {
      customerId: parseInt(customerId),
      saleDate: formattedDate,
      saleDetails: saleDetails.map((detail) => ({
        productId: parseInt(detail.productId),
        quantity: parseInt(detail.quantity),
        price: parseFloat(detail.price),
      })),
    };
    try {
      await updateSale(selectedSale.id, updatedSale);
      setIsModalOpen(false);
      resetForm();
      getSales();
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      alert(
        "Hubo un error al actualizar la venta. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      await deleteSale(id);
      getSales();
    } catch (error) {
      console.error("Error al eliminar la venta:", error.response.data);
    }
  };

  const handleEditClick = (sale) => {
    setSelectedSale(sale);
    setCustomerId(sale.customerId);
    setSaleDate(dayjs(sale.saleDate).format("YYYY-MM-DD"));
    setSaleDetails(sale.saleDetails);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleViewDetails = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  const resetForm = () => {
    setCustomerId("");
    setSaleDate("");
    setSaleDetails([{ productId: "", quantity: "", price: "" }]);
    setSelectedSale(null);
    setIsEditMode(false);
  };

  const getCustomerName = (id) => {
    const customer = customers.find((customer) => customer.id === id);
    return customer ? customer.firstName : "Desconocido";
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4 text-center'>VENTAS</h1>
      <div className='py-5'>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Crear Venta
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className='text-xl font-bold mb-4'>
          {isEditMode
            ? "Editar Venta"
            : selectedSale
            ? "Detalles de Venta"
            : "Nueva Venta"}
        </h2>
        {selectedSale && !isEditMode ? (
          <div>
            <p>
              <strong>Cliente:</strong>{" "}
              {getCustomerName(selectedSale.customerId)}
            </p>
            <p>
              <strong>Fecha:</strong>{" "}
              {dayjs(selectedSale.saleDate).utc().format("MMMM DD, YYYY")}
            </p>
            <p>
              <strong>Monto Total:</strong> {selectedSale.totalAmount}
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
                {selectedSale.saleDetails.map((detail) => (
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
              <label className='block'>Cliente:</label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className='w-full p-2 border rounded mb-2'
              >
                <option value=''>Seleccione Cliente</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.firstName}
                  </option>
                ))}
              </select>
              <label className='block'>Fecha de Venta:</label>
              <input
                type='date'
                value={saleDate}
                onChange={(e) => setSaleDate(e.target.value)}
                className='w-full p-2 border rounded mb-2'
              />
              <h3 className='font-semibold mb-2'>Detalles de Venta:</h3>
              {saleDetails.map((detail, index) => (
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
                    value={detail.price}
                    onChange={(e) =>
                      handleDetailChange(index, "price", e.target.value)
                    }
                    className='w-full p-2 border rounded mb-2'
                    readOnly // Hacer que el campo de precio sea de solo lectura
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
                  onClick={isEditMode ? handleUpdateSale : handleCreateSale}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                  {isEditMode ? "Actualizar Venta" : "Crear Venta"}
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
              <th className='py-2 px-4 border-b'>Cliente</th>
              <th className='py-2 px-4 border-b'>Monto Total</th>
              <th className='py-2 px-4 border-b'>Fecha</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{sale.id}</td>
                <td className='py-2 px-4 border-b'>
                  {getCustomerName(sale.customerId)}
                </td>
                <td className='py-2 px-4 border-b'>{sale.totalAmount}</td>
                <td className='py-2 px-4 border-b'>
                  {dayjs(sale.saleDate).utc().format("MMMM DD, YYYY")}
                </td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleViewDetails(sale)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleEditClick(sale)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                    onClick={() => handleDeleteSale(sale.id)}
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
