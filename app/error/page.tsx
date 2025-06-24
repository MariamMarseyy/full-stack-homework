"use client";

import { Box, Typography, Button, Paper } from "@mui/material";

const ErrorBoundary = () => (
  <Box
    sx={{
      p: 2,
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      bgcolor: "#f9f9f9",
    }}
  >
    <Paper
      elevation={6}
      sx={{
        p: { xs: 3, md: 5 },
        maxWidth: 500,
        width: "100%",
        textAlign: "center",
        borderRadius: 3,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" color="error" fontWeight={600} gutterBottom>
        Oops! Something went wrong.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
        Sorry for the inconvenience. An unexpected error has occurred.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/")}
        sx={{
          px: 4,
          py: 1.2,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 2,
          transition: "all 0.3s ease",
          ":hover": {
            bgcolor: "primary.dark",
            transform: "translateY(-1px)",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        Go Back Home
      </Button>
    </Paper>
  </Box>
);

export default ErrorBoundary;
