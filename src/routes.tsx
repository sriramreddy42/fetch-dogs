import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import Favorites from "./pages/FavoritesPage";
import Match from "./pages/MatchPage";

// Protect pages that require authentication
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/search" element={<PrivateRoute element={<SearchPage />} />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/match" element={<Match />} />
  </Routes>
);

export default AppRoutes;
