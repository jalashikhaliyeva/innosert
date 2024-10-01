import { useState } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

export default function LoginModal({
  isOpen,
  onClose,
  onOpenRegisterModal,
  onForgotPasswordClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null); // State to track focused input
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenRegister = () => {
    onClose();
    onOpenRegisterModal();
  };

  const handleForgotPasswordClick = () => {
    if (onClose) onClose();
    if (onForgotPasswordClick) onForgotPasswordClick();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setInputError(true);
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }
    setInputError(false);
    setLoading(true);
    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data?.data?.token) {
        localStorage.setItem("token", data?.data?.token);
        if (data.message === "successful login") {
          toast.success("Uğurla daxil oldunuz!");
          setTimeout(() => {
            router.push("/home");
          }, 800);
        }
      } else {
        toast.error(
          "Daxil olma uğursuz oldu. Zəhmət olmasa yenidən cəhd edin."
        );
        setEmail(""); // Clear the email field
        setPassword(""); // Clear the password field
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.warning("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
      setEmail(""); // Clear the email field
      setPassword(""); // Clear the password field
    } finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };

  const handleFocus = (input) => {
    setFocusedInput(input);
    setInputError(false); // Reset error when user focuses on the input
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[998]"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-bodyColor rounded-lg shadow-lg w-full max-w-sm p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onClose()}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
            >
              &times;
            </button>
            <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-brandBlue500">
              Innosertə xoş gəlmisən!
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <GoMail className="text-2xl absolute top-3 left-3 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleFocus("email")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      inputError && !email
                        ? "border-inputRingError"
                        : focusedInput === "email"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Email"
                  />
                  {/* Conditional rendering of the helper text */}
                  {inputError && !email && (
                    <p className="text-inputRingError text-sm mt-1">
                      Email daxil edilməlidir.
                    </p>
                  )}
                </div>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute text-2xl top-3 left-3 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleFocus("password")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      inputError && !password
                        ? "border-inputRingError"
                        : focusedInput === "password"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Şifrə"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-xl absolute top-3 right-3 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                  {/* Conditional rendering of the helper text */}
                  {inputError && !password && (
                    <p className="text-inputRingError text-sm mt-1">
                      Şifrə daxil edilməlidir.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mt-3 mb-4">
                  <a
                    onClick={handleForgotPasswordClick}
                    className="cursor-pointer font-normal text-brandBlue700 hover:text-brandBlue200 text-base font-gilroy"
                  >
                    Şifrəni unutmusan?
                  </a>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-inputBorder bg-inputBorder rounded "
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-neutralBlack font-gilroy"
                  >
                    Hesabımı yadda saxla
                  </label>
                </div>
              </div>
              <div className="flex gap-3 flex-col">
                <div>
                  <button
                    type="submit"
                    className={`w-full flex font-gilroy justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                      loading
                        ? "bg-[#DFDFDF] cursor-not-allowed" // Disabled state with grey background
                        : "bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                    }`}
                    disabled={loading} // Disable the button when loading is true
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        Gözləyin...
                      </div>
                    ) : (
                      "Daxil ol"
                    )}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleOpenRegister}
                    className="w-full font-gilroy flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-grayButtonText bg-grayLineFooter hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
                  >
                    Hesab yarat
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-8 text-lg text-gray-500 font-gilroy  whitespace-nowrap">
                  Və ya
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button className="rounded-full bg-gray-100 p-4">
                  <FcGoogle className="h-8 w-8" />
                </button>
                <button className="rounded-full bg-gray-100 p-4">
                  <FaLinkedin className="h-8 w-8 fill-[#0A66C2]" />
                </button>
                <button className="rounded-full bg-gray-100 p-4">
                  <FaFacebook className="h-8 w-8 fill-[#0866FF]" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
    </>
  );
}
