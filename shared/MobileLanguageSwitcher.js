import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

function MobileLanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    router.locale?.toUpperCase() || "AZ"
  );
  const dropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.toLowerCase());
    localStorage.setItem("selectedLanguage", language);
    setIsDropdownOpen(false);

    router.push(router.pathname, router.asPath, {
      locale: language.toLowerCase(),
    });
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "AZ";
    setSelectedLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage.toLowerCase());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <li
      className="py-4 cursor-pointer flex flex-col"
      ref={dropdownRef}
    >
      <div
        className="flex justify-between items-center w-full"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-lg font-gilroy font-normal hover:text-textHoverBlue">
          {selectedLanguage}
        </span>
        {isDropdownOpen ? (
          <MdKeyboardArrowDown className="mt-1 fill-arrowButtonGray" />
        ) : (
          <MdKeyboardArrowRight className="mt-1 fill-arrowButtonGray" />
        )}
      </div>
      {isDropdownOpen && (
        <ul className="pl-4 mt-2">
          {["AZ", "EN", "RU"].map((lang) => (
            <li
              key={lang}
              className={`py-2 cursor-pointer hover:text-textHoverBlue ${
                selectedLanguage === lang ? "text-blue-700" : "text-gray-700"
              }`}
              onClick={() => handleLanguageChange(lang)}
            >
              {lang}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default MobileLanguageSwitcher;
