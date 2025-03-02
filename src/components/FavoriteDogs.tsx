import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Button, Box } from "@mui/material";

const FavoriteDogs: React.FC = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove auth token from storage
    sessionStorage.clear(); // Clear session storage (if used)
    navigate("/"); // Redirect to login page
  };

  return (
    <Paper elevation={1} sx={{ p: 0.5, mt: 2, borderRadius: 1 }}>
      <Typography variant="h5" fontWeight="bold" align="center">
        Your Favorite Dogs
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
        <Button
          onClick={() => navigate("/favorites")}
          variant="contained"
          color="primary"
          sx={{ mr: 0.5 }}
        >
          Load Favorites
        </Button>
        <Button
          onClick={() => navigate("/match")}
          variant="contained"
          color="success"
          disabled={favorites.length === 0}
        >
          Find My Match
        </Button>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Paper>
  );
};

export default FavoriteDogs;
