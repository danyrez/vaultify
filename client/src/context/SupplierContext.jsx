import { createContext, useContext, useState } from "react";
import {
  getSuppliersRequest,
  createSupplierRequest,
  deleteSupplierRequest,
  updateSupplierRequest,
} from "../api/suppliers";

const SupplierContext = createContext();

export const useSuppliers = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSuppliers must be used within a SupplierProvider");
  }
  return context;
};

export function SupplierProvider({ children }) {
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = async () => {
    const res = await getSuppliersRequest();
    setSuppliers(res.data);
  };

  const createSupplier = async (supplier) => {
    try {
      const res = await createSupplierRequest(supplier);
      setSuppliers([...suppliers, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      const res = await deleteSupplierRequest(id);
      if (res.status === 204)
        setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateSupplier = async (id, supplier) => {
    try {
      await updateSupplierRequest(id, supplier);
      setSuppliers(suppliers.map((s) => (s.id === id ? supplier : s)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        getSuppliers,
        createSupplier,
        deleteSupplier,
        updateSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
}
