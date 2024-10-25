import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Container from "../Container";
import FinishExamModal from "../FinishExam/FinishExamModal";

function ExamFooter({ onNext }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex !justify-end p-5 lg:py-6 m-5 lg:m-0 mt-auto bg-white shadow-Cardshadow">
        <div className="flex gap-6 items-center lg:mr-[100px]">
          {/* Open Modal on  */}
          <p
            onClick={openModal}
            className="font-gilroy text-lg leading-7 font-normal cursor-pointer"
          >
            İmtahanı bitir
          </p>
          <button
            onClick={onNext}
            className="bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white font-normal text-lg py-2 px-4 rounded-lg flex gap-2 items-center"
          >
            Növbəti suala keç
            <FaAngleRight className="text-white" />
          </button>
        </div>
      </div>

      {/* Finish Exam Modal */}
      {isModalOpen && <FinishExamModal closeModal={closeModal} />}
    </>
  );
}

export default ExamFooter;
