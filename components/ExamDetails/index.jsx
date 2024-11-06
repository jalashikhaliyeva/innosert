import React, { useContext } from "react";
import { FiClock } from "react-icons/fi";
import { BsPatchQuestion } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { BsShare } from "react-icons/bs";
import { UserContext } from "@/shared/context/UserContext";
import { useSavedExams } from "@/shared/context/SavedExamsContext";

function ExamDetails({ examData, openLoginModal }) {
  const { user } = useContext(UserContext); // Get user from UserContext
  const { savedExams, addExamToSaved, removeExamFromSaved } = useSavedExams();

  // Format duration function
  const formatDuration = (duration) => {
    if (duration === "00:00:00") return ""; // Don't display if duration is "00:00:00"

    const [hours, minutes] = duration.split(":").map(Number);
    let formattedDuration = "";

    if (hours > 0) {
      formattedDuration += `${hours} saat`;
    }
    if (minutes > 0) {
      formattedDuration += `${formattedDuration ? " " : ""}${minutes} dəqiqə`;
    }

    return formattedDuration;
  };

  // Check if the exam is already saved
  const isSaved = savedExams.find((savedExam) => savedExam.id === examData.exam.id);

  // Function to handle saving/removing the exam bookmark
  const handleBookmarkClick = () => {
    if (!user) {
      openLoginModal(); // Open login modal if user is not logged in
      return;
    }

    // Toggle bookmark status
    if (isSaved) {
      removeExamFromSaved(examData.exam.id);
    } else {
      addExamToSaved(examData.exam);
    }
  };

  return (
    <div className="w-full border border-inputBorder py-5 px-5 md:px-20 flex justify-between mt-10 rounded-lg mb-44 flex-wrap md:flex-nowrap gap-5 md:gap-0">
      {formatDuration(examData.exam.duration) && (
        <div className="flex flex-row items-center gap-2">
          <FiClock className="size-7 text-3xl flex items-center justify-center" />
          <div className="flex flex-col">
            <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
              {formatDuration(examData.exam.duration)}
            </h2>
            <p className="font-gilroy text-sm text-gray200">İmtahan müddəti</p>
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-2">
        <BsPatchQuestion className="size-7 text-3xl flex items-center justify-center" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            {examData.exam.count}
          </h2>
          <p className="font-gilroy text-sm text-gray200">Sual sayı</p>
        </div>
      </div>
      <div className="flex w-[200px] flex-row items-center gap-2 cursor-pointer" onClick={handleBookmarkClick}>
        {isSaved ? (
          <FaBookmark className="size-7 text-3xl flex items-center justify-center text-textSecondaryDefault" />
        ) : (
          <FaRegBookmark className="size-7 text-3xl flex items-center justify-center text-textSecondaryDefault" />
        )}
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            {isSaved ? "Yadda saxlanılıb" : "Yadda saxla"}
          </h2>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <BsShare className="size-7 text-3xl flex items-center justify-center" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            Paylaş
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ExamDetails;
