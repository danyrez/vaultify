import axios from "./axios";

export const getCategoriesRequest = async () => axios.get("/categories");

export const createCategoryRequest = async (category) => axios.post("/categories", category) 

export const updateCategoryRequest = async (id, category) => axios.put(`/categories/${id}`, category)

export const deleteCategoryRequest = async (id) => axios.delete(`/categories/${id}`)
