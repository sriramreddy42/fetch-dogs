import React, { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { fetchDogs } from "../services/api";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

const Favorites: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadFavorites = async () => {
      if (favorites.length > 0) {
        const dogData = await fetchDogs(favorites);
        setDogs(dogData);
      }
    };
    loadFavorites();
  }, [favorites]);

  // ✅ Clears favorites and removes displayed dogs
  const handleClearFavorites = () => {
    clearFavorites();
    setDogs([]);
  };

  return (
    <>
      <AppBar
        position="fixed" // Keeps it fixed while scrolling
        color="primary"
        elevation={5}
        sx={{
          width: "100%",
          margin: 0,
          padding: 0,
          top: 0,
          left: 0,
          zIndex: 1100, // Ensures it's always above other content
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            <img
              src="https://fetch.com/assets/images/graphics/footer-logo.svg"
              alt="Fetch Logo"
              height="40"
            />
            __Dogs Search
          </Typography>
          <Paper>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Button
                onClick={() => navigate("/match")}
                variant="contained"
                color="primary"
                disabled={favorites.length === 0}
                sx={{ mr: 0.5 }}
              >
                Find Match
              </Button>
              <Button
                onClick={() => navigate("/search")}
                variant="contained"
                color="primary"
              >
                Home
              </Button>
            </Box>
          </Paper>
        </Toolbar>
      </AppBar>
      {/* ✅ Prevent Overlapping by Adding Margin to Content */}
      <Box sx={{ mt: 12, p: 3 }}>
        {/* ✅ Favorite Dogs Section */}
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Your Favorite Dogs
          </Typography>

          {dogs.length === 0 ? (
            <Typography color="textSecondary" sx={{ mt: 2 }}>
              No favorite dogs yet.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 3, // Adds spacing between cards
                mt: 2,
              }}
            >
              {dogs.map((dog) => (
                <Box
                  key={dog.id}
                  sx={{
                    width: { xs: "100%", sm: "48%", md: "30%" }, // 1 item per row on mobile, 2 on small screens, 3 on larger
                    maxWidth: "350px",
                  }}
                >
                  <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      image={dog.img}
                      alt={dog.name}
                      sx={{ width: "100%", height: 200, objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {dog.name}
                      </Typography>
                      <Typography variant="body2">
                        Breed: {dog.breed}
                      </Typography>
                      <Typography variant="body2">Age: {dog.age}</Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}

          {dogs.length > 0 && (
            <Button
              onClick={handleClearFavorites}
              variant="contained"
              color="error"
              sx={{ mt: 3 }}
            >
              Clear Favorites
            </Button>
          )}
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Favorites;
