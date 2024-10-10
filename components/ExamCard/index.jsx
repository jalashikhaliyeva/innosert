import Image from "next/image";
import React, { useContext } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext";
import { useSavedExams } from "@/shared/context/SavedExamsContext";

function ExamCard({ widthClass, openLoginModal, openRegisterModal, exams }) {
  const router = useRouter();
  const { user } = useContext(UserContext); // Get user from UserContext
  const { savedExams, addExamToSaved, removeExamFromSaved } = useSavedExams(); // Get saved exams management functions

  // Function to handle navigation to the detailed exam page
  const handleDetailClick = (id) => {
    router.push(`/etrafli/${encodeURIComponent(id)}`);
  };

  // Function to handle saving/removing an exam
  const handleBookmarkClick = (exam) => {
    if (!user) {
      // Open login modal if the user is not logged in
      openLoginModal();
      return;
    }

    // If the user is logged in, proceed with saving/removing the bookmark
    const isSaved = savedExams.find((savedExam) => savedExam.id === exam.id);

    if (isSaved) {
      removeExamFromSaved(exam.id);
    } else {
      addExamToSaved(exam);
    }
  };

  // Function to handle "Daxil ol" button click
  const handleLoginOrRulesClick = () => {
    if (user) {
      openRegisterModal();
    } else {
      openLoginModal();
    }
  };

  return (
    <div className="flex flex-wrap gap-5 mb-8">
      {exams.map((exam) => {
        const isSaved = savedExams.find((savedExam) => savedExam.id === exam.id);
        return (
          <div
            key={exam.id}
            className={`flex flex-col ${widthClass} bg-white justify-normal p-5 rounded-md border border-grayLineFooter`}
          >
            {/* Card Content */}
            <div
              style={{
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="h-[250px] px-5 py-8 flex flex-col bg-[url('/img/backgroundCardNew.png')] border-2 border-buttonSecondaryDisabled"
            >
              <div className="flex justify-end">
                <Image
                  src="/img/Badge.png"
                  alt="Exam Badge"
                  width={37}
                  height={37}
                />
              </div>
              <div className="pb-6">
                <div className="flex gap-2">
                  <Image
                    src="/img/handexLogo.png"
                    alt="Handex Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <h3 className="font-gilroy text-base text-grayText70">
                    Handex
                  </h3>
                </div>
                <p className="pt-2.5 font-gilroy h-[90px] text-xl leading-8 text-textSecondaryDefault font-medium">
                  {exam.name.length > 40
                    ? `${exam.name.substring(0, 40)}...`
                    : exam.name}
                </p>
              </div>
              <div className="flex justify-end">
                <Image
                  src="/logo/dark-logo-innosert.png"
                  alt="Innosert Logo"
                  width={53}
                  height={17}
                />
              </div>
            </div>

            <div className="py-4">
              <div className="flex justify-start gap-2">
                <p className="font-gilroy text-grayTextinBox text-base font-normal leading-6">
                  {exam.duration}
                </p>
                <div className="w-2 h-2 bg-grayTextinBox rounded-full self-center"></div>
                <p className="font-gilroy text-grayTextinBox text-base font-normal leading-6">
                  {exam.questions} sual
                </p>
              </div>

              <div className="pt-4 flex flex-row justify-between">
                <p
                  className={`font-gilroy text-base ${
                    exam.paid ? "text-green400" : "text-darkBlue100"
                  } font-normal leading-4`}
                >
                  {exam.paid ? "Ödənilib" : `${exam.price}$`}
                </p>
                {/* Bookmark Icon */}
                {isSaved ? (
                  <FaBookmark
                    className="text-xl cursor-pointer"
                    onClick={() => handleBookmarkClick(exam)}
                  />
                ) : (
                  <FaRegBookmark
                    className="text-xl cursor-pointer"
                    onClick={() => handleBookmarkClick(exam)}
                  />
                )}
              </div>

              <div className="w-full flex flex-row gap-4 pt-3">
                {/* "Daxil ol" Button */}
                <button
                  onClick={handleLoginOrRulesClick}
                  className="py-3 px-4 h-11 w-full text-white font-gilroy leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                >
                  Daxil ol
                </button>

                {/* "Ətraflı" Button */}
                <button
                  onClick={() => handleDetailClick(exam.id)}
                  className="py-3 px-4 h-11 w-full font-gilroy leading-6 rounded-md bg-buttonSecondaryDefault text-grayButtonText hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
                >
                  Ətraflı
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExamCard;
