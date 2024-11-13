import { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { GoMail } from "react-icons/go";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "next-i18next";
export default function EmailVerificationModal({
  isOpen,
  onClose,
  onBack,
  onOpenOTPModal,
  setEmailForOTP, // New prop to pass the email to OTPmodal
}) {
  const router = useRouter();
  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [emailError, setEmailError] = useState(false); // Track if email has an error
  const [isFocused, setIsFocused] = useState(false); // Track if input is focused
  const { t } = useTranslation();
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Exit early if not hydrated or not open
  if (!isOpen || !hydrated) return null;

  // Function to validate email format
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    // Check if the email format is invalid
    if (!validateEmail(email)) {
      setEmailError(true); // Set error state
      toast.error(t("emailVerify.invalidEmail"));
      return; // Stop form submission
    }

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
      if (response.ok && data?.status === true) {
        localStorage.setItem("resetToken", data.data.code); // Store the token in local storage
        console.log(data.data.code, "data email verify");

        console.log("Verification successful.");
        toast.success(t("emailVerify.verificationSuccess"));

        setEmailForOTP(email); // Set the email for OTPmodal
        onClose(); // Close the EmailVerificationModal
        onOpenOTPModal(); // Open the OTPmodal
      } else {
        console.log(
          `Error: ${data.message || "Verification failed. Please try again."}`
        );
        toast.error(t("emailVerify.verificationFailed"));
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      console.log("An unexpected error occurred. Please try again.");
      toast.warning(t("emailVerify.unexpectedError"));
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
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
        >
          &times;
        </button>

        <div className="flex items-center mb-6">
          <HiOutlineArrowLeft
            className="text-2xl text-brandBlue500 cursor-pointer"
            onClick={onBack}
          />
        </div>

        <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-brandBlue500">
          {t("emailVerify.verification")}
        </h2>
        <p className="text-center font-gilroy text-grayButtonText text-base mb-4">
          {t("emailVerify.enterEmail")}
        </p>
        <form onSubmit={handleVerifyEmail}>
          <div className="mb-6 relative">
            <GoMail className="text-2xl absolute left-3 top-5 transform -translate-y-1/2 text-grayTextinBox" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false); // Reset error when user types
              }}
              onFocus={() => {
                setIsFocused(true); // Handle focus
                setEmailError(false); // Remove error when focusing
              }}
              onBlur={() => setIsFocused(false)} // Remove focus state when input is blurred
              className={`w-full pl-12 pr-3 py-2 border ${
                emailError
                  ? "border-red-500" // Error border color
                  : isFocused
                  ? "border-inputRingFocus" // Focus border color
                  : "border-inputBorder"
              } bg-grayTextColor rounded-md text-base text-textSecondaryDefault font-medium focus:outline-none ${
                emailError
                  ? "focus:border-red-500" // Focus state with error
                  : "focus:border-inputRingFocus" // Normal focus border
              }`}
              placeholder={t("emailVerify.placeholder")}
            />
            {emailError && !isFocused && (
              <p className="text-red-500 text-sm mt-1">
                {t("emailVerify.invalidEmail")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <button
                type="submit"
                className="w-full font-gilroy flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
              >
                {t("emailVerify.confirm")}
              </button>
            </div>
          </div>
        </form>
      </div>

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
    </div>
  );
}
