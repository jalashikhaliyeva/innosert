import Header from "@/components/Header";
import ImageSectionAbout from "@/components/ImageSectionAbout";
import AboutSection from "@/components/AboutSection";
import OurAdvantagesSection from "@/components/OurAdvantagesSection";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";
import { getLandingInfo } from "@/services/getLandingInfo";
import { getAboutInfo } from "@/services/getAboutInfo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for language handling

function Haqqimizda({ landingInfo, openRegisterModal }) {
  const [aboutInfo, setAboutInfo] = useState(null);
  const router = useRouter(); // useRouter to get the locale
  // console.log(router.locale, "router locale about page");

  // Fetch data based on language change
  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const info = await getAboutInfo(router.locale); // Use the current router locale
        setAboutInfo(info);
      } catch (error) {
        console.error("Failed to fetch about info:", error);
      }
    };

    fetchAboutInfo();
  }, [router.locale]); // Re-fetch data when router locale changes

  if (!landingInfo || !aboutInfo) {
    return <Spinner />;
  }

  return (
    <>
      <Header openRegisterModal={openRegisterModal} />
      <ImageSectionAbout aboutInfo={aboutInfo} />
      <AboutSection aboutInfo={aboutInfo} />
      {landingInfo?.advantage && (
        <OurAdvantagesSection data={landingInfo.advantage} />
      )}
      <Footer />
    </>
  );
}

// Fetch data using getServerSideProps
export async function getServerSideProps(context) {
  const lang = context.locale || "az"; // Get the language from query or locale
  try {
    const landingInfo = await getLandingInfo();
    const aboutInfo = await getAboutInfo(lang); // Pass the language to getAboutInfo

    return {
      props: {
        landingInfo,
        aboutInfo, // Pass the aboutInfo fetched from the API
        initialLang: lang, // Pass the initial language to the client-side
      },
    };
  } catch (error) {
    console.error("Failed to fetch landing info:", error);

    return {
      props: {
        landingInfo: null,
        aboutInfo: null,
      },
    };
  }
}

export default Haqqimizda;
