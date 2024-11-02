import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import EditQuestionDetails from "../EditQuestionDetails";
import Spinner from "../Spinner";

const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

function EditQuestionSection({ selectedOption }) {
  const [showDropdowns, setShowDropdowns] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [aciqSualText, setAciqSualText] = useState("");
  const [conditionText, setConditionText] = useState("");
  const inputRefs = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);
  const [selectedOptionsKomb, setSelectedOptionsKomb] = useState([]);

  const dropdownRef = useRef(null);

  const defaultKombinasiyaOptions = [
    { id: "A", label: "A", correct: false, isDefault: true, text: "" },
    { id: "B", label: "B", correct: false, isDefault: true, text: "" },
    { id: "C", label: "C", correct: false, isDefault: true, text: "" },
  ];

  const [kombinasiyaOptions, setKombinasiyaOptions] = useState([
    ...defaultKombinasiyaOptions,
  ]);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: "",
      selectedOption: "",
      showDropdown: false,
      isDefault: true,
    },
    {
      id: 2,
      questionText: "",
      selectedOption: "",
      showDropdown: false,
      isDefault: true,
    },
    {
      id: 3,
      questionText: "",
      selectedOption: "",
      showDropdown: false,
      isDefault: true,
    },
  ]);

  const handleQuestionTextChange = (id, text) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, questionText: text } : question
      )
    );
  };

  const handleDropdownToggle = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id
          ? { ...question, showDropdown: !question.showDropdown }
          : question
      )
    );
  };

  const handleRemoveSelectedOption = (optionLabel, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            selectedOption: question.selectedOption.filter(
              (opt) => opt !== optionLabel
            ),
          };
        }
        return question;
      })
    );
  };

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: prevQuestions.length + 1,
        questionText: "",
        selectedOption: "",
        showDropdown: false,
        isDefault: false,
      },
    ]);
  };

  const deleteQuestion = (id) => {
    setAdditionalQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
  };

  const handleAddKombinasiya = () => {
    const newOptionId = String.fromCharCode(65 + kombinasiyaOptions.length); // D, E, F, etc.
    setKombinasiyaOptions([
      ...kombinasiyaOptions,
      {
        id: newOptionId,
        label: newOptionId,
        correct: false,
        isDefault: false,
        text: "",
      },
    ]);
  };

  const handleKombinasiyaTextChange = (id, text) => {
    setKombinasiyaOptions((prevOptions) =>
      prevOptions.map((kombinasiya) =>
        kombinasiya.id === id ? { ...kombinasiya, text } : kombinasiya
      )
    );
  };

  const handleKombinasiyaCheckboxChange = (id) => {
    setKombinasiyaOptions((prevOptions) =>
      prevOptions.map((kombinasiya) =>
        kombinasiya.id === id
          ? { ...kombinasiya, correct: !kombinasiya.correct }
          : kombinasiya
      )
    );
  };

  const handleDeleteQuestion = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );

    if (questionRefs.current[id]) {
      delete questionRefs.current[id];
    }

    if (currentEditor === `question-${id}`) {
      setCurrentEditor(null);
    }
  };

  const kombinasiyaRefs = useRef({});
  const questionRefs = useRef({});

  const handleKombinasiyaEditClick = (id) => {
    setCurrentEditor(`kombinasiya-${id}`);
  };

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

  const handleOptionClick = (optionLabel, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const isSelected = question.selectedOption.includes(optionLabel);
          return {
            ...question,
            selectedOption: isSelected
              ? question.selectedOption.filter((opt) => opt !== optionLabel)
              : [...question.selectedOption, optionLabel],
            showDropdown: false,
          };
        }
        return question;
      })
    );
  };

  const [currentEditor, setCurrentEditor] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  // const [selectedOptionsKomb, setSelectedOptionsKomb] = useState("");
  const [answers, setAnswers] = useState([
    {
      id: 1,
      label: "A variantı",
      text: "",
      isDefault: true,
      correct: false,
    },
    {
      id: 2,
      label: "B variantı",
      text: "",
      isDefault: true,
      correct: false,
    },
    {
      id: 3,
      label: "C variantı",
      text: "",
      isDefault: true,
      correct: false,
    },
    {
      id: 4,
      label: "D variantı",
      text: "",
      isDefault: true,
      correct: false,
    },
  ]);

  const editorRefTitle = useRef(null);
  const editorRefCondition = useRef(null);
  const answerRefs = useRef({});
  const aciqSualRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("froala-editor/js/plugins.pkgd.min.js");
      require("froala-editor/js/plugins/image.min.js");
      require("froala-editor/js/plugins/video.min.js");
      require("froala-editor/js/plugins/file.min.js");
      setLoaded(true);
    }
  }, []);

  const handleEditClick = (editorName) => {
    setCurrentEditor(editorName);
  };

  const handleAnswerEditClick = (id) => {
    setCurrentEditor(`answer-${id}`);
  };

  const handleCheckboxChange = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, correct: !answer.correct } : answer
      )
    );
  };

  // Handle click outside to close editors
  useEffect(() => {
    function handleClickOutside(event) {
      const isEditorInput = event.target.closest("[data-editor-input]");
      if (isEditorInput) return;

      // Close the editor if click is outside the current editor
      if (
        currentEditor === "title" &&
        editorRefTitle.current &&
        !editorRefTitle.current.contains(event.target)
      ) {
        setCurrentEditor(null);
      } else if (
        currentEditor === "condition" &&
        editorRefCondition.current &&
        !editorRefCondition.current.contains(event.target)
      ) {
        setCurrentEditor(null);
      } else if (
        currentEditor === "aciqSual" &&
        aciqSualRef.current &&
        !aciqSualRef.current.contains(event.target)
      ) {
        setCurrentEditor(null);
      } else if (currentEditor && currentEditor.startsWith("answer-")) {
        const id = parseInt(currentEditor.split("-")[1]);
        if (
          answerRefs.current[id] &&
          !answerRefs.current[id].contains(event.target)
        ) {
          setCurrentEditor(null);
        }
      } else if (currentEditor && currentEditor.startsWith("question-")) {
        const id = parseInt(currentEditor.split("-")[1]);
        if (
          questionRefs.current[id] &&
          !questionRefs.current[id].contains(event.target)
        ) {
          setCurrentEditor(null);
        }
      } else if (currentEditor && currentEditor.startsWith("kombinasiya-")) {
        const id = currentEditor.split("-")[1]; // id is a string
        if (
          kombinasiyaRefs.current[id] &&
          !kombinasiyaRefs.current[id].contains(event.target)
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

  const handleAddVariant = () => {
    setAnswers((prevAnswers) => {
      const existingIds = prevAnswers.map((a) => a.id);
      const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

      const existingLabels = prevAnswers.map((a) => a.label.charAt(0));
      let nextLabelCharCode = 65; // ASCII code for 'A'
      while (existingLabels.includes(String.fromCharCode(nextLabelCharCode))) {
        nextLabelCharCode++;
      }
      const nextLabelChar = String.fromCharCode(nextLabelCharCode);
      const nextLabel = `${nextLabelChar} variantı`;

      return [
        ...prevAnswers,
        {
          id: nextId,
          label: nextLabel,
          text: "Variant mətnini əlavə edin",
          isDefault: false,
          correct: false,
        },
      ];
    });
  };

  const handleDeleteVariant = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== id)
    );

    if (answerRefs.current[id]) {
      delete answerRefs.current[id];
    }

    if (currentEditor === `answer-${id}`) {
      setCurrentEditor(null);
    }
  };

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <>
      <div
        className={`flex flex-col ${
          selectedOption !== "Kombinasiya sualı" ? "lg:flex-row" : ""
        } ${
          selectedOption === "Kombinasiya sualı"
            ? "items-center justify-center"
            : ""
        } py-10 px-20 bg-white rounded-lg w-full mx-auto`}
      >
        <form
          className={`w-full px-4 flex flex-col ${
            selectedOption !== "Kombinasiya sualı" ? "lg:w-1/2" : ""
          }`}
        >
          {/* Editor Section */}
          <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
            Sual
          </h2>

          <div
            className={`w-full flex ${
              selectedOption === "Kombinasiya sualı"
                ? "flex-row gap-5"
                : "flex-col"
            }`}
          >
            {/* First Editor: Sual başlığı */}
            <div className="mb-5 w-full">
              <label
                htmlFor="editor"
                className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
              >
                Sual başlığı
              </label>
              {currentEditor !== "title" ? (
                <p
                  className="p-4 border rounded-lg bg-boxGrayBodyColor font-gilroy border-arrowButtonGray cursor-pointer text-grayButtonText text-lg w-full h-[210px] overflow-y-auto"
                  onClick={() => handleEditClick("title")}
                  data-editor-input="title"
                  dangerouslySetInnerHTML={{
                    __html: titleText || "Sual başlığını əlavə edin",
                  }}
                />
              ) : (
                <div style={{ width: "100%" }} ref={editorRefTitle}>
                  <FroalaEditorComponent
                    tag="textarea"
                    config={{
                      key: "YOUR_LICENSE_KEY",
                      attribution: false,
                      quickInsertTags: [],
                      imageUpload: true,
                      toolbarButtons: [
                        "bold",
                        "italic",
                        "underline",
                        "strikeThrough",
                        "subscript",
                        "superscript",
                        "|",
                        "insertImage",
                        "insertVideo",
                        "insertFile",
                        "|",
                        "undo",
                        "redo",
                      ],
                      imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                      videoUpload: true,
                      fileUpload: true,
                      charCounterCount: false,
                      wordCounterCount: false,
                      heightMin: "100",
                      editorClass: "editor-custom-bg",
                      toolbarContainerClass: "editor-toolbar-custom",
                    }}
                    model={titleText}
                    onModelChange={(model) => setTitleText(model)}
                  />
                </div>
              )}
            </div>

            {/* Second Editor: Sual şərti */}
            <div className="mb-5 w-full">
              <label
                htmlFor="editor"
                className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
              >
                Sual şərti
              </label>
              {currentEditor !== "condition" ? (
                <p
                  className="p-4 border rounded-lg bg-boxGrayBodyColor font-gilroy border-arrowButtonGray cursor-pointer text-grayButtonText text-lg h-[210px] w-full"
                  onClick={() => handleEditClick("condition")}
                  data-editor-input="condition"
                  dangerouslySetInnerHTML={{
                    __html:
                      conditionText ||
                      "İstifadəçi təcrübəsinin əsas qurucusu və davamçısı kim sayılır?",
                  }}
                />
              ) : (
                <div style={{ width: "100%" }} ref={editorRefCondition}>
                  <FroalaEditorComponent
                    tag="textarea"
                    config={{
                      key: "YOUR_LICENSE_KEY",
                      attribution: false,
                      quickInsertTags: [],
                      imageUpload: true,
                      toolbarButtons: [
                        "bold",
                        "italic",
                        "underline",
                        "strikeThrough",
                        "subscript",
                        "superscript",
                        "|",
                        "insertImage",
                        "insertVideo",
                        "insertFile",
                        "|",
                        "undo",
                        "redo",
                      ],
                      imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                      videoUpload: true,
                      fileUpload: true,
                      charCounterCount: false,
                      wordCounterCount: false,
                      heightMin: "100",
                      editorClass: "editor-custom-bg",
                      toolbarSticky: false,
                      toolbarContainerClass: "editor-toolbar-custom",
                    }}
                    model={conditionText}
                    onModelChange={(model) => setConditionText(model)}
                  />
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Additional form sections for other options */}
        {selectedOption === "Variantli sual" && (
          <div className="flex flex-col gap-3 w-full lg:w-1/2 px-4">
            <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
              Cavablar
            </h2>
            {answers.map((answer) => (
              <div key={answer.id} className="flex flex-col mb-4">
                <div className="flex items-center mb-2">
                  <h2 className="font-gilroy text-xl leading-6 font-normal text-brandBlue300">
                    {answer.label}
                  </h2>
                  <input
                    type="checkbox"
                    checked={answer.correct || false}
                    onChange={() => handleCheckboxChange(answer.id)}
                    className="ml-2 mr-2"
                  />
                  {answer.correct && (
                    <span className="text-green600">Düz cavab</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {currentEditor !== `answer-${answer.id}` ? (
                    // Non-edit mode: Show placeholder if no text
                    <div
                      className={`py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full ${
                        answer.correct
                          ? "border-green500 bg-green100"
                          : "border-arrowButtonGray bg-boxGrayBodyColor"
                      }`}
                      onClick={() => handleAnswerEditClick(answer.id)}
                      data-editor-input={`answer-${answer.id}`}
                    >
                      {answer.text ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: answer.text }}
                        />
                      ) : (
                        <span className="text-placeholderGray">
                          Variant mətnini əlavə edin
                        </span>
                      )}
                    </div>
                  ) : (
                    // Edit mode: Froala editor with placeholder
                    <div
                      style={{ width: "100%" }}
                      ref={(el) => {
                        if (el) {
                          answerRefs.current[answer.id] = el;
                        }
                      }}
                    >
                      <FroalaEditorComponent
                        tag="textarea"
                        config={{
                          key: "YOUR_LICENSE_KEY",
                          attribution: false,
                          quickInsertTags: [],
                          imageUpload: true,
                          toolbarButtons: [
                            "bold",
                            "italic",
                            "underline",
                            "strikeThrough",
                            "subscript",
                            "superscript",
                            "|",
                            "insertImage",
                            "insertVideo",
                            "insertFile",
                            "|",
                            "undo",
                            "redo",
                          ],
                          imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                          videoUpload: true,
                          fileUpload: true,
                          charCounterCount: false,
                          wordCounterCount: false,
                          heightMin: "100",
                          editorClass: "editor-custom-bg",
                          toolbarSticky: false,
                          toolbarContainerClass: "editor-toolbar-custom",
                          placeholderText: "Variant mətnini əlavə edin", // Placeholder for Froala
                        }}
                        model={answer.text || ""}
                        onModelChange={(model) => {
                          setAnswers((prevAnswers) =>
                            prevAnswers.map((ans) =>
                              ans.id === answer.id
                                ? { ...ans, text: model }
                                : ans
                            )
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[176px]"
              onClick={handleAddVariant}
            >
              <FaPlus />
              Variant əlavə et
            </button>
          </div>
        )}

        {selectedOption === "Açıq sual" && (
          <div className="flex flex-col gap-3 w-full lg:w-1/2 px-4">
            <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
              Cavab
            </h2>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="editor"
                className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
              >
                Düzgün cavab
              </label>
              <div className="flex items-center gap-2">
                {currentEditor !== "aciqSual" ? (
                  <p
                    className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full border-green500 bg-green100"
                    onClick={() => handleEditClick("aciqSual")}
                    data-editor-input="aciqSual"
                    dangerouslySetInnerHTML={{
                      __html: aciqSualText || "Cavabı əlavə edin",
                    }}
                  />
                ) : (
                  <div style={{ width: "100%" }} ref={aciqSualRef}>
                    <FroalaEditorComponent
                      tag="textarea"
                      config={{
                        key: "YOUR_LICENSE_KEY",
                        attribution: false,
                        quickInsertTags: [],
                        imageUpload: true,
                        toolbarButtons: [
                          "bold",
                          "italic",
                          "underline",
                          "strikeThrough",
                          "subscript",
                          "superscript",
                          "|",
                          "insertImage",
                          "insertVideo",
                          "insertFile",
                          "|",
                          "undo",
                          "redo",
                        ],
                        imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                        videoUpload: true,
                        fileUpload: true,
                        charCounterCount: false,
                        wordCounterCount: false,
                        heightMin: "100",
                        editorClass: "editor-custom-bg",
                        toolbarSticky: false,
                        toolbarContainerClass: "editor-toolbar-custom",
                      }}
                      model={aciqSualText}
                      onModelChange={(model) => setAciqSualText(model)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {selectedOption === "Kombinasiya sualı" && (
          <div className="flex flex-col gap-3 w-full px-4">
            <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
              Kombinasiyalar
            </h2>

            <div className="flex w-full justify-between">
              <div className="flex w-[48%] flex-col gap-2">
                {questions.map((question) => (
                  <div key={question.id} className="flex flex-col mb-4 gap-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`question-${question.id}`}
                        className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
                      >
                        {question.id}. Sual
                      </label>
                      {!question.isDefault && (
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
                          onClick={() =>
                            handleEditClick(`question-${question.id}`)
                          }
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
                          <FroalaEditorComponent
                            tag="textarea"
                            config={{
                              key: "YOUR_LICENSE_KEY",
                              attribution: false,
                              quickInsertTags: [],
                              imageUpload: true,
                              toolbarButtons: [
                                "bold",
                                "italic",
                                "underline",
                                "strikeThrough",
                                "subscript",
                                "superscript",
                                "|",
                                "insertImage",
                                "insertVideo",
                                "insertFile",
                                "|",
                                "undo",
                                "redo",
                              ],
                              imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                              videoUpload: true,
                              fileUpload: true,
                              charCounterCount: false,
                              wordCounterCount: false,
                              heightMin: "100",
                              editorClass: "editor-custom-bg",
                              toolbarSticky: false,
                              toolbarContainerClass: "editor-toolbar-custom",
                            }}
                            model={question.questionText}
                            onModelChange={(model) => {
                              handleQuestionTextChange(question.id, model);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Dropdown Input */}
                    <div style={{ position: "relative" }}>
                      <div
                        className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full flex items-center gap-2 flex-wrap"
                        onClick={() => handleDropdownToggle(question.id)}
                      >
                        {question.selectedOption.length > 0 ? (
                          question.selectedOption.map((opt, index) => (
                            <span
                              key={index}
                              className="bg-buttonGhostPressed px-4 py-1 rounded-md mr-2 flex items-center gap-1"
                            >
                              {opt}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent dropdown toggle
                                  handleRemoveSelectedOption(opt, question.id);
                                }}
                                className="ml-1 text-black hover:text-gray-700 text-xl size-5 focus:outline-none flex items-center justify-center"
                              >
                                &times;
                              </button>
                            </span>
                          ))
                        ) : (
                          <span className="text-[#B2B2B2]">
                            Cavabı əlavə edin
                          </span>
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
                          {kombinasiyaOptions.map((option) => {
                            const isSelected = question.selectedOption.includes(
                              option.label
                            );
                            return (
                              <li
                                key={option.id}
                                onClick={() =>
                                  handleOptionClick(option.label, question.id)
                                }
                                className={`font-gilroy hover:bg-gray-100 flex justify-between items-center cursor-pointer py-2 px-4 ${
                                  isSelected ? "bg-gray-200" : ""
                                }`}
                              >
                                <span>{option.label}</span>
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
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[236px]"
                  onClick={handleAddQuestion}
                >
                  <FaPlus />
                  Sual əlavə et
                </button>
              </div>

              <div className="flex w-[48%] flex-col">
                {kombinasiyaOptions.map((kombinasiya) => (
                  <div key={kombinasiya.id} className="flex flex-col mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="font-gilroy text-xl leading-6 font-normal text-brandBlue300">
                        {kombinasiya.label}
                      </h2>
                      {!kombinasiya.isDefault && (
                        <button
                          onClick={() =>
                            handleDeleteKombinasiya(kombinasiya.id)
                          }
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
                            handleKombinasiyaEditClick(kombinasiya.id)
                          }
                          data-editor-input={`kombinasiya-${kombinasiya.id}`}
                          dangerouslySetInnerHTML={{
                            __html:
                              kombinasiya.text ||
                              "Kombinasiya mətnini əlavə edin",
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
                          <FroalaEditorComponent
                            tag="textarea"
                            config={{
                              key: "YOUR_LICENSE_KEY",
                              attribution: false,
                              quickInsertTags: [],
                              imageUpload: true,
                              toolbarButtons: [
                                "bold",
                                "italic",
                                "underline",
                                "strikeThrough",
                                "subscript",
                                "superscript",
                                "|",
                                "insertImage",
                                "insertVideo",
                                "insertFile",
                                "|",
                                "undo",
                                "redo",
                              ],
                              imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
                              videoUpload: true,
                              fileUpload: true,
                              charCounterCount: false,
                              wordCounterCount: false,
                              heightMin: "100",
                              editorClass: "editor-custom-bg",
                              toolbarSticky: false,
                              toolbarContainerClass: "editor-toolbar-custom",
                            }}
                            model={kombinasiya.text}
                            onModelChange={(model) => {
                              handleKombinasiyaTextChange(
                                kombinasiya.id,
                                model
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[236px]"
                  onClick={handleAddKombinasiya}
                >
                  <FaPlus />
                  Kombinasiya əlavə et
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <EditQuestionDetails />
    </>
  );
}

export default EditQuestionSection;
