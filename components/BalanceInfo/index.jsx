// Balance.jsx

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import IncreaseBalanceModal from "../IncreaseBalanceModal";

const Balance = ({ userBalance }) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex flex-col items-center w-[309px] p-[37px] gap-[10px] bg-neutralWhite rounded-2xl">
        <div className="text-2xl font-normal text-textSecondaryDefault">
          {userBalance} AZN
        </div>
        <button
          className="flex justify-center items-center w-[201px] py-[13px] bg-buttonPrimaryDefault text-white rounded-lg hover:bg-[#253543]"
          onClick={openModal}
        >
          {t("actions.increaseBalance")}
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <IncreaseBalanceModal closeModal={closeModal} />}
    </div>
  );
};

export default Balance;
