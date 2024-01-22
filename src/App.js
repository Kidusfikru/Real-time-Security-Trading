import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import StockApi from "./utils/api";
import StockList from "./components/StockList";
import StockOrder from "./components/StockOrder";
import ErrorComponent from "./constants/Error";

function App() {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const handleDataFetched = (apiData) => {
      setData(apiData);
      setIsLoading(false);
    };

    StockApi({ onDataFetched: handleDataFetched });
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setError(true);
        setIsLoading(false);
      }
    }, 7000);

    return () => clearTimeout(timeoutId);
  }, [isLoading]);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app" style={{ display: "flex" }}>
            <main className="content" style={{ flex: 1, overflowY: "auto" }}>
              <Container maxWidth="md">
                {/* Add Topbar component here if needed */}
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "100vh",
                    }}
                  >
                    <CircularProgress color="secondary" />
                  </Box>
                ) : isError ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "100vh",
                    }}
                  >
                    {" "}
                    <ErrorComponent message="Time out Failed to fetch data. Please check your internet or try again later." />
                  </Box>
                ) : (
                  <Routes>
                    <Route path="/" element={<StockList data={data} />} />
                    <Route path="/order" element={<StockOrder data={data} />} />
                  </Routes>
                )}
              </Container>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
