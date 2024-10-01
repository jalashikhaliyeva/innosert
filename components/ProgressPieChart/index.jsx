import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ProgressPieChart = () => {
  const [inView, setInView] = useState(false);
  const [series, setSeries] = useState([0, 0, 100]); // Start with 0 progress for all

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
              formatter: () => `${series[0]}%`,
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                fontFamily: undefined,
              },
            },
          },
        },
      },
    },
    fill: {
      colors: ["#30B83E", "#D92626", "#F6CF09"], // Green for correct, red for wrong, yellow for not answered
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
        formatter: (val) => `${val}%`, // Format the tooltip to show percentage
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

  // Scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // When in view, set it to true to trigger animation
          setSeries([72, 15, 13]); // Set to the actual progress: correct, wrong, not answered
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
  }, []);

  return (
    <motion.div
      id="progress-chart"
      initial={{ opacity: 0, y: 20 }} // Start with hidden and slightly off position
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
      transition={{ duration: 0.9 }} // Animation duration
    >
      <Chart options={options} series={series} type="donut" width="180" />{" "}
      {/* Changed width to 180 */}
    </motion.div>
  );
};

export default ProgressPieChart;
