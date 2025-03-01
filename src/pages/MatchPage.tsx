import React, { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { fetchDogs, matchDogs } from "../services/api";
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

const Match: React.FC = () => {
  const { favorites } = useFavorites();
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMatch = async () => {
    if (favorites.length === 0) return;
    setLoading(true);

    try {
      const matchId = await matchDogs(favorites);
      const matchedDogData = await fetchDogs([matchId]);
      setMatchedDog(matchedDogData[0]);
    } catch (error) {
      console.error("Error finding match:", error);
    }

    setLoading(false);
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
            Find Your Perfect Match! 🐶
          </Typography>

          <Button
            onClick={handleMatch}
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            disabled={favorites.length === 0 || loading}
          >
            {loading ? "Finding Match..." : "Find My Match"}
          </Button>

          {matchedDog && (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="h5" fontWeight="bold">
                Your Match!
              </Typography>
              <Card sx={{ maxWidth: 400, mx: "auto", mt: 2 }}>
                <CardMedia
                  component="img"
                  image={matchedDog.img}
                  alt={matchedDog.name}
                  sx={{ width: "100%", height: 250, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {matchedDog.name}
                  </Typography>
                  <Typography variant="body2">
                    Breed: {matchedDog.breed}
                  </Typography>
                  <Typography variant="body2">Age: {matchedDog.age}</Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Match;
