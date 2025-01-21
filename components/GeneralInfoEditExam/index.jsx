"use client";

import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { FaPen, FaKey } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContext } from "@/shared/context/UserContext";

/**
 * Generates a random 6-character alphanumeric code.
 */
function generateRandomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function GeneralInfoEditExam() {
  const {
    // --- From context ---
    selectedCategory,
    selectedSubcategory,
    timeForQuestion,
    setTimeForQuestion,
    examDetails,
    setExamDetails, // direct setter for examDetails
    isGeneralInfoValid,
    setIsGeneralInfoValid,
  } = useContext(UserContext);

  // Dropdown toggle for category/subcategory
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  // Info hover toggles (for the little question marks)
  const [isInfoHoveredFifth, setIsInfoHoveredFifth] = useState(false);
  const [isInfoHoveredSixth, setIsInfoHoveredSixth] = useState(false);

  // For auto-resizing textareas
  const textareaRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Combine categories and subcategories into one list
  const combinedList = useMemo(
    () => [
      ...(selectedCategory || []).map((cat) => ({
        name: cat.name,
        type: "category",
        id: cat.id,
      })),
      ...(selectedSubcategory || []).map((sub) => ({
        name: sub.name,
        type: "subcategory",
        id: sub.id,
      })),
    ],
    [selectedCategory, selectedSubcategory]
  );

  // --------------------------------------------
  // Helper: Update examDetails in context
  // --------------------------------------------
  const updateExamField = (fieldName, value) => {
    setExamDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  // --------------------------------------------
  // Handlers for each input field
  // --------------------------------------------

  // 1) Exam Name
  const handleNameChange = (value) => {
    updateExamField("name", value);
  };

  // 2) Exam Description
  const handleDescChange = (value) => {
    updateExamField("desc", value);
  };

  // 3) Category/Subcategory Selection
  const handleItemSelection = (itemName) => {
    const selectedItem = combinedList.find((item) => item.name === itemName);
    if (!selectedItem) return;

    setExamDetails((prev) => {
      const currentIds = prev.category_id || [];
      const alreadySelected = currentIds.includes(selectedItem.id);
      return {
        ...prev,
        category_id: alreadySelected
          ? currentIds.filter((id) => id !== selectedItem.id)
          : [...currentIds, selectedItem.id],
      };
    });
  };

  // 4) Price
  const handlePriceChange = (value) => {
    // Strip out non-numeric chars (except maybe we keep '₼' out).
    const numericValue = value.replace(/[^\d]/g, "");
    updateExamField("price", numericValue);
  };

  // 5) Duration
  const handleDurationChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 6);
    let formatted = "";

    if (value.length >= 2) {
      formatted += value.slice(0, 2);
      if (value.length >= 4) {
        formatted += ":" + value.slice(2, 4);
        if (value.length >= 6) {
          formatted += ":" + value.slice(4, 6);
        } else if (value.length > 4) {
          formatted += ":" + value.slice(4);
        }
      } else if (value.length > 2) {
        formatted += ":" + value.slice(2);
      }
    } else {
      formatted += value;
    }

    updateExamField("duration", formatted);
  };

  // 6) Radio Buttons: "timeForQuestion" is from context.
  //    - true  => set time per question
  //    - false => set total exam time
  const handleRadioTime = (value) => {
    setTimeForQuestion(value);
    if (value === true) {
      // Clear duration when "time per question" is selected
      updateExamField("duration", "");
    }
  };

  // 7) Kodlu or Kodsuz
  const handleRadioCode = (isKodlu) => {
    if (isKodlu) {
      // user chooses "Kodlu" => generate code if none
      if (!examDetails.code) {
        updateExamField("code", generateRandomCode());
      }
    } else {
      // user chooses "Kodsuz" => remove code
      updateExamField("code", "");
    }
  };

  // 8) If user clicks the key icon => generate a fresh code
  const handleRegenerateCode = () => {
    updateExamField("code", generateRandomCode());
  };

  // Close category dropdown on outside click
  const dropdownRef = useRef(null);
  useEffect(() => {
    if (!isCategoryDropdownOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCategoryDropdownOpen]);

  // Auto-resize textareas
  useEffect(() => {
    textareaRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    });
  }, [
    examDetails?.name,
    examDetails.desc,
    examDetails.price,
    examDetails.duration,
  ]);

  // (Optional) Validation check each time examDetails changes
  useEffect(() => {
    const { name, desc, price, code, category_id, duration } = examDetails;

    // Basic checks
    const examNameValid = !!name.trim();
    const examDescValid = !!desc.trim();
    const categoriesValid = category_id && category_id.length > 0;
    const priceValid = price !== "";
    const codeValid = true; // We can refine if "Kodlu" is chosen.
    const baseValid =
      examNameValid &&
      examDescValid &&
      categoriesValid &&
      priceValid &&
      codeValid;

    // If "total exam time" is chosen (timeForQuestion === false),
    // then the duration can't be "00:00:00"
    let finalValid = baseValid;
    if (timeForQuestion === false) {
      const [hh, mm, ss] = (duration || "0:0:0").split(":").map(Number);
      const totalSecs = hh * 3600 + mm * 60 + (ss || 0);
      if (totalSecs <= 0) {
        finalValid = false;
        // Optionally show a toast or some error message here
        // toast.error(
        //   "Ümumi müddət 00:00:00 ola bilməz. Zəhmət olmasa, ən azı bir hissəni doldurun."
        // );
      }
    }

    // Update the context validation flag
    setIsGeneralInfoValid(finalValid);
  }, [examDetails, timeForQuestion, setIsGeneralInfoValid]);

  return (
    <div className="bg-white rounded-xl py-10 px-6 sm:px-10 flex flex-col items-center w-full max-w-[90%] mx-auto">
      <div className="flex flex-col gap-1 lg:w-[60%] w-full">
        <h2 className="font-gilroy text-2xl leading-8 font-medium text-textSecondaryDefault mb-5">
          Detallar
        </h2>

        {/* IMTAHANIN ADI */}
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">
              İmtahanın adı
            </p>
            <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault hover:border-inputBorderHover rounded-lg w-full bg-inputBgDefault hover:bg-inputBgHover">
              <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
              <textarea
                ref={textareaRefs[0]}
                placeholder="İmtahanın adını daxil edin"
                className="text-black placeholder-inputPlaceholderText w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault resize-none overflow-hidden"
                rows={1}
                value={examDetails.name || ""}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
          </div>

          {/* IMTAHAN HAQQINDA */}
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">
              İmtahan haqqında
            </p>
            <div className="group w-full flex py-3 px-4 items-center border border-buttonPrimaryDefault hover:border-inputBorderHover rounded-lg bg-inputBgDefault hover:bg-inputBgHover">
              <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
              <textarea
                ref={textareaRefs[1]}
                placeholder="İmtahan haqqında məlumat daxil edin"
                className="text-black placeholder-inputPlaceholderText w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault resize-none overflow-hidden"
                rows={1}
                value={examDetails.desc || ""}
                onChange={(e) => handleDescChange(e.target.value)}
              />
            </div>
          </div>

          {/* KATEQORIYA / SUBKATEQORIYA SECIMI */}
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">
              Kateqoriya və Subkateqoriya Seçimi
            </p>
            <div className="relative w-full" ref={dropdownRef}>
              <div
                className={`w-full border font-gilroy border-gray-700 rounded-md py-3 px-4 cursor-pointer flex flex-wrap items-center bg-inputBgDefault dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus ${
                  isCategoryDropdownOpen ? "border-inputRingFocus" : ""
                }`}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                {/* Selected items */}
                {examDetails.category_id && examDetails.category_id.length > 0 ? (
                  examDetails.category_id.map((id) => {
                    const foundItem = combinedList.find((item) => item.id === id);
                    return foundItem ? (
                      <div
                        key={id}
                        className="flex !w-full items-center bg-[#EBEBEB] text-black px-2 py-2 rounded-md mr-2 mb-1"
                      >
                        <span>{foundItem.name}</span>
                        <button
                          className="ml-1 text-xl text-black hover:text-gray-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleItemSelection(foundItem.name);
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ) : null;
                  })
                ) : (
                  <span className="text-gray200 font-gilroy">
                    Kateqoriya və ya Subkateqoriya seçin
                  </span>
                )}

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
              </div>

              {/* Dropdown list */}
              {isCategoryDropdownOpen && (
                <div className="absolute z-10 w-full bg-inputBgDefault border border-gray-600 rounded-md mt-1 max-h-[7.5rem] overflow-y-scroll category-dropdown">
                  {combinedList.map((item, index) => {
                    const isSelected =
                      examDetails.category_id &&
                      examDetails.category_id.includes(item.id);
                    return (
                      <div
                        key={index}
                        className={`py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                          isSelected ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleItemSelection(item.name)}
                      >
                        <span>{item.name}</span>
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

          {/* IMTAHAN QIYMETI */}
          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200">İmtahan qiyməti</p>
            <div className="group flex w-full py-3 px-4 items-center border border-buttonPrimaryDefault hover:border-inputBorderHover rounded-lg bg-inputBgDefault hover:bg-inputBgHover">
              <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
              <textarea
                ref={textareaRefs[2]}
                placeholder="İmtahan qiymətini daxil edin"
                className="text-black font-gilroy placeholder-inputPlaceholderText w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault resize-none overflow-hidden"
                rows={1}
                value={
                  examDetails.price ? `${examDetails.price} ₼` : ""
                }
                onChange={(e) => handlePriceChange(e.target.value)}
              />
            </div>
          </div>

          {/* IMTAHAN MÜDDƏTI (Radio + Input) */}
          <div className="mt-8 w-full">
            <p className="font-medium leading-8 font-gilroy text-2xl text-textSecondaryDefault mb-5 flex items-center gap-3">
              İmtahan müddətinin təyin olunması
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
                  checked={timeForQuestion === true}
                  onChange={() => handleRadioTime(true)}
                />
                <span className="text-base font-gilroy">
                  Sual üçün vaxt təyin et
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="fifth-options"
                  className="form-radio"
                  checked={timeForQuestion === false}
                  onChange={() => handleRadioTime(false)}
                />
                <span className="text-base font-gilroy">
                  İmtahana ümumi vaxt təyin etmə
                </span>
              </label>
            </div>

            {/* If user picked total exam time => show the time input */}
            {timeForQuestion === false && (
              <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault rounded-lg w-[160px] hover:border-inputBorderHover hover:bg-inputBgHover bg-inputBgDefault">
                <FaPen className="text-gray200 mr-3 group-hover:text-gray800" />
                <input
                  placeholder="00:00:00"
                  className="text-black font-gilroy placeholder-inputPlaceholderText w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault"
                  value={examDetails.duration || ""}
                  onChange={handleDurationChange}
                  onKeyDown={(e) => {
                    // only allow digits
                    if (e.key.length === 1 && !/\d/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            )}
          </div>

          {/* IMTAHAN KODU (Radio + Code Input) */}
          <div className="mt-8">
            <p className="font-medium leading-8 font-gilroy text-2xl text-textSecondaryDefault mb-5 flex items-center gap-3">
              İmtahan kodunun təyin olunması
              <div className="relative inline-block z-20">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-black"
                  onMouseEnter={() => setIsInfoHoveredSixth(true)}
                  onMouseLeave={() => setIsInfoHoveredSixth(false)}
                >
                  <IoIosInformationCircleOutline size={22} />
                </div>
                {isInfoHoveredSixth && (
                  <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 w-[300px] text-sm leading-5 font-gilroy bg-white text-black p-4 border border-gray-300 rounded-lg shadow-lg z-10">
                    Burada imtahanın kodu avtomatik təyin edilir.
                    <br /> Kodlar təkrarlanmır.
                    <br /> Yeni kod yaratmaq üçün açar ikonuna klikləyin.
                  </div>
                )}
              </div>
            </p>
            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sixth-options"
                  className="form-radio"
                  checked={!examDetails.code}
                  onChange={() => handleRadioCode(false)}
                />
                <span className="text-base font-gilroy">Kodsuz</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sixth-options"
                  className="form-radio"
                  checked={!!examDetails.code}
                  onChange={() => handleRadioCode(true)}
                />
                <span className="text-base font-gilroy">Kodlu</span>
              </label>
            </div>

            {/* If Kodlu => show code input */}
            {examDetails.code && (
              <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault rounded-lg w-[160px] hover:border-inputBorderHover hover:bg-inputBgHover bg-inputBgDefault">
                <FaKey
                  className="text-gray200 mr-3 group-hover:text-gray800 cursor-pointer"
                  onClick={handleRegenerateCode}
                />
                <input
                  type="text"
                  className="text-black font-gilroy placeholder-inputPlaceholderText w-full bg-transparent group-hover:text-gray800 focus:outline-none focus:border-buttonPrimaryDefault"
                  value={examDetails.code}
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
