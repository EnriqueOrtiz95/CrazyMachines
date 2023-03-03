import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./normalize.css"
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
