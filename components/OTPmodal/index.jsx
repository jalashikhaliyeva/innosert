import { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OTPmodal({
  isOpen,
  onClose,
  onBack,
  email,
  onOpenResetPasswordModal,
}) {
  const [code, setCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled state
  const [timer, setTimer] = useState(0); // State to manage the timer

  if (!isOpen) return null;

  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    setCode(
      (prevCode) =>
        prevCode.substr(0, index) + value + prevCode.substr(index + 1)
    );

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("code", code);
    formData.append("email", email);

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/password/verify-code",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Verification response:", data);

      if (response.ok && data?.status === "success") {
        toast.success("Kod uğurla təsdiqləndi!");
        console.log("Code verified successfully.");
        onClose(); // Close the OTPmodal
        onOpenResetPasswordModal(); // Open the ResetPasswordModal
      } else {
        toast.error("Kodun təsdiqi uğursuz oldu. Yenidən cəhd edin.");
        console.log("Failed to verify the code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.warning(
        "Kod təsdiqlənməsi zamanı xəta baş verdi. Yenidən cəhd edin."
      );
    }

    // Start the 30-second timer
    setIsButtonDisabled(true);
    setTimer(30);
  };

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsButtonDisabled(false);
    }
  }, [timer]);

  const handleResendCode = async () => {
    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/password/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: email,
          }),
        }
      );

      const data = await response.json();
      console.log("Resend code response:", data);

      if (response.ok && data?.status === true) {
        toast.success("Kod yenidən uğurla göndərildi!");
        console.log("Code resent successfully.");
        setIsButtonDisabled(true);
        setTimer(30); // Restart the 30-second timer
      } else {
        toast.error(
          "Kodun yenidən göndərilməsi uğursuz oldu. Yenidən cəhd edin."
        );
        console.log("Failed to resend the code. Please try again.");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.warning(
        "Kodun yenidən göndərilməsi zamanı xəta baş verdi. Yenidən cəhd edin."
      );
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={handleOutsideClick}
      >
        <div
          className="bg-bodyColor rounded-lg shadow-lg w-full max-w-sm p-10 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          <div className="flex items-center mb-6">
            <HiOutlineArrowLeft
              className="text-2xl text-textHoverBlue cursor-pointer"
              onClick={onBack}
            />
            <span className="ml-2 font-gilroy text-lg text-textHoverBlue">
              Geri
            </span>
          </div>

          <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-textHoverBlue">
            OTP
          </h2>
          <p className="text-center font-gilroy text-grayButtonText text-base mb-4">
            Parol təsdiqlənməsi üçün nömrəyə göndərilən OTP kodunu daxil edin
          </p>
          <form onSubmit={handleVerifyCode}>
            <div className="flex justify-between gap-2 mb-6">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    className="size-10 text-center border bg-grayTextColor border-inputBorder rounded-md text-lg font-medium focus:outline-none focus:border-blue-500"
                    onChange={(e) => handleInputChange(e, index)}
                    value={code[index] || ""}
                  />
                ))}
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-textHoverBlue hover:bg-buttonBlueHover active:bg-buttonPressedPrimary"
                >
                  Təsdiqlə və daxil ol
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-grayButtonText bg-grayLineFooter hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
                  disabled={isButtonDisabled}
                  onClick={handleResendCode}
                >
                  {isButtonDisabled
                    ? `Yenidən göndər (${timer}s)`
                    : "Yenidən göndər"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
