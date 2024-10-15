import React from "react";
import Container from "../Container";

function HowtoCreateAnExamSection({ data }) {
  console.log(data, "CreateAnExamSection");
  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <div className="py-8">
      <Container>
        <h3  data-aos="fade-up"
    data-aos-anchor-placement="center-bottom"  className="font-gilroy text-textSecondaryDefault text-center font-medium text-2xl md:text-4xl pt-7 pb-10">
          Imtahanı necə yaradım?
        </h3>

        <div className=" flex flex-col lg:flex-row items-center justify-center flex-wrap gap-5 pb-14">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 flex gap-5 lg:w-[37%]  w-full rounded-lg shadow-createBox"
            >
              {/* Replace the hardcoded icon with the image from the API */}
              <img src={item.image} alt={item.title} className="w-10 h-8 " />
              <div>
                <h6 className="pb-3 font-gilroy text-2xl font-medium">
                  {item.title}
                </h6>
                <p className="font-gilroy text-grayText font-normal tracking-036">
                  {stripHtml(item.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HowtoCreateAnExamSection;
