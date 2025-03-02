import axios from './axios';

export const getPurchasesRequest = async () => axios.get('/purchases');

export const createPurchaseRequest = async (purchase) => axios.post('/purchases', purchase);

export const updatePurchaseRequest = async (id, purchase) => axios.put(`/purchases/${id}`, purchase);

export const deletePurchaseRequest = async (id) => axios.delete(`/purchases/${id}`);