import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import EmailVerificationModal from "../EmailVerificationModal";

export default function LoginModal({
  isOpen,
  onClose,
  onOpenRegisterModal,
  onOpenOTPModal,
  onForgotPasswordClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // const handleOpenRegister = () => {
  //   onClose(() => onOpenRegisterModal());
  // };
  const handleOpenRegister = () => {
    onClose(); // Close the LoginModal first
    onOpenRegisterModal(); // Then open the RegisterModal
  };

  const handleForgotPasswordClick = () => {
    if (onClose) onClose(); // Check if onClose is defined before calling it
    if (onForgotPasswordClick) onForgotPasswordClick(); // Open the EmailVerificationModal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log("Form login response:", data);

      if (data?.data?.token) {
        localStorage.setItem("token", data?.data?.token);
        console.log(data?.data?.token, "token success");
        if (data.message === "successful login") {
          toast.success("Uğurla daxil oldunuz!");
          setTimeout(() => {
            router.push("/home");
          }, 800); // Adjust the delay as needed (2000ms = 2 seconds)
        }
      } else {
        toast.error("Daxil olma uğursuz oldu. Zəhmət olmasa yenidən cəhd edin.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.warning("Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-bodyColor rounded-lg shadow-lg w-full max-w-sm p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onClose()}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-textHoverBlue">
              Innosertə xoş gəlmisən!
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <GoMail className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute text-2xl top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    required
                    placeholder="Şifrə"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-xl absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mt-3 mb-4">
                  <a
                    onClick={handleForgotPasswordClick}
                    className="cursor-pointer font-normal text-brandBlue700 hover:text-blue-600 text-base font-gilroy"
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
                    className="w-full flex font-gilroy justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-textHoverBlue hover:bg-buttonBlueHover active:bg-buttonPressedPrimary"
                  >
                    Daxil ol
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
