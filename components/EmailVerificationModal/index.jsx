import { useState, useRef, useEffect, useContext } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "next-i18next";
import { UserContext } from "@/shared/context/UserContext";

export default function PhoneVerificationModal({
  isOpen,
  onClose,
  onBack,
  onOpenOTPModal,
  // setPhoneForOTP,
}) {
  const router = useRouter();
  const inputRefs = useRef([]);

  const [hydrated, setHydrated] = useState(false);
  const [phoneError, setPhoneError] = useState(false); // Track if phone has an error
  const [isFocused, setIsFocused] = useState(false); // Track if input is focused
  const { t } = useTranslation();
  const { phone, setPhone } = useContext(UserContext);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Exit early if not hydrated or not open
  if (!isOpen || !hydrated) return null;

  // Function to validate phone number format (e.g., 9 digits)
  const validatePhone = (phone) => {
    const phonePattern = /^\d{9}$/; // Adjust the pattern based on your requirements
    return phonePattern.test(phone);
  };

  const handleVerifyPhone = async (e) => {
    e.preventDefault();

    // Check if the phone format is invalid
    if (!validatePhone(phone)) {
      setPhoneError(true); // Set error state
      toast.error(t("phoneVerify.invalidPhone"));
      return; // Stop form submission
    }

    try {
      const response = await fetch(
        "https://api.innosert.az/api/password/mobile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: phone, // Send phone without +994
          }),
        }
      );

      const data = await response.json();
      // console.log(data, "phone verify");

      // Updated condition to check for "success" string
      if (response.ok && data?.status === "success") {
        // localStorage.setItem("resetToken", data.data.code);
        // console.log(data.data.code, "data phone verify");

        // console.log("Verification successful.");
        toast.success(t("phoneVerify.verificationSuccess"));
        // setPhone("");

        // setPhoneForOTP(phone);
        onClose();
        onOpenOTPModal();
      } else {
        // console.log(
        //   `Error: ${data.message || "Verification failed. Please try again."}`
        // );
        toast.error(t("phoneVerify.verificationFailed"));
      }
    } catch (error) {
      console.error("Error verifying phone:", error);
      // console.log("An unexpected error occurred. Please try again.");
      toast.warning(t("phoneVerify.unexpectedError"));
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Optional: Prevent non-digit key presses
  const handleKeyDown = (e) => {
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];
    if (
      !allowedKeys.includes(e.key) &&
      !/^\d$/.test(e.key) // Allow only digits
    ) {
      e.preventDefault();
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
          {t("phoneVerify.verification")}
        </h2>
        <p className="text-center font-gilroy text-grayButtonText text-base mb-4">
          {t("phoneVerify.enterPhone")}
        </p>
        <form onSubmit={handleVerifyPhone}>
          <div className="mb-4">
            {/* Relative container for prefix and input */}
            <div className="relative">
              <span className="text-lg font-gilroy absolute left-4 top-1/2 transform -translate-y-1/2 text-grayTextinBox">
                +994
              </span>
              <input
                type="tel"
                inputMode="numeric" // Brings up numeric keypad on mobile
                pattern="\d*" // Allows only digits
                value={phone}
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\D/g, ""); // Remove non-digits
                  setPhone(sanitizedValue); // Update context
                  setPhoneError(false);
                }}
                
                onKeyDown={handleKeyDown} // Optional: Prevent non-digit key presses
                onFocus={() => {
                  setIsFocused(true);
                  setPhoneError(false);
                }}
                onBlur={() => setIsFocused(false)}
                className={`w-full pl-16 pr-3 py-2 border ${
                  phoneError
                    ? "border-red-500"
                    : isFocused
                    ? "border-inputRingFocus"
                    : "border-inputBorder"
                } bg-grayTextColor rounded-md text-sm font-gilroy  text-textSecondaryDefault placeholder:text-grayTextinBox placeholder:text-base placeholder:font-normal font-medium focus:outline-none ${
                  phoneError
                    ? "focus:border-red-500"
                    : "focus:border-inputRingFocus"
                }`}
                placeholder={"55 555 55 55"}
                maxLength={9} // Assuming 9 digits for the phone number
              />
            </div>
            {/* Error message outside the relative container */}
            {phoneError && !isFocused && (
              <p className="text-red-500 text-sm font-gilroy mt-1">
                {t("phoneVerify.invalidPhone")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <button
                type="submit"
                className="w-full font-gilroy flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
              >
                {t("phoneVerify.confirm")}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <ToastContainer
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
      /> */}
    </div>
  );
}
