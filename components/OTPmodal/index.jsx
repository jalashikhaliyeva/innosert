import { useRef } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi"; // Importing the back arrow icon

export default function OTPmodal({ isOpen, onClose, onBack }) {
  // All hooks should be called unconditionally here
  const inputRefs = useRef([]);

  // Early return after all hooks
  if (!isOpen) return null;

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
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
        <form>
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
              >
                Yenidən göndər
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
