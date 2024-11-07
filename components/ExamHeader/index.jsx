import React from "react";
import Container from "../Container";
import { MdOutlineTimer } from "react-icons/md";
import { useRouter } from "next/router";

function ExamHeader({
  clickedExam,
  duration,
  currentQuestion,
  totalQuestions,
  currentScore,
  isPerQuestionTiming,
}) {
  const router = useRouter();
  const isCountdownPage = router.pathname === "/imtahan-geri-sayim";

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) return "--:--";

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (n) => (n < 10 ? "0" + n : n);

    if (hrs > 0) {
      return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
    } else {
      return `${pad(mins)}:${pad(secs)}`;
    }
  };

  return (
    <div className="bg-boxGrayBodyColor shadow-certificate py-5 z-20">
      <Container>
        <div className="flex items-center justify-between bg-boxGrayBodyColor">
          <div className="hidden lg:block">
            <p className="font-gilroy text-brandBlue500 font-normal tracking-036 text-2xl">
              {clickedExam.name}
            </p>
          </div>

          <div className="flex gap-6 items-center">
            {/* First Column */}
            <div className="flex flex-col">
              <h2 className="hidden lg:block font-gilroy text-gray90 font-normal tracking-036 text-lg">
                Sualın xalı
              </h2>
              <p className="font-gilroy text-brandBlue500 text-lg lg:text-2xl font-normal leading-normal">
                {currentScore} xal
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
              <p className="font-gilroy text-brandBlue500 text-lg lg:text-2xl font-normal leading-normal">
                {currentQuestion + 1}/{totalQuestions}
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
                    duration <= 15 ? "text-red-600" : "text-green600"
                  }`}
                />
                <p
                  className={`font-gilroy text-2xl font-normal ${
                    duration <= 15 ? "text-red-600" : "text-green600"
                  }`}
                  style={{
                    width: "80px",
                    textAlign: "center",
                    fontFamily: "monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatTime(duration)}
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
