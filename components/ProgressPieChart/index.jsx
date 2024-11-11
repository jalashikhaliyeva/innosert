import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import react-apexcharts to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgressPieChart = ({ percentage }) => {
  const [series, setSeries] = useState([]); // Initialize as empty
  const chartRef = useRef(null); // Reference to the chart container

  console.log(percentage, "percentage");
  
  // Chart configuration options
  const options = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: 'easeinout',
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
              formatter: () => `${percentage}%`, // Display Correct Answers percentage
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
      enabled: true, // Show values on hover
      y: {
        formatter: (val) => `${val}%`, // Format tooltip to show percentage
      },
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
  };

  // Effect to update the series based on the percentage prop
  useEffect(() => {
    if (typeof percentage !== "number") {
      console.warn(
        "ProgressPieChart: 'percentage' prop is not a number:",
        percentage
      );
      return;
    }

    // Ensure the percentage is within 0-100
    const correct = Math.min(Math.max(percentage, 0), 100);
    // Example distribution: 20% of the remaining for Wrong Answers
    const wrong = Math.min((100 - correct) * 0.2, 100 - correct);
    const notAnswered = 100 - correct - wrong;

    console.log("Updating series:", [correct, wrong, notAnswered]);

    setSeries([correct, wrong, notAnswered]);
  }, [percentage]);

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

export default ProgressPieChart;
