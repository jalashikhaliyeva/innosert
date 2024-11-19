// ExamEndSuccess.jsx
import React from "react";
import ProgressPieChart from "../ProgressPieChart";
import Image from "next/image";
import { useRouter } from "next/router";

function ExamEndSuccess({ percentage }) {
  const router = useRouter();

  return (
    <div className="py-10 px-6 sm:px-10 md:px-20 lg:px-40 mt-16 bg-white shadow-Cardshadow flex flex-col justify-center w-[90%] sm:w-[85%] md:w-[75%] mx-auto rounded-lg">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-medium font-gilroy text-textSecondaryDefault mb-6 sm:mb-8 md:mb-10">
        Təbriklər! Imtahanı uğurla keçdiniz.
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="flex flex-col items-center">
            <ProgressPieChart
              correct={percentage.correct}
              wrong={percentage.wrong}
              blank={percentage.blank}
            />
            <p className="font-gilroy text-grayText text-lg sm:text-xl leading-6 sm:leading-8 font-medium text-center mt-2">
              Müvəffəqiyət faizi
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4">
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <p className="font-gilroy text-base sm:text-lg leading-5 sm:leading-6 text-gray90">
                Düz sualların sayı
              </p>
              <h5 className="font-gilroy text-base sm:text-lg font-medium text-chartGreen">
                {percentage.correct}
              </h5>
            </div>

            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <p className="font-gilroy text-base sm:text-lg leading-5 sm:leading-6 text-gray90">
                Səhv sualların sayı
              </p>
              <h5 className="font-gilroy text-base sm:text-lg font-medium text-chartRed">
                {percentage.wrong}
              </h5>
            </div>

            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <p className="font-gilroy text-base sm:text-lg leading-5 sm:leading-6 text-gray90">
                Boş sualların sayı
              </p>
              <h5 className="font-gilroy text-base sm:text-lg font-medium text-chartYellow">
                {percentage.blank}
              </h5>
            </div>
          </div>
        </div>

        {/* Vertical Line */}
        <div className="hidden md:block w-px h-52 bg-gray-200 mx-auto"></div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-[250px] h-[150px] sm:w-[300px] sm:h-[200px] relative">
            <Image
              src="/img/Sertifikat1.png"
              layout="fill"
              objectFit="cover"
              alt="Certificate"
              className="object-cover border rounded-md cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={() => router.push(`/sertifikatlarim/1`)}
            />
          </div>

          <button
            onClick={() => router.push(`/sertifikatlarim/1`)}
            className="flex text-center justify-center items-center font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary rounded-lg gap-2 py-2 px-4 sm:px-5 text-base sm:text-lg text-white w-full"
          >
            Sertifikatı əldə et
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.6714 10.9832L8.63038 21.0243L6.98047 19.3744L17.0215 9.33333H8.17142V7H21.0047V19.8333H18.6714V10.9832Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamEndSuccess;
