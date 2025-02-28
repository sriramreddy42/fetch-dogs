import { useState } from "react";
import { login, logout } from "../services/api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (name: string, email: string) => {
        try {
            await login(name, email);
            localStorage.setItem("isAuthenticated", "true"); // Store login state
            navigate("/search"); // Redirect to search page
        } catch (err) {
            setError("Login failed. Please try again.");
            console.error("Login error:", err);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("isAuthenticated"); // Clear session
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return { handleLogin, handleLogout, error };
};
