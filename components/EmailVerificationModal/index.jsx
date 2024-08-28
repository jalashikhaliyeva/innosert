import { useState, useRef, useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { GoMail } from "react-icons/go";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Exit early if not hydrated or not open
  if (!isOpen || !hydrated) return null;

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

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
        console.log(data.data.code, "data email veiryf");

        console.log("Verification successful.");
        toast.success("E-poçt doğrulaması uğurla başa çatdı!");

        setEmailForOTP(email); // Set the email for OTPmodal
        onClose(); // Close the EmailVerificationModal
        onOpenOTPModal(); // Open the OTPmodal
      } else {
        console.log(
          `Error: ${data.message || "Verification failed. Please try again."}`
        );
        toast.error("Doğrulama uğursuz oldu. Yenidən cəhd edin.");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      console.log("An unexpected error occurred. Please try again.");
      toast.warning("Gözlənilməz xəta baş verdi. Yenidən cəhd edin.");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
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
        </div>

        <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-textHoverBlue">
          Email Doğrulama
        </h2>
        <p className="text-center font-gilroy text-grayButtonText text-base mb-4">
          Email ünvanınızı daxil edin.
        </p>
        <form onSubmit={handleVerifyEmail}>
          <div className="mb-6 relative">
            <GoMail className="text-2xl absolute left-3 top-1/2 transform -translate-y-1/2 text-grayTextinBox" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-3 py-2 border bg-grayTextColor border-inputBorder rounded-md text-base text-textSecondaryDefault font-medium focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <button
                type="submit"
                className="w-full font-gilroy flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-textHoverBlue hover:bg-buttonBlueHover active:bg-buttonPressedPrimary"
              >
                Verify and Continue
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
