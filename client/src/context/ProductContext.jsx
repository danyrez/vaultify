import { createContext, useContext, useState } from "react";
import {
  getProductsRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
  getProductsByCategoryRequest,
} from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await getProductsRequest();
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204)
        setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsByCategory = async (categoryId) => {
    const res = await getProductsByCategoryRequest(categoryId);
    setProducts(res.data);
  };
  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        deleteProduct,
        createProduct,
        updateProduct,
        getProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
