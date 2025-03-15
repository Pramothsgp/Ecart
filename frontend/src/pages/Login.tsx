import { Instagram, Mail, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import authentication from "../api/authService/authentication";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { ColorRing } from "react-loader-spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const handleChange = (e: any) => {
    setUserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await authentication.login(userdata);
      setToken(res.token);
      toast.success("Login successful",{
        autoClose: 2000,
        position: "top-right",
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
      navigate("/home");
    } catch (err) {
      alert("Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-blue-200 dark:from-blue-900 dark:to-blue-800">
      <div className="hidden lg:block w-1/2">
        <div
          className="h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
          }}
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Please sign in to your account
              </p>
            </div>

            <form
              className="space-y-6"
              onChange={handleChange}
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="#"
                  className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
              {isLoading ? (
                <div className="flex justify-center">
                  <ColorRing
                    visible={true}
                    height={"80"}
                    width="80"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={
                      localStorage.getItem("theme") === "dark"
                        ? [
                            "#616161", // Dark Grey
                            "#455A64", // Deep Blue-Grey
                            "#37474F", // Charcoal
                            "#546E7A", // Steel Blue-Grey
                            "#263238", // Almost Black
                          ]
                        : [
                            "#E0E0E0", // Light Grey
                            "#B0BEC5", // Muted Blue-Grey
                            "#90A4AE", // Soft Teal Grey
                            "#8D6E63", // Warm Brownish Grey
                            "#78909C", // Cool Slate Grey
                          ]
                    }
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  Sign in
                </button>
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Twitter className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Instagram className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              New to E-commerce?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
