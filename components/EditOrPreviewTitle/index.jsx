import React from "react";
import { FaPen } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { LuFileQuestion } from "react-icons/lu"; // Import the new icon
import { useRouter } from "next/router";
import { BsFillPatchQuestionFill } from "react-icons/bs";

function EditOrPreviewTitle({ activeView, setActiveView }) {
  const router = useRouter();
  const isSualYaratPage = router.pathname === "/sual-yarat";

  return (
    <div className="flex flex-row gap-4 mb-6 font-gilroy">
      <button
        className={`flex items-center justify-center gap-2 text-lg px-4 py-3 rounded-lg font-normal leading-6 w-40 ${
          activeView === "edit" ? "bg-blue100 text-blue400" : "text-neutral700"
        }`}
        onClick={() => setActiveView("edit")}
      >
        {isSualYaratPage ? (
          <BsFillPatchQuestionFill className="size-4.5" />
        ) : (
          <FaPen className="size-4" />
        )}
        {isSualYaratPage ? "Sual" : "Redaktə et"}
      </button>
      <button
        className={`flex items-center justify-center gap-2 text-lg px-4 py-3 rounded-lg font-normal leading-6 w-40 ${
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
