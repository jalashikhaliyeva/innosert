// import React, { useState, useEffect, useRef } from "react";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { IoIosArrowDown } from "react-icons/io";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/router";

// function LanguageSwitcher() {
//   const { i18n } = useTranslation();
//   const router = useRouter();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState(
//     router.locale || "AZ"
//   );
//   const dropdownRef = useRef(null);

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     i18n.changeLanguage(language.toLowerCase());
//     localStorage.setItem("selectedLanguage", language);
//     setIsDropdownOpen(false);

//     if (language === "AZ") {

//       router.push(router.pathname, router.pathname, {
//         locale: language.toLowerCase(),
//       });
//     } else {

//       const newPath = `/${language.toLowerCase()}${router.pathname}`;
//       router.push(newPath, newPath, { locale: language.toLowerCase() });
//     }
//   };

//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("selectedLanguage") || "AZ";
//     setSelectedLanguage(savedLanguage);
//     i18n.changeLanguage(savedLanguage.toLowerCase());
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsDropdownOpen(true)}
//       onMouseLeave={() => setIsDropdownOpen(false)}
//       ref={dropdownRef}
//     >
//       <button
//         id="dropdownLanguageButton"
//         className="text-textSecondaryDefault text-base inline-flex items-center font-normal focus:outline-none text-center py-3 px-4 hover:text-textHoverBlue"
//         type="button"
//       >
//         {selectedLanguage}
//       </button>

//       {isDropdownOpen && (
//         <div
//           className="absolute z-10 text-lg bg-white divide-y divide-gray-100 rounded-lg shadow  p-2"
//           style={{ top: "100%" }}
//         >
//           <ul className="py-1 divide-y divide-gray-200">
//             <li
//               className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
//                 selectedLanguage === "AZ" ? "text-blue-700" : "text-gray-700"
//               }`}
//               onClick={() => handleLanguageChange("AZ")}
//             >
//               AZ
//             </li>
//             <li
//               className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
//                 selectedLanguage === "EN" ? "text-blue-700" : "text-gray-700"
//               }`}
//               onClick={() => handleLanguageChange("EN")}
//             >
//               EN
//             </li>
//             <li
//               className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
//                 selectedLanguage === "RU" ? "text-blue-700" : "text-gray-700"
//               }`}
//               onClick={() => handleLanguageChange("RU")}
//             >
//               RU
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LanguageSwitcher;






// LAST WHICH WORKS 
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    router.locale || "AZ"
  );
  const dropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language.toLowerCase());
    localStorage.setItem("selectedLanguage", language);
    setIsDropdownOpen(false);

    if (language === "AZ") {
      router.push(router.pathname, router.pathname, {
        locale: language.toLowerCase(),
      });
    } else {
      const newPath = `/${language.toLowerCase()}${router.pathname}`;
      router.push(newPath, newPath, { locale: language.toLowerCase() });
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "AZ";
    setSelectedLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage.toLowerCase());
  }, []);

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
          <li
            className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
              selectedLanguage === "AZ" ? "text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageChange("AZ")}
          >
            AZ
          </li>
          <li
            className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
              selectedLanguage === "EN" ? "text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageChange("EN")}
          >
            EN
          </li>
          <li
            className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 font-normal text-base hover:text-textHoverBlue ${
              selectedLanguage === "RU" ? "text-blue-700" : "text-gray-700"
            }`}
            onClick={() => handleLanguageChange("RU")}
          >
            RU
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LanguageSwitcher;
