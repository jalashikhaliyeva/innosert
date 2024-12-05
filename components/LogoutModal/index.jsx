
// components/LogoutModal.jsx

import React, { useContext } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { signOut } from "next-auth/react"; // Import signOut
import { UserContext } from "@/shared/context/UserContext";

export default function LogoutModal({ show, onClose }) {
  const { t } = useTranslation();
  const { logout } = useContext(UserContext);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal if clicked outside
    }
  };

  if (!show) return null;

  const handleLogout = async () => {
    await logout();
    signOut({ callbackUrl: "/" });
    onClose();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[9999]"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <IoLogOutOutline
              style={{ fontSize: "32px", color: "red", fill: "red" }}
            />
          </div>
        </div>

        <h3
          className="text-lg font-semibold text-gray-900 text-center"
          style={{ fontFamily: "Gilroy" }}
        >
          {t("confirmation.logout")}
        </h3>

        <p
          className="text-sm text-gray-600 text-center mt-2"
          style={{ fontFamily: "Gilroy" }}
        >
          {t("confirmation.logoutConfirmation")}
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            {t("confirmation.no")}
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 ml-2 bg-errorButtonDefault text-white rounded-lg hover:bg-errorButtonHover active:bg-errorButtonPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            {t("confirmation.yes")}
          </button>
        </div>
      </div>
    </div>
  );
}