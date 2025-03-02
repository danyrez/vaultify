import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import AppProviders from "./routes/AppProviders";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import { LoginPage, RegisterPage } from "./pages/Auth";
import dashboardRoutes from "./routes/dashboardRoutes";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<Layout />}>
                <Route
                  index
                  element={<Navigate to='/dashboard/products' replace />}
                />
                {dashboardRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
