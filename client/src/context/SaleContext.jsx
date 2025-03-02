import { createContext, useContext, useState } from "react";
import {
  getSalesRequest,
  createSaleRequest,
  updateSaleRequest,
  deleteSaleRequest,
} from "../api/sales";

const SaleContext = createContext();

export const useSales = () => {
  const context = useContext(SaleContext);
  if (!context) {
    throw new Error("useSales must be used within a SaleProvider");
  }
  return context;
};

export function SaleProvider({ children }) {
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const res = await getSalesRequest();
    setSales(res.data);
  };

  const deleteSale = async (id) => {
    try {
      const res = await deleteSaleRequest(id);
      if (res.status === 204) setSales(sales.filter((sale) => sale.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createSale = async (sale) => {
    try {
      const res = await createSaleRequest(sale);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateSale = async (id, sale) => {
    try {
      await updateSaleRequest(id, sale);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SaleContext.Provider
      value={{
        sales,
        getSales,
        deleteSale,
        createSale,
        updateSale,
      }}
    >
      {children}
    </SaleContext.Provider>
  );
}
