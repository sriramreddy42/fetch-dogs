import React, { useEffect, useState } from "react";
import { getLocations, getBreeds, searchDogs } from "../services/api";
import DogList from "../components/DogList";
import FavoriteDogs from "../components/FavoriteDogs";

import {
  Container,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const SearchPage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [selectedZipCode, setSelectedZipCode] = useState<string>("");
  const [allZipCodes, setAllZipCodes] = useState<string[]>([]);
  const [breedZipMap, setBreedZipMap] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [dogs, setDogs] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch available breeds on mount
  useEffect(() => {
    async function fetchBreeds() {
      try {
        const breedList = await getBreeds();
        setBreeds(breedList);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    }
    fetchBreeds();
  }, []);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const locationList = await getLocations();
        setZipCodes(locationList);
      } catch (error) {
        console.error("Error fetching Locations:", error);
      }
    }
    fetchLocations();
  }, []);

  // Fetch dogs based on filters
  const handleSearch = async () => {
    const filters: any = {
      size: 10,
      from: page * 10,
      sort: `breed:${sortOrder}`,
    };

    if (selectedBreed) filters.breeds = [selectedBreed];
    if (searchQuery) filters.name = searchQuery;
    if (selectedZipCode) filters.zipCodes = [selectedZipCode];
    if (ageMin) filters.ageMin = ageMin;
    if (ageMax) filters.ageMax = ageMax;

    try {
      const results = await searchDogs(filters);
      setDogs(results.resultIds);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page, sortOrder]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <AppBar position="static" color="default">
        <Toolbar>
          <img
            src="https://fetch.com/assets/images/graphics/footer-logo.svg"
            alt="Fetch Logo"
            height="40"
          />
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Fetch Dogs Search
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Filters Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search for Dogs 🐶
        </Typography>

        <Stack
          spacing={5}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          {/* Filter by Breed (Small Size) */}
          <FormControl sx={{ width: "450px" }} size="small">
            <InputLabel>Breed</InputLabel>
            <Select
              value={selectedBreed}
              onChange={(e) => {
                setSelectedBreed(e.target.value);
                setSelectedZipCode(""); // Reset zip when breed changes
              }}
              label="Breed"
            >
              <MenuItem value="">All Breeds</MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>
                  {breed}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filter by Zip Code (Dynamically Updated) */}
          <FormControl sx={{ width: "450px" }} size="small">
            <InputLabel>Zip Code</InputLabel>
            <Select
              value={selectedZipCode}
              onChange={(e) => setSelectedZipCode(e.target.value)}
              label="Location"
            >
              <MenuItem value="">All zipcodes</MenuItem>
              {zipCodes.map((zipCodes) => (
                <MenuItem key={zipCodes} value={zipCodes}>
                  {zipCodes}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Age Filters with Fixed Width */}
          <TextField
            label="Min Age"
            type="number"
            variant="outlined"
            size="small"
            value={ageMin}
            onChange={(e) =>
              setAgeMin(e.target.value ? Number(e.target.value) : "")
            }
            sx={{ width: "450px" }} // Fixed width
          />
          <TextField
            label="Max Age"
            type="number"
            variant="outlined"
            size="small"
            value={ageMax}
            onChange={(e) =>
              setAgeMax(e.target.value ? Number(e.target.value) : "")
            }
            sx={{ width: "450px" }} // Fixed width
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ width: "450px" }}
          >
            Search
          </Button>
        </Stack>

        {/* Search & Sorting Buttons */}
        <Stack spacing={2} direction="row" justifyContent="flexstart" mt={3}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </Stack>
      </Box>

      {/* Dog List */}
      <DogList dogIds={dogs} />

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" mt={3} spacing={2}>
        <Button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          variant="contained"
        >
          Previous
        </Button>
        <Button
          disabled={dogs.length === 0}
          onClick={() => setPage(page + 1)}
          variant="contained"
        >
          Next
        </Button>
      </Stack>

      {/* Favorite Dogs Section */}
      <FavoriteDogs />
    </Container>
  );
};

export default SearchPage;
