import React, { useState, useRef, useEffect } from "react";
import { FaPen } from "react-icons/fa"; // Import pen icon from FontAwesome
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaKey } from "react-icons/fa";
function GeneralInfoEditExam() {
  const [values, setValues] = useState(["", "", "", "", "00:00:00"]);
  // State to manage textarea values
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // State for dropdown visibility
  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
  const [isInfoHoveredFifth, setIsInfoHoveredFifth] = useState(false); // State for fifth info icon hover
  const [isInfoHoveredSixth, setIsInfoHoveredSixth] = useState(false);
  const categories = [
    "ux/uı dizayn",
    "front-end proqramlaşdırma",
    "data analitika",
    "back-end proqramlaşdırma",
    // ... additional categories
  ];

  // Add this function to generate a random code
  function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Add this state variable for the code
  const [code, setCode] = useState("");

  // Update the state variable for the "Kodlu" radio button
  const [isKodlu, setIsKodlu] = useState(true);

  // Use useEffect to generate a code when "Kodlu" is selected
  useEffect(() => {
    if (isKodlu) {
      setCode(generateRandomCode());
    } else {
      setCode(""); // Clear the code when "Kodsuz" is selected
    }
  }, [isKodlu]);

  // State for the two checkboxes in the fifth section
  const [isRadio1CheckedFifth, setIsRadio1CheckedFifth] = useState(false);
  const [isRadio2CheckedFifth, setIsRadio2CheckedFifth] = useState(false);

  // State for the two checkboxes in the sixth section
  const [isRadio1CheckedSixth, setIsRadio1CheckedSixth] = useState(false);
  const [isRadio2CheckedSixth, setIsRadio2CheckedSixth] = useState(false);

  const textareaRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]; // Refs for each textarea

  // Effect to adjust height whenever the values change
  useEffect(() => {
    textareaRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.height = "auto"; // Reset height
        ref.current.style.height = ref.current.scrollHeight + "px"; // Adjust height based on scrollHeight
      }
    });
  }, [values]);

  // Handler to update the value of a specific textarea
  const handleValueChange = (index, newValue) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };

  // Handler for the fourth textarea to always append the ₼ sign
  const handlePriceChange = (index, newValue) => {
    const numericValue = newValue.replace(/[^\d]/g, ""); // Remove any non-numeric characters
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = numericValue ? `${numericValue} ₼` : ""; // Append ₼ to the numeric value
      return newValues;
    });
  };

  function handleTimeChange(index, e) {
    const input = e.target;
    let value = input.value;

    // Remove all non-digit characters
    let digits = value.replace(/\D/g, "");

    // Limit to 6 digits
    digits = digits.slice(0, 6);

    // Build formatted value
    let formatted = "";
    if (digits.length >= 2) {
      formatted += digits.slice(0, 2);
      if (digits.length >= 4) {
        formatted += ":" + digits.slice(2, 4);
        if (digits.length >= 6) {
          formatted += ":" + digits.slice(4, 6);
        } else if (digits.length > 4) {
          formatted += ":" + digits.slice(4);
        }
      } else if (digits.length > 2) {
        formatted += ":" + digits.slice(2);
      }
    } else {
      formatted += digits;
    }

    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = formatted;
      return newValues;
    });
  }

  function handleTimeKeyDown(e) {
    // Allow digits, backspace, delete, and navigation keys
    if (
      e.key.length === 1 && // This ensures that keys like 'Backspace' are not blocked
      !/\d/.test(e.key)
    ) {
      e.preventDefault();
    }
  }

  return (
    <div className="bg-white rounded-xl py-10 px-6 sm:px-10 flex flex-col items-center w-full max-w-[90%] mx-auto">
   <div className="flex flex-col gap-1 w-full">
        <h2 className="font-gilroy text-2xl leading-8 font-medium text-textSecondaryDefault mb-5">
          Detallar
        </h2>
        <div className="flex flex-col gap-4 w-full">
          {/* First Textarea */}
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">
              İmtahanın adı
            </p>
            <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault hover:border-inputBorderHover rounded-lg w-full bg-inputBgDefault hover:bg-inputBgHover">
              <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
              <textarea
                ref={textareaRefs[0]}
                placeholder="Lorem consectetur. Velit molestie turpis pulvinar sit interdum pharetra. Posuere ut quam netus id est ut"
                className="text-black placeholder-gray200 w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault resize-none overflow-hidden"
                rows={1}
                value={values[0]}
                onChange={(e) => handleValueChange(0, e.target.value)}
              />
            </div>
          </div>

          {/* Second Textarea */}
          <div className="w-full"> 
            <p className="font-gilroy text-xl text-gray200 mb-1">
              İmtahan haqqında
            </p>
            <div className="group w-full flex py-3 px-4 items-center border border-buttonPrimaryDefault  hover:border-inputBorderHover rounded-lg w-[580px] bg-inputBgDefault hover:bg-inputBgHover">
              <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
              <textarea
                ref={textareaRefs[1]}
                placeholder="Lorem consectetur. Velit molestie turpis pulvinar sit interdum pharetra. Posuere ut quam netus id est ut"
                className="text-black placeholder-gray200 w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault resize-none overflow-hidden"
                rows={1}
                value={values[1]}
                onChange={(e) => handleValueChange(1, e.target.value)}
              />
            </div>
          </div>

          {/* Third Section - Category Dropdown */}
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">Kateqoriya</p>
            <div className="relative w-full">
              <div
                className={`w-full border font-gilroy border-gray-700 rounded-md py-3 px-4 cursor-pointer flex flex-wrap items-center bg-inputBgDefault dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus ${
                  isCategoryDropdownOpen ? "border-inputRingFocus" : ""
                }`}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                {selectedCategories.length > 0 ? (
                  <>
                    {selectedCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex !w-full items-center bg-[#EBEBEB] text-black px-2 py-2 rounded-md mr-2 mb-1"
                      >
                        <span>{category}</span>
                        <button
                          className="ml-1 text-xl text-black hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dropdown toggle
                            setSelectedCategories(
                              selectedCategories.filter(
                                (item) => item !== category
                              )
                            );
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <div className="flex-1" />
                    <svg
                      className={`w-4 h-4 transition-transform text-[#B2B2B2] ${
                        isCategoryDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span className="text-gray200 font-gilroy">
                      Kateqoriya seçin
                    </span>
                    <div className="flex-1" />
                    <svg
                      className={`w-4 h-4 transition-transform text-[#B2B2B2] ${
                        isCategoryDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </div>

              {isCategoryDropdownOpen && (
                <div className="absolute z-10 w-full bg-inputBgDefault border border-gray-600 rounded-md mt-1 max-h-[7.5rem] overflow-y-scroll category-dropdown">
                  {categories.map((category, index) => {
                    const isSelected = selectedCategories.includes(category);
                    return (
                      <div
                        key={index}
                        className={`py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                          isSelected ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (item) => item !== category
                              )
                            );
                          } else {
                            setSelectedCategories([
                              ...selectedCategories,
                              category,
                            ]);
                          }
                        }}
                      >
                        <span>{category}</span>
                        {isSelected && (
                          <svg
                            className="w-4 h-4 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Fourth Textarea */}
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200">İmtahan qiyməti</p>
            <div className="group flex w-full py-3 px-4 items-center border border-buttonPrimaryDefault hover:border-inputBorderHover rounded-lg bg-inputBgDefault hover:bg-inputBgHover">
              <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
              <textarea
                ref={textareaRefs[3]}
                placeholder="100 ₼"
                className="text-black font-gilroy placeholder-gray200 w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault resize-none overflow-hidden"
                rows={1}
                value={values[3]}
                onChange={(e) => handlePriceChange(3, e.target.value)} // Handle the input for price
              />
            </div>
          </div>

          <div className="mt-8 w-full">
            <p className="font-medium leading-8 font-gilroy text-2xl text-textSecondaryDefault mb-5 flex items-center gap-3">
              Imtahan müddətinin təyin olunması
              <div className="relative inline-block z-20">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-black"
                  onMouseEnter={() => setIsInfoHoveredFifth(true)}
                  onMouseLeave={() => setIsInfoHoveredFifth(false)}
                >
                  <IoIosInformationCircleOutline size={22} />
                </div>
                {isInfoHoveredFifth && (
                  <div className="absolute leading-5 left-full ml-3 top-1/2 transform -translate-y-1/2 w-[300px] text-sm font-gilroy bg-white text-black p-4 border border-gray-300 rounded-lg shadow-lg z-10">
                    Burada imtahanın müddətini təyin edə bilərsiniz.
                  </div>
                )}
              </div>
            </p>

            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="fifth-options"
                  className="form-radio"
                  checked={isRadio1CheckedFifth}
                  onChange={() => {
                    setIsRadio1CheckedFifth(true);
                    setIsRadio2CheckedFifth(false); // Uncheck the other option
                  }}
                />
                <span className="text-base font-gilroy">
                  Sual üçün vaxt təyin etmə
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="fifth-options"
                  className="form-radio"
                  checked={isRadio2CheckedFifth}
                  onChange={() => {
                    setIsRadio2CheckedFifth(true);
                    setIsRadio1CheckedFifth(false); // Uncheck the other option
                  }}
                />
                <span className="text-base font-gilroy">
                  İmtahana ümumi vaxt təyin etmə
                </span>
              </label>
            </div>

            {/* Conditionally render the time input based on isRadio2CheckedFifth */}
            {isRadio2CheckedFifth && (
              <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault rounded-lg w-[160px] hover:border-inputBorderHover hover:bg-inputBgHover bg-inputBgDefault">
                <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
                <input
                  ref={textareaRefs[4]}
                  placeholder="00:00:00"
                  className="text-black font-gilroy placeholder-gray200 w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault"
                  value={values[4]}
                  onChange={(e) => handleTimeChange(4, e)}
                  onKeyDown={handleTimeKeyDown}
                />
              </div>
            )}
          </div>

          {/* Sixth Input with Info Icon */}
          <div className="mt-8">
            <p className="font-medium leading-8 font-gilroy text-2xl text-textSecondaryDefault mb-5 flex items-center gap-3">
              Imtahan kodunun təyin olunması
              <div className="relative inline-block z-20">
                {/* Circular icon */}
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full  text-black"
                  onMouseEnter={() => setIsInfoHoveredSixth(true)}
                  onMouseLeave={() => setIsInfoHoveredSixth(false)}
                >
                  <IoIosInformationCircleOutline size={22} />
                </div>
                {/* Tooltip */}
                {isInfoHoveredSixth && (
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 w-[300px] text-sm leading-5 font-gilroy bg-white text-black p-4 border border-gray-300 rounded-lg shadow-lg z-10">
                    Burada imtahanın kodu avtomatik təyin edilir.
                    <br></br> Kodlar təkrarlanmır.
                    <br></br> Yeni kod yaratmaq üçün açar ikonuna klikləyin.
                  </div>
                )}
              </div>
            </p>
            {/* Radio Buttons */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sixth-options"
                  className="form-radio"
                  checked={!isKodlu}
                  onChange={() => setIsKodlu(false)}
                />
                <span className="text-base font-gilroy">Kodsuz</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sixth-options"
                  className="form-radio"
                  checked={isKodlu}
                  onChange={() => setIsKodlu(true)}
                />
                <span className="text-base font-gilroy">Kodlu</span>
              </label>
            </div>

            {/* Code Input */}
            {isKodlu && (
              <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault rounded-lg w-[160px] hover:border-inputBorderHover hover:bg-inputBgHover bg-inputBgDefault">
                <FaKey
                  className="text-gray200 mr-3 group-hover:text-gray800 cursor-pointer"
                  onClick={() => setCode(generateRandomCode())}
                />
                <input
                  type="text"
                  className="text-black font-gilroy placeholder-gray200 w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault"
                  value={code}
                  readOnly
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfoEditExam;
