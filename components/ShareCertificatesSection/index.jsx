import React from "react";
import Container from "../Container";
import Button from "../Button";

function ShareCertificatesSection() {
  return (
    <div className="bg-brandBlue relative overflow-hidden">
      <Container>
        <div className="relative flex flex-col justify-center h-[373px] w-[527px]">
          <h2 className="text-white text-4xl mb-3.5">
            Əldə etdiyin sertifikatları profildə paylaş
          </h2>
          <p className="text-grayTextColor text-lg mb-16 text-">
            Lorem ipsum dolor sit amet consectetur. Lorem consequat venenatis
            nunc convallis
          </p>
          <Button
            color="var(--buttonTextWhite)"
            hoverColor="var(--buttonWhiteHover)"
            pressedColor="var(--buttonWhitePressed)"
            disabledColor="var(--buttonSecondaryDisabled)"
            textColor="var(--buttonWhiteTextBlue)"
            disabledTextColor="var(--buttonTextSecondaryDisabled)"
            width="199px"
            height="48px"
            borderRadius="8px"
            fontFamily="var(--fontGilroy)"
          >
            Başla
          </Button>
        </div>
      </Container>
      <div
        style={{
          top: "50%",
          right: "30%",
          transform: "translateY(-50%)",
        }}
        className="absolute w-[300px] "
      >
        <div className="flex gap-3.5">
          <img
            src="/img/cert666.png"
            alt=""
            className="w-[293px] h-[242px] object-cover rounded-md"
          />
          <img
            src="/img/certificate2.png"
            alt=""
            className="w-[293px] h-[242px] object-cover"
          />
          <img
            src="/img/certificate33.png"
            alt=""
            className="w-[293px] h-[242px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default ShareCertificatesSection;
