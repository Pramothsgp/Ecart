import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import OrdersPage from "../pages/OrdersPage";
import Navigation from "./Navigation";
import ProductDetailsLoading from "../loading/ProductDetailsLoading";
const ProductDetails = lazy(() => import("./ProductDetails"));
import Cart from "../pages/Cart";
const MainRoute = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products/:id"
          element={
            <Suspense fallback={<ProductDetailsLoading />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route path="/my-orders" element={<OrdersPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
};

export default MainRoute;
