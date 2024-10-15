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
  // Added confirmPassword state
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("+994");
  const [showPassword, setShowPassword] = useState(false);
  // Added showConfirmPassword state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  // Added passwordMismatchError state
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle visibility of confirm password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

    // Remove all spaces from the mobile number
    const formattedMobile = phoneValue.replace(/\s+/g, "");
    setMobile(formattedMobile); // Set mobile without spaces
  };

  const handleFocus = (input) => {
    setFocusedInput(input);
    setInputError(false); // Reset error when user focuses on the input
    if (input === "password" || input === "confirmPassword") {
      setPasswordMismatchError(false); // Reset password mismatch error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, "firstName");
    console.log(lastName, "lastName");
    console.log(email, "email");
    console.log(password, "password");
    console.log(confirmPassword, "confirmPassword");
    console.log(mobile, "mobile");
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile
    ) {
      setInputError(true);
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      toast.error("Şifrələr uyğun deyil.");
      return;
    }
    setLoading(true);

    try {
      // Pass the mobile number to the API
      const data = await postRegisterData(
        firstName,
        lastName,
        email,
        password,
        mobile
      );

      console.log("Server response:", data);

      if (data?.status === "success") {
        const token = data.data.access_token;
        localStorage.setItem("token", token);

        toast.success("Uğurla qeydiyyatdan keçdiniz!");

        setTimeout(() => {
          onClose(); // Close the modal
          router.push("/home");
        }, 2000);
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
      setLoading(false);
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
                      (inputError && !password) || passwordMismatchError
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

                {/* Confirm Password Field */}
                <div className="relative">
                  <HiOutlineLockClosed className="absolute text-2xl top-3 left-3 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => handleFocus("confirmPassword")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      (inputError && !confirmPassword) || passwordMismatchError
                        ? "border-inputRingError"
                        : focusedInput === "confirmPassword"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Şifrəni təkrar et"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-xl absolute top-3 right-3 text-gray-400 cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <HiOutlineEyeOff />
                    ) : (
                      <HiOutlineEye />
                    )}
                  </button>
                  {inputError && !confirmPassword && (
                    <p className="text-inputRingError text-sm mt-1">
                      Şifrəni təkrar daxil edilməlidir.
                    </p>
                  )}
                  {passwordMismatchError && (
                    <p className="text-inputRingError text-sm mt-1">
                      Şifrələr uyğun deyil.
                    </p>
                  )}
                </div>

                <div className="relative">
                  <FiPhone className="text-2xl absolute top-3 left-3 text-gray-400" />
                  <InputMask
                    mask="+994 99 999 99 99"
                    value={mobile}
                    onChange={handlePhoneChange}
                    onFocus={() => handleFocus("mobile")}
                    onKeyDown={handleKeyDown}
                    className={`placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border ${
                      inputError && !mobile
                        ? "border-inputRingError"
                        : focusedInput === "mobile"
                        ? "border-inputRingFocus"
                        : "border-inputBorder"
                    } bg-inputBgDefault rounded-md shadow-sm focus:outline-none focus:ring-brandBlue sm:text-sm hover:bg-inputBgHover`}
                    placeholder="Mobil nömrə"
                  />
                  {inputError && !mobile && (
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
                        ? "bg-buttonSecondaryDisabled cursor-not-allowed"
                        : "bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                    }`}
                    disabled={loading}
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
        position="top-center"
        autoClose={6000}
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
