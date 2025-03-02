import { createContext, useContext, useState } from "react";
import {
  getCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  deleteCategoryRequest,
} from "../api/categories";

const CategoryContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const res = await getCategoriesRequest();
    setCategories(res.data);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await deleteCategoryRequest(id);
      if (res.status === 204)
        setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (category) => {
    try {
      const res = await createCategoryRequest(category);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (id, category) => {
    try {
      await updateCategoryRequest(id, category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        deleteCategory,
        createCategory,
        updateCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
