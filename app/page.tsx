"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";

const HomePage = () => (
  <Box
    sx={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      px: 3,
    }}
  >
    <Typography variant="h4" gutterBottom>
      👋 Welcome to the Full Stack Assessment App
    </Typography>

    <Typography variant="body1" sx={{ mb: 4, textAlign: "center" }}>
      Use the navigation below to access the Numbers and Grades features.
    </Typography>

    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <Link href="/numbers">
        <Button variant="contained" color="primary">
          Go to Numbers
        </Button>
      </Link>

      <Link href="/grades">
        <Button variant="outlined" color="secondary">
          Go to Grades
        </Button>
      </Link>
    </Stack>
  </Box>
);

export default HomePage;
