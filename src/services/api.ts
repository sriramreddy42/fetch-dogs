import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Ensures auth cookie is sent with requests
    headers: {
        "Content-Type": "application/json",
    },
});

// Login function
export const login = async (name: string, email: string) => {
    return apiClient.post("/auth/login", { name, email });
};

// Logout function
export const logout = async () => {
    return apiClient.post("/auth/logout");
};

// Get available breeds (ok)
export const getBreeds = async () => {
    const response = await apiClient.get<string[]>("/dogs/breeds");
    return response.data;
};
// Get available breeds
export const getLocations = async () => {
    const response = await apiClient.get<string[]>("/locations/zip_codes");
    console.log(response);
    return response.data;
};

// Search for dogs
export const searchDogs = async (filters: any) => {
    const response = await apiClient.get("/dogs/search", { params: filters });
    return response.data;
};

// Fetch dog details
export const fetchDogs = async (dogIds: string[]) => {
    const response = await apiClient.post("/dogs", dogIds);
    return response.data;
};

// Match favorite dogs
export const matchDogs = async (dogIds: string[]) => {
    const response = await apiClient.post<{ match: string }>("/dogs/match", dogIds);
    return response.data.match;
};

