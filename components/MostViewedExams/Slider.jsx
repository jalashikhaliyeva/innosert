import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import ExamCardMost from "../ExamCardMost";
// Import the ExamCardMost component

const Slider = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: false,
    startIndex: 1, // Start on the second slide
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Apply scaling and opacity effects
  useEffect(() => {
    if (!emblaApi) return;

    const slides = emblaApi.slideNodes();

    const applyEffects = () => {
      const scrollProgress = emblaApi.scrollProgress();
      const scrollSnaps = emblaApi.scrollSnapList();

      slides.forEach((slide, index) => {
        const diffToCenter = scrollSnaps[index] - scrollProgress;
        const absDiff = Math.abs(diffToCenter);

        // Calculate scale (make center slide larger)
        let scale = 1 - absDiff * 0.2;
        if (scale < 0.8) scale = 0.8; // Minimum scale

        // Calculate opacity (make side slides semi-transparent)
        let opacity = 1 - absDiff * 0.7;
        if (opacity < 0.3) opacity = 0.3; // Minimum opacity

        const slideInner = slide.querySelector(
          `.${styles.embla__slide__inner}`
        );
        if (slideInner) {
          slideInner.style.transform = `scale(${scale})`;
          slideInner.style.opacity = opacity;
        }
      });
    };

    emblaApi.on("scroll", applyEffects);
    emblaApi.on("resize", applyEffects);

    // Apply effects on initial load
    applyEffects();

    return () => {
      emblaApi.off("scroll", applyEffects);
      emblaApi.off("resize", applyEffects);
    };
  }, [emblaApi]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {data?.map((slide, index) => (
            <div className={styles.embla__slide} key={slide.id}>
              <div className={styles.embla__slide__inner}>
                {/* Replace Image component with ExamCardMost component */}
                <ExamCardMost
                  className="border border-buttonSecondaryDefault"
                  // Pass any necessary props here
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.embla__button} ${styles["embla__button--prev"]}`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <GrFormPrevious className="fill-black text-black text-lg" />
      </button>

      <button
        className={`${styles.embla__button} ${styles["embla__button--next"]}`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <MdNavigateNext className="fill-black" />
      </button>

      <div className={styles.embla__dots}>
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`${styles.embla__dot} ${
              index === selectedIndex ? styles["embla__dot--selected"] : ""
            }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
