import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";

// Protect pages that require authentication
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? element : <Navigate to="/" />;
};

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/search" element={<PrivateRoute element={<SearchPage />} />} />
    </Routes>
);

export default AppRoutes;
