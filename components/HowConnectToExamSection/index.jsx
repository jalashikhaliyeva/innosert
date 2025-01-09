import React from "react";
import Container from "../Container";

function HowConnectToExamSection(props) {
  console.log(props.data, " ata HowConnectToExamSection");

  return (
    <div>
      <h2
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
        className="font-gilroy text-textSecondaryDefault text-2xl md:text-4xl font-medium text-center mt-20 mb-10"
      >
        İmtahanda necə iştirak edim?
      </h2>
      <Container>
        <div className="bg-blue200 flex flex-col lg:flex-row items-center justify-center gap-5 lg:py-20 lg:px-36 px-10 py-10 rounded-xl">
          {props?.data?.map((item, index) => (
            <div
              key={item.id}
              className="w-full p-5 bg-grayBox  flex flex-col gap-7 rounded-md"
            >
              <div className="bg-inputBgHover text-red500 w-10 h-10 flex items-center justify-center rounded-lg text-xl font-gilroy">
                {`0${index + 1}`}
              </div>
              <div>
                <h4 className="text-darkBlue font-medium text-2xl">
                  {item.title}
                </h4>
                <p
                  className="text-grayText leading-6 mt-3"
                  dangerouslySetInnerHTML={{ __html: item.desc }}
                />
                <div
                  className="relative w-48 h-52 bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute bg-brandBlue500 inset-0 mix-blend-hue" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HowConnectToExamSection;
