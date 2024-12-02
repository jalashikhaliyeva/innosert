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
import Head from "next/head";
import { useTranslation } from "react-i18next";
import MemberShip from "@/components/MemberShip";
function Emekdasliq({ openRegisterModal }) {
  const { t } = useTranslation();
  const [aboutInfo, setAboutInfo] = useState(null);
  const router = useRouter(); // useRouter to get the locale

  return (
    <>
      <Head>
        <title>{t("collaboration")}</title>
        <meta name="description" content={aboutInfo?.metatags?.meta_desc} />
        <meta
          name="keywords"
          content={aboutInfo?.metatags?.meta_keywords || "default, keywords"}
        />
      </Head>
      <Header openRegisterModal={openRegisterModal} />

      <MemberShip />

      <Footer />
    </>
  );
}

export default Emekdasliq;
