import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./EmblaHero.module.css";
import Container from "../Container";

const slides = [
  {
    title: "Elevate Your Skills!",
    description:
      "Enhance your knowledge and earn a certification that sets you apart.",
    buttonText: "Get Started",
    backgroundImage: "/img/hero777.jpg",
  },
  {
    title: "Modern Learning Programs",
    description:
      "Stay ahead with the latest and most modern learning programs available.",
    buttonText: "Explore",
    backgroundImage: "/img/hero888.jpg",
  },
  {
    title: "Global Certifications",
    description:
      "Validate your skills globally with internationally recognized certifications.",
    buttonText: "Learn More",
    backgroundImage: "/img/hero999.jpg",
  },
];

function EmblaHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false, 
    speed: 5,
    align: "center",
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      if (!emblaApi) return;

      emblaApi.scrollNext();

      // Check if we've reached the last slide, then reset
      if (emblaApi.selectedScrollSnap() === slides.length) {
        emblaApi.scrollTo(0, false); // Reset to the start without animation
      }
    };

    const autoplayInterval = setInterval(autoplay, 4000);

    return () => clearInterval(autoplayInterval);
  }, [emblaApi]);

  return (
    <div className={styles.heroSlider} ref={emblaRef}>
      <div className={styles.embla__container} style={{ display: "flex" }}>
        {slides.concat(slides).map((slide, index) => (
          <div className={styles.embla__slide} key={index}>
            <div
              className={styles.slideContent}
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
              }}
            >
              <div className={styles.textContainer}>
                <Container>
                  <h1 className={styles.title}>{slide.title}</h1>
                  <p className={styles.description}>{slide.description}</p>
                  <button className={styles.button}>{slide.buttonText}</button>
                </Container>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmblaHero;
