import React, { useState, useRef, useEffect } from "react";
import Questions from "../Questions";
import Registrations from "../Registrations";
import Results from "../Results";
import GeneralInfo from "../GeneralInfo";
import { FaPen } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/router";

function ExamDetailsTabGroup() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState([]);
  const sortMenuRef = useRef(null);

  const handleDelete = () => {
    console.log("Rows to delete:", selectedRows);
  };

  const handleEdit = () => {
    console.log("Rows to edit:", selectedRows);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "questions":
        return (
          <Questions
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        );
      case "registrations":
        return <Registrations />;
      case "results":
        return <Results />;
      default:
        return <GeneralInfo />;
    }
  };

  const handleSortOptionClick = (option) => {
    console.log(`Selected sort option: ${option}`);
    setIsSortMenuOpen(false); // Close menu after selection
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortMenuOpen(false); // Close the menu if clicked outside
      }
    };

    // Add event listener to detect clicks outside the sort menu
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortMenuRef]);

  return (
    <div className="flex flex-col p-4 sm:p-6">
      <div className="flex flex-row justify-between  items-center mb-4 sm:mb-6">
        <h2 className="font-gilroy text-xl sm:text-2xl font-medium leading-6 sm:leading-8">
          İmtahanlarım
        </h2>

        {/* Conditionally render "Redaktə et" or "Search" and "Sort" */}
        {activeTab === "general" ? (
          <button
            className="flex items-center justify-center gap-2 py-2 px-3 sm:py-3 sm:px-4 h-10 sm:h-11 text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary font-gilroy"
            onClick={() => {
              router.push("/imtahan-redakte"); // Redirect to edit page
            }}
          >
            <FaPen />
            <span className="text-sm sm:text-base">Redaktə et</span>
          </button>
        ) : (
          <div className="flex  flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 relative">
            {/* Sort menu */}
            <div className="relative" ref={sortMenuRef}>
              <div
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center cursor-pointer gap-1 sm:gap-2"
              >
                <TbArrowsSort />
                <p className="text-sm sm:text-base text-textSecondaryDefault leading-6 font-gilroy">
                  Sırala
                </p>
              </div>

              {isSortMenuOpen && (
                <div className="py-3 px-4 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-20">
                  <ul className="divide-y divide-gray-200">
                    {["Son Yaradilan", "Ilk Yaradilan", "A-Z", "Z-A"].map(
                      (option) => (
                        <li
                          key={option}
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                          onClick={() => handleSortOptionClick(option)}
                        >
                          {option}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Search input with custom styling */}
            <div className="flex items-center w-[70%] md:w-full bg-bodyColor border border-inputBorder rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus-within:border-inputRingFocus overflow-hidden z-10">
              <LuSearch className="text-inputPlaceholderText size-4 sm:size-6 flex-shrink-0" />
              <input
                type="text"
                placeholder="Axtar"
                className="ml-2 w-full text-sm sm:text-base bg-bodyColor outline-none placeholder-inputPlaceholderText"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
        {[
          { label: "Ümumi məlumat", key: "general" },
          { label: "Suallar", key: "questions" },
          { label: "Qeydiyyatlar", key: "registrations" },
          { label: "Nəticələr", key: "results" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-2 text-sm sm:text-lg px-3 sm:px-4 py-2 h-10 sm:h-[44px] rounded-lg font-normal font-gilroy leading-5 sm:leading-6 ${
              activeTab === tab.key
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Render the content based on the active tab */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}

export default ExamDetailsTabGroup;
