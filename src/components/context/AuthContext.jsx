"use client";

import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, setUser, setAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};





















// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   // Load user from localStorage
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const [accessToken, setAccessToken] = useState(() => {
//     return localStorage.getItem("accessToken") || null;
//   });

//   const [loading, setLoading] = useState(true);

//   // Stop loading after hydration
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   // LOGIN FUNCTION
//   const login = async (email, password) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return { success: false, message: data.message };
//       }

//       // Save user + token
//       setUser(data.user);
//       setAccessToken(data.token);

//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("accessToken", data.token);

//       return { success: true };
//     } catch (error) {
//       return { success: false, message: error.message };
//     }
//   };

//   // LOGOUT FUNCTION
//   const logout = () => {
//     setUser(null);
//     setAccessToken(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, accessToken, loading, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
