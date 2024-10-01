import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import sanitizeHtml from "sanitize-html";
import Image from "next/image";

const Slider = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps",
    // align: data.length <= 2 ? "center" : "start", // Center align if there are 2 or fewer slides
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [showDots, setShowDots] = useState(false);

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
    setShowDots(data?.length > 3); // Show dots only if there are more than 3 slides
    emblaApi.on("select", onSelect);
    onSelect(); // Call immediately to set initial state
  }, [emblaApi, onSelect, data?.length]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`${styles.embla__container} flex`}>
          {data?.map((slide, index) => (
            <div
              className={`${styles.embla__slide} flex-[0_0_35%] px-2`}
              key={slide.id}
            >
              <div className="flex flex-col w-full bg-boxGrayBodyColor rounded-2xl p-6">
                <Image
                  width={370}
                  height={290}
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="hidden lg:block mb-4"
                />
                <h5 className="font-gilroy text-lg md:text-2xl text-textSecondaryDefault font-medium pb-3 h-20">
                  {slide.title}
                </h5>
                <p
                  className="font-gilroy text-lg text-grayTextinBox tracking-036 leading-normal"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(slide.desc),
                  }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {prevBtnEnabled && (
        <button
          className={`${styles.embla__button} ${styles["embla__button--prev"]}`}
          onClick={scrollPrev}
        >
          <GrFormPrevious className="fill-black text-black text-lg" />
        </button>
      )}

      {nextBtnEnabled && (
        <button
          className={`${styles.embla__button} ${styles["embla__button--next"]}`}
          onClick={scrollNext}
        >
          <MdNavigateNext className="fill-black" />
        </button>
      )}

      {showDots && (
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
      )}
    </div>
  );
};

export default Slider;
