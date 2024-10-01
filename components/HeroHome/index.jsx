import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./style.module.css";
import Container from "../Container";
import Button from "../Button";

function HeroHome({ openRegisterModal, landingInfo }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    speed: 5,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = landingInfo.map((info) => ({
    title: info.title,
    description: info.desc.replace(/<[^>]+>/g, ""),
    buttonText: info.button_text,
    backgroundImage: info.image,
  }));

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    const autoplay = () => {
      if (!emblaApi) return;
      emblaApi.scrollNext();
    };

    const autoplayInterval = setInterval(autoplay, 4000);
    return () => clearInterval(autoplayInterval);
  }, [emblaApi, onSelect]);

  const handleDotClick = (index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <div className={styles.heroSlider} ref={emblaRef}>
      <div className={styles.embla__container}>
        {slides.map((slide, index) => (
          <div className={styles.embla__slide} key={index}>
            <div
              className={styles.slideContent}
              style={{
                backgroundImage: `linear-gradient(
                  90deg,
                  rgba(0, 10, 51, 0.5) 0%,
                  rgba(0, 10, 51, 0.25) 29.5%,
                  rgba(0, 10, 51, 0) 100%
                ), url(${slide.backgroundImage})`,
              }}
            >
              <div className={styles.textContainer}>
                <Container>
                  <h1 className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl font-gilroy font-medium leading-7 sm:leading-10 md:leading-10 lg:leading-10 pb-6">
                    {slide.title}
                  </h1>
                  <p className="  sm:text-lg md:text-lg  font-gilroy text-md font-normal tracking-036 pb-9">
                    {slide.description}
                  </p>

                  <div onClick={openRegisterModal}>
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
                      {slide.buttonText}
                    </Button>
                  </div>
                </Container>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.dotContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentSlide === index ? styles.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroHome;
