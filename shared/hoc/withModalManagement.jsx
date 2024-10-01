import React, { useState } from "react";
import RegisterModal from "@/components/Register";
import LoginModal from "@/components/Login";
import EmailVerificationModal from "@/components/EmailVerificationModal";
import ResetPasswordModal from "@/components/resetPasswordModal";
import OTP from "@/components/OTP";


const withModalManagement = (WrappedComponent) => {
  return function WithModalManagement(props) {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const [isOTPModalOpen, setOTPModalOpen] = useState(false);
    const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] =
      useState(false);
    const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
      useState(false);
    const [emailForOTP, setEmailForOTP] = useState("");

    const openRegisterModal = () => setRegisterModalOpen(true);
    const closeRegisterModal = () => setRegisterModalOpen(false);
    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);

    const handleForgotPasswordClick = () => {
      setLoginModalOpen(false);
      setIsEmailVerificationModalOpen(true);
    };

    const handleBackToLogin = () => {
      setIsEmailVerificationModalOpen(false);
      setLoginModalOpen(true);
    };

    const handleOpenOTPModalAfterVerification = () => {
      setIsEmailVerificationModalOpen(false);
      setOTPModalOpen(true);
    };

    const handleOpenResetPasswordModal = () => {
      setOTPModalOpen(false);
      setIsResetPasswordModalOpen(true);
    };

    return (
      <>
        {isLoginModalOpen && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeLoginModal}
            onOpenRegisterModal={openRegisterModal}
            onForgotPasswordClick={handleForgotPasswordClick}
          />
        )}

        {isRegisterModalOpen && (
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeRegisterModal}
            onOpenLoginModal={openLoginModal}
          />
        )}

        {isOTPModalOpen && (
          <OTP
            isOpen={isOTPModalOpen}
            onClose={() => setOTPModalOpen(false)}
            onBack={() => {
              setOTPModalOpen(false);
              setRegisterModalOpen(true);
            }}
            email={emailForOTP}
            onOpenResetPasswordModal={handleOpenResetPasswordModal}
          />
        )}

        {isEmailVerificationModalOpen && (
          <EmailVerificationModal
            isOpen={isEmailVerificationModalOpen}
            onClose={() => setIsEmailVerificationModalOpen(false)}
            onBack={handleBackToLogin}
            onOpenOTPModal={handleOpenOTPModalAfterVerification}
            setEmailForOTP={setEmailForOTP}
          />
        )}

        {isResetPasswordModalOpen && (
          <ResetPasswordModal
            isOpen={isResetPasswordModalOpen}
            onClose={() => setIsResetPasswordModalOpen(false)}
          />
        )}

        <WrappedComponent
          {...props}
          openRegisterModal={openRegisterModal}
          openLoginModal={openLoginModal}
        />
      </>
    );
  };
};

export default withModalManagement;
