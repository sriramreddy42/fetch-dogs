import React, { useEffect, useState } from "react";
import { getLocations, getBreeds, searchDogs } from "../services/api";
import DogList from "../components/DogList";
import FavoriteDogs from "../components/FavoriteDogs";
import { debounce } from "lodash";
import { SelectChangeEvent } from "@mui/material";

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
  Stack,
  Paper,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const SearchPage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [selectedZipCode, setSelectedZipCode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [dogs, setDogs] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const handleNameChange = debounce((value: string) => {
    setName(value);

    if (value.trim()) {
      // Reset all filters when searching by name
      setSelectedBreed("");
      setSelectedZipCode("");
      setAgeMin("");
      setAgeMax("");
    }

    handleSearch();
  }, 500);

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
    if (name.trim()) {
      // If searching by name, ignore all other filters
      filters.name = name.toLowerCase();
    } else {
      if (selectedBreed) filters.breeds = [selectedBreed];
      // if (searchQuery) filters.name = searchQuery;
      if (selectedZipCode) filters.zipCodes = [selectedZipCode];
      if (ageMin) filters.ageMin = ageMin;
      if (ageMax) filters.ageMax = ageMax;
    }

    try {
      const results = await searchDogs(filters);
      setDogs(results.resultIds);
      setTotal(results.total);
    } catch (error) {
      console.error("Error fetching dogs:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page, sortOrder]);

  return (
    <>
      {/* Header */}

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
          <FavoriteDogs />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 18 }}>
        {/* Filters Section */}
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" gutterBottom>
            Search for Dogs 🐶
          </Typography>

          <Stack
            spacing={5}
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
          >
            {/* Name Filters with Fixed Width */}
            <TextField
              label="Search by Name"
              type="text"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              sx={{ width: "450px" }}
            />
            {/* Filter by Breed (Small Size) */}
            {/* Filter by Breed (Small Size) */}
            <FormControl sx={{ width: "450px" }} size="small">
              <InputLabel>Breed</InputLabel>
              <Select
                value={selectedBreed}
                onChange={(e) => {
                  setSelectedBreed(e.target.value);
                  setName(""); // Reset name when breed is selected
                  handleSearch();
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
                onChange={(e) => {
                  setSelectedZipCode(e.target.value);
                  setName(""); // Reset name when zip code is selected
                  handleSearch();
                }}
                label="Zip Code"
              >
                <MenuItem value="">All Zip Codes</MenuItem>
                {zipCodes.map((zip) => (
                  <MenuItem key={zip} value={zip}>
                    {zip}
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
              onChange={(e) => {
                setAgeMin(e.target.value ? Number(e.target.value) : "");
                setName(""); // Reset name when age filter is used
                handleSearch();
              }}
              sx={{ width: "450px" }} // Fixed width
            />
            <TextField
              label="Max Age"
              type="number"
              variant="outlined"
              size="small"
              value={ageMax}
              onChange={(e) => {
                setAgeMax(e.target.value ? Number(e.target.value) : "");
                setName(""); // Reset name when age filter is used
                handleSearch();
              }}
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
        <DogList dogIds={dogs} searchName={name} />
        {/* Pagination */}
        <Stack direction="row" justifyContent="center" mt={8} spacing={20}>
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
      </Container>
    </>
  );
};

export default SearchPage;
