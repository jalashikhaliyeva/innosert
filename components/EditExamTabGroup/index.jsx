import React, { useState } from "react";
import GeneralInfo from "../GeneralInfo"; // Component for "Ümumi məlumat"
import Questions from "@/components/Questions"; // Component for "Suallar"
import { FaPen } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import GeneralInfoEditExam from "../GeneralInfoEditExam";
import { FaPlus } from "react-icons/fa6";
import AddQuestionModal from "./AddQuestionModal"; // Import your modal component

function EditExamTabGroup() {
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "questions":
        return (
          <div className="md:w-[80%] w-full mx-auto">
            <Questions />
          </div>
        );
      default:
        return <GeneralInfoEditExam />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Tab buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-row gap-2 mb-6 font-gilroy">
          <button
            className={`text-lg px-4 py-2 rounded-lg flex gap-2 items-center ${
              activeTab === "general"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("general")}
          >
            <FaPen className="size-4" />
            Ümumi məlumat
          </button>

          <button
            className={`text-lg px-4 py-2 rounded-lg flex gap-2 items-center ${
              activeTab === "questions"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            <IoEyeOutline className="size-5" />
            Suallar
          </button>
        </div>

        {/* Conditionally render the 'elave' button based on the active tab */}
        {activeTab === "questions" && (
          <div className="flex justify-end mt-2 sm:mt-0 sm:flex-row w-full sm:w-auto">
            <button
              className="flex items-center justify-center gap-2 p-3 h-11 text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary whitespace-nowrap"
              onClick={() => setIsModalOpen(true)} // Open the modal on click
            >
              <FaPlus className="text-white w-4 h-4" />
              Sual əlavə et
            </button>
          </div>
        )}
      </div>

      {/* Render the content based on the active tab */}
      <div>{renderTabContent()}</div>

      {/* Render the modal when isModalOpen is true, pass onClose function */}
      {isModalOpen && <AddQuestionModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default EditExamTabGroup;
