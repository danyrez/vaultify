import axios from "./axios";

export const getCustomersRequest = async () => axios.get("/customers");

export const createCustomerRequest = async (customer) => axios.post("/customers", customer);

export const updateCustomerRequest = async (id, customer) => axios.put(`/customers/${id}`, customer);

export const deleteCustomerRequest = async (id) => axios.delete(`/customers/${id}`);
