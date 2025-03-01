import React, { useEffect, useState } from "react";
import { fetchDogs } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const DogList: React.FC<{ dogIds: string[]; searchName?: string }> = ({
  dogIds,
  searchName,
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getDogs() {
      setLoading(true);
      if (dogIds.length > 0) {
        const dogData: Dog[] = await fetchDogs(dogIds);

        // Apply manual filtering for substring match if searchName exists
        let filteredDogs = dogData;
        if (searchName && searchName.trim() !== "") {
          const lowerCaseSearch = searchName.toLowerCase();
          filteredDogs = dogData.filter((dog: Dog) =>
            dog.name.toLowerCase().includes(lowerCaseSearch)
          );
        }

        setDogs(filteredDogs);
      } else {
        setDogs([]);
      }
      setLoading(false);
    }
    getDogs();
  }, [dogIds, searchName]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 3,
        mt: 4,
      }}
    >
      {dogs.length === 0 ? (
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ width: "100%", color: "red", fontWeight: "bold" }}
        >
          No dogs found. Try adjusting your filters! 🐶
        </Typography>
      ) : (
        dogs.map((dog) => (
          <Box
            key={dog.id}
            sx={{
              width: { xs: "100%", sm: "48%" },
              maxWidth: "350px",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: "16px",
                boxShadow: 3,
                height: "100%",
              }}
            >
              {/* Fixed Image Size */}
              <CardMedia
                component="img"
                image={dog.img}
                alt={dog.name}
                sx={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {dog.name}
                </Typography>
                <Typography variant="body2">Breed: {dog.breed}</Typography>
                <Typography variant="body2">Age: {dog.age}</Typography>
                <Typography variant="body2">
                  Location: {dog.zip_code}
                </Typography>
                <Button
                  onClick={() => toggleFavorite(dog.id)}
                  variant="contained"
                  sx={{
                    mt: 2,
                    borderRadius: "8px",
                    backgroundColor: favorites.includes(dog.id)
                      ? "error.main"
                      : "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: favorites.includes(dog.id)
                        ? "error.dark"
                        : "primary.dark",
                    },
                  }}
                >
                  {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))
      )}
    </Box>
  );
};

export default DogList;
