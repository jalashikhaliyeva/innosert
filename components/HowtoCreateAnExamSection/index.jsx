import React from "react";
import Container from "../Container";
import { FaRegUserCircle } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { RiShare2Line } from "react-icons/ri";
import { PiExam } from "react-icons/pi";

function HowtoCreateAnExamSection() {
  return (
    <>
      <Container>
        <h3 className="font-gilroy text-textSecondaryDefault text-center font-medium text-4xl pt-7 pb-10">
          Imtahan necə yaradım?
        </h3>

        <div className="flex items-center justify-center flex-wrap gap-5 pb-14">
          <div className="bg-white p-5 flex gap-5 w-[37%] rounded-lg shadow-createBox">
            <FaRegUserCircle className="w-8 h-8 fill-textHoverBlue" />
            <div>
              <h6 className="pb-3 font-gilroy text-2xl font-medium">
                Hesab yarat
              </h6>
              <p className="font-gilroy text-grayText font-normal tracking-036">
                Lorem ipsum dolor sit amet consectetur. Convallis diam cursus
                praesent mauris ante facilisi.
              </p>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-5 w-[37%] rounded-lg">
            <BsBuildings className="w-8 h-8 fill-textHoverBlue" />
            <div>
              <h6 className="pb-3 font-gilroy text-2xl font-medium">
                Şirkət yarat
              </h6>
              <p className="font-gilroy text-grayText font-normal tracking-036">
                Lorem ipsum dolor sit amet consectetur. Convallis diam cursus
                praesent mauris ante facilisi.
              </p>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-5 w-[37%] rounded-lg">
            <PiExam className="w-8 h-8 fill-textHoverBlue" />
            <div>
              <h6 className="pb-3 font-gilroy text-2xl font-medium">
                İmtahan yarat
              </h6>
              <p className="font-gilroy text-grayText font-normal tracking-036">
                Lorem ipsum dolor sit amet consectetur. Convallis diam cursus
                praesent mauris ante facilisi.
              </p>
            </div>
          </div>
          <div className="bg-white p-5 flex gap-5 w-[37%] rounded-lg">
            <RiShare2Line className="w-8 h-8 fill-textHoverBlue" />
            <div>
              <h6 className="pb-3 font-gilroy text-2xl font-medium">Paylaş</h6>
              <p className="font-gilroy text-grayText font-normal tracking-036">
                Lorem ipsum dolor sit amet consectetur. Convallis diam cursus
                praesent mauris ante facilisi.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HowtoCreateAnExamSection;
