import { useState } from "react";
import { useRouter } from "next/router";
import AddFolderModal from "../AddFolderModal";
import AddExamFolderModal from "../AddExamFolderModal";
import AddExamSubFolderModal from "../AddExamSubFolderModal";

// add exam or folder modal
function AddExamModal({ closeModal, addNewFolder }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFolderModal, setShowFolderModal] = useState(false); // State to control AddFolderModal visibility
  const router = useRouter(); // Initialize router
  const { slug } = router.query;
  const slugParam = Array.isArray(slug) ? slug[slug.length - 1] : slug;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const closeAllModals = () => {
    setShowFolderModal(false); // Close AddFolderModal
    closeModal(); // Close AddExamModal
  };
  const handleSubmit = () => {
    if (selectedOption === "exam") {
      const path = slugParam
        ? {
            pathname: "/imtahan-yarat",
            query: { qovluq: slugParam },
          }
        : "/imtahan-yarat";
      router.push(path);
    } else if (selectedOption === "folder") {
      setShowFolderModal(true); // Show folder modal
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {showFolderModal &&
        // Conditionally render AddExamFolderModal or AddExamSubFolderModal
        (router.pathname === "/umumi-imtahanlar" ? (
          <AddExamFolderModal
            addNewFolder={addNewFolder}
            closeModal={closeAllModals}
          />
        ) : (
          router.pathname.startsWith("/umumi-imtahanlar/") && (
            <AddExamSubFolderModal
              slugParam={slugParam}
              closeModal={closeAllModals}
            />
          )
        ))}
      {!showFolderModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-xl w-full max-w-md p-10 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Modal Title */}
            <h2 className="text-2xl font-medium font-gilroy text-textSecondaryDefault text-center mb-6">
              Faylın adı
            </h2>

            {/* Radio Options */}
            <div className="flex gap-3 mb-6 justify-center">
              <label className="flex flex-col items-center justify-center cursor-pointer border border-buttonSecondaryDisabled py-3 px-4 rounded-lg">
                <div className="flex gap-4 items-center mb-3">
                  <input
                    type="radio"
                    value="folder"
                    checked={selectedOption === "folder"}
                    onChange={handleOptionChange}
                    className=""
                  />

                  <span className="leading-5 font-medium text-NeutralBlueN800 font-gilroy text-base">
                    Qovluq yarat
                  </span>
                </div>

                {/* SVG for folder */}
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.334 10.5001H18.334L15.0007 7.16675H6.66732C4.83398 7.16675 3.33398 8.66675 3.33398 10.5001V17.1667H36.6673V13.8334C36.6673 12.0001 35.1673 10.5001 33.334 10.5001Z"
                    fill="#FFA000"
                  />
                  <path
                    d="M33.334 10.5H6.66732C4.83398 10.5 3.33398 12 3.33398 13.8333V30.5C3.33398 32.3333 4.83398 33.8333 6.66732 33.8333H33.334C35.1673 33.8333 36.6673 32.3333 36.6673 30.5V13.8333C36.6673 12 35.1673 10.5 33.334 10.5Z"
                    fill="#FFCA28"
                  />
                </svg>
              </label>

              <label className="flex flex-col items-center justify-center cursor-pointer border border-buttonSecondaryDisabled py-3 px-4 rounded-lg">
                <div className="flex gap-4 items-center mb-3">
                  <input
                    type="radio"
                    value="exam"
                    checked={selectedOption === "exam"}
                    onChange={handleOptionChange}
                    className="mb-2"
                  />
                  <span className="leading-5 font-medium text-NeutralBlueN800 font-gilroy text-base">
                    İmtahan yarat
                  </span>
                </div>

                {/* SVG for exam */}
                <svg
                  width="40"
                  height="41"
                  viewBox="0 0 40 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.25 14.0203V9.25C36.25 8.58696 35.9866 7.95107 35.5178 7.48223C35.0489 7.01339 34.413 6.75 33.75 6.75H6.25C5.58696 6.75 4.95107 7.01339 4.48223 7.48223C4.01339 7.95107 3.75 8.58696 3.75 9.25V29.25C3.75 29.913 4.01339 30.5489 4.48223 31.0178C4.95107 31.4866 5.58696 31.75 6.25 31.75H25V35.5C24.998 35.7204 25.0543 35.9373 25.1632 36.1289C25.2721 36.3205 25.4298 36.4799 25.6201 36.591C25.8105 36.702 26.0268 36.7608 26.2472 36.7612C26.4676 36.7617 26.6842 36.7039 26.875 36.5938L30.625 34.4469L34.375 36.5938C34.5658 36.7039 34.7824 36.7617 35.0028 36.7612C35.2232 36.7608 35.4395 36.702 35.6299 36.591C35.8202 36.4799 35.9779 36.3205 36.0868 36.1289C36.1957 35.9373 36.252 35.7204 36.25 35.5V25.7297C37.0402 24.973 37.669 24.0642 38.0986 23.058C38.5282 22.0518 38.7497 20.9691 38.7497 19.875C38.7497 18.7809 38.5282 17.6982 38.0986 16.692C37.669 15.6858 37.0402 14.777 36.25 14.0203ZM20 23H11.25C10.9185 23 10.6005 22.8683 10.3661 22.6339C10.1317 22.3995 10 22.0815 10 21.75C10 21.4185 10.1317 21.1005 10.3661 20.8661C10.6005 20.6317 10.9185 20.5 11.25 20.5H20C20.3315 20.5 20.6495 20.6317 20.8839 20.8661C21.1183 21.1005 21.25 21.4185 21.25 21.75C21.25 22.0815 21.1183 22.3995 20.8839 22.6339C20.6495 22.8683 20.3315 23 20 23ZM20 18H11.25C10.9185 18 10.6005 17.8683 10.3661 17.6339C10.1317 17.3995 10 17.0815 10 16.75C10 16.4185 10.1317 16.1005 10.3661 15.8661C10.6005 15.6317 10.9185 15.5 11.25 15.5H20C20.3315 15.5 20.6495 15.6317 20.8839 15.8661C21.1183 16.1005 21.25 16.4185 21.25 16.75C21.25 17.0815 21.1183 17.3995 20.8839 17.6339C20.6495 17.8683 20.3315 18 20 18ZM33.75 33.3453L31.25 31.9141C31.0611 31.8061 30.8473 31.7493 30.6297 31.7493C30.4121 31.7493 30.1983 31.8061 30.0094 31.9141L27.5094 33.3453V27.375C28.4993 27.7886 29.5615 28.0016 30.6344 28.0016C31.7072 28.0016 32.7694 27.7886 33.7594 27.375L33.75 33.3453ZM30.625 25.5C29.5125 25.5 28.4249 25.1701 27.4999 24.552C26.5749 23.9339 25.8539 23.0554 25.4282 22.0276C25.0024 20.9998 24.891 19.8688 25.1081 18.7776C25.3251 17.6865 25.8609 16.6842 26.6475 15.8975C27.4342 15.1109 28.4365 14.5751 29.5276 14.3581C30.6188 14.141 31.7498 14.2524 32.7776 14.6782C33.8054 15.1039 34.6839 15.8249 35.302 16.7499C35.9201 17.6749 36.25 18.7625 36.25 19.875C36.25 20.6137 36.1045 21.3451 35.8218 22.0276C35.5391 22.71 35.1248 23.3301 34.6025 23.8525C34.0801 24.3748 33.46 24.7891 32.7776 25.0718C32.0951 25.3545 31.3637 25.5 30.625 25.5Z"
                    fill="#4F7291"
                  />
                </svg>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                className="bg-buttonSecondaryDefault text-grayButtonText text-lg py-2 px-4 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed w-full font-gilroy"
                onClick={closeModal}
              >
                Ləğv et
              </button>
              <button
                className={`bg-buttonPrimaryDefault text-white py-2 px-4 rounded-lg w-full font-gilroy text-lg ${
                  !selectedOption
                    ? "bg-opacity-50 cursor-not-allowed "
                    : "hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
                }`}
                onClick={handleSubmit}
                disabled={!selectedOption}
              >
                Yarat
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddExamModal;
