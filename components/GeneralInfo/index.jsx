import React from "react";

function GeneralInfo() {
  return (
    <div className="bg-white rounded-xl flex flex-col p-8 shadow-createBox mt-3">
      <h1 className="font-gilroy text-black text-2xl font-medium leading-8 mb-3">
        MOSE
      </h1>
      <p className="font-gilroy text-grayText  tracking-036 text-lg">
        Lorem ipsum dolor sit amet consectetur. Metus cursus velit molestie
        turpis pulvinar sit interdum pharetra. Posuere ut quam netus id est ut
        integer viverra scelerisque. Netus laoreet vulputate rhoncus nec tortor
        suspendisse velit ornare.Metus cursus velit molestie turpis pulvinar sit
        interdum pharetra.
      </p>
      <div className="flex flex-row gap-8 mt-6">
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            Ayrılan vaxt
          </h4>
          <p className="font-gilroy text-lg tracking-036 text-grayButtonText">
            60 san
          </p>
        </div>
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            Qiyməti
          </h4>
          <p className="font-gilroy text-lg tracking-036 text-grayButtonText">
            60$
          </p>
        </div>
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            İmtahan növü
          </h4>
          <p className="font-gilroy text-lg tracking-036 text-grayButtonText">
            Kod ilə ( MY13HS64 )
          </p>
        </div>
        <div className="bg-boxGrayBodyColor py-3 px-6 rounded-lg flex flex-col gap-2 justify-center">
          <h4 className="font-gilroy text-textSecondaryDefault tracking-036 text-lg">
            Kateqoriyalar
          </h4>

          <div className="flex flex-row gap-2">
            <p className="font-gilroy text-lg tracking-036 text-textSecondaryDefault rounded-md bg-purple200 px-4 py-2">
              Data
            </p>
            <p className="font-gilroy text-lg tracking-036 text-textSecondaryDefault rounded-md bg-purple200 px-4 py-2">
              Excell
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo;
