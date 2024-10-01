import React from "react";
import { FiClock } from "react-icons/fi";
import { BsPatchQuestion } from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { BsShare } from "react-icons/bs";
function ExamDetails() {
  return (
    <div className="w-full border border-inputBorder py-5 px-20 flex justify-between mt-10 rounded-lg mb-44">
      <div className="flex  flex-row items-center gap-2">
      <FiClock className="size-7 text-3xl flex items-center justify-center" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            1 saat
          </h2>
          <p className="font-gilroy text-sm text-gray200">İmtahan müddəti</p>
        </div>
      </div>
      <div className="flex  flex-row items-center gap-2">
      <BsPatchQuestion className="size-7 text-3xl flex items-center justify-center" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            1 saat
          </h2>
          <p className="font-gilroy text-sm text-gray200">İmtahan müddəti</p>
        </div>
      </div>
      <div className="flex  flex-row items-center gap-2">
      <CiBookmark className="size-7 text-3xl flex items-center justify-center" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            1 saat
          </h2>
          <p className="font-gilroy text-sm text-gray200">İmtahan müddəti</p>
        </div>
      </div>
      <div className="flex  flex-row items-center gap-2">
      <BsShare className="size-7 text-3xl flex items-center justify-center" />
        <div className="flex flex-col">
          <h2 className="font-gilroy text-lg font-semibold leading-normal text-textSecondaryDefault">
            1 saat
          </h2>
          <p className="font-gilroy text-sm text-gray200">İmtahan müddəti</p>
        </div>
      </div>
    </div>
  );
}

export default ExamDetails;
