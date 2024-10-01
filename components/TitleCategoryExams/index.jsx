import React from "react";
import { FaAngleRight } from "react-icons/fa";

function TitleCategoryExams() {
  return (
    <div className="flex items-center justify-between py-5">
      <h5 className="font-gilroy font-medium leading-normal text-3xl text-textSecondaryDefault">
        IT
      </h5>
      <button className="flex items-center justify-center font-gilroy text-base font-normal leading-6 text-textSecondaryDefault">
        Hamısını gör
        <FaAngleRight className="size-5 text-xl text-textSecondaryDefault fill-textSecondaryDefault" />
      </button>
    </div>
  );
}

export default TitleCategoryExams;
