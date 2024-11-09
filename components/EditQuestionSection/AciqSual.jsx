// AciqSual.js

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function AciqSual({ openAnswer, setOpenAnswer }) {
  const [currentEditor, setCurrentEditor] = useState(null);
  const aciqSualRef = useRef(null);
  const quillRef = useRef(null); // Reference for ReactQuill instance

  const handleEditClick = (editorName) => {
    setCurrentEditor(editorName);
  };

  // Handle click outside to close editors
  useEffect(() => {
    function handleClickOutside(event) {
      const isEditorInput = event.target.closest("[data-editor-input]");
      if (isEditorInput) return;

      if (
        currentEditor === "aciqSual" &&
        aciqSualRef.current &&
        !aciqSualRef.current.contains(event.target)
      ) {
        setCurrentEditor(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [currentEditor, setOpenAnswer]);

  // Define Quill modules and formats
  const quillModules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"], // Remove formatting button
        ["undo", "redo"], // Custom buttons
      ],
      handlers: {
        undo: () => {
          if (quillRef.current) {
            quillRef.current.getEditor().history.undo();
          }
        },
        redo: () => {
          if (quillRef.current) {
            quillRef.current.getEditor().history.redo();
          }
        },
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("image", file);

            // Replace with your image upload endpoint
            const res = await fetch("/api/upload-image", {
              method: "POST",
              body: formData,
            });

            if (res.ok) {
              const data = await res.json();
              const quill = quillRef.current.getEditor();
              const range = quill.getSelection();
              quill.insertEmbed(range.index, "image", data.imageUrl);
            } else {
              console.error("Image upload failed.");
            }
          };
        },
      },
    },
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
    "undo",
    "redo",
  ];

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
            <div
              className="py-3 px-4 border rounded-lg hover:bg-inputBgHover hover:border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full border-green500 bg-green100"
              onClick={() => handleEditClick("aciqSual")}
              data-editor-input="aciqSual"
              dangerouslySetInnerHTML={{
                __html: openAnswer || "Cavabı əlavə edin",
              }}
            />
          ) : (
            <div style={{ width: "100%" }} ref={aciqSualRef}>
              <ReactQuill
                ref={quillRef}
                theme="snow"
                placeholder="Cavabı əlavə edin"
                modules={quillModules}
                formats={quillFormats}
                value={openAnswer}
                onChange={(content) => {
                  if (content !== openAnswer) {
                    setOpenAnswer(content); // Ensure setOpenAnswer updates the answer
                  }
                }}
                className="quill-editor"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AciqSual;
