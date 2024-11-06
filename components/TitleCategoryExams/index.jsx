import { useRouter } from "next/router";
import React from "react";
import { FaAngleRight } from "react-icons/fa";

function TitleCategoryExams({categoryName , combinedList}) {
  const router = useRouter();
  const handleSeeAllClick = () => {
    const categoryItem = combinedList.find((item) => item.name === categoryName);
    if (categoryItem && categoryItem.slug) {
      router.push(`/kateqoriyalar/${categoryItem.slug}`);
    } else {
      console.warn("Slug not found for category:", categoryName);
    }
  };
  


  console.log(categoryName, "categoryName");
  
  return (
    <div className="flex items-center justify-between py-5">
      <h5 className="font-gilroy font-medium leading-normal text-3xl text-textSecondaryDefault">
      {categoryName}
      </h5>
      <button       onClick={handleSeeAllClick} className="flex items-center justify-center font-gilroy text-base font-normal leading-6 text-textSecondaryDefault">
        Hamısını gör
        <FaAngleRight className="size-5 text-xl text-textSecondaryDefault fill-textSecondaryDefault" />
      </button>
    </div>
  );
}

export default TitleCategoryExams;
