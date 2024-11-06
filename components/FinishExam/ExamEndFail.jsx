import React from "react";
import ProgressPieChart from "../ProgressPieChart";
import Image from "next/image";
import { useRouter } from "next/router";

function ExamEndFail({ percentage }) {
  const router = useRouter();

  return (
    <div className="py-10 px-5 md:px-20 lg:px-40 mt-16 bg-white shadow-Cardshadow flex flex-col justify-center w-[90%] sm:w-[75%] mx-auto rounded-lg">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-medium font-gilroy text-textSecondaryDefault mb-5 sm:mb-10">
        Təəssüf ki, imtahandan keçmədiniz.
      </h2>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col items-center">
            <ProgressPieChart percentage={percentage.percentage}  />
            <p className="font-gilroy text-grayText text-lg sm:text-xl leading-8 font-medium text-center">
              Müvəffəqiyət faizi
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-gilroy text-sm sm:text-lg leading-6 text-gray90">
                Düz cavabların sayı
              </p>
              <h5 className="font-gilroy text-sm sm:text-lg font-medium text-chartGreen">
                {percentage.correct}
              </h5>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="font-gilroy text-sm sm:text-lg leading-6 text-gray90">
                Səhv cavabların sayı
              </p>
              <h5 className="font-gilroy text-sm sm:text-lg font-medium text-chartRed">
              {percentage.wrong}
              </h5>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="font-gilroy text-sm sm:text-lg leading-6 text-gray90">
                Boş cavabların sayı
              </p>
              <h5 className="font-gilroy text-sm sm:text-lg font-medium text-chartYellow">
                1
              </h5>
            </div>
          </div>
        </div>

        <span className="border-b border-gray-200 w-full mt-5 md:mt-10"></span>

        <div className="flex flex-col justify-center items-center mt-5 md:mt-10 px-4">
          <p className="font-gilroy text-sm sm:text-lg text-gray90 font-normal leading-6 mb-5 text-center">
            Bu imtahanı yenidən keçmək fürsətiniz var. Daha yaxşı nəticələr əldə
            etmək üçün çalışmaq və təkrar imtahan vermək üçün şansınızı
            dəyərləndirin. Qeyd edək ki, yenidən imtahanda iştirak ödənişlidir.
          </p>

          <button
            onClick={() => router.push(`/home`)}
            className="flex text-center justify-center items-center font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary rounded-lg gap-2 py-2 px-5 text-sm sm:text-lg text-white w-full sm:w-[60%] md:w-[40%]"
          >
            Imtahana yeniden daxil ol
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamEndFail;
