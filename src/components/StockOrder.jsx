import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Linebar from "../utils/Linebar";
import ConfirmationModal from "./ConfirmationModal";
import Topbar from "../constants/Topbar";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const StockOrder = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [selectedChip, setSelectedChip] = useState(null);
  const [numberOfShares, setNumberOfShares] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sharesError, setSharesError] = useState(false);
  const [chipError, setChipError] = useState(false);

  if (!data || !data["Global Quote"]) {
    return <div>No data available.</div>;
  }

  const globalQuoteData = data["Global Quote"];

  if (!globalQuoteData["01. symbol"]) {
    return <div>Symbol data not available.</div>;
  }

  const cardData = {
    title: globalQuoteData["01. symbol"],
    subtitle: globalQuoteData["01. symbol"],
    price: globalQuoteData["05. price"],
    change: parseFloat(globalQuoteData["09. change"]),
  };

  const isPositiveChange = cardData?.change > 0;

  const handleInput = (event) => {
    const inputShares = event.target.value.replace(/[^0-9]/g, "");
    setNumberOfShares(inputShares);
    setSharesError(false);
  };

  const handleChipClick = (chipLabel) => {
    setSelectedChip(chipLabel === selectedChip ? null : chipLabel);

    // Clear the chip error when the user selects a chip
    setChipError(false);
  };

  const handleBuyClick = () => {
    if (!numberOfShares) {
      setSharesError(true);
    }

    if (!selectedChip) {
      setChipError(true);
    }

    if (sharesError || chipError) {
      return;
    }
    if (!selectedChip || !numberOfShares) {
      return;
    }

    setModalOpen(true);
  };

  const finalFormatted = (cardData?.price * numberOfShares).toFixed(2) || "";

  return (
    <div>
      <Topbar title="Stock Order" className="fixed top-0 left-0 right-0" />
      <Box>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: theme.palette.mode === "light" ? 4 : 8,
              width: "100%",
              backgroundColor: colors.grey[400],
            }}
          >
            <CardContent>
              <Typography variant="body2" color={"black"}>
                Security
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <Typography variant="h2" component="div" color={"black"}>
                {cardData?.title}
              </Typography>
            </Box>
          </Card>
        </Box>
        <Box display="flex" gap="20px">
          <Box flex="1">
            <Box height="300px" width="100%">
              <Linebar data={globalQuoteData} />
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: theme.palette.mode === "light" ? 4 : 8,
              width: "100%",
              backgroundColor: colors.grey[400],
            }}
          >
            <CardContent>
              <Typography variant="h4" component="div" color={"black"}>
                {cardData?.title}
              </Typography>
              <Typography variant="body2" color={"black"}>
                {cardData?.subtitle}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
              <Typography variant="h6" component="div" color={"black"}>
                $ {cardData?.price}
              </Typography>
              <Icon>
                {isPositiveChange ? (
                  <ArrowUpwardIcon style={{ color: "green" }} />
                ) : (
                  <ArrowDownwardIcon style={{ color: "red" }} />
                )}
              </Icon>
              <Typography
                variant="body2"
                color={isPositiveChange ? "green" : "red"}
              >
                {cardData?.change} %
              </Typography>
            </Box>
          </Card>
        </Box>

        <Box
          sx={{ mt: "10px" }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap="10px"
        >
          <TextField
            label="Shares"
            type="number"
            onInput={handleInput}
            variant="outlined"
            error={sharesError}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[400],
                },
                "&:hover fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[600],
                },
              },
              color:
                theme.palette.mode === "light" ? "black" : colors.grey[400],
            }}
          />
          <Chip
            label="Market"
            variant={selectedChip === "Market" ? "filled" : "outlined"}
            onClick={() => handleChipClick("Market")}
            sx={{
              borderColor: chipError
                ? theme.palette.error.main // Set border color to red for error
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              color: chipError
                ? theme.palette.error.main // Set chip color to red for error
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
            }}
            error={chipError}
          />

          <Chip
            label="Limit"
            variant={selectedChip === "Limit" ? "filled" : "outlined"}
            onClick={() => handleChipClick("Limit")}
            sx={{
              borderColor: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              color: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
            }}
            error={chipError}
          />
          <Chip
            label="Stop"
            variant={selectedChip === "Stop" ? "filled" : "outlined"}
            onClick={() => handleChipClick("Stop")}
            sx={{
              borderColor: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
              color: chipError
                ? theme.palette.error.main
                : theme.palette.mode === "light"
                ? "black"
                : colors.grey[400],
            }}
            error={chipError}
          />
        </Box>
        <Box
          sx={{ mt: "10px" }}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
        >
          <Typography
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[400],
                },
                "&:hover fieldset": {
                  borderColor:
                    theme.palette.mode === "light" ? "black" : colors.grey[600],
                },
              },
              color:
                theme.palette.mode === "light" ? "black" : colors.grey[400],
            }}
            variant="subtitle1"
            gutterBottom
          >
            Estimated Trading amount:
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            gap="10px"
          >
            <Typography
              sx={{
                mt: "2px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor:
                      theme.palette.mode === "light"
                        ? "black"
                        : colors.grey[400],
                  },
                  "&:hover fieldset": {
                    borderColor:
                      theme.palette.mode === "light"
                        ? "black"
                        : colors.grey[600],
                  },
                },
                color:
                  theme.palette.mode === "light" ? "black" : colors.grey[400],
              }}
              color="white"
              variant="subtitle1"
              gutterBottom
            >
              Buy {numberOfShares ? numberOfShares : "Shares"} X $
              {cardData?.price} {cardData?.title}= {finalFormatted}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          gap="10px"
        >
          <Button variant="contained" onClick={handleBuyClick}>
            Buy {cardData?.title}{" "}
          </Button>
        </Box>
      </Box>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setNumberOfShares("");
          setSelectedChip("");
          setModalOpen(false);
          navigate("/");
        }}
        onDecline={() => setModalOpen(false)}
        selected={selectedChip}
        price={finalFormatted}
        share={numberOfShares}
        security={cardData?.title}
      />
    </div>
  );
};

export default StockOrder;
