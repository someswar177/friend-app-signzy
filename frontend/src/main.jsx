import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
// import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Ensure AuthProvider is wrapping everything */}
      <BrowserRouter> {/* Ensure BrowserRouter is inside AuthProvider */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
