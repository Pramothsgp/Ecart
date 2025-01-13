import { Route, Routes } from "react-router-dom"
import AddProducts from "./AddProducts"


const AdminLanding = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<div>Admin Landing</div>} />
        <Route path="/orders" element={<div>Admin Orders</div>} />
        <Route path="/products" element={<div>Admin Products</div>} />
        <Route path="/customers" element={<div>Admin Customers</div>} />
        <Route path="/settings" element={<div>Admin Settings</div>} />
        <Route path="/add-products" element={<AddProducts />} />
        </Routes>
    </div>
  )
}

export default AdminLanding