import React from "react";
import ProgressPieChart from "../ProgressPieChart";

function CardResult() {
  return (
    <div className="flex flex-row flex-wrap gap-4 mb-10">
    <div className="p-5 w-full md:w-[29.2%] bg-white rounded-xl border border-buttonGhostPressed">
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-10 object-contain "
          src="/img/handexLogo.png"
          alt="company-logo"
        />
        <h4 className="font-gilroy text-base font-normal leading-6 text-grayText70">
          Handex
        </h4>
      </div>
      <div className="font-gilroy text-xl font-medium pb-6">
        A/B Testing aparılması
      </div>
      <div className="flex  flex-col items-center justify-center">
        <p className="font-gilroy text-xl text-grayButtonText font-normal leading-6">
          {" "}
          1 avq, 2024
        </p>
        <ProgressPieChart />
      </div>
      <div>
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              25
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartGreen bg-chartGreen rounded-full"></p>
              <p>Düz</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              4
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartRed bg-chartRed rounded-full"></p>
              <p>Səhv</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              1
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartYellow bg-chartYellow rounded-full"></p>
              <p>Boş</p>
            </div>
          </div>
        </div>
        {/* <button className="w-full mt-3 rounded-lg py-3 px-4 bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed font-gilroy text-base font-normal leading-6 text-grayButtonText">
          Nəticənə ətraflı bax
        </button> */}
      </div>
    </div>
    <div className="p-5 w-full md:w-[29.2%] bg-white rounded-xl border border-buttonGhostPressed">
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-10 object-contain "
          src="/img/handexLogo.png"
          alt="company-logo"
        />
        <h4 className="font-gilroy text-base font-normal leading-6 text-grayText70">
          Handex
        </h4>
      </div>
      <div className="font-gilroy text-xl font-medium pb-6">
        A/B Testing aparılması
      </div>
      <div className="flex  flex-col items-center justify-center">
        <p className="font-gilroy text-xl text-grayButtonText font-normal leading-6">
          {" "}
          1 avq, 2024
        </p>
        <ProgressPieChart />
      </div>
      <div>
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              25
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartGreen bg-chartGreen rounded-full"></p>
              <p>Düz</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              4
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartRed bg-chartRed rounded-full"></p>
              <p>Səhv</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              1
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartYellow bg-chartYellow rounded-full"></p>
              <p>Boş</p>
            </div>
          </div>
        </div>
        {/* <button className="w-full mt-3 rounded-lg py-3 px-4 bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed font-gilroy text-base font-normal leading-6 text-grayButtonText">
          Nəticənə ətraflı bax
        </button> */}
      </div>
    </div>
    <div className="p-5 w-full md:w-[29.2%] bg-white rounded-xl border border-buttonGhostPressed">
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-10 object-contain "
          src="/img/handexLogo.png"
          alt="company-logo"
        />
        <h4 className="font-gilroy text-base font-normal leading-6 text-grayText70">
          Handex
        </h4>
      </div>
      <div className="font-gilroy text-xl font-medium pb-6">
        A/B Testing aparılması
      </div>
      <div className="flex  flex-col items-center justify-center">
        <p className="font-gilroy text-xl text-grayButtonText font-normal leading-6">
          {" "}
          1 avq, 2024
        </p>
        <ProgressPieChart />
      </div>
      <div>
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              25
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartGreen bg-chartGreen rounded-full"></p>
              <p>Düz</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              4
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartRed bg-chartRed rounded-full"></p>
              <p>Səhv</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              1
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartYellow bg-chartYellow rounded-full"></p>
              <p>Boş</p>
            </div>
          </div>
        </div>
        {/* <button className="w-full mt-3 rounded-lg py-3 px-4 bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed font-gilroy text-base font-normal leading-6 text-grayButtonText">
          Nəticənə ətraflı bax
        </button> */}
      </div>
    </div>
    <div className="p-5 w-full md:w-[29.2%] bg-white rounded-xl border border-buttonGhostPressed">
      <div className="flex flex-row items-center gap-2">
        <img
          className="size-10 object-contain "
          src="/img/handexLogo.png"
          alt="company-logo"
        />
        <h4 className="font-gilroy text-base font-normal leading-6 text-grayText70">
          Handex
        </h4>
      </div>
      <div className="font-gilroy text-xl font-medium pb-6">
        A/B Testing aparılması
      </div>
      <div className="flex  flex-col items-center justify-center">
        <p className="font-gilroy text-xl text-grayButtonText font-normal leading-6">
          {" "}
          1 avq, 2024
        </p>
        <ProgressPieChart />
      </div>
      <div>
        <div className="flex flex-row gap-5 items-center justify-center">
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              25
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartGreen bg-chartGreen rounded-full"></p>
              <p>Düz</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              4
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartRed bg-chartRed rounded-full"></p>
              <p>Səhv</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="flex items-center justify-center font-gilroy font-base tracking-036 text-textSecondaryDefault">
              1
            </p>
            <div className="flex flex-row items-center justify-center gap-2">
              <p class="w-4 h-4 border-2 border-chartYellow bg-chartYellow rounded-full"></p>
              <p>Boş</p>
            </div>
          </div>
        </div>
        {/* <button className="w-full mt-3 rounded-lg py-3 px-4 bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed font-gilroy text-base font-normal leading-6 text-grayButtonText">
          Nəticənə ətraflı bax
        </button> */}
      </div>
    </div>
    </div>
  );
}

export default CardResult;
