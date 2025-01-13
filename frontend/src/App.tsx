import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import MainRoute from "./components/MainRoute";
import Signup from "./pages/Signup";
import AdminLanding from "./admin/pages/AdminLanding";
import { ToastContainer } from "react-toastify";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      localStorage.setItem("theme", theme);
      document.documentElement.classList.add(theme);
      return;
    }
    const theme = localStorage.getItem("theme");
    if ((theme === "dark" || theme === "light") && theme) {
      document.documentElement.classList.add(theme);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home/*" element={<MainRoute />} />
            <Route path="/admin/*" element={<AdminLanding />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
