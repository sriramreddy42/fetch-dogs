import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section - Links & Socials */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography>
            <img
              src="https://fetch.com/assets/images/graphics/footer-logo.svg"
              alt="Fetch Logo"
              height="100"
            />
          </Typography>
          {/* Navigation Links */}
          <Stack direction="row" spacing={3}>
            <Link
              href="/"
              color="inherit"
              underline="none"
              sx={{ fontWeight: "bold" }}
            >
              LogOut
            </Link>
            <Link
              href="/search"
              color="inherit"
              underline="none"
              sx={{ fontWeight: "bold" }}
            >
              Search
            </Link>
          </Stack>

          {/* Social Icons */}
          <Stack direction="row" spacing={2}>
            <IconButton
              href="https://github.com/sriramreddy42"
              target="_blank"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/sriram-b-875a06324/"
              target="_blank"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="mailto:sbandari@careerattainment.com"
              color="inherit"
            >
              <EmailIcon />
            </IconButton>
          </Stack>
        </Stack>

        {/* Bottom Section - Copyright */}
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          © {new Date().getFullYear()} Fetch. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
