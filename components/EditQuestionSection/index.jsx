// EditQuestionSection.js

import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useContext } from "react";
import Spinner from "../Spinner";
import VariantliSual from "./VariantliSual";
import AciqSual from "./AciqSual";
import KombinasiyaSuali from "./KombinasiyaSuali";
import CompanyContext from "@/shared/context/CompanyContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function EditQuestionSection({
  selectedOption,
  lastQuery,
  titleText,
  setTitleText,
  conditionText,
  setConditionText,
  answers,
  setAnswers,
  openAnswer,
  setOpenAnswer,
  kombinasiyaOptions,
  setKombinasiyaOptions,
  kombinasiyaQuestions,
  setKombinasiyaQuestions,
}) {
  const { selectedCompany } = useContext(CompanyContext);
  const [loaded, setLoaded] = useState(false);
  const editorRefTitle = useRef(null);
  const editorRefCondition = useRef(null);
  const [currentEditor, setCurrentEditor] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("react-quill/dist/quill.snow.css");
      setLoaded(true);
    }
  }, []);

  const handleEditClick = (editorName) => {
    setCurrentEditor(editorName);
  };

  // Handle click outside to close editors
  useEffect(() => {
    function handleClickOutside(event) {
      const isEditorInput = event.target.closest("[data-editor-input]");
      if (isEditorInput) return;

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
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentEditor]);

  if (!loaded) {
    return <Spinner />;
  }

  // Define modules and formats for ReactQuill
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      ["link", "image", "video"],
      ["undo", "redo"],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "script",
    "link",
    "image",
    "video",
  ];

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
                  <ReactQuill
                    value={titleText}
                    onChange={setTitleText}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    style={{ minHeight: "100px" }}
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
                  <ReactQuill
                    value={conditionText}
                    onChange={setConditionText}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                    style={{ minHeight: "100px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </form>

        {selectedOption === "Variantli sual" && (
          <VariantliSual answers={answers} setAnswers={setAnswers} />
        )}
        {selectedOption === "Açıq sual" && (
          <AciqSual openAnswer={openAnswer} setOpenAnswer={setOpenAnswer} />
        )}
        {selectedOption === "Kombinasiya sualı" && (
          <KombinasiyaSuali
            kombinasiyaOptions={kombinasiyaOptions}
            setKombinasiyaOptions={setKombinasiyaOptions}
            questions={kombinasiyaQuestions}
            setQuestions={setKombinasiyaQuestions}
          />
        )}
      </div>
    </>
  );
}

export default EditQuestionSection;
