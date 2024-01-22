import React from "react";
import { ResponsiveChord } from "@nivo/chord";
import { useTheme } from "@mui/material";

const Chord = ({ data }) => {
  const theme = useTheme();

  // Check if data and necessary properties are available
  if (!data || !data[0] || !data[1]) {
    return <div>No data available for Chord.</div>;
  }

  console.log("Chord Data:", data);

  const keys = ["Previous Close", "Price"];

  // Check if the required properties are present in the data objects
  if (
    !data[0]["08. previous close"] ||
    !data[1]["08. previous close"] ||
    !data[0]["05. price"] ||
    !data[1]["05. price"]
  ) {
    return <div>Data properties are missing for Chord.</div>;
  }

  const matrix = [
    [
      parseFloat(data[0]["08. previous close"]),
      parseFloat(data[1]["08. previous close"]),
    ],
    [parseFloat(data[0]["05. price"]), parseFloat(data[1]["05. price"])],
  ];

  return (
    <ResponsiveChord
      keys={keys}
      matrix={matrix}
      margin={{ top: 60, right: 60, bottom: 90, left: 60 }}
      valueFormat=".2f"
      padAngle={0.02}
      innerRadiusRatio={0.96}
      innerRadiusOffset={0.02}
      inactiveArcOpacity={0.25}
      arcBorderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      activeRibbonOpacity={0.75}
      inactiveRibbonOpacity={0.25}
      ribbonBorderColor={{
        from: "color",
        modifiers: [["darker", 0.6]],
      }}
      labelRotation={-90}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1]],
      }}
      colors={{ scheme: "nivo" }}
      motionConfig="stiff"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 70,
          itemWidth: 80,
          itemHeight: 14,
          itemsSpacing: 0,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Chord;
