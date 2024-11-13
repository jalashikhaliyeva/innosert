import React from "react";
import Slider from "./Slider"; // Adjust the path based on your project structure
import { useTranslation } from "react-i18next";

function MostViwedExams({mostViewedExams}) {
  const { t } = useTranslation();
  console.log(mostViewedExams, "mostViewedExams");
  const data = mostViewedExams
  // const data = [
  //   { id: 1, image: "/img/Sertifikat1.png" },
  //   { id: 2, image: "/img/Sertifikat1.png" },
  //   { id: 3, image: "/img/Sertifikat1.png" },
  //   // Add more slides if needed
  // ];

  return (
    <div className="hidden lg:block w-[40%] ">
      <h3 className="font-gilroy text-3xl leading-normal font-medium pb-8">{t('most_viewed_exams')}</h3>
      <Slider data={data} />
    </div>
  );
}

export default MostViwedExams;
