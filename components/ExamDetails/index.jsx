import React, { useContext, useState, useEffect } from "react";
import { FiClock, FiLink } from "react-icons/fi";
import { BsPatchQuestion, BsShare } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { FaLinkedin, FaFacebook } from "react-icons/fa6"; // Import LinkedIn and Facebook icons
import { FcGoogle } from "react-icons/fc";
import { UserContext } from "@/shared/context/UserContext";
import { useSavedExams } from "@/shared/context/SavedExamsContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ExamDetails({ examData, openLoginModal }) {
  const { user } = useContext(UserContext); // Get user from UserContext
  const { savedExams, addExamToSaved, removeExamFromSaved } = useSavedExams();

  // State for Share Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Get current URL when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

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
  const isSaved = savedExams.find(
    (savedExam) => savedExam.id === examData.exam.id
  );

  // Function to handle saving/removing the exam bookmark
  const handleBookmarkClick = () => {
    if (!user) {
      openLoginModal(); // Open login modal if user is not logged in
      return;
    }

    // Toggle bookmark status
    if (isSaved) {
      removeExamFromSaved(examData.exam.id);
      toast.info(t("exam.removed"));
    } else {
      addExamToSaved(examData.exam);
      toast.success(t("exam.saved"));
    }
  };

  // Function to open the share modal
  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  // Function to close the share modal
  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setCopySuccess(false);
  };

  // Function to copy the URL to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentURL).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Function to handle LinkedIn Share
  const shareOnLinkedIn = () => {
    const linkedInShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentURL
    )}`;
    window.open(linkedInShareURL, "_blank", "noopener,noreferrer");
  };

  // Function to handle Facebook Share
  const shareOnFacebook = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`;
    window.open(facebookShareURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full border border-inputBorder py-5 px-5 md:px-20 flex justify-between mt-10 rounded-lg mb-44 flex-wrap md:flex-nowrap gap-1 md:gap-3 lg:gap-5 md:gap-0">
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

      {/* "Yadda saxla" Button */}
      <button
        className="flex w-[200px] flex-row items-center gap-2 cursor-pointer  rounded-md p-2 group focus:outline-none transform "
        onClick={handleBookmarkClick}
        aria-label={isSaved ? "Remove from saved exams" : "Save exam"}
      >
        {isSaved ? (
          <FaBookmark className="size-7 text-3xl flex items-center justify-center text-textSecondaryDefault group-hover:text-textHoverBlue transition-colors duration-300" />
        ) : (
          <FaRegBookmark className="size-7 text-3xl flex items-center justify-center text-textSecondaryDefault group-hover:text-textHoverBlue transition-colors duration-300" />
        )}
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault group-hover:text-textHoverBlue transition-colors duration-300">
            {isSaved ? "Yadda saxlanılıb" : "Yadda saxla"}
          </h2>
        </div>
      </button>

      {/* "Paylaş" Button */}
      <button
        className="flex flex-row items-center gap-2 cursor-pointer  rounded-md p-2 group focus:outline-none "
        onClick={openShareModal}
        aria-label="Share exam"
      >
        <BsShare className="size-7 text-3xl flex items-center justify-center text-textSecondaryDefault group-hover:text-textHoverBlue transition-colors duration-300" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault group-hover:text-textHoverBlue transition-colors duration-300">
            Paylaş
          </h2>
        </div>
      </button>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeShareModal}
        >
          <div
            className="bg-white p-6 rounded-lg  max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium font-gilroy text-textSecondaryDefault">
                Paylaş
              </h2>
              <button
                onClick={closeShareModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="flex justify-center gap-4 mb-4">
              {/* LinkedIn Share Button */}
              <button
                onClick={shareOnLinkedIn}
                className="rounded-full bg-gray-100 p-4 hover:bg-gray-200 transition-colors duration-300"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin className="h-8 w-8 fill-[#0A66C2]" />
              </button>

              {/* Facebook Share Button */}
              <button
                onClick={shareOnFacebook}
                className="rounded-full bg-gray-100 p-4 hover:bg-gray-200 transition-colors duration-300"
                aria-label="Share on Facebook"
              >
                <FaFacebook className="h-8 w-8 fill-[#0866FF]" />
              </button>
            </div>

            <div className="relative mb-4">
              <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={currentURL}
                readOnly
                className="w-full font-gilroy pl-10 pr-28 py-2 rounded border border-gray-300 bg-buttonSecondaryDefault text-gray-600 cursor-not-allowed focus:outline-none"
              />
              <button
                className="absolute font-gilroy right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-buttonPrimaryDefault text-white rounded hover:bg-buttonPrimaryHover transition-colors duration-300"
                onClick={copyToClipboard}
              >
                {copySuccess ? "Kopyalandı" : "Kopyala"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamDetails;
