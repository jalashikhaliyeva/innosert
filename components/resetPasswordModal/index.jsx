import { useState, useEffect, useContext } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "@/shared/context/UserContext";

export default function ResetPasswordModal({
  isOpen,
  onClose,
  onPasswordResetSuccess = () => {},
}) {
  const { otpCode } = useContext(UserContext);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error states for form validation
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (!otpCode) {
      toast.error("Token tapılmadı. Zəhmət olmasa yenidən cəhd edin.");
    } else {
      console.log("Retrieved OTP Code from Context:", otpCode);
    }
  }, [otpCode]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const uppercasePattern = /[A-Z]/;
    const numberPattern = /[0-9]/;
    if (!uppercasePattern.test(password)) {
      return "Şifrəniz ən azı bir böyük hərf içərməlidir.";
    }
    if (!numberPattern.test(password)) {
      return "Şifrəniz ən azı bir rəqəm içərməlidir.";
    }
    if (password.length < 6) {
      return "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    // Validate new password
    const passwordValidationError = validatePassword(newPassword);
    if (passwordValidationError) {
      setNewPasswordError(passwordValidationError);
      hasError = true;
    }

    // Validate confirm password
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Şifrələr uyğun gəlmir.");
      hasError = true;
    }

    if (hasError) return;

    if (!otpCode) {
      toast.error("Token təqdim edilmədi. Zəhmət olmasa yenidən cəhd edin.");
      return;
    }

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/password/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: otpCode, // Use otpCode from context
            password: newPassword,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await response.json();
      console.log(data, "reset data");

      if (!response.ok || data.status !== true) {
        console.error("Server Response:", data);
        toast.error(
          `Xəta: ${
            data.message ||
            "Şifrənin bərpası uğursuz oldu. Zəhmət olmasa yenidən cəhd edin."
          }`
        );
        return;
      }

      toast.success("Şifrə uğurla bərpa edildi. Məlumatlarınız dəyişdirildi.");

      setTimeout(() => {
        onPasswordResetSuccess();
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Şifrənin bərpasında xəta:", error);
      toast.error(
        "Gözlənilməz bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin."
      );
    }
  };

  // Handle focus events to clear errors
  const handleFocus = (field) => {
    if (field === "newPassword") setNewPasswordError("");
    if (field === "confirmPassword") setConfirmPasswordError("");
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={(e) => e.target === e.currentTarget && onClose()}
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

          <h2 className="font-gilroy text-2xl font-medium leading-8 mb-6 text-center text-brandBlue500">
            Şifrənin bərpası
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <HiOutlineLockClosed className="text-2xl absolute left-3 top-5 transform -translate-y-1/2 text-grayTextinBox" />
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => handleFocus("newPassword")}
                className={`w-full pl-12 pr-10 py-2 border ${
                  newPasswordError ? "border-red-500" : "border-inputBorder"
                } bg-grayTextColor rounded-md text-base font-medium focus:outline-none focus:border-inputRingFocus`}
                placeholder="Yeni Şifrə"
              />
              {showPassword ? (
                <HiOutlineEyeOff
                  className="absolute right-3 top-5 transform -translate-y-1/2 text-grayTextinBox cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <HiOutlineEye
                  className="absolute right-3 top-5 transform -translate-y-1/2 text-grayTextinBox cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
              {newPasswordError && (
                <p className="text-red-500 text-sm mt-1">{newPasswordError}</p>
              )}
            </div>

            <div className="mb-6 relative">
              <HiOutlineLockClosed className="text-2xl absolute left-3 top-5 transform -translate-y-1/2 text-grayTextinBox" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => handleFocus("confirmPassword")}
                className={`w-full pl-12 pr-10 py-2 border ${
                  confirmPasswordError ? "border-red-500" : "border-inputBorder"
                } bg-grayTextColor rounded-md text-base font-medium focus:outline-none focus:border-inputRingFocus`}
                placeholder="Şifrəni Təsdiqlə"
              />
              {showPassword ? (
                <HiOutlineEyeOff
                  className="absolute right-3 top-5 transform -translate-y-1/2 text-grayTextinBox cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <HiOutlineEye
                  className="absolute right-3 top-5 transform -translate-y-1/2 text-grayTextinBox cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md flex justify-center py-2 px-4 border border-transparent rounded-base shadow-sm text-lg font-medium text-white bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                >
                  Şifrəni Bərpa Et
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
