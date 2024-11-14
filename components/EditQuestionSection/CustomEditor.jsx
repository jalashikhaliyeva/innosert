// CustomEditor.js

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CustomEditor({ value, onChange, placeholder, label, modules, formats }) {
  const [isOpen, setIsOpen] = useState(false);
  const editorRef = useRef(null);

  // Handle click outside to close editor
  useEffect(() => {
    function handleClickOutside(event) {
      if (editorRef.current && !editorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label
          htmlFor="editor"
          className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300"
        >
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {!isOpen ? (
          <div
            className="py-3 px-4 border rounded-lg bg-inputBgHover border-inputBorderHover font-gilroy cursor-pointer text-grayButtonText text-lg w-full"
            onClick={() => setIsOpen(true)}
            dangerouslySetInnerHTML={{
              __html: value || placeholder,
            }}
          />
        ) : (
          <div style={{ width: "100%" }} ref={editorRef}>
            <ReactQuill
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              theme="snow"
              style={{ minHeight: "100px" }}
              placeholder={placeholder}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomEditor;
