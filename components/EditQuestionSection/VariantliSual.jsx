import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import dynamic from "next/dynamic";
import { IoCloseOutline } from "react-icons/io5";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

function VariantliSual({ answers, setAnswers }) {
  const answerRefs = useRef({});
  const [currentEditor, setCurrentEditor] = useState(null);
  const MAX_VARIANTS = 6; // Maximum number of variants allowed

  const handleAddVariant = () => {
    if (answers.length >= MAX_VARIANTS) return; // Prevent adding more than max

    setAnswers((prevAnswers) => {
      const existingIds = prevAnswers.map((a) => a.id);
      const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

      const existingLabels = prevAnswers.map((a) => a.label.charAt(0));
      let nextLabelCharCode = 65; // ASCII code for 'A'
      while (
        existingLabels.includes(String.fromCharCode(nextLabelCharCode)) &&
        nextLabelCharCode <= 70 // ASCII code for 'F'
      ) {
        nextLabelCharCode++;
      }

      if (nextLabelCharCode > 70) {
        // Reached beyond 'F', do not add more
        return prevAnswers;
      }

      const nextLabelChar = String.fromCharCode(nextLabelCharCode);
      const nextLabel = `${nextLabelChar} variantı`;

      return [
        ...prevAnswers,
        {
          id: nextId,
          label: nextLabel,
          text: "",
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

  const handleAnswerEditClick = (id) => {
    setCurrentEditor(`answer-${id}`);
  };

  const handleCheckboxChange = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((ans) =>
        ans.id === id ? { ...ans, correct: !ans.correct } : ans
      )
    );
  };

  // Handle click outside to close editors
  useEffect(() => {
    function handleClickOutside(event) {
      const isEditorInput = event.target.closest("[data-editor-input]");
      if (isEditorInput) return;

      if (currentEditor && currentEditor.startsWith("answer-")) {
        const id = parseInt(currentEditor.split("-")[1]);
        if (
          answerRefs.current[id] &&
          !answerRefs.current[id].contains(event.target)
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
            {!answer.isDefault && (
              <button
                className="ml-4 text-red-600 hover:text-red-800 text-2xl"
                onClick={() => handleDeleteVariant(answer.id)}
              >
                <IoCloseOutline />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {currentEditor !== `answer-${answer.id}` ? (
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
                  <span dangerouslySetInnerHTML={{ __html: answer.text }} />
                ) : (
                  <span className="text-placeholderGray">
                    Variant mətnini əlavə edin
                  </span>
                )}
              </div>
            ) : (
              <div
                style={{ width: "100%" }}
                ref={(el) => {
                  if (el) {
                    answerRefs.current[answer.id] = el;
                  }
                }}
              >
                <ReactQuill
                  theme="snow"
                  placeholder="Variant mətnini əlavə edin"
                  modules={quillModules}
                  formats={quillFormats}
                  value={answer.text}
                  onChange={(content) => {
                    setAnswers((prevAnswers) =>
                      prevAnswers.map((ans) =>
                        ans.id === answer.id
                          ? { ...ans, text: content }
                          : ans
                      )
                    );
                  }}
                  className="quill-editor"
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {answers.length < MAX_VARIANTS && (
        <button
          className="bg-buttonGhostPressed hover:bg-buttonGhostHover active:bg-buttonGhostPressedd px-2 py-3 gap-2 text-green600 font-gilroy rounded-lg flex items-center justify-center w-full lg:w-[176px]"
          onClick={handleAddVariant}
        >
          <FaPlus />
          Variant əlavə et
        </button>
      )}
{/* 
      {answers.length >= MAX_VARIANTS && (
        <p className="text-red-600 text-center mt-2">
          Maksimum variant sayı (F) çatılıb.
        </p>
      )} */}
    </div>
  );
}

export default VariantliSual;
