import React, { useState } from "react";
import ExamRulesModal from "../ExamRulesModal";
// import ExamRulesModal from "./ExamRulesModal"; 

function JoinButtonandPriceExam({examData}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleButtonClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        className="py-3 px-7 h-11 text-white font-gilroy leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
        onClick={handleButtonClick}
      >
        Daxil ol
      </button>
      <h2 className="font-gilroy text-2xl font-medium leading-8 flex items-center justify-center">
      {examData.exam.price} ₼
      </h2>

      {isModalOpen && (
        <ExamRulesModal
          onClose={handleCloseModal}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
}

export default JoinButtonandPriceExam;
