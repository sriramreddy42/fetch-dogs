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

  useEffect(() => {
    async function getDogs() {
      if (dogIds.length > 0) {
        const dogData: Dog[] = await fetchDogs(dogIds); // Explicitly define type

        // Apply manual filtering for substring match if searchName exists
        let filteredDogs = dogData;
        if (searchName && searchName.trim() !== "") {
          const lowerCaseSearch = searchName.toLowerCase();
          filteredDogs = dogData.filter((dog: Dog) =>
            dog.name.toLowerCase().includes(lowerCaseSearch)
          );
        }

        setDogs(filteredDogs);
      }
    }
    getDogs();
  }, [dogIds, searchName]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 3, // Adds spacing between cards
        mt: 4,
      }}
    >
      {dogs.map((dog) => (
        <Box
          key={dog.id}
          sx={{
            width: { xs: "100%", sm: "48%" }, // Full width on mobile, 2 items per row on larger screens
            maxWidth: "350px",
          }}
        >
          <Card
            sx={{
              textAlign: "center",
              p: 2,
              borderRadius: "16px",
              boxShadow: 3,
              height: "100%", // Ensures all cards have the same height
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
              <Typography variant="body2">Location: {dog.zip_code}</Typography>
              <Button
                onClick={() => toggleFavorite(dog.id)}
                variant="contained"
                sx={{
                  mt: 2,
                  borderRadius: "8px",
                  backgroundColor: favorites.includes(dog.id) ? "red" : "gray",
                  color: "white",
                  "&:hover": {
                    backgroundColor: favorites.includes(dog.id)
                      ? "darkred"
                      : "darkgray",
                  },
                }}
              >
                {favorites.includes(dog.id) ? "Unfavorite" : "Favorite"}
              </Button>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default DogList;
