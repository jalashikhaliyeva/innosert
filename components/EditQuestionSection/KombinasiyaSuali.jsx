// KombinasiyaSuali.js

import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

function KombinasiyaSuali({
  kombinasiyaOptions,
  setKombinasiyaOptions,
  questions,
  setQuestions,
}) {
  const [currentEditor, setCurrentEditor] = useState(null);
  const questionRefs = useRef({});
  const kombinasiyaRefs = useRef({});

  // Add a new kombinasiya option
  const handleAddKombinasiya = () => {
    const newOptionId = String.fromCharCode(65 + kombinasiyaOptions.length); // A, B, C, etc.
    setKombinasiyaOptions([
      ...kombinasiyaOptions,
      {
        id: newOptionId,
        label: newOptionId,
        correct: false,
        text: "",
        idInApi: null,
      },
    ]);
  };

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
  };

  // Handle click on question text for editing
  const handleEditClick = (editorName) => {
    setCurrentEditor(editorName);
  };

  // Handle text change for questions
  const handleQuestionTextChange = (id, text) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, questionText: text } : question
      )
    );
  };

  // Add a new question
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: prevQuestions.length + 1,
        questionText: "",
        selectedOptions: [],
        idInApi: null,
        showDropdown: false,
      },
    ]);
  };

  // Delete a question
  const handleDeleteQuestion = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  // Toggle dropdown for question options
  const handleDropdownToggle = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, showDropdown: !question.showDropdown }
          : question
      )
    );
  };

  // Handle option click to select/deselect options
  const handleOptionClick = (optionLabel, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const isSelected = question.selectedOptions?.includes(optionLabel);
          const newSelectedOptions = isSelected
            ? (question.selectedOptions || []).filter(
                (opt) => opt !== optionLabel
              )
            : [...(question.selectedOptions || []), optionLabel];

          return {
            ...question,
            selectedOptions: newSelectedOptions,
            showDropdown: true, // Keep dropdown open for multiple selections
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
        setQuestions((prevQuestions) =>
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

  // Define Quill modules and formats
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"], // Remove formatting button
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
          {questions.map((question, index) => (
            <div key={question.id} className="flex flex-col mb-4 gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={`question-${question.id}`}
                  className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
                >
                  {index + 1}. Sual
                </label>
                {/* Show delete button only for questions added after the third one */}
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
                    className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full"
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
                      className="quill-editor"
                    />
                  </div>
                )}
              </div>

              {/* Dropdown Input */}
              <div style={{ position: "relative" }}>
                <div
                  className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full flex items-center gap-2 flex-wrap dropdown-toggle"
                  onClick={() => handleDropdownToggle(question.id)}
                >
                  {question.selectedOptions.length > 0 ? (
                    question.selectedOptions.map((optionLabel) => (
                      <span
                        key={optionLabel}
                        className="bg-buttonGhostPressed px-4 py-1 rounded-md mr-2 flex items-center gap-1"
                      >
                        {optionLabel}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent dropdown toggle
                            handleOptionClick(optionLabel, question.id);
                          }}
                          className="ml-1 text-black hover:text-gray-700 text-xl size-5 focus:outline-none flex items-center justify-center"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-[#B2B2B2]">Cavabı əlavə edin</span>
                  )}
                </div>

                {/* Dropdown Menu */}
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
                        onClick={() =>
                          handleOptionClick(option.label, question.id)
                        }
                        className={`font-gilroy hover:bg-gray-100 flex justify-between items-center cursor-pointer py-2 px-4 ${
                          question.selectedOptions.includes(option.label)
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        <span>
                          {option.label}: {option.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[236px]"
            onClick={handleAddQuestion}
          >
            <FaPlus />
            Sual əlavə et
          </button>
        </div>

        {/* Kombinasiya Options Section */}
        <div className="flex w-[48%] flex-col">
          {kombinasiyaOptions.map((kombinasiya) => (
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
                    className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full"
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
                      className="quill-editor"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[236px]"
            onClick={handleAddKombinasiya}
          >
            <FaPlus />
            Kombinasiya əlavə et
          </button>
        </div>
      </div>
    </div>
  );
}

export default KombinasiyaSuali;
