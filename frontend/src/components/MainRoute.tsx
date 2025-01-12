import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import OrdersPage from "../pages/OrdersPage"
import Navigation from "./Navigation"

const MainRoute = () => {
  return (
    <div>
      <Navigation/>
        <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/my-orders" element={<OrdersPage />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    </div>
  )
}

export default MainRoute