import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { Icon } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const StatBox = ({ stockData }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  console.log("stockData", stockData);

  const cardData = {
    title: stockData["01. symbol"],
    subtitle: stockData["01. symbol"],
    price: stockData["05. price"],
    change: parseFloat(stockData["09. change"]),
  };

  const isPositiveChange = cardData.change > 0;

  const handleButtonClick = () => {
    navigate("/order");
  };

  return (
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
        <Typography variant="h6" component="div" color={"black"}>
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
        <Typography variant="body2" color={isPositiveChange ? "green" : "red"}>
          {cardData?.change} %
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <IconButton sx={{ color: "black" }} onClick={handleButtonClick}>
          <KeyboardArrowRightRoundedIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default StatBox;
