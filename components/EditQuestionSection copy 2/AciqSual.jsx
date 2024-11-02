import { useState, useRef, useEffect } from "react";

import dynamic from "next/dynamic";
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});
function AciqSual() {
  const [currentEditor, setCurrentEditor] = useState(null);
  const handleEditClick = (editorName) => {
    setCurrentEditor(editorName);
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

  const [aciqSualText, setAciqSualText] = useState("");
  const aciqSualRef = useRef(null);

  return (
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
  );
}

export default AciqSual;
