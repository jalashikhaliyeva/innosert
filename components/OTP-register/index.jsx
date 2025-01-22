// components/OTP-register.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext";

function OTPRegister({
  isOpen,
  onClose,
  onBack,
  email,
  onOpenResetPasswordModal,
  token,
}) {
  const [code, setCode] = useState(Array(6).fill(""));
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(20);
  const router = useRouter();
  const inputRefs = useRef([]);
  const { completeVerification } = useContext(UserContext);

  // Handle input changes and auto-focus next input
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Verify the OTP code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    const joinedCode = code.join("");
    if (joinedCode.length !== 6) {
      toast.error("Zəhmət olmasa, bütün xanaları doldurun.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const body = JSON.stringify({ code: joinedCode });

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/verify-mobile",
        {
          method: "POST",
          headers,
          body,
        }
      );

      const data = await response.json();

      if (response.ok && data?.status === "success") {
        toast.success("Kod uğurla təsdiqləndi!");

        // *** Mark user as fully verified with token2 ***
        await completeVerification(token);

        // Optionally open reset password modal, if that is your flow
        if (onOpenResetPasswordModal) {
          onOpenResetPasswordModal();
        }

        onClose();
        // Now that user is fully verified, push to /home
        router.push("/home");
      } else {
        toast.error("Kodun təsdiqi uğursuz oldu. Yenidən cəhd edin.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.warning(
        "Kod təsdiqlənməsi zamanı xəta baş verdi. Yenidən cəhd edin."
      );
    }

    // Disable the resend button and start the timer again
    setIsButtonDisabled(true);
    setTimer(20);
  };

  // Handle the resend code action
  const handleResendCode = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/resend-verify",
        {
          method: "GET",
          headers,
        }
      );

      const data = await response.json();

      if (response.ok && data?.status === "success") {
        toast.success("Kod yenidən uğurla göndərildi!");
        setCode(Array(6).fill(""));
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
        setIsButtonDisabled(true);
        setTimer(20);
      } else {
        toast.error(
          "Kodun yenidən göndərilməsi uğursuz oldu. Yenidən cəhd edin."
        );
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.warning(
        "Kodun yenidən göndərilməsi zamanı xəta baş verdi. Yenidən cəhd edin."
      );
    }
  };

  useEffect(() => {
    let interval = null;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (isOpen && timer === 0) {
      setIsButtonDisabled(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isOpen]);

  // Initialize the timer when the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsButtonDisabled(true);
      setTimer(20);
      setCode(Array(6).fill(""));
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* <ToastContainer ... /> */}
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]"
        onClick={handleOutsideClick}
      >
        <div
          className="bg-bodyColor rounded-lg shadow-lg w-full max-w-sm p-10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-buttonPrimaryDefault">
            OTP
          </h2>
          <p className="text-center font-gilroy text-grayButtonText text-base mb-4">
            Parol təsdiqlənməsi üçün nömrəyə göndərilən OTP kodunu daxil edin
          </p>
          <form onSubmit={handleVerifyCode}>
            <div className="flex justify-between gap-2 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="\d{1}"
                  maxLength="1"
                  className="size-10 text-center border bg-grayTextColor border-inputBorder rounded-md text-lg font-medium focus:outline-none focus:border-inputRingFocus"
                  onChange={(e) => handleInputChange(e, index)}
                  value={digit}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                >
                  Təsdiqlə və daxil ol
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium ${
                    isButtonDisabled
                      ? "text-grayButtonText bg-grayLineFooter cursor-not-allowed"
                      : "text-grayButtonText bg-buttonSecondaryDefault hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
                  }`}
                  disabled={isButtonDisabled}
                  onClick={handleResendCode}
                >
                  Yenidən göndər
                </button>
                <p className="text-sm text-grayButtonText text-center mt-2">
                  {isButtonDisabled
                    ? `Göndər düyməsi ${timer}s ərzində aktiv olacaq.`
                    : ""}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OTPRegister;
