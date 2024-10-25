import React, { useState, useEffect } from "react";
import Container from "../Container";
import { MdOutlineTimer } from "react-icons/md";
import { useRouter } from "next/router";

function ExamHeader() {
  const [time, setTime] = useState(300); // Initial timer set to 300 seconds
  const router = useRouter();
  const isCountdownPage = router.pathname === "/imtahan-geri-sayim";

  // Timer logic
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer); // Clear the timeout on component unmount
    }
  }, [time]);

  // Formatting time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="bg-boxGrayBodyColor shadow-certificate py-5">
      <Container>
        <div className="flex items-center justify-between bg-boxGrayBodyColor">
          <div className="hidden lg:block">
            <p className="font-gilroy text-brandBlue500 font-normal tracking-036 text-lg">
              Microsoft office specialist excel expert
            </p>
          </div>

          <div className="flex gap-6 items-center">
            {/* First Column */}
            <div className="flex flex-col">
              <h2 className="hidden lg:block font-gilroy text-gray90 font-normal tracking-036 :text-lg">
                Sualın xalı
              </h2>
              <p className="font-gilroy text-brandBlue500 text-lg  lg:text-2xl font-normal leading-normal">
                1 xal
              </p>
            </div>

            {/* Divider */}
            {!isCountdownPage && (
              <div className="h-12 w-px bg-gray-300 mx-2"></div>
            )}

            {/* Second Column */}
            <div className="flex flex-col">
              <h2 className="hidden lg:block font-gilroy text-gray90 font-normal tracking-036 text-lg">
                Sual sayı
              </h2>
              <p className="font-gilroy text-brandBlue500 text-lg  lg:text-2xl font-normal leading-normal">
                1/20
              </p>
            </div>

            {/* Divider */}
            {!isCountdownPage && (
              <div className="h-12 w-px bg-gray-300 mx-2"></div>
            )}

            {/* Timer Column */}
            {!isCountdownPage && (
              <div className="flex gap-2 items-center">
                <MdOutlineTimer
                  className={`text-3xl hidden lg:block ${
                    time <= 15 ? "text-red-600" : "text-green600"
                  }`}
                />
                <p
                  className={`font-gilroy text-3xl font-normal ${
                    time <= 15 ? "text-red-600" : "text-green600"
                  }`}
                  style={{
                    width: "80px",
                    textAlign: "center",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap", // Prevent line breaks
                  }}
                >
                  {formatTime(time)}
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ExamHeader;
