import React from "react";
import Container from "../Container";

function HowConnectToExamSection() {
  return (
    <>
      <h2 className="font-gilroy text-textSecondaryDefault text-4xl font-medium text-center mt-20 mb-10">
        Imtahanda necə iştirak edim?
      </h2>
      <Container>
        <div className="bg-textHoverBlue flex items-center justify-center gap-5 py-20 px-36 rounded-xl">
          <div className="w-[27%] p-5 bg-grayBox flex flex-col gap-7 rounded-md">
            <div
              className=" bg-grayTextColor
              text-textHoverBlue
              w-9
              h-9
              flex
              items-center
              justify-center
              rounded-lg
            text-xl
            font-gilroy
              "
            >
              01
            </div>
            <div>
              <h4 className="text-darkBlue font-medium text-2xl">
                Hesab yarat
              </h4>
              <p className="text-grayText leading-6 mt-3">
                Lorem ipsum dolor sit amet consectetur. Vel dignissim sed vitae
                sem.
              </p>

              <div className=" relative w-48 h-48 bg-[url('/gif/exam1.gif')] bg-center bg-cover bg-no-repeat">
                <div className="absolute bg-gifBlue inset-0 mix-blend-hue" />
              </div>
            </div>
          </div>
          <div className="w-[27%] p-5 bg-grayBox flex flex-col gap-7 rounded-md">
            <div className="bg-grayTextColor     text-xl  font-gilroy text-textHoverBlue w-9 h-9 flex items-center justify-center rounded-lg">
              02
            </div>
            <div>
              <h4 className="text-darkBlue font-medium text-2xl">
                İmtahana daxil ol
              </h4>
              <p className="text-grayText leading-6 mt-3">
                Lorem ipsum dolor sit amet consectetur. Vel dignissim sed vitae
                sem.
              </p>
              <div className=" relative w-48 h-48 bg-[url('/gif/exam2.gif')] bg-center bg-cover bg-no-repeat">
                <div className="absolute bg-gifBlue inset-0 mix-blend-hue" />
              </div>
            </div>
          </div>
          <div className="w-[27%] p-5 bg-grayBox flex flex-col gap-7 rounded-md">
            <div
              className="bg-grayTextColor
              text-textHoverBlue
              w-9
              h-9
              flex
              text-xl
              items-center
              justify-center
              rounded-lg
               font-gilroy"
            >
              03
            </div>
            <div>
              <h4 className="text-darkBlue font-medium text-2xl">
                Sertifikatını əldə et!
              </h4>
              <p className="text-grayText leading-6 mt-3">
                Lorem ipsum dolor sit amet consectetur. Vel dignissim sed vitae
                sem.
              </p>

              <div className=" relative w-48 h-48 bg-[url('/gif/exam3.gif')] bg-center bg-cover bg-no-repeat">
                <div className="absolute bg-gifBlue inset-0 mix-blend-hue" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HowConnectToExamSection;
