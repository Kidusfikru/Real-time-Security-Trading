import React, { useEffect, useState } from "react";
import Axios from "axios";

const StockApi = ({ onDataFetched }) => {
  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo"
      );
      onDataFetched(response.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  fetchData();

  return null;
};

export default StockApi;
