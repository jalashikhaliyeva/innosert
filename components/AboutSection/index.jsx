import React from "react";
import Container from "../Container";

const AboutSection = ({ aboutInfo }) => {
  console.log(aboutInfo?.details, "AboutSection details");

  if (!aboutInfo || !Array.isArray(aboutInfo.details)) {
    return <p>No details provided.</p>; // Handle undefined or invalid aboutInfo
  }

  return (
    <div>
      {/* First Section: Biz kimik? */}
      <div  className="w-full">
        <Container>
          <div data-aos="fade-right" className="flex flex-col md:flex-row py-16">
            <h2  className="text-2xl  sm:text-3xl font-gilroy font-medium leading-normal text-textSecondaryDefault md:w-1/3">
              {aboutInfo.details[0]?.title}
            </h2>
            <div
              className="md:w-2/3 text-textSecondaryDefault font-gilroy text-base sm:text-lg not-italic tracking-036"
              dangerouslySetInnerHTML={{ __html: aboutInfo.details[0]?.desc }}
            />
          </div>
        </Container>
      </div>

      {/* Second Section: Missiyamız */}
      <div  className="w-full bg-brandBlue500 text-white py-16">
        <Container>
          <div data-aos="fade-left" className="flex flex-col md:flex-row">
            <h2 className="text-2xl  sm:text-3xl  font-medium font-gilroy md:w-1/3">
              {aboutInfo.details[1]?.title}
            </h2>
            <div
              className="md:w-2/3 font-gilroy text-base  sm:text-lg text-grayBox tracking-036 font-normal"
              dangerouslySetInnerHTML={{ __html: aboutInfo.details[1]?.desc }}
            />
          </div>
        </Container>
      </div>

      {/* Third Section: Dəyərlərimiz */}
      <div  className="w-full bg-[#F5F5F5]">
        <Container>
          <div data-aos="fade-right" className="flex flex-col md:flex-row py-16">
            <h2 className="text-2xl  sm:text-3xl  font-medium font-gilroy text-brandBlue500 md:w-1/3">
              {aboutInfo.details[2]?.title}
            </h2>
            <div
              className="md:w-2/3 text-textSecondaryDefault font-gilroy text-base  sm:text-lg not-italic tracking-036"
              dangerouslySetInnerHTML={{ __html: aboutInfo.details[2]?.desc }}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AboutSection;
