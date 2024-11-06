import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgressPieChart = ({ percentage }) => {
  const [inView, setInView] = useState(false);
  const [series, setSeries] = useState([0, 0, 100]); // Initial state: 0% Correct, 0% Wrong, 100% Not Answered

  const options = {
    chart: {
      type: "donut",
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
              formatter: () => `${series[0]}%`, // Display Correct Answers percentage
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Trigger animation when in view

          // Ensure the percentage is between 0 and 100
          const correct = Math.min(Math.max(percentage, 0), 100);

          // Example distribution: 20% of remaining for Wrong Answers
          const wrong = Math.min(
            Math.max((100 - correct) * 0.2, 0),
            100 - correct
          );
          const notAnswered = 100 - correct - wrong;

          setSeries([correct, wrong, notAnswered]);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is in view
      }
    );

    const element = document.getElementById("progress-chart");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [percentage]); // Re-run effect if 'percentage' changes

  return (
    <motion.div
      id="progress-chart"
      initial={{ opacity: 0, y: 20 }} // Start hidden and slightly offset
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
      transition={{ duration: 0.9 }} // Animation duration
    >
      <Chart options={options} series={series} type="donut" width="180" />{" "}
      {/* Adjusted width */}
    </motion.div>
  );
};

export default ProgressPieChart;
