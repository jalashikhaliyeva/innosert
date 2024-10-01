import React from "react";

function CategoryTagsAbout() {
  return (
    <>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-4">
          <div className="flex flex-row gap-2">
            <button className="flex items-center gap-3 bg-grayLineFooter text-textSecondaryDefault rounded-full px-5 py-2 font-gilroy font-normal text-lg leading-6">
              Category
            </button>
            <button className="flex items-center gap-3 bg-grayLineFooter text-textSecondaryDefault rounded-full px-5 py-2 font-gilroy font-normal text-lg leading-6">
              Category
            </button>
            <button className="flex items-center gap-3 bg-grayLineFooter text-textSecondaryDefault rounded-full px-5 py-2 font-gilroy font-normal text-lg leading-6">
              Category
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryTagsAbout;
