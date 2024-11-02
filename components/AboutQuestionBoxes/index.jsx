import React from "react";

function AboutQuestionBoxes({ selectedQuestion }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex flex-col gap-2 bg-white shadow-createBox items-center justify-center p-3 rounded-lg">
        <h4 className="font-gilroy text-base text-footerGrayText leading-6 font-normal">
          Sualın xalı
        </h4>
        <p className="font-gilroy text-darkBlue100 text-xl leading-6">
          {selectedQuestion?.score}
        </p>
      </div>

      {selectedQuestion?.duration && (
        <div className="flex flex-col gap-2 bg-white shadow-createBox items-center justify-center p-3 rounded-lg">
          <h4 className="font-gilroy text-base text-footerGrayText leading-6 font-normal">
            Sualın vaxtı
          </h4>
          <p className="font-gilroy text-darkBlue100 text-xl leading-6">
            {selectedQuestion.duration} sn
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 bg-white shadow-createBox items-center justify-center p-3 rounded-lg">
        <h4 className="font-gilroy text-base text-footerGrayText leading-6 font-normal">
          Çətinlik dərəcəsi
        </h4>
        <p className="font-gilroy text-darkBlue100 text-lg leading-6">
          {selectedQuestion?.level}
        </p>
      </div>
      <div className="flex flex-col gap-2 bg-white shadow-createBox items-center justify-center p-3 rounded-lg">
        <h4 className="font-gilroy text-base text-footerGrayText leading-6 font-normal">
        Sualın növü
        </h4>
        <p className="font-gilroy text-darkBlue100 text-md leading-6">
          {selectedQuestion?.type}
        </p>
      </div>
    </div>
  );
}

export default AboutQuestionBoxes;
