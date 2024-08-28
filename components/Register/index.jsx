import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onOpenLoginModal,
}) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOpenLogin = () => {
    onClose(); // Close the Register Modal
    onOpenLoginModal(); // Open the Login Modal
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
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-textHoverBlue">
              Innosertə xoş gəlmisən!
            </h2>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <FaUserCircle className="text-lg absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-10 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div className="relative">
                  <GoMail className="text-lg absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-10 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <HiOutlineLockClosed className="absolute text-lg top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-10 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
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
                  <MdLocalPhone className="text-lg absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="placeholder-inputPlaceholderTe placeholder:text-base font-gilroy block w-full pl-10 pr-3 py-3 px-4 border bg-inputDefault border-inputBorder rounded-md shadow-sm focus:outline-none focus:ring-brandBlue focus:border-brandBlue sm:text-sm"
                    placeholder="Mobil nömrə"
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}
