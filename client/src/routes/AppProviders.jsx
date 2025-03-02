import { AuthProvider } from "../context/AuthContext";
import { CategoryProvider } from "../context/CategoryContext";
import { ProductProvider } from "../context/ProductContext";
import { SaleProvider } from "../context/SaleContext";
import { PurchaseProvider } from "../context/PurchaseContext";
import { CustomerProvider } from "../context/CustomerContext";
import { SupplierProvider } from "../context/SupplierContext";

const providers = [
  AuthProvider,
  SupplierProvider,
  CustomerProvider,
  PurchaseProvider,
  SaleProvider,
  CategoryProvider,
  ProductProvider,
];

const AppProviders = ({ children }) =>
  providers.reduce((acc, Provider) => <Provider>{acc}</Provider>, children);

export default AppProviders;
