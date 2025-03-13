import {
  Instagram,
  Mail,
  Twitter,
  User,
  Lock,
  AtSign,
  EyeClosed,
  Eye,
  KeySquare,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../types/auth";
import UploadImage from "../components/UploadImage";
import authentication from "../api/authService/authentication";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showUploadImage, setShowUploadImage] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isotpSent, setIsotpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [userOtp, setUserOtp] = useState<string>("");

  const [user, setuser] = useState<userRegister>({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  
  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp.toString());
    if (user.password !== password) {
      toast.error("Passwords do not match", {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        position: "bottom-center",
        autoClose: 1000,
      });
      setIsValidPassword(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await authentication.sendOtp(user.email, otp.toString());
      toast.success(res.data.message, {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
      setIsotpSent(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong", {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const register = async () => {
    console.log(otp, userOtp);
    if (userOtp !== otp) {
      toast.error("Invalid OTP", {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await authentication.register(user);
      toast.success(res.data.message, {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response.data.message, {
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e: any) => {
    if (e instanceof File) {
      setuser((prev) => ({ ...prev, image: e }));
    } else if (e?.target) {
      setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      if (e.target.name === "password") {
        setIsValidPassword(e.target.value === password);
      }
    }
  };

  const confirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.value === user.password);
  };
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-blue-200 dark:from-blue-900 dark:to-blue-800">
      <div className="hidden lg:block w-1/2">
        <div
          className="h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
          }}
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create an Account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join our e-commerce community
              </p>
            </div>
            {isotpSent ? (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeySquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="useraname"
                    name="username"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                    type="text"
                    value={userOtp}
                    placeholder="OTP"
                    onChange={(e) => setUserOtp(e.target.value)}
                  />
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
                  <div className="relative">
                  <button
                    className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={register}
                  >
                    Verify
                  </button>
                    <p
                      className="text-sm text-gray-600 dark:text-gray-400 mt-5 text-right mr-5 hover:cursor-pointer hoover:underline hover:text-blue-800"
                      onClick={sendOtp}
                    >
                      Resend OTP
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="useraname"
                        name="username"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                        type="text"
                        value={user.username}
                        placeholder="John"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                      type="email"
                      value={user.email}
                      placeholder="john.doe@example.com"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                      type={showPassword ? "text" : "password"}
                      value={user.password}
                      placeholder="********"
                      onChange={handleChange}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    htmlFor="confirmpassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmpassword"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-colors"
                      type={showConfirmPassword ? "text" : "password"}
                      value={password}
                      name="confirmPassword"
                      placeholder="********"
                      onChange={confirmPassword}
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? <EyeClosed /> : <Eye />}
                    </div>
                  </div>
                </div>
                {password != "" && (
                  <div className="flex items-center justify-between">
                    {isValidPassword ? (
                      <p className="text-green-500">Password is valid</p>
                    ) : (
                      <p className="text-red-500">Password does not match</p>
                    )}
                  </div>
                )}

                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-full">
                    <button
                      className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setShowUploadImage((prev) => !prev)}
                    >
                      Upload image
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <Link
                      to="#"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="#"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Privacy Policy
                    </Link>
                  </label>
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
                    onClick={sendOtp}
                  >
                    Create Account
                  </button>
                )}

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or sign up with
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
            )}
            <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      {showUploadImage && (
        <UploadImage
          handleChange={handleChange}
          closeTab={() => setShowUploadImage(false)}
        />
      )}
    </div>
  );
};

export default Signup;
