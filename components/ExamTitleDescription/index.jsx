import React from "react";

function ExamTitleDescription({examData}) {
  return (
    <div className="flex flex-col gap-3 mt-6 h-[300px]">
      <h2 className="font-gilroy text-3xl text-textSecondaryDefault font-medium leading-normal">
      {examData.exam.name}
      </h2>
      <p className="font-gilroy text-xl font-normal leading-7 text-grayText">
      {examData.exam.desc}
      </p>
    </div>
  );
}

export default ExamTitleDescription;
