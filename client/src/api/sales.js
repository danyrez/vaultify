import axios from "./axios";

export const getSalesRequest = async () => axios.get("/sales");

export const createSaleRequest = async (sale) => axios.post("/sales", sale);

export const updateSaleRequest = async (id, sale) => axios.put(`/sales/${id}`, sale);

export const deleteSaleRequest = async (id) => axios.delete(`/sales/${id}`);