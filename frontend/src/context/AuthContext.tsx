import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { AuthContextType, AuthProviderProps, DecodedToken, User } from "../types/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType>({
  user: null,
  setToken: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children } : AuthProviderProps) => {
  const [user, setUser] = useState<User | null >(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      const decoded: DecodedToken = jwtDecode(token) as any;
      if (decoded.user) {
        setUser(JSON.parse(decoded.user));
      }
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      ) {
        navigate("/home");
      }
    }
  }, []);

  const isTokenValid = (token : string ) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
  };

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: DecodedToken = jwtDecode(token);
    setUser(JSON.parse(decoded.user) || null);
  };


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
