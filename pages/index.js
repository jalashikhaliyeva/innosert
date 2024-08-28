import React from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import HeroHome from "@/components/HeroHome";
import ReactDOM from "react-dom/client";
import EmblaCarousel from "@/components//EmblaCarousel/EmblaCarousel";
import "@/components/EmblaCarousel/embla.module.css";
import ShareCertificatesSection from "@/components/ShareCertificatesSection";
import HowConnectToExamSection from "@/components/HowConnectToExamSection";
import ConnectOrCreateExamSection from "@/components/ConnectOrCreateExamSection";
import HowtoCreateAnExamSection from "@/components/HowtoCreateAnExamSection";
import OurAdvantagesSection from "@/components/OurAdvantagesSection";
import Faq from "@/components/FaqSection";
import Footer from "@/components/Footer";
const OPTIONS = { loop: true };
// const SLIDE_COUNT = 24;
const slides = [
  {
    imageSrc: "/img/frontend.png",
    text: "Frontend Development",
  },
  {
    imageSrc: "/img/backend.png",
    text: "Backend Development",
  },
  {
    imageSrc: "/img/ux-ui.png",
    text: "UX/UI Design",
  },
  {
    imageSrc: "/img/digital-marketing.png",
    text: "Digital Marketing",
  },
  {
    imageSrc: "/img/data-science.png",
    text: "Data Science",
  },
  {
    imageSrc: "/img/machine-learning.png",
    text: "Machine Learning",
  },
  {
    imageSrc: "/img/mobile-development.png",
    text: "Mobile App Development",
  },
  {
    imageSrc: "/img/cloud-computing.png",
    text: "Cloud Computing",
  },
  {
    imageSrc: "/img/cybersecurity.png",
    text: "Cybersecurity",
  },
  {
    imageSrc: "/img/devops.png",
    text: "DevOps Engineering",
  },
  {
    imageSrc: "/img/project-management.png",
    text: "Project Management",
  },
  {
    imageSrc: "/img/seo.png",
    text: "SEO Optimization",
  },
  {
    imageSrc: "/img/graphic-design.png",
    text: "Graphic Design",
  },
  {
    imageSrc: "/img/content-writing.png",
    text: "Content Writing",
  },
  {
    imageSrc: "/img/blockchain.png",
    text: "Blockchain Technology",
  },
  {
    imageSrc: "/img/ai.png",
    text: "Artificial Intelligence",
  },
  {
    imageSrc: "/img/qa-testing.png",
    text: "QA Testing",
  },
  {
    imageSrc: "/img/software-engineering.png",
    text: "Software Engineering",
  },
  {
    imageSrc: "/img/database-management.png",
    text: "Database Management",
  },
  {
    imageSrc: "/img/it-support.png",
    text: "IT Support",
  },
];

export default function Home() {
  return (
    <main>
      <Container>
        <Header />
      </Container>
      <HeroHome />
      <EmblaCarousel slides={slides} options={OPTIONS} />
      <ShareCertificatesSection />
      <HowConnectToExamSection />
      <ConnectOrCreateExamSection />
      <HowtoCreateAnExamSection />
      <OurAdvantagesSection />
      <Faq />
      <Container>
        <Footer />
      </Container>
    </main>
  );
}
