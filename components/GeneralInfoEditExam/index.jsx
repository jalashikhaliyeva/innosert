// GeneralInfoEditExam.js
import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { FaPen, FaKey } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { UserContext } from "@/shared/context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GeneralInfoEditExam() {
  const {
    selectedCategory,
    selectedSubcategory,
    timeForQuestion,
    setTimeForQuestion,
    isGeneralInfoValid,
    setIsGeneralInfoValid,
    updateExamDetails,
    examDetails,
  } = useContext(UserContext);


  console.log(examDetails, "examDetailsss");
  
  useEffect(() => {
    const isValid = examDetails.name && examDetails.desc && examDetails.duration;
    setIsGeneralInfoValid(!!isValid);
  }, [examDetails, setIsGeneralInfoValid]);

  const [values, setValues] = useState(["", "", "", "", "00:00:00"]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isInfoHoveredFifth, setIsInfoHoveredFifth] = useState(false);
  const [isInfoHoveredSixth, setIsInfoHoveredSixth] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  const handleItemSelection = (itemName) => {
    const selectedItem = combinedList.find((item) => item.name === itemName);

    if (selectedItem) {
      setSelectedItems((prev) =>
        prev.some((item) => item.name === selectedItem.name)
          ? prev.filter((item) => item.name !== selectedItem.name)
          : [...prev, selectedItem]
      );
      setHasSubmitted(false);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setHasSubmitted(false);
  };

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

  const [code, setCode] = useState("");
  const [isKodlu, setIsKodlu] = useState(true);

  useEffect(() => {
    if (isKodlu) {
      handleCodeChange(generateRandomCode());
    } else {
      setCode("");
      setHasSubmitted(false);
    }
  }, [isKodlu]);

  const textareaRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    textareaRefs.forEach((ref) => {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
      }
    });
  }, [values]);

  const handleValueChange = (index, newValue) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
    setHasSubmitted(false);
  };

  const handlePriceChange = (index, newValue) => {
    const numericValue = newValue.replace(/[^\d]/g, "");
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = numericValue ? `${numericValue} ₼` : "";
      return newValues;
    });
    setHasSubmitted(false);
  };

  function handleTimeChange(index, e) {
    const input = e.target;
    let value = input.value;

    let digits = value.replace(/\D/g, "");
    digits = digits.slice(0, 6);

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
    setHasSubmitted(false);
  }

  function handleTimeKeyDown(e) {
    if (e.key.length === 1 && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (examDetails && combinedList.length > 0) {
      setValues([
        examDetails.name || "",
        examDetails.desc || "",
        "",
        examDetails.price !== undefined
          ? examDetails.price.toString() + " ₼"
          : "",
        examDetails.duration || "00:00:00",
      ]);

      if (examDetails.code) {
        setCode(examDetails.code);
        setIsKodlu(true);
      } else {
        setCode("");
        setIsKodlu(false);
      }

      console.log(examDetails.category_id, "examDetails.category_id");
      

      if (examDetails.category_id) {
        const categoryIds = examDetails.category_id.map(Number);
        const items = combinedList.filter((item) =>
          categoryIds.includes(Number(item.id))
        );
        setSelectedItems(items);
      }

      setHasSubmitted(true);
    }
  }, [examDetails, combinedList]);

  useEffect(() => {
    const examName = values[0].trim();
    const examDesc = values[1].trim();
    const examPrice = values[3].trim();
    const examDuration = values[4].trim();
    const isCodeValid = isKodlu ? code.trim() !== "" : true;

    const areFieldsFilled =
      examName !== "" &&
      examDesc !== "" &&
      selectedItems.length > 0 &&
      examPrice !== "" &&
      isCodeValid;

    let isFormValid = areFieldsFilled;

    if (!timeForQuestion) {
      const durationParts = examDuration.split(":").map(Number);
      const [hours, minutes, seconds] = durationParts;
      const isDurationValid = hours > 0 || minutes > 0 || seconds > 0;

      isFormValid = isFormValid && isDurationValid;

      if (areFieldsFilled && !isDurationValid && !hasSubmitted) {
        toast.error(
          "Ümumi müddət 00:00:00 ola bilməz. Zəhmət olmasa, ən azı bir hissəni doldurun."
        );
      }
    }

    setIsGeneralInfoValid(isFormValid);

    if (isFormValid && !hasSubmitted && selectedItems.length > 0) {
      const payload = {
        name: examName,
        desc: examDesc,
        price: parseFloat(examPrice.replace("₼", "").trim()),
        code: isKodlu ? code : null,
        ...(timeForQuestion === false && { duration: examDuration }),
        category_id: selectedItems.map((item) => item.id),
      };

      updateExamDetails(payload);

      setHasSubmitted(true);
    }
  }, [
    values,
    selectedItems,
    timeForQuestion,
    isKodlu,
    code,
    setIsGeneralInfoValid,
    updateExamDetails,
    hasSubmitted,
  ]);

  return (
    <div className="bg-white rounded-xl py-10 px-6 sm:px-10 flex flex-col items-center w-full max-w-[90%] mx-auto">
      <div className="flex flex-col gap-1 lg:w-[60%] w-full">
        <h2 className="font-gilroy text-2xl leading-8 font-medium text-textSecondaryDefault mb-5">
          Detallar
        </h2>
        <div className="flex flex-col gap-4 w-full">
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

          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">
              İmtahan haqqında
            </p>
            <div className="group w-full flex py-3 px-4 items-center border border-buttonPrimaryDefault hover:border-inputBorderHover rounded-lg w-[580px] bg-inputBgDefault hover:bg-inputBgHover">
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

          <div className="w-full">
            <p className="font-gilroy text-xl text-gray200 mb-1">
              Kateqoriya və Subkateqoriya Seçimi
            </p>
            <div className="relative w-full">
              <div
                className={`w-full border font-gilroy border-gray-700 rounded-md py-3 px-4 cursor-pointer flex flex-wrap items-center bg-inputBgDefault dropdown-input hover:bg-gray-50 hover:border-inputBorderHover focus:border-inputRingFocus ${
                  isCategoryDropdownOpen ? "border-inputRingFocus" : ""
                }`}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                {selectedItems.length > 0 ? (
                  selectedItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex !w-full items-center bg-[#EBEBEB] text-black px-2 py-2 rounded-md mr-2 mb-1"
                    >
                      <span>{item.name}</span>
                      <button
                        className="ml-1 text-xl text-black hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemSelection(item.name);
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  ))
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

              {isCategoryDropdownOpen && (
                <div className="absolute z-10 w-full bg-inputBgDefault border border-gray-600 rounded-md mt-1 max-h-[7.5rem] overflow-y-scroll category-dropdown">
                  {combinedList.map((item, index) => (
                    <div
                      key={index}
                      className={`py-2 px-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center ${
                        selectedItems.some(
                          (selectedItem) => selectedItem.name === item.name
                        )
                          ? "bg-gray-100"
                          : ""
                      }`}
                      onClick={() => handleItemSelection(item.name)}
                    >
                      <span>{item.name}</span>
                      {selectedItems.some(
                        (selectedItem) => selectedItem.name === item.name
                      ) && (
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
                  ))}
                </div>
              )}
            </div>
          </div>

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
                onChange={(e) => handlePriceChange(3, e.target.value)}
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
                  checked={timeForQuestion === true}
                  onChange={() => {
                    setTimeForQuestion(true);
                    setHasSubmitted(false);
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
                  checked={timeForQuestion === false}
                  onChange={() => {
                    setTimeForQuestion(false);
                    setHasSubmitted(false);
                  }}
                />
                <span className="text-base font-gilroy">
                  İmtahana ümumi vaxt təyin etmə
                </span>
              </label>
            </div>

            {timeForQuestion === false && (
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

          <div className="mt-8">
            <p className="font-medium leading-8 font-gilroy text-2xl text-textSecondaryDefault mb-5 flex items-center gap-3">
              Imtahan kodunun təyin olunması
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
                    <br></br> Kodlar təkrarlanmır.
                    <br></br> Yeni kod yaratmaq üçün açar ikonuna klikləyin.
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
                  checked={!isKodlu}
                  onChange={() => {
                    setIsKodlu(false);
                    setHasSubmitted(false);
                  }}
                />
                <span className="text-base font-gilroy">Kodsuz</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="sixth-options"
                  className="form-radio"
                  checked={isKodlu}
                  onChange={() => {
                    setIsKodlu(true);
                    setHasSubmitted(false);
                  }}
                />
                <span className="text-base font-gilroy">Kodlu</span>
              </label>
            </div>

            {isKodlu && (
              <div className="group flex py-3 px-4 items-center border border-buttonPrimaryDefault rounded-lg w-[160px] hover:border-inputBorderHover hover:bg-inputBgHover bg-inputBgDefault">
                <FaKey
                  className="text-gray200 mr-3 group-hover:text-gray800 cursor-pointer"
                  onClick={() => {
                    handleCodeChange(generateRandomCode());
                  }}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default GeneralInfoEditExam;
