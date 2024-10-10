import React, { useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { TfiWallet } from "react-icons/tfi";
import { FaRegBookmark } from "react-icons/fa";
import FilterCategories from "./FilterCategories"; // Import your filter modal component

function TitleExamsPage({ activeTab, setActiveTab }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State to control modal visibility
  const [appliedFilterCount, setAppliedFilterCount] = useState(0); // Track filter count from modal

  return (
    <div className="flex flex-col mb-6">
      <div className="flex flex-row justify-between">
        <h2
          data-aos="fade-right"
          className="font-gilroy text-2xl font-medium leading-8 pb-6"
        >
          İmtahanlarım
        </h2>
      </div>

      {/* Toggle Buttons */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-2">
          <button
            className={`flex items-center gap-2 text-lg px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
              activeTab === "paid"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("paid")}
          >
            <TfiWallet />
            <span>Ödənilənlər</span>
          </button>
          <button
            className={`flex items-center gap-2 text-lg px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
              activeTab === "saved"
                ? "bg-blue100 text-blue400"
                : "text-neutral700"
            }`}
            onClick={() => setActiveTab("saved")}
          >
            <FaRegBookmark />
            <span>Seçilənlər</span>
          </button>
        </div>
        {/* Render Filter Modal */}

        <FilterCategories
          isModalOpen={isFilterModalOpen}
          setIsModalOpen={setIsFilterModalOpen}
          setAppliedFilterCount={setAppliedFilterCount} 
        />

      </div>
    </div>
  );
}

export default TitleExamsPage;
