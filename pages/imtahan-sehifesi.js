import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import CombinationQuestion from "@/components/CombinationQuestion";
import ExamFooter from "@/components/ExamFooter";
import ExamHeader from "@/components/ExamHeader";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import OpenQuestion from "@/components/OpenQuestion";
import { IoWarningOutline } from "react-icons/io5";

function ImtahanSehifesi() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [outsideLeaveCount, setOutsideLeaveCount] = useState(0);
  const examAreaRef = useRef(null);
  const router = useRouter();

  const questions = [
    <CombinationQuestion key="combination" />,
    <OpenQuestion key="open" />,
    <MultipleChoiceQuestion key="multiple" />,
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to the results page when there are no more questions
      router.push("/imtahan-neticeleri");
    }
  };

  const handleMouseLeave = () => {
    console.log("Mouse left the exam area");

    if (outsideLeaveCount === 0) {
      setOutsideLeaveCount(1);
      setModalContent(
        "Siz imtahan sahəsindən kənara çıxdınız! Yenidən bunu etsəniz, imtahan bitiriləcək."
      );
      setShowWarningModal(true);
      console.log("Displaying first warning modal");
    } else {
      console.log("Ending the exam");
      setModalContent(
        "Limitdən kənara çıxma sayınız dolub! İmtahan bitirildi."
      );
      setShowWarningModal(true);
      setTimeout(() => {
        router.push("/imtahan-neticeleri"); // Navigate to exam fail page
      }, 2400);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      ref={examAreaRef}
      onMouseLeave={handleMouseLeave}
    >
      <ExamHeader />
      <div className="flex-grow">{questions[currentQuestion]}</div>
      <ExamFooter onNext={handleNextQuestion} />

      {showWarningModal && (
        <div
          onClick={() => setShowWarningModal(false)}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <IoWarningOutline
                  style={{ fontSize: "32px", color: "red", fill: "red" }}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-lg font-semibold text-gray-900 text-center"
              style={{ fontFamily: "Gilroy" }}
            >
              Diqqət!
            </h3>

            {/* Description */}
            <p
              className="text-sm text-gray-800 text-center mt-2"
              style={{ fontFamily: "Gilroy" }}
            >
              {modalContent}
            </p>

            {/* Button */}
            <div className="mt-6 flex justify-center w-full">
              <button
                onClick={() => setShowWarningModal(false)}
                className="py-2 px-4 bg-errorButtonDefault w-full text-white rounded-lg hover:bg-errorButtonHover active:bg-errorButtonPressed focus:outline-none"
                style={{ fontFamily: "Gilroy" }}
              >
                Oldu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImtahanSehifesi;
