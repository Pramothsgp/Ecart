import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userData = await AsyncStorage.getItem("user");
      if(userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    };
    checkAuthentication();
},[]);
  const login = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    axios
      .post("http://localhost:8080/auth/agent-login", formData)
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data);
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const logout = () => {
    AsyncStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
