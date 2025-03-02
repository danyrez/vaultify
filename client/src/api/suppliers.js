import axios from './axios'

export const getSuppliersRequest = async () => axios.get('/suppliers')

export const createSupplierRequest = async (supplier) => axios.post('/suppliers', supplier)

export const updateSupplierRequest = async (id, supplier) => axios.put(`/suppliers/${id}`, supplier)

export const deleteSupplierRequest = async (id) => axios.delete(`/suppliers/${id}`)