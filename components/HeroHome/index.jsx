import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import Container from "../Container";
import Button from "../Button";

const slides = [
  {
    title: "Biliyini Sertifikat ilə Təsdiqlə!",
    description:
      "Biliyini artır və rəsmi sertifikat ilə təsdiqlə. Hədəflərinə çatmaq üçün ilk addımı at.",
    buttonText: "Başla",
    backgroundImage: "/img/heroHome1.png", // Path to your first image
  },
  {
    title: "Yenilənmiş Tədris Proqramları",
    description:
      "Ən son və müasir tədris proqramları ilə təhsilini inkişaf etdir. Öz biliyini yoxla və təkmilləşdir.",
    buttonText: "Başla",
    backgroundImage: "/img/hero999.jpg", // Path to your second image
  },
  {
    title: "Beynəlxalq Sertifikatlar",
    description:
      "Beynəlxalq tanınmış sertifikatlarla bilik və bacarıqlarını qlobal səviyyədə təsdiqlə.",
    buttonText: "Başla",
    backgroundImage: "/img/hero333.avif", // Path to your third image
  },
];

function HeroHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className={styles.heroHome}
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(0, 10, 51, 0.5) 0%,
          rgba(0, 10, 51, 0.25) 29.5%,
          rgba(0, 10, 51, 0) 100%
        ), url(${slides[currentSlide].backgroundImage})`,
        marginTop:"80px"
      }}
    >
      <Container>
        <div
          style={{ height: "461px" }}
          className="flex flex-col justify-center"
        >
          <h1 className="font-gilroy text-white text-5xl mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg font-gilroy text-white mb-9">
            {slides[currentSlide].description}
          </p>
          <div className={styles.dotsContainer}>
            {slides.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ""
                }`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
          <Button
            color="var(--buttonDefaultPrimary)"
            hoverColor="var(--buttonHoverPrimary)"
            pressedColor="var(--buttonPressedPrimary)"
            disabledColor="var(--buttonDisabledPrimary)"
            textColor="var(--buttonTextWhite)"
            hoverTextColor="var(--buttonTextWhite)"
            disabledTextColor="var(--buttonTextDisabled)"
            width="179px"
            height="48px"
            borderRadius="8px"
            fontFamily="var(--fontGilroy)"
            fontSize="20px"
          >
            {slides[currentSlide].buttonText}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HeroHome;
