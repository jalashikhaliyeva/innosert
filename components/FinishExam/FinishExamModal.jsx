import { useRouter } from "next/router";
import React from "react";
import { IoHourglassOutline } from "react-icons/io5";

function FinishExamModal({ closeModal }) {
  const router = useRouter();
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleFinishExam = () => {
    // Logic for finishing the exam
    // Redirect to "İmtahan Nəticələri" page
    router.push("/imtahan-neticeleri");
  };
  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full  ">
            <IoHourglassOutline
              style={{ fontSize: "36px", color: "#4F7291", fill: "#174F82" }}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-semibold text-gray-900 text-center"
          style={{ fontFamily: "Gilroy" }}
        >
          İmtahanı bitir
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-600 text-center mt-2"
          style={{ fontFamily: "Gilroy" }}
        >
          İmtahanı bitirmək istədiyinizə əminsinizmi? <br /> Bu əməliyyat geri
          alına bilməz.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={closeModal}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            Ləğv et
          </button>
          <button
            onClick={handleFinishExam}
            className="w-full py-2 px-4 ml-2 bg-buttonPrimaryDefault text-white rounded-lg hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            Bitir
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishExamModal;
