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
  const [loaded, setLoaded] = useState(false);

  // Individual editing states for each editor
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingCondition, setIsEditingCondition] = useState(false);

  // State for answers
  const [answers, setAnswers] = useState([
    { id: 1, label: "A variantı", text: "lorem", isDefault: true },
    { id: 2, label: "B variantı", text: "lorem", isDefault: true },
    { id: 3, label: "C variantı", text: "lorem", isDefault: true },
    { id: 4, label: "D variantı", text: "lorem", isDefault: true },
  ]);

  // Editing states for answers
  const [isEditingAnswers, setIsEditingAnswers] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // References to each editor container
  const editorRefTitle = useRef(null);
  const editorRefCondition = useRef(null);
  const answerRefs = useRef({});
  const aciqSualRef = useRef(null);
  const [isEditingAciqSual, setIsEditingAciqSual] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("froala-editor/js/plugins.pkgd.min.js");
      require("froala-editor/js/plugins/image.min.js");
      require("froala-editor/js/plugins/video.min.js");
      require("froala-editor/js/plugins/file.min.js");
      setLoaded(true);
    }
  }, []);

  // Handle click outside to close editors
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isEditingTitle &&
        editorRefTitle.current &&
        !editorRefTitle.current.contains(event.target)
      ) {
        setIsEditingTitle(false);
      }
      if (
        isEditingCondition &&
        editorRefCondition.current &&
        !editorRefCondition.current.contains(event.target)
      ) {
        setIsEditingCondition(false);
      }
      // Handle answers editors
      let updatedEditingAnswers = { ...isEditingAnswers };
      let anyStateChanged = false;
      Object.keys(isEditingAnswers).forEach((key) => {
        const id = parseInt(key);
        if (
          isEditingAnswers[id] &&
          answerRefs.current[id] &&
          !answerRefs.current[id].contains(event.target)
        ) {
          updatedEditingAnswers[id] = false;
          anyStateChanged = true;
        }
      });
      if (anyStateChanged) {
        setIsEditingAnswers(updatedEditingAnswers);
      }

      // Handle Açıq sual editor
      if (
        isEditingAciqSual &&
        aciqSualRef.current &&
        !aciqSualRef.current.contains(event.target)
      ) {
        setIsEditingAciqSual(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isEditingTitle,
    isEditingCondition,
    isEditingAnswers,
    answers,
    isEditingAciqSual,
  ]);

  const handleEditClick = (editorName) => {
    if (editorName === "title") {
      setIsEditingTitle(true);
      setIsEditingCondition(false); // Close other editor
      setIsEditingAciqSual(false);
      // Close answer editors
      setIsEditingAnswers((prevState) => {
        const newState = {};
        Object.keys(prevState).forEach((key) => {
          newState[key] = false;
        });
        return newState;
      });
    } else if (editorName === "condition") {
      setIsEditingCondition(true);
      setIsEditingTitle(false); // Close other editor
      setIsEditingAciqSual(false);
      // Close answer editors
      setIsEditingAnswers((prevState) => {
        const newState = {};
        Object.keys(prevState).forEach((key) => {
          newState[key] = false;
        });
        return newState;
      });
    } else if (editorName === "aciqSual") {
      setIsEditingAciqSual(true);
      setIsEditingTitle(false);
      setIsEditingCondition(false);
      // Close answer editors
      setIsEditingAnswers((prevState) => {
        const newState = {};
        Object.keys(prevState).forEach((key) => {
          newState[key] = false;
        });
        return newState;
      });
    }
  };

  const handleAnswerEditClick = (id) => {
    // Close all other answer editors
    setIsEditingAnswers((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((key) => {
        newState[key] = false;
      });
      newState[id] = true;
      return newState;
    });
    // Close other editors
    setIsEditingTitle(false);
    setIsEditingCondition(false);
    setIsEditingAciqSual(false);
  };

  const handleCheckboxChange = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, correct: !answer.correct } : answer
      )
    );
  };

  // Function to handle adding a new variant
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
        },
      ];
    });

    setIsEditingAnswers((prevState) => ({
      ...prevState,
      [answers.length + 1]: false,
    }));
  };

  // Function to handle deleting a variant
  const handleDeleteVariant = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.filter((answer) => answer.id !== id)
    );

    setIsEditingAnswers((prevState) => {
      const newState = { ...prevState };
      delete newState[id];
      return newState;
    });

    // Clean up the reference
    if (answerRefs.current[id]) {
      delete answerRefs.current[id];
    }
  };

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex items-start py-10 bg-white justify-center rounded-lg w-[75%] mx-auto">
        <form className="w-[42%]">
          {/* Editor Section */}

          <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
            Sual
          </h2>

          {/* First Editor: Sual başlığı */}
          <div className="mb-5">
            <label
              htmlFor="editor"
              className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
            >
              Sual başlığı
            </label>
            {!isEditingTitle ? (
              <textarea
                className="p-4 border rounded-lg bg-boxGrayBodyColor font-gilroy border-arrowButtonGray cursor-pointer text-grayButtonText text-lg w-[350px] h-[150px]"
                onClick={() => handleEditClick("title")}
              >
                Sual başlığını əlavə edin
              </textarea>
            ) : (
              <div style={{ width: "350px" }} ref={editorRefTitle}>
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
                    editorClass: "editor-custom-bg", // Apply custom class for editor area
                    toolbarSticky: false, // Disable sticky toolbar to allow custom size
                    toolbarContainerClass: "editor-toolbar-custom", // Apply custom class for tool
                  }}
                />
              </div>
            )}
          </div>

          {/* Second Editor: Sual şərti */}
          <div className="mb-5">
            <label
              htmlFor="editor"
              className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
            >
              Sual şərti
            </label>
            {!isEditingCondition ? (
              <textarea
                className="p-4 border rounded-lg bg-boxGrayBodyColor font-gilroy border-arrowButtonGray cursor-pointer text-grayButtonText text-lg h-[150px] w-[350px]"
                onClick={() => handleEditClick("condition")}
              >
                İstifadəçi təcrübəsinin əsas qurucusu və davamçısı kim sayılır?
              </textarea>
            ) : (
              <div style={{ width: "350px" }} ref={editorRefCondition}>
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
                    editorClass: "editor-custom-bg", // Apply custom class for editor area
                    toolbarSticky: false, // Disable sticky toolbar to allow custom size
                    toolbarContainerClass: "editor-toolbar-custom", // Apply custom class for toolbar
                  }}
                />
              </div>
            )}
          </div>
        </form>

        {/* Conditionally render based on selectedOption */}
        {selectedOption === "Variantli sual" && (
          <div className="flex flex-col gap-3 w-1/2">
            <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
              Cavablar
            </h2>
            {answers.map((answer) => (
              <div key={answer.id} className="flex flex-col mb-4">
                {/* Row 1: Answer label and checkbox */}
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

                {/* Row 2: Input field and delete button */}
                <div className="flex items-center gap-2">
                  {!isEditingAnswers[answer.id] ? (
                    <input
                      type="text"
                      className={`py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-[460px] ${
                        answer.correct
                          ? "border-green500 bg-green100"
                          : "border-arrowButtonGray bg-boxGrayBodyColor"
                      }`}
                      placeholder="Variant mətnini əlavə edin"
                      onClick={() => handleAnswerEditClick(answer.id)}
                    />
                  ) : (
                    <div
                      style={{ width: "400px" }}
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
                          editorClass: "editor-custom-bg", // Apply custom class for editor area
                          toolbarSticky: false, // Disable sticky toolbar to allow custom size
                          toolbarContainerClass: "editor-toolbar-custom", // Apply custom class for tool
                        }}
                      />
                    </div>
                  )}

                  {!answer.isDefault && (
                    <button
                      onClick={() => handleDeleteVariant(answer.id)}
                      className="ml-2 text-red-500"
                    >
                      <IoCloseOutline className="size-6 hover:text-red-700" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-[176px]"
              onClick={handleAddVariant}
            >
              <FaPlus />
              Variant əlavə et
            </button>
          </div>
        )}

        {selectedOption === "Açıq sual" && (
          <div className="flex flex-col gap-3 w-1/2">
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
                {!isEditingAciqSual ? (
                  <input
                    type="text"
                    className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-[460px] border-green500 bg-green100"
                    placeholder="Cavabı əlavə edin"
                    onClick={() => handleEditClick("aciqSual")}
                  />
                ) : (
                  <div style={{ width: "460px" }} ref={aciqSualRef}>
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
                        editorClass: "editor-custom-bg", // Apply custom class for editor area
                        toolbarSticky: false, // Disable sticky toolbar to allow custom size
                        toolbarContainerClass: "editor-toolbar-custom", // Apply custom class for toolbar
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedOption === "Kombinasiya sualı" && (
          <div className="w-1/2">
            {/* Render your Kombinasiya sualı component or content here */}
            <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
              Kombinasiya sualı bölməsi
            </h2>
            {/* Add the specific content or component for Kombinasiya sualı */}
          </div>
        )}
      </div>
      <EditQuestionDetails />
    </>
  );
}

export default EditQuestionSection;
