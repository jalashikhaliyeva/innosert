import React from "react";
import { LuSearch } from "react-icons/lu";
import { useRouter } from "next/router";

function ReportSingleNavigationTitle() {
  const router = useRouter();
  const { query } = router;

  let id = query.id ? decodeURIComponent(query.id) : "";

  // Remove hyphens and capitalize the first letter of each word
  id = id
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter
    .join(" "); // Join the words back together

  return (
    <div className="flex justify-between items-center relative font-gilroy mb-5">
      <h1 data-aos="fade-right" className="text-2xl font-medium leading-8">
        &apos; {id} &apos; sualında xətalar
      </h1>

      <div className="w-[20%] flex items-center bg-bodyColor border border-inputBorder rounded-lg px-3 py-2 focus-within:border-inputRingFocus overflow-hidden ">
        <LuSearch className="text-inputPlaceholderText size-6 flex-shrink-0" />
        <input
          type="text"
          placeholder="Axtar"
          className="ml-2 w-full text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2"
        />
      </div>
    </div>
  );
}

export default ReportSingleNavigationTitle;
