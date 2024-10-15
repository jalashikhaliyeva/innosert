import React, { useState, useRef, useEffect } from "react";
import Questions from "../Questions";
import Registrations from "../Registrations";
import Results from "../Results";
import GeneralInfo from "../GeneralInfo";
import { FaPen } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { LuSearch } from "react-icons/lu";

function ExamDetailsTabGroup() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const sortMenuRef = useRef(null);
  const handleDelete = () => {
    // Logic for deleting selected rows
    console.log("Rows to delete:", selectedRows);
    // You can implement actual delete logic here based on selectedRows
  };

  const handleEdit = () => {
    // Logic for editing selected rows
    console.log("Rows to edit:", selectedRows);
    // You can implement actual edit logic here based on selectedRows
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
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="font-gilroy text-2xl font-medium leading-8">
          İmtahanlarım
        </h2>

        {/* Conditionally render "Redaktə et" or "Search" and "Sort" */}
        {activeTab === "general" ? (
          <button
            className="flex items-center justify-center gap-4 py-3 px-4 h-11 text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary font-gilroy"
            onClick={() => {
              console.log("Redakte et clicked");
            }}
          >
            <FaPen />
            Redaktə et
          </button>
        ) : (
          <div className="flex flex-row items-center justify-center gap-4 relative">
            {/* Sort menu */}
            <div className="relative" ref={sortMenuRef}>
              <div
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center cursor-pointer gap-2"
              >
                <TbArrowsSort />
                <p className="text-base text-textSecondaryDefault leading-6 font-gilroy">
                  Sırala
                </p>
              </div>

              {isSortMenuOpen && (
                <div className="py-4 px-5 absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-md z-20">
                  <ul className="divide-y divide-gray-200">
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Son Yaradilan")}
                    >
                      Son Yaradilan
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Ilk Yaradilan")}
                    >
                      Ilk Yaradilan
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("A-Z")}
                    >
                      A-Z
                    </li>
                    <li
                      className="py-2 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap rounded-md"
                      onClick={() => handleSortOptionClick("Z-A")}
                    >
                      Z-A
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Search input with custom styling */}
            <div className="flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden z-10">
              <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
              <input
                type="text"
                placeholder="Axtar"
                className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText "
              />
            </div>
          </div>
        )}
      </div>

      {/* Tab buttons */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <button
            className={`flex items-center gap-2 text-lg px-4 py-2 h-[44px] rounded-lg font-normal font-gilroy leading-6 ${
              activeTab === "general"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("general")}
          >
            <span>Ümumi məlumat</span>
          </button>
          <button
            className={`flex items-center gap-2 text-lg px-4 py-2 h-[44px] rounded-lg font-normal font-gilroy leading-6 ${
              activeTab === "questions"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("questions")}
          >
            <span>Suallar</span>
          </button>
          <button
            className={`flex items-center gap-2 text-lg px-4 py-2 h-[44px] rounded-lg font-normal font-gilroy leading-6 ${
              activeTab === "registrations"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("registrations")}
          >
            <span>Qeydiyyatlar</span>
          </button>
          <button
            className={`flex items-center gap-2 text-lg px-4 py-2 h-[44px] rounded-lg font-normal font-gilroy leading-6 ${
              activeTab === "results"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("results")}
          >
            <span>Nəticələr</span>
          </button>
        </div>
      </div>

      {/* Render the content based on the active tab */}
      <div className="mt-4">{renderTabContent()}</div>
    </div>
  );
}

export default ExamDetailsTabGroup;
