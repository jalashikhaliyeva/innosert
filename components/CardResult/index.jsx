import React from "react";
import ProgressPieChart from "../ProgressPieChart";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ProgressPieChartResults from "../ProgressPieChartResults";

function CardResult({ data }) {
  console.log(data, "data result");

  const router = useRouter();
  const { t } = useTranslation();

  const handleExamClick = () => {
    router.push(`/etrafli/${data.exam_slug}`);
  };

  return (
    <div className="p-5 w-full md:w-[29.2%] bg-white rounded-xl border border-buttonGhostPressed min-h-[350px]">
      {/* Card Content */}
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-10 object-contain rounded-2xl"
          src={data.company_logo}
          alt="company-logo"
        />
        <h4 className="font-gilroy text-base font-normal leading-6 text-grayText70">
          {data.company}
        </h4>
      </div>
      <div
        onClick={handleExamClick}
        className="font-gilroy text-xl font-medium pb-6 mt-3 cursor-pointer relative"
      >
        <span className="relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-blue-200 after:transition-all after:duration-300 hover:after:w-full">
          {data.exam}
        </span>
        {data.percentage === 0 &&
          data.totalScore === 0 &&
          data.wrong === 0 &&
          data.correct === 0 && (
            <p className="font-gilroy text-sm text-inputRingError font-normal leading-6">
              {t("terms.excluded")}
            </p>
          )}
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="font-gilroy text-xl text-grayButtonText font-normal leading-6">
          {data.created_at}
        </p>
        <ProgressPieChartResults
          correct={data.correct}
          wrong={data.wrong}
          empty={data.blank}
        />
      </div>
      <div>
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              {data.correct}
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="w-4 h-4 border-2 border-chartGreen bg-chartGreen rounded-full"></p>
              <p>{t("terms.correct")}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              {data.wrong}
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="w-4 h-4 border-2 border-chartRed bg-chartRed rounded-full"></p>
              <p>{t("terms.wrong")}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              {data.blank}
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p className="w-4 h-4 border-2 border-chartYellow bg-chartYellow rounded-full"></p>
              <p>{t("terms.empty")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardResult;
