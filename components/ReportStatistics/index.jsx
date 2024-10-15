import React from "react";

function ReportStatistics() {
  return (
    <div className="flex flex-row gap-3">
      <div className="border border-inputBorder p-6 rounded-2xl backdrop-blur-custom flex items-center flex-col">
        <h4 className="font-gilroy text-grayButtonText font-medium text-base leading-6 ">
          Toplam gəlir
        </h4>
        <h6 className="text-chartGreen leading-8 font-gilroy text-2xl font-medium mt-2">
          50$
        </h6>
      </div>
      <div className="border border-inputBorder p-6 rounded-2xl backdrop-blur-custom flex items-center flex-col">
        <h4 className="font-gilroy text-grayButtonText font-medium text-base leading-6 ">
        İştirakçı sayı
        </h4>
        <h6 className="text-chartGreen leading-8 font-gilroy text-2xl font-medium mt-2">
          20
        </h6>
      </div>
      <div className="border border-inputBorder p-6 rounded-2xl backdrop-blur-custom flex items-center flex-col">
        <h4 className="font-gilroy text-grayButtonText font-medium text-base leading-6 ">
        İmatahnlar
        </h4>
        <h6 className="text-chartGreen leading-8 font-gilroy text-2xl font-medium mt-2">
          70
        </h6>
      </div>
      <div className="border border-inputBorder p-6 rounded-2xl backdrop-blur-custom flex items-center flex-col">
        <h4 className="font-gilroy text-grayButtonText font-medium text-base leading-6 ">
        Sertifikatlar
        </h4>
        <h6 className="text-chartGreen leading-8 font-gilroy text-2xl font-medium mt-2">
          34
        </h6>
      </div>
      <div className="border border-inputBorder p-6 rounded-2xl backdrop-blur-custom flex items-center flex-col">
        <h4 className="font-gilroy text-grayButtonText font-medium text-base leading-6 ">
        Uğursuz ödənişıər
        </h4>
        <h6 className="text-red400 leading-8 font-gilroy text-2xl font-medium mt-2">
          20
        </h6>
      </div>
    </div>
  );
}

export default ReportStatistics;
