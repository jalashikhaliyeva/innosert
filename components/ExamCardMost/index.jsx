import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function ExamCardMost({ data }) {
  const router = useRouter();

  // Parse categories if they are stored as a JSON string
  let categories = [];
  try {
    categories = JSON.parse(data.category);
  } catch (error) {
    console.error("Error parsing categories:", error);
  }

  const handleClick = () => {
    router.push(`/etrafli/${data.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[310px] h-[260px] px-5 py-8 flex flex-col justify-between bg-[url('/img/certificare-frame.png')] border-2 border-buttonSecondaryDisabled cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex justify-end">
        <Image
          src="/img/Badge.png"
          alt="Exam Badge"
          className="rounded-full"
          width={37}
          height={37}
        />
      </div>
      <div className="pb-6">
        <div className="flex gap-2">
          <Image
            src={data.company_logo || "/img/handexLogo.png"}
            alt={`${data.company} logo`}
            width={40}
            height={40}
            className="object-contain rounded-full"
          />
          <h3 className="font-gilroy text-base text-grayText70">
            {data.company}
          </h3>
        </div>
        <p className="pt-2.5 font-gilroy text-xl leading-8 text-textSecondaryDefault font-medium">
          {data.name}
        </p>
        {/* <p className="text-sm text-grayText70">{data.desc}</p> */}
        {/* Optionally display categories */}
        {/* {categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {categories.map((category, idx) => (
              <span
                key={idx}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )} */}
      </div>
      <div className="flex justify-end">
        <Image
          src="/logo/dark-logo-innosert.png"
          alt="innosert logo"
          width={53}
          height={17}
        />
      </div>
    </div>
  );
}

export default ExamCardMost;
