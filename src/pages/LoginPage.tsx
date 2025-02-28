import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Container, Paper, Typography, Box, TextField, Button, CircularProgress } from "@mui/material";

const LoginPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { handleLogin, error } = useAuth();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            alert("Please enter both name and email.");
            return;
        }

        setLoading(true);
        await handleLogin(name, email);
        setLoading(false);
    };

    return (
        <Container
            maxWidth="xs"
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative", // Enables absolute positioning for background
                backgroundColor: "#f4f4f4",
            }}
        >
            {/* Background Text Display */}
            <Typography
                variant="h1"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Center text
                    opacity: 0.1, // Faded background effect
                    fontSize: "10vw", // Adjust size dynamically
                    fontWeight: "bold",
                    whiteSpace: "nowrap", // Prevent text wrapping
                    pointerEvents: "none", // Avoid interfering with inputs
                }}
            >
                {name || "Enter Name"}
            </Typography>

            {/* Transparent Paper */}
            <Paper
                elevation={0} // Removes shadow
                sx={{
                    p: 4,
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white
                    backdropFilter: "blur(10px)", // Frosted glass effect
                    borderRadius: "12px", // Rounded corners
                    border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
                }}
            >
                {/* Fetch Logo */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                    <img
                        src="https://fetch.com/assets/images/graphics/footer-logo.svg"
                        alt="Fetch Logo"
                        width="150"
                        height="auto"
                    />
                </Box>

                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
