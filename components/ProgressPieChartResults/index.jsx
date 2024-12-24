import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import react-apexcharts to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgressPieChartResults = ({ correct, wrong, empty }) => {
  const [series, setSeries] = useState([]); // Initialize as empty
  const chartRef = useRef(null); // Reference to the chart container

  console.log({ correct, wrong, empty }, "Counts");

  // Chart configuration options
  const options = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      // Disable zooming and panning if not needed
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Hide the toolbar
      },
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
        donut: {
          size: "82%",
          labels: {
            show: true,
            name: {
              show: false,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              showAlways: true,
              label: "",
              formatter: () => {
                const total = correct + wrong + empty;
                const percentage =
                  total === 0 ? 0 : Math.round((correct / total) * 100);
                return `${percentage}%`;
              }, // Display Correct Answers percentage
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
              },
            },
          },
        },
      },
    },
    fill: {
      colors: ["#30B83E", "#D92626", "#F6CF09"], // Green, Red, Yellow
    },
    stroke: {
      lineCap: "round",
    },
    dataLabels: {
      enabled: false, // Hide data labels initially
    },
    tooltip: {
      enabled: false, // Disable tooltips
      // Remove tooltip configurations since tooltips are disabled
      // y: {
      //   formatter: (val) => `${val}`, // Format tooltip to show count
      // },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["Correct Answers", "Wrong Answers", "Not Answered"],
    legend: {
      show: false,
    },
    states: {
      normal: {
        filter: {
          type: "none", // Remove any filter effects on hover
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none", // Disable hover filter
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none", // Disable active state filter
          value: 0,
        },
      },
    },
    // Remove any selection states
    selection: {
      enabled: false,
    },
  };

  // Effect to update the series based on the counts props
  useEffect(() => {
    // Ensure all counts are numbers and non-negative
    const c = Math.max(Number(correct) || 0, 0);
    const w = Math.max(Number(wrong) || 0, 0);
    const e = Math.max(Number(empty) || 0, 0);

    // Update series
    if (c + w + e > 0) {
      console.log("Updating series:", [c, w, e]);
      setSeries([c, w, e]);
    } else {
      // When all counts are zero, set 'wrong' to 1 to display a full red pie chart
      setSeries([0, 1, 0]);
    }
  }, [correct, wrong, empty]);

  return (
    <motion.div
      ref={chartRef} // Attach ref to the div
      initial={{ opacity: 0, y: 20 }} // Start hidden and slightly offset
      animate={{ opacity: 1, y: 0 }} // Animate to visible when component mounts
      transition={{ duration: 0.9 }} // Animation duration
    >
      {series.length > 0 && (
        <Chart options={options} series={series} type="donut" width="180" />
      )}
    </motion.div>
  );
};

export default ProgressPieChartResults;
