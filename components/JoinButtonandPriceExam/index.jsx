// JoinButtonandPriceExam.jsx
import React, { useContext, useState } from "react";
import ExamRulesModal from "../ExamRulesModal";
import { UserContext } from "@/shared/context/UserContext";
import LoginModal from "../Login";


function JoinButtonandPriceExam({ examData }) {
  const [modalType, setModalType] = useState(null); // 'examRules' or 'login'
  const { user, setClickedExam  , token} = useContext(UserContext);
  // console.log(user, "user join modal");

  const handleButtonClick = (exam) => {
    setClickedExam(exam);
    if (token) {
      setModalType("examRules");
    } else {
      setModalType("login");
    }
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  // Handlers for additional props
  const handleOpenRegisterModal = () => {
    // Implement registration modal logic here
    // console.log("Open Register Modal");
    // For example, you might set another state to open a RegisterModal
    // setModalType("register");
  };

  const handleForgotPassword = () => {
    // Implement forgot password logic here
    console.log("Forgot Password Clicked");
    // For example, navigate to a forgot password page or open a ForgotPasswordModal
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        className="py-3 px-7 h-11 text-white font-gilroy leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
        onClick={() => handleButtonClick(examData.exam)}
      >
        Daxil ol
      </button>
      <h2 className="font-gilroy text-2xl font-medium leading-8 flex items-center justify-center">
        {examData.exam.price} ₼
      </h2>

      {/* Conditionally Render ExamRulesModal */}
      {modalType === "examRules" && (
        <ExamRulesModal onClose={handleCloseModal} onCancel={handleCloseModal} />
      )}

      {/* Conditionally Render LoginModal with All Required Props */}
      {modalType === "login" && (
        <LoginModal
          isOpen={true}
          onClose={handleCloseModal}
          onOpenRegisterModal={handleOpenRegisterModal}
          onForgotPasswordClick={handleForgotPassword}
        />
      )}
    </div>
  );
}

export default JoinButtonandPriceExam;
