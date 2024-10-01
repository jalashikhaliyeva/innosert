import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaFacebook, FaRegUserCircle } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { postRegisterData } from "../../services/register";
import { useRouter } from "next/router";

import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterModal({ isOpen, onClose, onOpenLoginModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+994");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null); // State to track focused input
  const [loading, setLoading] = useState(false); // New state for loading
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenLogin = () => {
    onClose();
    onOpenLoginModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    if (phoneValue.startsWith("+994")) {
      setPhone(phoneValue);
    }
  };

  const handleFocus = (input) => {
    setFocusedInput(input);
    setInputError(false); // Reset error when user focuses on the input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !phone) {
      setInputError(true);
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }
    setLoading(true);

    try {
      const data = await postRegisterData(firstName, lastName, email, password);
      console.log("Server response:", data);

      // Adjust this condition based on what the API returns
      if (data?.status === "success") {
        const token = data.data.access_token;
        localStorage.setItem("token", token);

        // Show success toast and delay the modal close and redirection
        toast.success("Uğurla qeydiyyatdan keçdiniz!");

        // Delay modal close and redirection to let the toast appear
        setTimeout(() => {
          onClose(); // Close the modal
          router.push("/home"); // Navigate to home page after a slight delay
        }, 2000); // Adjust delay to give enough time for the toast to display (e.g., 2 seconds)
      } else {
        console.error("Validation error details:", data.message);
        toast.error(
          `Qeydiyyat uğursuz oldu: ${data.message || "Naməlum xəta"}`
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.warning("Qeydiyyat zamanı xəta baş verdi.");
    } finally {
      setLoading(false); // Set loading to false after the process is finished
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-bodyColor rounded-3xl shadow-lg w-full max-w-md p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl"
            >
              &times;
            </button>
            <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-brandBlue500">
              Innosertə xoş gəlmisən!
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3.5">
                <div className="relative">
                  <FaRegUserCircle className="text-2xl absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={() => handleFocus("firstName")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      inputError && !firstName
                        ? "border-inputRingError"
                        : focusedInput === "firstName"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Ad"
                  />
                  {inputError && !firstName && (
                    <p className="text-inputRingError text-sm mt-1">
                      Ad daxil edilməlidir.
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FaRegUserCircle className="text-2xl absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={() => handleFocus("lastName")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      inputError && !lastName
                        ? "border-inputRingError"
                        : focusedInput === "lastName"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Soyad"
                  />
                  {inputError && !lastName && (
                    <p className="text-inputRingError text-sm mt-1">
                      Soyad daxil edilməlidir.
                    </p>
                  )}
                </div>

                <div className="relative">
                  <GoMail className="text-2xl absolute top-3 left-3 text-gray-400" />
                  <input
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
                  {inputError && !email && (
                    <p className="text-inputRingError text-sm mt-1">
                      Email daxil edilməlidir.
                    </p>
                  )}
                </div>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute text-2xl top-3 left-3 text-gray-400" />
                  <input
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
                    placeholder="Şifrə təyin et"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-xl absolute top-3 right-3 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                  {inputError && !password && (
                    <p className="text-inputRingError text-sm mt-1">
                      Şifrə daxil edilməlidir.
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FiPhone className="text-2xl absolute top-3 left-3 text-gray-400" />
                  <InputMask
                    mask="+994 99 999 99 99"
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={() => handleFocus("phone")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      inputError && !phone
                        ? "border-inputRingError"
                        : focusedInput === "phone"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Mobil nömrə"
                  />
                  {inputError && !phone && (
                    <p className="text-inputRingError text-sm mt-1">
                      Nömrə daxil edilməlidir.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center mb-4 mt-6">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-inputBorder bg-inputBorder rounded"
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
                        ? "bg-buttonSecondaryDisabled cursor-not-allowed" // Disabled state with grey background
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
                      "Növbəti"
                    )}
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleOpenLogin}
                    className="w-full font-gilroy flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-grayButtonText bg-grayLineFooter hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
                  >
                    Hesabın var?
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-8 text-lg text-gray-500 font-gilroy whitespace-nowrap">
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
