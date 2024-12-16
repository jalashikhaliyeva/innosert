// KombinasiyaSuali.js

import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function KombinasiyaSuali({
  kombinasiyaOptions,
  setKombinasiyaOptions,
  kombinasiyaQuestions,
  setKombinasiyaQuestions,
  nextOptionId,
  setNextOptionId,
  nextQuestionId,
  setNextQuestionId,
}) {
  const [currentEditor, setCurrentEditor] = useState(null);
  const questionRefs = useRef({});
  const kombinasiyaRefs = useRef({});

  // New states to track duplicates
  const [duplicateOptionIds, setDuplicateOptionIds] = useState([]);
  const [duplicateQuestionIds, setDuplicateQuestionIds] = useState([]);

  const MAX_KOMBINATION_OPTIONS = 6; // A-H
  const MAX_QUESTIONS = 6; // Max questions

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  useEffect(() => {
    // Check duplicates for kombinasiyaOptions
    const optionTexts = kombinasiyaOptions.map((opt) =>
      stripHtmlTags(opt.text).trim().toLowerCase()
    );
    const optionDuplicates = optionTexts.filter(
      (text, index) => optionTexts.indexOf(text) !== index && text !== ""
    );
    const duplicateOpts = kombinasiyaOptions
      .filter((opt) => optionDuplicates.includes(stripHtmlTags(opt.text).trim().toLowerCase()))
      .map((opt) => opt.id);

    setDuplicateOptionIds(duplicateOpts);

    // Check duplicates for kombinasiyaQuestions
    const questionTexts = kombinasiyaQuestions.map((q) =>
      stripHtmlTags(q.questionText).trim().toLowerCase()
    );
    const questionDuplicates = questionTexts.filter(
      (text, index) => questionTexts.indexOf(text) !== index && text !== ""
    );
    const duplicateQsts = kombinasiyaQuestions
      .filter((q) => questionDuplicates.includes(stripHtmlTags(q.questionText).trim().toLowerCase()))
      .map((q) => q.id);

    setDuplicateQuestionIds(duplicateQsts);
  }, [kombinasiyaOptions, kombinasiyaQuestions]);

  // Handle text change for kombinasiya options
  const handleKombinasiyaTextChange = (id, text) => {
    setKombinasiyaOptions((prevOptions) =>
      prevOptions.map((kombinasiya) =>
        kombinasiya.id === id ? { ...kombinasiya, text } : kombinasiya
      )
    );
  };

  // Handle delete kombinasiya option
  const handleDeleteKombinasiya = (id) => {
    setKombinasiyaOptions((prevOptions) =>
      prevOptions.filter((kombinasiya) => kombinasiya.id !== id)
    );
    if (kombinasiyaRefs.current[id]) {
      delete kombinasiyaRefs.current[id];
    }
    if (currentEditor === `kombinasiya-${id}`) {
      setCurrentEditor(null);
    }
    // Remove this option from any selectedOptions in questions
    setKombinasiyaQuestions((prevQuestions) =>
      prevQuestions.map((question) => ({
        ...question,
        selectedOptions: question.selectedOptions.filter((optId) => optId !== id),
      }))
    );
  };

  const handleEditClick = (editorName) => {
    setCurrentEditor(editorName);
  };

  const handleQuestionTextChange = (id, text) => {
    setKombinasiyaQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, questionText: text } : question
      )
    );
  };

  const handleAddKombinasiya = () => {
    if (kombinasiyaOptions.length >= MAX_KOMBINATION_OPTIONS) return;

    const newOptionId = nextOptionId;
    const existingLabels = kombinasiyaOptions.map((opt) => opt.label.charAt(0));
    let nextLabelCharCode = 65; // 'A'
    while (
      existingLabels.includes(String.fromCharCode(nextLabelCharCode)) &&
      nextLabelCharCode <= 72
    ) {
      nextLabelCharCode++;
    }

    if (nextLabelCharCode > 72) {
      return;
    }

    const nextLabelChar = String.fromCharCode(nextLabelCharCode);
    setKombinasiyaOptions([
      ...kombinasiyaOptions,
      {
        id: newOptionId,
        label: nextLabelChar,
        text: "",
        idInApi: null,
      },
    ]);

    setNextOptionId(newOptionId + 1);
  };

  const handleAddQuestion = () => {
    if (kombinasiyaQuestions.length >= MAX_QUESTIONS) return;
    const newQuestionId = nextQuestionId;
    setKombinasiyaQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: newQuestionId,
        questionText: "",
        selectedOptions: [],
        idInApi: null,
        showDropdown: false,
      },
    ]);
    setNextQuestionId(newQuestionId + 1);
  };

  const handleDeleteQuestion = (id) => {
    setKombinasiyaQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleDropdownToggle = (id) => {
    setKombinasiyaQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, showDropdown: !question.showDropdown }
          : question
      )
    );
  };

  const handleOptionClick = (optionId, questionId) => {
    setKombinasiyaQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const isSelected = question.selectedOptions?.includes(optionId);
          const newSelectedOptions = isSelected
            ? question.selectedOptions.filter((opt) => opt !== optionId)
            : [...question.selectedOptions, optionId];

          return {
            ...question,
            selectedOptions: newSelectedOptions,
            showDropdown: true,
          };
        } else {
          return question;
        }
      })
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const isDropdown = event.target.closest(".dropdown-menu");
      const isToggle = event.target.closest(".dropdown-toggle");
      if (!isDropdown && !isToggle) {
        setKombinasiyaQuestions((prevQuestions) =>
          prevQuestions.map((question) => ({
            ...question,
            showDropdown: false,
          }))
        );
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle click outside to close editors
  useEffect(() => {
    function handleClickOutside(event) {
      const isEditorInput = event.target.closest("[data-editor-input]");
      if (isEditorInput) return;

      if (currentEditor && currentEditor.startsWith("kombinasiya-")) {
        const id = parseInt(currentEditor.split("-")[1]);
        if (
          kombinasiyaRefs.current[id] &&
          !kombinasiyaRefs.current[id].contains(event.target)
        ) {
          setCurrentEditor(null);
        }
      }

      if (currentEditor && currentEditor.startsWith("question-")) {
        const id = parseInt(currentEditor.split("-")[1]);
        if (
          questionRefs.current[id] &&
          !questionRefs.current[id].contains(event.target)
        ) {
          setCurrentEditor(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentEditor]);

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="flex flex-col gap-3 w-full px-4">
      <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
        Kombinasiyalar
      </h2>
      <div className="flex w-full justify-between">
        {/* Questions Section */}
        <div className="flex w-[48%] flex-col gap-2">
          {kombinasiyaQuestions.map((question, index) => {
            const isDuplicate = duplicateQuestionIds.includes(question.id);
            return (
              <div key={question.id} className="flex flex-col mb-4 gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`question-${question.id}`}
                    className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
                  >
                    {index + 1}. Kombinasiya sualı
                  </label>
                  {index >= 3 && (
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-500"
                    >
                      <IoCloseOutline className="size-6 hover:text-red-700" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {currentEditor !== `question-${question.id}` ? (
                    <div
                      className={`py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full ${
                        isDuplicate ? "border-red-500" : "border-arrowButtonGray bg-boxGrayBodyColor"
                      }`}
                      onClick={() => handleEditClick(`question-${question.id}`)}
                      data-editor-input={`question-${question.id}`}
                      dangerouslySetInnerHTML={{
                        __html: question.questionText || "Sualı daxil edin",
                      }}
                    />
                  ) : (
                    <div
                      style={{ width: "100%" }}
                      ref={(el) => {
                        if (el) {
                          questionRefs.current[question.id] = el;
                        }
                      }}
                    >
                      <ReactQuill
                        theme="snow"
                        placeholder="Sualı daxil edin"
                        modules={quillModules}
                        formats={quillFormats}
                        value={question.questionText}
                        onChange={(content) => {
                          handleQuestionTextChange(question.id, content);
                        }}
                        className={`quill-editor ${isDuplicate ? "border-red-500" : ""}`}
                      />
                    </div>
                  )}
                </div>
                {isDuplicate && (
                  <p className="text-red-500 text-sm mt-1">
                    Bu sual təkrarlanır.
                  </p>
                )}

                {/* Dropdown Input */}
                <div style={{ position: "relative" }}>
                  <div
                    className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full flex items-center gap-2 flex-wrap dropdown-toggle border-arrowButtonGray bg-boxGrayBodyColor"
                    onClick={() => handleDropdownToggle(question.id)}
                  >
                    {question.selectedOptions.length > 0 ? (
                      question.selectedOptions.map((optionId) => {
                        const option = kombinasiyaOptions.find(
                          (opt) => opt.id === optionId
                        );
                        if (!option) return null;
                        return (
                          <span
                            key={optionId}
                            className="bg-buttonGhostPressed px-4 py-1 rounded-md mr-2 flex items-center gap-1"
                          >
                            {option.label}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOptionClick(optionId, question.id);
                              }}
                              className="ml-1 text-black hover:text-gray-700 text-xl size-5 focus:outline-none flex items-center justify-center"
                            >
                              &times;
                            </button>
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-[#B2B2B2]">Cavabı əlavə edin</span>
                    )}
                  </div>

                  {question.showDropdown && (
                    <ul
                      className="dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: "white",
                        border: "1px solid #ccc",
                        width: "100%",
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                    >
                      {kombinasiyaOptions.map((option) => (
                        <li
                          key={option.id}
                          onClick={() => handleOptionClick(option.id, question.id)}
                          className={`font-gilroy hover:bg-gray-100 flex justify-between items-center cursor-pointer py-2 px-4 ${
                            question.selectedOptions.includes(option.id)
                              ? "bg-gray-200"
                              : ""
                          }`}
                        >
                          <span>
                            {option.label}: {stripHtmlTags(option.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}

          {kombinasiyaQuestions.length < MAX_QUESTIONS && (
            <button
              type="button"
              className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[236px]"
              onClick={handleAddQuestion}
            >
              <FaPlus />
              Sual əlavə et
            </button>
          )}
        </div>

        {/* Kombinasiya Options Section */}
        <div className="flex w-[48%] flex-col">
          {kombinasiyaOptions.map((kombinasiya) => {
            const isDuplicate = duplicateOptionIds.includes(kombinasiya.id);
            return (
              <div key={kombinasiya.id} className="flex flex-col mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-gilroy text-xl leading-6 font-normal text-brandBlue300">
                    {kombinasiya.label}
                  </h2>
                  {!kombinasiya.isDefault && (
                    <button
                      onClick={() => handleDeleteKombinasiya(kombinasiya.id)}
                      className="ml-2 text-red-500"
                    >
                      <IoCloseOutline className="size-6 hover:text-red-700" />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {currentEditor !== `kombinasiya-${kombinasiya.id}` ? (
                    <div
                      className={`py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full ${
                        isDuplicate ? "border-red-500" : "border-arrowButtonGray bg-boxGrayBodyColor"
                      }`}
                      onClick={() =>
                        handleEditClick(`kombinasiya-${kombinasiya.id}`)
                      }
                      data-editor-input={`kombinasiya-${kombinasiya.id}`}
                      dangerouslySetInnerHTML={{
                        __html:
                          kombinasiya.text || "Kombinasiya mətnini əlavə edin",
                      }}
                    />
                  ) : (
                    <div
                      style={{ width: "100%" }}
                      ref={(el) => {
                        if (el) {
                          kombinasiyaRefs.current[kombinasiya.id] = el;
                        }
                      }}
                    >
                      <ReactQuill
                        theme="snow"
                        placeholder="Kombinasiya mətnini əlavə edin"
                        modules={quillModules}
                        formats={quillFormats}
                        value={kombinasiya.text}
                        onChange={(content) => {
                          handleKombinasiyaTextChange(kombinasiya.id, content);
                        }}
                        className={`quill-editor ${isDuplicate ? "border-red-500" : ""}`}
                      />
                    </div>
                  )}
                </div>
                {isDuplicate && (
                  <p className="text-red-500 text-sm mt-1">
                    Bu kombinasiya variantı təkrarlanır.
                  </p>
                )}
              </div>
            );
          })}

          {kombinasiyaOptions.length < MAX_KOMBINATION_OPTIONS && (
            <button
              type="button"
              className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[236px]"
              onClick={handleAddKombinasiya}
            >
              <FaPlus />
              Kombinasiya əlavə et
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default KombinasiyaSuali;
