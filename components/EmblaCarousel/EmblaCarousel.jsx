import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import styles from "./embla.module.css";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true, interval: 6000, speed: 2 }),
  ]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides?.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.box}>
                <img
                src="/img/BadgeSlide.png"
                  alt="Banner Logo"
                  className={styles.bannerLogo}
                />
                <div className={styles.text}>{slide.text}</div> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
