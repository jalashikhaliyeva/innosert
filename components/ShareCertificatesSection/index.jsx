import React from "react";
import Container from "../Container";
import Button from "../Button";
import Image from "next/image";

const ShareCertificatesSection = React.forwardRef(
  ({ openRegisterModal, certificates, title }, ref) => {
    console.log(certificates, "certificates certificates component");

    return (
      <div data-aos="fade-up"
      data-aos-anchor-placement="center-bottom" ref={ref} className="bg-blue200 relative overflow-hidden md:mt-14">
        <Container>
          <div className="relative flex flex-col justify-center h-[373px] w-[327px] sm:w-[527px]">
            <h2
    
              className="text-white text-3xl sm:text-4xl lg:text-4xl mb-3.5"
            >
              {title.title}
            </h2>
            <p
         
              className="text-inputDefault text-base whitespace-normal sm:text-lg mb-12"
            >
              {title.desc}
            </p>
            <div  onClick={openRegisterModal}>
              <Button
                color="var(--buttonTextWhite)"
                hoverColor="var(--buttonWhiteHover)"
                pressedColor="var(--buttonWhitePressed)"
                disabledColor="var(--buttonSecondaryDisabled)"
                textColor="var(--brandBlue500)"
                disabledTextColor="var(--buttonTextSecondaryDisabled)"
                width="199px"
                height="48px"
                borderRadius="8px"
                fontFamily="var(--fontGilroy)"
                fontSize="20px"
              >
                Başla
              </Button>
            </div>
          </div>
        </Container>
        <div
          style={{
            top: "50%",
            transform: "translateY(-50%)",
          }}
          className="right-[20%] xl:right-[30%] 2xl:right-[25%] hidden sm:hidden md:hdden lg:block absolute w-[300px]"
        >
          <div className="flex gap-3.5 rounded-md">
            {certificates?.map((cert, index) => (
              <Image
                key={cert.id}
                width={293}
                height={242}
                src={cert.image}
                alt={`Certificate ${index + 1}`}
                className={`w-[293px] h-[242px] object-cover rounded-lg ${index > 0 ? 'opacity-20' : ''}`}
                style={{
                  margin: 0,
                  padding: 0,
                  width: "400px",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  opacity: index > 0 ? 0.2 : 1, // 20% opacity for 2nd and 3rd images
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ShareCertificatesSection.displayName = "ShareCertificatesSection";
export default ShareCertificatesSection;
