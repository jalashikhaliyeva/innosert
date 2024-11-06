import React from "react";

function GeneralInfo({ examDetailsSingle }) {
  console.log(examDetailsSingle, "examDetailsSingle general");

  // Parse the category JSON string into an array
  const categories = examDetailsSingle?.category
    ? JSON.parse(examDetailsSingle.category)
    : [];

  return (
    <div className="bg-white rounded-xl flex flex-col p-8 shadow-createBox mt-3">
      <h1 className="font-gilroy text-black text-2xl font-medium leading-8 mb-3">
        {examDetailsSingle?.name}
      </h1>
      <p className="font-gilroy text-grayText tracking-036 text-lg">
        {examDetailsSingle?.desc}
      </p>
      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center items-center lg:items-baseline">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            Ayrılan vaxt
          </h4>
          <p className="font-gilroy text-lg tracking-036 text-grayButtonText">
            {examDetailsSingle?.duration}
          </p>
        </div>
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center items-center lg:items-baseline">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            Qiyməti
          </h4>
          <p className="font-gilroy text-lg tracking-036 text-grayButtonText">
            {examDetailsSingle?.price} ₼
          </p>
        </div>
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center items-center lg:items-baseline">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            İmtahan növü
          </h4>
          <p className="font-gilroy text-lg tracking-036 text-grayButtonText">
            {examDetailsSingle?.code
              ? `Kod ilə ${examDetailsSingle.code}`
              : "Kodsuz"}
          </p>
        </div>
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center items-center lg:items-baseline">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            Kateqoriyalar
          </h4>

          <div className="flex flex-row gap-2">
            {categories.map((category, index) => (
              <p
                key={index}
                className="font-gilroy text-lg tracking-036 text-textSecondaryDefault rounded-md bg-purple200 px-4 py-2"
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
