import React, { useState } from "react";
import { Box, Button, Modal, Typography, LinearProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  onDecline,
  price,
  share,
  security,
  selected,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [progress, setProgress] = useState(0);

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 500);
    setTimeout(() => {
      clearInterval(interval);
      onConfirm();
    }, 5000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          p: 4,
          minWidth: 300,
          textAlign: "center",
          boxShadow: theme.shadows[5],
        }}
      >
        <Typography variant="h6" id="modal-title" sx={{ mb: 2 }}>
          Confirm Purchase
        </Typography>
        <Typography id="modal-description" sx={{ mb: 2 }}>
          <strong>Security:</strong> {security} <br />
          <strong>Shares:</strong> {share} <br />
          <strong>Price:</strong> ${price} <br />
          <strong>Trade Type:</strong> {selected}
        </Typography>

        {/* LinearProgress component */}
        {progress > 0 && (
          <LinearProgress
            variant="determinate"
            value={progress}
            color={theme.palette.mode === "dark" ? "secondary" : "secondary"}
            sx={{ mb: 2 }}
          />
        )}

        <Button
          variant="contained"
          sx={{
            mr: 2,
            backgroundColor: colors.yellow[400],
            color: theme.palette.success.contrastText,
          }}
          onClick={simulateProgress}
        >
          Confirm
        </Button>
        <Button variant="contained" color="error" onClick={onDecline}>
          Decline
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
