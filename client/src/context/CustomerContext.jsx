import { createContext, useContext, useState } from "react";
import {
  getCustomersRequest,
  createCustomerRequest,
  updateCustomerRequest,
  deleteCustomerRequest,
} from "../api/customers";

const CustomerContext = createContext();

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const res = await getCustomersRequest();
    setCustomers(res.data);
  };

  const deleteCustomer = async (id) => {
    try {
      const res = await deleteCustomerRequest(id);
      if (res.status === 204)
        setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createCustomer = async (customer) => {
    try {
      const res = await createCustomerRequest(customer);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async (id, customer) => {
    try {
      await updateCustomerRequest(id, customer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        getCustomers,
        deleteCustomer,
        createCustomer,
        updateCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
