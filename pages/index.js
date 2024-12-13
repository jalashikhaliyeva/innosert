import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import HeroHome from "@/components/HeroHome";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";
import "@/components/EmblaCarousel/embla.module.css";
import ShareCertificatesSection from "@/components/ShareCertificatesSection";
import HowConnectToExamSection from "@/components/HowConnectToExamSection";
import ConnectOrCreateExamSection from "@/components/ConnectOrCreateExamSection";
import HowtoCreateAnExamSection from "@/components/HowtoCreateAnExamSection";
import OurAdvantagesSection from "@/components/OurAdvantagesSection";
import Faq from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Spinner from "@/components/Spinner";
import withModalManagement from "@/shared/hoc/withModalManagement";
import { useRouter } from "next/router";
import { getLandingInfo } from "../services/getLandingInfo";
import { getSettingInfo } from "../services/getSettingInfo";
import Head from "next/head";
import { useTranslation } from "react-i18next";
const OPTIONS = { loop: true };

function Home({ openRegisterModal, openLoginModal, landingInfo, settingInfo }) {
  const { t } = useTranslation();
  const faqRef = useRef(null);
  const footerRef = useRef(null);
  const certificateRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined" && router) {
      const scrollToSection = () => {
        const section = localStorage.getItem("scrollToSection");

        if (section === "faq" && faqRef.current) {
          faqRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (section === "contact" && footerRef.current) {
          footerRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (section === "sertificate" && certificateRef.current) {
          certificateRef.current.scrollIntoView({ behavior: "smooth" });
        }

        localStorage.removeItem("scrollToSection");
      };

      scrollToSection();
      router.events.on("routeChangeComplete", scrollToSection);
      return () => {
        router.events.off("routeChangeComplete", scrollToSection);
      };
    }
  }, [router]);

  // Fetch data whenever the locale changes
  useEffect(() => {
    if (router.locale) {
      const fetchData = async (locale) => {
        try {
          const landingData = await getLandingInfo(locale);
          const settingData = await getSettingInfo(locale);
          console.log(settingData, "settingData");
          

          const mappedSlides = settingData.category?.map((item) => ({
            imageSrc: item.image,
            text: item.name,
          }));

          setLandingInfo(landingData);
          setSettingInfo({
            slides: mappedSlides,
            map: settingData?.contact?.map,
          });
        } catch (error) {
          console.error("Failed to fetch landing or setting info:", error);
        }
      };

      fetchData(router.locale); // Re-fetch data when locale changes
    }
  }, [router.locale]);

  if (!landingInfo || !settingInfo) {
    return <Spinner />;
  }

  console.log(landingInfo, "landingInfo");
  

  if (!mounted) {
    return <Spinner />; 
  }

  const scrollToFaq = () => {
    if (faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCertificate = () => {
    if (certificateRef.current) {
      certificateRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <main>
      <Head>
        <title>{t("ana səhifə")}</title>
        <meta name="description" content={landingInfo?.metatags?.meta_desc} />
        <meta
          name="keywords"
          content={landingInfo?.metatags?.meta_keywords || "default, keywords"}
        />
      </Head>
      <Header
        openRegisterModal={openRegisterModal}
        scrollToFaq={scrollToFaq}
        scrollToFooter={scrollToFooter}
        scrollToCertificate={scrollToCertificate}
      />

      <HeroHome
        openRegisterModal={openRegisterModal}
        landingInfo={landingInfo?.slider}
      />
      <EmblaCarousel slides={settingInfo.slides} options={OPTIONS} />
      <ShareCertificatesSection
        openRegisterModal={openRegisterModal}
        certificates={landingInfo.certificate}
        title={landingInfo?.titles[0]}
        ref={certificateRef}
      />
      <ConnectOrCreateExamSection title={landingInfo?.titles[1]} />
      <HowConnectToExamSection data={landingInfo?.about_participation} />
      <HowtoCreateAnExamSection data={landingInfo?.about_exam} />
      {landingInfo?.advantage && (
        <OurAdvantagesSection data={landingInfo.advantage} />
      )}
      <Container>
        <Faq ref={faqRef} faqs={landingInfo?.faqs} />
      </Container>

      <Footer
        ref={footerRef}
        scrollToFaq={scrollToFaq} // Pass the scrollToFaq function as a prop
      />
    </main>
  );
}

// Fetch on server side
export async function getServerSideProps(context) {
  const lang = context.locale || "az"; // Get the language from the context locale
  try {
    const landingInfo = await getLandingInfo(lang);
    const settingInfo = await getSettingInfo(lang);
   
    

    const mappedSlides = settingInfo.category?.map((item) => ({
      imageSrc: item.image,
      text: item.name,
    }));

    return {
      props: {
        landingInfo,
        settingInfo: {
          slides: mappedSlides,
          map: settingInfo?.contact?.map,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch landing or setting info:", error);
    return {
      props: {
        landingInfo: null,
        settingInfo: null,
      },
    };
  }
}

export default withModalManagement(Home);
