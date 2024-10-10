import React from "react";
import { FaPen } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
function EditOrPreviewTitle({ activeView, setActiveView }) {
  return (
    <div className="flex flex-row gap-4 mb-6 font-gilroy">
      <button
        className={`flex items-center gap-2 text-lg px-4 py-3  rounded-lg font-normal leading-6 ${
          activeView === "edit" ? "bg-blue100 text-blue400" : "text-neutral700"
        }`}
        onClick={() => setActiveView("edit")}
      >
        <FaPen className="size-4" />
        Redaktə et
      </button>
      <button
        className={`flex items-center gap-2 text-lg px-4 py-3  rounded-lg font-normal leading-6 ${
          activeView === "preview"
            ? "bg-blue100 text-blue400"
            : "text-neutral700"
        }`}
        onClick={() => setActiveView("preview")}
      >
        <MdRemoveRedEye className="size-5" />
        Öngörünüş
      </button>
    </div>
  );
}

export default EditOrPreviewTitle;
