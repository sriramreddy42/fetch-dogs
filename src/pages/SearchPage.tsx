import React, { useEffect, useState } from "react";
import { getBreeds, searchDogs } from "../services/api";
import DogList from "../components/DogList";
import FavoriteDogs from "../components/FavoriteDogs";
import Footer from "../components/Footer";
import { debounce } from "lodash";
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
  Pagination,
  CircularProgress,
} from "@mui/material";
const SearchPage: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>(""); // Single string instead of an array
  const [selectedZipCode, setSelectedZipCode] = useState<string>("");
  const [ageMin, setAgeMin] = useState<number | "">("");
  const [ageMax, setAgeMax] = useState<number | "">("");
  const [dogs, setDogs] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false);

  const handleNameChange = debounce((value: string) => {
    setName(value);

    if (value.trim()) {
      // Reset all filters when searching by name
      setSelectedBreed("");
      setZipCode("");
      setAgeMin("");
      setAgeMax("");
    }

    handleSearch();
  }, 500);

  const handleMinAgeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newMinAge = e.target.value ? Number(e.target.value) : "";

    if (newMinAge !== "" && ageMax !== "" && newMinAge > ageMax) {
      setAgeMax(newMinAge);
    }

    setAgeMin(newMinAge);
  };

  const handleMaxAgeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newMaxAge = e.target.value ? Number(e.target.value) : "";

    if (newMaxAge !== "" && ageMin !== "" && newMaxAge < ageMin) {
      setAgeMin(newMaxAge);
    }

    setAgeMax(newMaxAge);
  };

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

  // Fetch dogs based on filters
  const handleSearch = async () => {
    setLoading(true);
    const filters: any = {
      size: 25,
      from: page * 25,
      sort: `breed:${sortOrder}`,
    };
    if (name.trim()) {
      // If searching by name, ignore all other filters
      filters.name = name.toLowerCase();
    } else {
      if (selectedBreed) filters.breeds = [selectedBreed];
      if (zipCode.trim()) filters.zipCodes = [zipCode]; // Convert string to array
      if (ageMin) filters.ageMin = ageMin;
      if (ageMax) filters.ageMax = ageMax;
    }

    try {
      const results = await searchDogs(filters);

      if (results.resultIds.length === 0) {
        setDogs([]); // No results found
      } else {
        setDogs(results.resultIds);
      }

      setTotal(results.total);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setDogs([]); // Handle API error by clearing the list
    } finally {
      setLoading(false);
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
              {/* Name Filters with Fixed Width */}
              <TextField
                label="Search by Zip Code"
                type="text"
                variant="outlined"
                size="small"
                value={zipCode} // Bind value to the single string state
                onChange={(e) => {
                  setZipCode(e.target.value);
                  setName("");
                }} // Update state correctly
                sx={{ width: "150px" }}
              />
            </FormControl>

            {/* Age Filters with Fixed Width */}
            <TextField
              label="Min Age"
              type="number"
              variant="outlined"
              size="small"
              inputProps={{ min: 1 }}
              value={ageMin}
              onChange={(e) => {
                handleMinAgeChange(e); // Call function properly with event argument
                setName(""); // Reset name when age filter is used
                handleSearch(); // Trigger search
              }}
              sx={{ width: "450px" }} // Fixed width
            />
            <TextField
              label="Max Age"
              type="number"
              variant="outlined"
              size="small"
              inputProps={{ min: 1 }}
              value={ageMax}
              onChange={(e) => {
                handleMaxAgeChange(e); // Fix function call
                setName(""); // Reset name when age filter is used
                handleSearch(); // Trigger search with updated age filter
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <DogList dogIds={dogs} searchName={name} />
        )}
        {/* Pagination */}
        <Stack direction="row" justifyContent="center" mt={8} spacing={20}>
          <Pagination
            count={Math.ceil(total / 25)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage;
