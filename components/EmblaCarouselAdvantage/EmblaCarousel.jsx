import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./embla.module.css";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const Slider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    onSelect(); // Call immediately to set initial state
  }, [emblaApi, onSelect]);

  // Arrays of titles and descriptions for each slide
  const slideTitles = [
    "Nəticələrin analizi",
    "Şirkət hesablarının izlənməsi",
    "Sertifikatların saxlanması və arxivləşdirilməsi",
    "Onlayn müraciət və qeydiyyat prosesinin sadəliyi",
    "Tələbələrin irəliləyişinin izlənməsi",
  ];

  const slideDescriptions = [
    "İmtahan nəticələrinin dərindən təhlil olunması ilə irəliləyişlərin və zəif tərəflərin müəyyən edilməsi.",
    "Şirkət hesablarının və istifadəçilərinin fəaliyyətlərinin mərkəzləşdirilmiş şəkildə izlənməsi.",
    "Sertifikatların təhlükəsiz şəkildə saxlanılması və gələcəkdə istifadə üçün arxivləşdirilməsi.",
    "İstifadəçilərin rahat və asan şəkildə onlayn müraciət və qeydiyyat prosesini tamamlaması.",
    "Tələbələrin öyrənmə yolunda göstərdikləri irəliləyişlərin davamlı izlənməsi və təhlili.",
  ];

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={`${styles.embla__container} flex`}>
          {slideTitles.map((title, index) => (
            <div
              className={`${styles.embla__slide} flex-[0_0_35%] px-2`}
              key={index}
            >
              <div className="flex flex-col w-full bg-boxGrayBodyColor rounded-2xl p-6">
                <img
                  src={`/img/advantages1.png`}
                  alt={`Banner Logo ${index + 1}`}
                />

                <h5 className="font-gilroy text-2xl text-textSecondaryDefault font-medium pb-3 h-20">
                  {title}
                </h5>
                <p className="font-gilroy text-lg text-grayTextinBox tracking-036 leading-normal">
                  {slideDescriptions[index]}
                </p>
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
