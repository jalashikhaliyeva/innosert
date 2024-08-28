import React from "react";
import Container from "../Container";
import EmblaCarousel from "../EmblaCarouselAdvantage/EmblaCarousel";
import Slider from "../EmblaCarouselAdvantage/EmblaCarousel";
const OPTIONS = { loop: true };
// const SLIDE_COUNT = 24;


function OurAdvantagesSection() {
  return (
    <div className="bg-white pb-14">
      <Container>
        <h2 className="pt-14 pb-10 font-gilroy text-textSecondaryDefault text-3xl font-medium">
          Üstünlüklərimiz
        </h2>
        <Slider />
      </Container>
    </div>
  );
}

export default OurAdvantagesSection;
