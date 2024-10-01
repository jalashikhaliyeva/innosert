import React from "react";
import { IoFilterSharp } from "react-icons/io5";

function TitleExamsPage() {
  return (
    <div className="flex flex-row justify-between">
      <h2 data-aos="fade-right" className="font-gilroy text-2xl font-medium leading-8 pb-6">
        İmtahanlarım
      </h2>
      <div className="flex flex-row gap-4 items-center justify-center cursor-pointer">
        <IoFilterSharp  className="size-5" />
        <h3 className="font-gilroy text-base font-normal leading-6">Filter</h3>
      </div>
    </div>
  );
}

export default TitleExamsPage;
