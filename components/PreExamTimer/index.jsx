import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function PreExamTimer({ maxTime = 5 }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const router = useRouter(); // Use Next.js router

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push("/imtahan-sehifesi"); // Next.js's routing
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, router]);

  // Format time as "MM:SS"
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // New circle radius and dash array
  const circleRadius = 70;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = (circleCircumference * timeLeft) / maxTime;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-2 text-gray-700 font-gilroy font-medium">
        İmtahanın başlamasına son
      </h2>
      <div className="relative w-64 h-64">
        <span className="absolute font-gilroy top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-red-500">
          {formatTime(timeLeft)}
        </span>
        <svg className="transform -rotate-90 w-full h-full">
          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={circleRadius}
            stroke="#FCEDEE"
            strokeWidth="5"
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset="0"
          />
          {/* Countdown Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={circleRadius}
            stroke="#E03D3E"
            strokeWidth="5"
            fill="transparent"
            className="transition-all duration-1000 ease-linear"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
      </div>
    </div>
  );
}

export default PreExamTimer;
