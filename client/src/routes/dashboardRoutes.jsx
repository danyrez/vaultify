import {
  ProductPage,
  CategoryPage,
  SalePage,
  PurchasePage,
  CustomerPage,
  SupplierPage,
  ProfilePage,
} from "../pages/Dashboard";

const dashboardRoutes = [
  { path: "products", element: <ProductPage /> },
  { path: "categories", element: <CategoryPage /> },
  { path: "sales", element: <SalePage /> },
  { path: "purchases", element: <PurchasePage /> },
  { path: "customers", element: <CustomerPage /> },
  { path: "suppliers", element: <SupplierPage /> },
  { path: "profile", element: <ProfilePage /> },
];

export default dashboardRoutes;
