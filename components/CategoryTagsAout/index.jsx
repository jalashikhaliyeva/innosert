import React from "react";

function CategoryTagsAbout({ examData }) {
  // Parse the category string into an array
  const categories = JSON.parse(examData.exam.category);

  return (
    <div className="flex-1 overflow-hidden relative">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-row flex-wrap gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex items-center gap-3 bg-grayLineFooter text-textSecondaryDefault rounded-full px-5 py-2 font-gilroy font-normal text-lg leading-6"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryTagsAbout;
