import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  AuthContextType,
  AuthProviderProps,
  DecodedToken,
  User,
} from "../types/auth";

// Create AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  setToken: () => {},
  logout: () => {},
});

// Function to decode JWT safely
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const res = JSON.parse(atob(base64));

    // Ensure `user` is an object (sometimes it's a string)
    res.user = typeof res.user === "string" ? JSON.parse(res.user) : res.user;
    return res;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isValid , setIsValid] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if(!user && !isValid){
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      )
        navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (isValid) {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      )
        navigate("/home");
    }
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      const decoded = decodeJWT(token);

      if (decoded?.user) {
        setUser(decoded.user);
      }
      setIsValid(true);
      if (["/login", "/signup"].includes(window.location.pathname)) {
        navigate("/home");
      }
    } else {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      )
        navigate("/login");
    }
  }, [navigate]);

  // Function to check if the token is valid
  const isTokenValid = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch (error) {
      return false;
    }
  };

  // Function to set a new token and update user state
  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = decodeJWT(token);
    setUser(decoded?.user || null);
  };

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsValid(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
