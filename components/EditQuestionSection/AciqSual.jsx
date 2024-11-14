import { useState } from "react";
import CustomEditor from "./CustomEditor"; // Adjust the import path accordingly

function AciqSual({ openAnswer, setOpenAnswer }) {
  const [isCorrect, setIsCorrect] = useState(false); // Define state for the checkbox

  // Define Quill modules and formats
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
    <div className="flex flex-col gap-3 w-full lg:w-1/2 px-4">
      <h2 className="text-textSecondaryDefault leading-8 text-2xl font-gilroy font-medium mb-5">
        Cavab
      </h2>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="isCorrect"
          className="mb-3 block font-gilroy text-xl leading-6 font-normal text-brandBlue300 flex items-center"
        >
          Düzgün cavab
          <input
            id="isCorrect"
            type="checkbox"
            checked={isCorrect}
            onChange={(e) => setIsCorrect(e.target.checked)}
            className="ml-2"
          />
        </label>
        <CustomEditor
          value={openAnswer}
          onChange={setOpenAnswer}
          placeholder="Cavabı əlavə edin"
          modules={modules}
          formats={formats}
          label={null} // Remove label from CustomEditor as it's now included above
        />
      </div>
    </div>
  );
}

export default AciqSual;
