import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ErrorComponent = ({ message }) => (
  <Box
    sx={{
      textAlign: "center",
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#f44336",
      color: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      animation: `${fadeIn} 0.5s ease-in-out`,
    }}
  >
    <Typography variant="h5" gutterBottom>
      Error
    </Typography>
    <Typography variant="body1">{message}</Typography>
  </Box>
);

export default ErrorComponent;
