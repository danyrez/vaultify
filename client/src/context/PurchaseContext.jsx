import { createContext, useContext, useState } from "react";
import {
  getPurchasesRequest,
  createPurchaseRequest,
  updatePurchaseRequest,
  deletePurchaseRequest,
} from "../api/purchases";

const PurchaseContext = createContext();

export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) {
    throw new Error("usePurchases must be used within a PurchaseProvider");
  }
  return context;
};

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState([]);

  const getPurchases = async () => {
    const res = await getPurchasesRequest();
    setPurchases(res.data);
  };

  const deletePurchase = async (id) => {
    try {
      const res = await deletePurchaseRequest(id);
      if (res.status === 204)
        setPurchases(purchases.filter((purchase) => purchase.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createPurchase = async (purchase) => {
    try {
      const res = await createPurchaseRequest(purchase);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePurchase = async (id, purchase) => {
    try {
      await updatePurchaseRequest(id, purchase);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        getPurchases,
        deletePurchase,
        createPurchase,
        updatePurchase,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}
