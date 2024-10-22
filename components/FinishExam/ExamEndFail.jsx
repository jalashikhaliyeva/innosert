import React from "react";
import ProgressPieChart from "../ProgressPieChart";
import Image from "next/image";
import { useRouter } from "next/router";

function ExamEndFail() {
  const router = useRouter();

  return (
    <div className="py-10 px-40 mt-16 bg-white shadow-Cardshadow flex flex-col justify-center w-[75%] mx-auto rounded-lg">
      <h2 className="text-4xl text-center font-medium font-gilroy text-textSecondaryDefault mb-10">
        Təəssüf ki, imtahandan keçmədiniz.
      </h2>

      <div className="flex flex-col items-center justify-center">
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

        <span className="border-b border-gray-200"></span>

        <div className="flex flex-col justify-center items-center mt-10">
          <p className="font-gilroy text-lg text-gray90 font-normal leading-6 mb-5">
            Bu imtahanı yenidən keçmək fürsətiniz var. Daha yaxşı nəticələr əldə
            etmək üçün çalışmaq və təkrar imtahan vermək üçün şansınızı
            dəyərləndirin. Qeyd edək ki, yenidən imtahanda iştirak ödənişlidir.
          </p>

          <button
            onClick={() => router.push(`/home`)}
            className="flex text-center justify-center items-center font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary rounded-lg gap-2 py-2 px-5 text-lg text-white w-[40%]"
          >
            Imtahana yeniden daxil ol
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamEndFail;
