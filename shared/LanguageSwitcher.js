// components/LanguageSwitcher.jsx

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    router.locale?.toUpperCase() || "AZ"
  );
  const dropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    if (language.toUpperCase() === selectedLanguage) return; // No change needed

    setSelectedLanguage(language.toUpperCase());
    i18n.changeLanguage(language.toLowerCase());
    localStorage.setItem("selectedLanguage", language.toUpperCase());
    setIsDropdownOpen(false);

    // Use router.asPath to preserve dynamic segments and query parameters
    router.push(router.asPath, router.asPath, {
      locale: language.toLowerCase(),
    });
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "AZ";
    setSelectedLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage.toLowerCase());
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      ref={dropdownRef}
    >
      <button
        id="dropdownLanguageButton"
        className="text-textSecondaryDefault text-base inline-flex items-center font-normal focus:outline-none text-center py-3 px-4 hover:text-textHoverBlue"
        type="button"
      >
        {selectedLanguage}
      </button>

      <div
        className={`absolute z-10 text-lg bg-white divide-y divide-gray-100 rounded-lg shadow p-2 transition-all duration-300 ease-in-out transform ${
          isDropdownOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
        style={{ top: "100%" }}
      >
        <ul className="py-1 divide-y divide-gray-200">
          {["AZ", "EN", "RU"].map((lang) => (
            <li
              key={lang}
              className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
                selectedLanguage === lang ? "text-blue-700" : "text-gray-700"
              }`}
              onClick={() => handleLanguageChange(lang)}
            >
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
