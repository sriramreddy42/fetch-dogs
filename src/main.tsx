import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./styles/global.css"; // tailwind css

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/fetch-dogs">
      <FavoritesProvider>
        <AppRoutes />
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
