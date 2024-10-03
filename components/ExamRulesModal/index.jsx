import React, { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import styles from "./stye.module.css";
function ExamRulesModal({ onClose, onCancel }) {
  const handleBackgroundClick = (e) => {
    // Check if the user clicked outside the modal (by comparing the target and currentTarget)
    if (e.target === e.currentTarget) {
        onClose(); ; // Trigger the cancel action if clicked outside
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
    >
      <div className="bg-boxGrayBodyColor rounded-3xl shadow-shadow3 p-6 w-96 ">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full ">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.583 4.1665H35.4163C37.0739 4.1665 38.6637 4.82498 39.8358 5.99709C41.0079 7.16919 41.6663 8.7589 41.6663 10.4165V39.5832C41.6663 41.2408 41.0079 42.8305 39.8358 44.0026C38.6637 45.1747 37.0739 45.8332 35.4163 45.8332H14.583C12.9254 45.8332 11.3357 45.1747 10.1636 44.0026C8.99149 42.8305 8.33301 41.2408 8.33301 39.5832V10.4165C8.33301 8.7589 8.99149 7.16919 10.1636 5.99709C11.3357 4.82498 12.9254 4.1665 14.583 4.1665ZM14.583 8.33317C14.0305 8.33317 13.5006 8.55266 13.1099 8.94336C12.7192 9.33407 12.4997 9.86397 12.4997 10.4165V39.5832C12.4997 40.1357 12.7192 40.6656 13.1099 41.0563C13.5006 41.447 14.0305 41.6665 14.583 41.6665H35.4163C35.9689 41.6665 36.4988 41.447 36.8895 41.0563C37.2802 40.6656 37.4997 40.1357 37.4997 39.5832V10.4165C37.4997 9.86397 37.2802 9.33407 36.8895 8.94336C36.4988 8.55266 35.9689 8.33317 35.4163 8.33317H14.583ZM18.7497 35.4165H22.9163C23.4689 35.4165 23.9988 35.636 24.3895 36.0267C24.7802 36.4174 24.9997 36.9473 24.9997 37.4998C24.9997 38.0524 24.7802 38.5823 24.3895 38.973C23.9988 39.3637 23.4689 39.5832 22.9163 39.5832H18.7497C18.1971 39.5832 17.6672 39.3637 17.2765 38.973C16.8858 38.5823 16.6663 38.0524 16.6663 37.4998C16.6663 36.9473 16.8858 36.4174 17.2765 36.0267C17.6672 35.636 18.1971 35.4165 18.7497 35.4165ZM31.2497 10.4165C31.8022 10.4165 32.3321 10.636 32.7228 11.0267C33.1135 11.4174 33.333 11.9473 33.333 12.4998C33.333 13.0524 33.1135 13.5823 32.7228 13.973C32.3321 14.3637 31.8022 14.5832 31.2497 14.5832C30.6971 14.5832 30.1672 14.3637 29.7765 13.973C29.3858 13.5823 29.1663 13.0524 29.1663 12.4998C29.1663 11.9473 29.3858 11.4174 29.7765 11.0267C30.1672 10.636 30.6971 10.4165 31.2497 10.4165ZM31.2497 16.6665C31.8022 16.6665 32.3321 16.886 32.7228 17.2767C33.1135 17.6674 33.333 18.1973 33.333 18.7498C33.333 19.3024 33.1135 19.8323 32.7228 20.223C32.3321 20.6137 31.8022 20.8332 31.2497 20.8332C30.6971 20.8332 30.1672 20.6137 29.7765 20.223C29.3858 19.8323 29.1663 19.3024 29.1663 18.7498C29.1663 18.1973 29.3858 17.6674 29.7765 17.2767C30.1672 16.886 30.6971 16.6665 31.2497 16.6665ZM18.7497 29.1665H31.2497C31.8022 29.1665 32.3321 29.386 32.7228 29.7767C33.1135 30.1674 33.333 30.6973 33.333 31.2498C33.333 31.8024 33.1135 32.3323 32.7228 32.723C32.3321 33.1137 31.8022 33.3332 31.2497 33.3332H18.7497C18.1971 33.3332 17.6672 33.1137 17.2765 32.723C16.8858 32.3323 16.6663 31.8024 16.6663 31.2498C16.6663 30.6973 16.8858 30.1674 17.2765 29.7767C17.6672 29.386 18.1971 29.1665 18.7497 29.1665ZM18.7497 22.9165H31.2497C31.8022 22.9165 32.3321 23.136 32.7228 23.5267C33.1135 23.9174 33.333 24.4473 33.333 24.9998C33.333 25.5524 33.1135 26.0823 32.7228 26.473C32.3321 26.8637 31.8022 27.0832 31.2497 27.0832H18.7497C18.1971 27.0832 17.6672 26.8637 17.2765 26.473C16.8858 26.0823 16.6663 25.5524 16.6663 24.9998C16.6663 24.4473 16.8858 23.9174 17.2765 23.5267C17.6672 23.136 18.1971 22.9165 18.7497 22.9165ZM19.7913 10.4165H23.958C24.7868 10.4165 25.5817 10.7457 26.1677 11.3318C26.7538 11.9178 27.083 12.7127 27.083 13.5415V17.7082C27.083 18.537 26.7538 19.3318 26.1677 19.9179C25.5817 20.5039 24.7868 20.8332 23.958 20.8332H19.7913C18.9625 20.8332 18.1677 20.5039 17.5816 19.9179C16.9956 19.3318 16.6663 18.537 16.6663 17.7082V13.5415C16.6663 12.7127 16.9956 11.9178 17.5816 11.3318C18.1677 10.7457 18.9625 10.4165 19.7913 10.4165Z"
                fill="#4F7291"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="relative flex items-center justify-center font-medium leading-8 font-gilroy text-2xl text-gray-900">
          <span className="flex-grow h-[2px] bg-grayLineFooter mr-4"></span>
          İmtahan şərtləri
          <span className="flex-grow h-[2px] bg-grayLineFooter ml-4"></span>
        </h3>

        {/* Description */}

        <div
          className={`${styles.scrollbaralwaysvisible} text-base font-gilroy flex justify-center  text-grayButtonText  mt-3 overflow-y-scroll px-7`}
          style={{
            maxHeight: "10rem",
          }}
        >
          <p>
            1. Düzgünləşdirilmiş məlumatlar – Bütün verilənlər düzgün və tam
            şəkildə toplanmalıdır. <br></br>
            2. Şəbəkə təhlükəsizliyi – Şəbəkə təhlükəsizliyinə riayət olunmalı
            və şifrələnmə istifadəsi vacibdir. <br></br>
            3. Doğrulama sistemi – İstifadəçilər daxil olduqda doğrulama
            (authentication) prosesi tətbiq edilməlidir. <br></br>
            4. Quraşdırma tələbləri – Bütün qurğular ən son proqram təminatı və
            təhlükəsizlik yeniləmələri ilə quraşdırılmalıdır. <br></br>
            5. Bağlantı sürəti – Bağlantı sürətinə nəzarət edilməli və minimal
            kəsinti ilə işləməsi təmin olunmalıdır. <br></br>
            6. Yedəkləmə siyasəti – Məlumatların təhlükəsizliyi üçün mütəmadi
            yedəkləmə siyasəti tətbiq edilməlidir. <br></br>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="w-5 h-5 mr-2 cursor-pointer"
          />
          <label
            htmlFor="termsCheckbox"
            className="text-base font-normal leading-6 font-gilroy text-gray-900 cursor-pointer"
          >
            Şərtləri qəbul edirəm
          </label>
        </div>

        <button
          onClick={onCancel}
          className="flex gap-4 items-center  mt-6 w-full py-2 px-4  bg-blue50 border border-blueB400 text-blueB500 text-sm font-medium rounded-lg  cursor-default"
          style={{ fontFamily: "Gilroy" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM9 3V5H7V3H9ZM6 12V13H10V12H9V6H6V7H7V12H6Z"
              fill="#3366FF"
            />
          </svg>
          Imtahan şərtlərini diqqətlə oxuyun
        </button>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
            className="w-full py-2 px-4  bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: "Gilroy" }}
          >
            İmtahana başla
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamRulesModal;
