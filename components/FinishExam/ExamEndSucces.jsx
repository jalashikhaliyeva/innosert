import React from "react";
import ProgressPieChart from "../ProgressPieChart";
import Image from "next/image";
import { useRouter } from "next/router";

function ExamEndSuccess() {
  const router = useRouter();

  return (
    <div className="py-10 px-40 mt-16 bg-white shadow-Cardshadow flex flex-col justify-center w-[75%] mx-auto rounded-lg">
      <h2 className="text-4xl text-center font-medium font-gilroy text-textSecondaryDefault mb-10">
        Təbriklər! Imtahanı uğurla keçdiniz.
      </h2>

      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col items-center">
            <ProgressPieChart />
            <p className="font-gilroy text-grayText text-xl leading-8 font-medium text-center">
              Müvəffəqiyət faizi
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-gilroy text-lg leading-6 text-gray90">
                Düz sualların sayı
              </p>
              <h5 className="font-gilroy text-lg font-medium text-chartGreen">
                25
              </h5>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="font-gilroy text-lg leading-6 text-gray90">
                Səhv sualların sayı
              </p>
              <h5 className="font-gilroy text-lg font-medium text-chartRed">
                4
              </h5>
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="font-gilroy text-lg leading-6 text-gray90">
                Boş sualların sayı
              </p>
              <h5 className="font-gilroy text-lg font-medium text-chartYellow">
                1
              </h5>
            </div>
          </div>
        </div>

        {/* Vertical Line */}
        <div className="w-px h-72 bg-gray-200 mx-auto"></div>

        <div className="flex flex-col items-center gap-4">
          <div className="w-[300px] h-[200px] relative">
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
            className="flex text-center justify-center items-center font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary rounded-lg gap-2 py-2 px-5 text-lg text-white w-full"
          >
            Sertifikatı əldə et
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
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
