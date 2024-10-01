import React, { useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(100); // Example starting balance

  const increaseBalance = () => {
    setBalance(balance + 10); // Logic to increase balance
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex flex-col items-center w-[309px] p-[37px] gap-[10px] bg-neutralWhite rounded-2xl">
        <div className="text-2xl font-normal text-textSecondaryDefault">
          {balance} AZN
        </div>
        <button
          className="flex justify-center items-center w-[201px] py-[13px] bg-buttonPrimaryDefault text-white rounded-lg hover:bg-[#253543]"
          onClick={increaseBalance}
        >
          + Balansı artır
        </button>
      </div>
    </div>
  );
};

export default Balance;
