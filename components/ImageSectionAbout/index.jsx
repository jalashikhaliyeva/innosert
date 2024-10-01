import React from "react";
import Container from "../Container";

function ImageSectionAbout(props) {
  console.log(props, "props");
  
  return (
    <div
      className="bg-slate-600 mt-20"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 10, 51, 0.50) 0%, rgba(0, 10, 51, 0.25) 29.5%, rgba(0, 10, 51, 0.00) 100%), url(${props.aboutInfo?.about?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div className="flex flex-col justify-center h-[300px] md:h-[400px] lg:h-[600px] object-cover">
          <h1 data-aos="flip-up" className="font-gilroy text-3xl  sm:text-4xl  md:text-5xl  font-medium leading-lead55 text-grayBox">
          {props.aboutInfo?.about?.title}
          </h1>
        </div>
      </Container>
    </div>
  );
}

export default ImageSectionAbout;
