import React, { useContext, useState } from "react";
import GeneralInfoEditExam from "../GeneralInfoEditExam";
import { FaPlus } from "react-icons/fa6";
import AddQuestionModal from "./AddQuestionModal"; // Import your modal component
import { UserContext } from "@/shared/context/UserContext";
import TableComponent from "./TableComponent";
import DeleteModal from "../DeleteModal";

function CreateExamTabGroup({ isLoadingQuestions }) {
  const { selectedQuestionsForExam } = useContext(UserContext);
  console.log(selectedQuestionsForExam, "selectedQuestionsForExam");

  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // State for selected rows in the table
  const [selectedRows, setSelectedRows] = useState([]);

  // State to manage the delete modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Function to open the delete modal
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // Define color variables based on activeTab
  const isActiveGeneral = activeTab === "general";
  const circleFill = isActiveGeneral ? "#3366FF" : "none";
  const circleStroke = isActiveGeneral ? "#3366FF" : "#888888";
  const innerPathFill = isActiveGeneral ? "white" : "#888888";
  const textColor = isActiveGeneral ? "text-blue400" : "text-neutral700";

  // Define color variables for "Suallar" tab based on activeTab
  const isActiveQuestions = activeTab === "questions";
  const questionsCircleFill = isActiveQuestions ? "#3366FF" : "none";
  const questionsCircleStroke = isActiveQuestions ? "#3366FF" : "#888888";
  const questionsInnerPathFill = isActiveQuestions ? "white" : "#888888";

  // Function to render the content based on the active tab
  const renderTabContent = () => {
    if (activeTab === "questions") {
      if (isLoadingQuestions) {
        return (
          <p className="bg-white p-10 flex items-center justify-center rounded-xl text-lg text-grayButtonText">
            Yüklənir...
          </p>
        );
      }

      return selectedQuestionsForExam && selectedQuestionsForExam.length > 0 ? (
        <TableComponent
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          questions={selectedQuestionsForExam}
          openDeleteModal={openDeleteModal}
          showDeleteButton={true}
        />
      ) : (
        <p className="bg-white p-10 flex items-center justify-center rounded-xl text-lg text-grayButtonText">
          Hal-hazırda heç bir sual yoxdur, əlavə etmək üçün &quot;Sual əlavə
          et&quot; düyməsinə klikləyin.
        </p>
      );
    }

    return <GeneralInfoEditExam />;
  };

  return (
    <div className="flex flex-col">
      {/* Tab buttons */}
      <div className="flex justify-between">
        <div className="flex flex-row gap-2 mb-6 font-gilroy">
          <button
            className={`text-lg px-4 py-2 rounded-lg flex gap-2 items-center ${
              isActiveGeneral ? "bg-blue100 text-blue400" : "text-neutral700"
            }`}
            onClick={() => setActiveTab("general")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3927_86482)">
                <path
                  d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z"
                  fill={circleFill}
                  stroke={circleStroke}
                  strokeWidth="1.5"
                />
                <path
                  d="M13.3146 7.27273V16H11.9936V8.59375H11.9425L9.8544 9.95739V8.69602L12.032 7.27273H13.3146Z"
                  fill={innerPathFill}
                />
              </g>
              <defs>
                <clipPath id="clip0_3927_86482">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Ümumi məlumat
          </button>

          <button
            className={`text-lg px-4 py-2 rounded-lg flex gap-2 items-center ${
              isActiveQuestions ? "bg-blue100 text-blue400" : "text-neutral700"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3927_86487)">
                <path
                  d="M23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12Z"
                  fill={questionsCircleFill}
                  stroke={questionsCircleStroke}
                  strokeWidth="1.5"
                />
                <path
                  d="M9.1598 16V15.0455L12.1129 11.9858C12.4283 11.6534 12.6882 11.3622 12.8928 11.1122C13.1001 10.8594 13.255 10.6193 13.3572 10.392C13.4595 10.1648 13.5107 9.9233 13.5107 9.66761C13.5107 9.37784 13.4425 9.12784 13.3061 8.91761C13.1697 8.70455 12.9837 8.54119 12.7479 8.42756C12.5121 8.31108 12.2464 8.25284 11.951 8.25284C11.6385 8.25284 11.3658 8.31676 11.1328 8.4446C10.8999 8.57244 10.7209 8.75284 10.5959 8.9858C10.4709 9.21875 10.4084 9.49148 10.4084 9.80398H9.15128C9.15128 9.27273 9.27344 8.80824 9.51776 8.41051C9.76207 8.01278 10.0973 7.70455 10.5234 7.4858C10.9496 7.2642 11.4339 7.15341 11.9766 7.15341C12.5249 7.15341 13.0078 7.26278 13.4254 7.48153C13.8459 7.69744 14.174 7.9929 14.4098 8.3679C14.6456 8.74006 14.7635 9.16051 14.7635 9.62926C14.7635 9.95312 14.7024 10.2699 14.5803 10.5795C14.4609 10.8892 14.2521 11.2344 13.9538 11.6151C13.6555 11.9929 13.2408 12.4517 12.7095 12.9915L10.9751 14.8068V14.8707H14.9041V16H9.1598Z"
                  fill={questionsInnerPathFill}
                />
              </g>
              <defs>
                <clipPath id="clip0_3927_86487">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Suallar
          </button>
        </div>

        {/* Conditionally render the 'elave' button based on the active tab */}
        {activeTab === "questions" && (
          <button
            className="flex items-center justify-center gap-2 p-3 h-11 text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary whitespace-nowrap"
            onClick={() => setIsModalOpen(true)} // Open the modal on click
          >
            <FaPlus className="text-white w-4 h-4" />
            Sual əlavə et
          </button>
        )}
      </div>

      {/* Render the content based on the active tab */}
      <div>{renderTabContent()}</div>

      {/* Render the AddQuestionModal when isModalOpen is true */}
      {isModalOpen && (
        <AddQuestionModal onClose={() => setIsModalOpen(false)} />
      )}

      {/* Render the DeleteQuestionModal when isDeleteModalOpen is true */}
      {isDeleteModalOpen && <DeleteModal onClose={closeDeleteModal} />}
    </div>
  );
}

export default CreateExamTabGroup;
