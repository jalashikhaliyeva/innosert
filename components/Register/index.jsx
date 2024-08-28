import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin, FaFacebook, FaUserCircle } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { FiPhone } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { postRegisterData } from "../../services/register";
import { useRouter } from "next/router";

import InputMask from "react-input-mask";

export default function RegisterModal({ isOpen, onClose, onOpenLoginModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+994");
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

  const handleOpenLogin = () => {
    onClose();
    onOpenLoginModal();
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    if (phoneValue.startsWith("+994 ")) {
      setPhone(phoneValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await postRegisterData(firstName, lastName, email, password);
      console.log("Server response:", data);

      if (data.status === "success") {
        const token = data.data.access_token;
        localStorage.setItem("token", token);
        alert("Registration successful!");
        onClose(); // Close the modal
        router.push("/home"); // Programmatically navigate to /home page
      } else {
        console.error("Validation error details:", data.message);
        alert(`Registration failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
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
            className="bg-bodyColor rounded-3xl shadow-lg w-full max-w-md p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-textHoverBlue">
              Innosertə xoş gəlmisən!
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3.5">
                <div className="relative">
                  <FaRegUserCircle className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Ad"
                  />
                </div>
                <div className="relative">
                  <FaRegUserCircle className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Soyad"
                  />
                </div>
                <div className="relative">
                  <GoMail className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute text-2xl top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Şifrə təyin et"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-xl absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </button>
                </div>

                <div className="relative">
                  <FiPhone className="text-2xl absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <InputMask
                    mask="+994 99 999 99 99"
                    value={phone}
                    onChange={handlePhoneChange}
                    maskChar={null}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-12 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Mobil nömrə"
                    alwaysShowMask={true}
                  />
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
                    className="w-full flex font-gilroy justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-textHoverBlue hover:bg-buttonBlueHover active:bg-buttonPressedPrimary"
                  >
                    Növbəti
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
    </>
  );
}
