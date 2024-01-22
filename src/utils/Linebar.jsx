import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const Linebar = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Check if data and necessary properties are available
  if (!data || !data["01. symbol"]) {
    return <div>No data available for Linebar.</div>;
  }

  const formattedData = [
    {
      id: data["01. symbol"],
      data: [
        { x: "Open", y: parseFloat(data["02. open"]) },
        { x: "High", y: parseFloat(data["03. high"]) },
        { x: "Low", y: parseFloat(data["04. low"]) },
        { x: "Price", y: parseFloat(data["05. price"]) },
        // { x: "Last Close", y: parseFloat(data["08. previous close"]) },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={formattedData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.yellow[500],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      //   colors={{ scheme: "category10" }} // Adjust color scheme as needed
      margin={{ top: 50, right: 15, bottom: 50, left: 35 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Metrics",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Values",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointBorderWidth={2}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Linebar;
