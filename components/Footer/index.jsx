// src/components/Footer.js
import React, { useEffect, useState, useContext } from "react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa"; // Updated icon imports
import { getSettingInfo } from "@/services/getSettingInfo";
import Image from "next/image";
import Container from "../Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext";
import { useTranslation } from "next-i18next";

const Footer = React.forwardRef(({ scrollToFaq }, ref) => {
  const [settingInfo, setSettingInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [socialMedia, setSocialMedia] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSettingInfo = async () => {
      try {
        const data = await getSettingInfo();
        console.log(data, "data footer");

        setContactInfo(data.contact);
        setSettingInfo(data.contact.map);
        setSocialMedia(data.social_links);
      } catch (error) {
        console.error("Failed to fetch setting info:", error);
      }
    };

    fetchSettingInfo();
  }, []);

  const handleAboutClick = () => {
    router.push("/haqqimizda");
  };

  const handleFaqClick = (e) => {
    if (router.pathname === "/") {
      e.preventDefault(); // Prevent navigation
      scrollToFaq();
    } else {
      localStorage.setItem("scrollToSection", "faq");
      // Navigation will occur normally
    }
  };

  return (
    <div
      ref={ref}
      className="bg-brandBlue700 flex-col justify-between py-8 my-t shadow-createBox mt-10"
    >
      <Container>
        <div className="flex justify-between border-b-[1px] border-footerGrayText pb-7">
          <Link href="/">
            <Image
              src="/logo/logo-innosert.png"
              width={118}
              height={38}
              alt="logo"
            />
          </Link>
          <div className="flex gap-5">
            {socialMedia?.length > 0 &&
              socialMedia.map((item, index) => (
                <a
                  key={index}
                  href={item.link.startsWith("http") ? item.link : `https://${item.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Social Link ${index + 1}`}
                >
                  <Image
                    src={item.image}
                    alt={`Social Media ${index + 1}`}
                    width={24}
                    height={24}
                    className="hover:opacity-75 transition-opacity"
                  />
                </a>
              ))}
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-start gap-20 py-20">
          {settingInfo ? (
            <iframe
              className="w-full md:w-[620px]"
              src={settingInfo}
              height="290"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          ) : (
            <div className="w-full md:w-[620px] h-72 bg-gray-200 animate-pulse"></div>
          )}

          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start justify-start">
            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5 whitespace-nowrap">
                {t("footer.siteMap")}
              </h6>
              {/* Home Link */}
              <Link
                href="/"
                className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
              >
                {t("siteMap.home")}
              </Link>

              {/* Haqqımızda Button */}
              <button
                onClick={handleAboutClick}
                className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
              >
                {t("siteMap.aboutUs")}
              </button>

              {/* Conditionally Render Bloq or FAQ as Links */}
              {user ? (
                <Link
                  href="/bloq"
                  className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
                >
                  {t("siteMap.blog")}
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={handleFaqClick}
                  className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
                >
                  {t("siteMap.faq")}
                </Link>
              )}
            </div>

            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5 whitespace-nowrap">
                {t("siteMap.contact")}
              </h6>
              {contactInfo ? (
                <>
                  <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                    {contactInfo.phone}
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}?subject=İnnosert ilə əlaqə&body=Salam İnnosert komandası,`}
                    className="font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
                  >
                    {contactInfo.email}
                  </a>
                </>
              ) : (
                <>
                  <div className="font-gilroy text-base font-normal leading-6 text-inputBorder bg-gray-200 animate-pulse w-40 h-4 mb-2"></div>
                  <div className="font-gilroy text-base font-normal leading-6 text-inputBorder bg-gray-200 animate-pulse w-48 h-4"></div>
                </>
              )}
            </div>

            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5 whitespace-nowrap">
                {t("siteMap.address")}
              </h6>
              {contactInfo ? (
                <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                  {contactInfo.address}
                </p>
              ) : (
                <div className="font-gilroy text-base font-normal leading-6 text-inputBorder bg-gray-200 animate-pulse w-60 h-4"></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between border-t-[1px] pt-7 border-footerGrayText">
          <p className="text-inputBorder font-gilroy font-normal text-sm leading-6">
            © 2024 İnnosert LLC - All rights reserved
          </p>

          {settingInfo && contactInfo && (
            <Link href="/privacy-policy">
              <p className="text-inputBorder font-gilroy font-normal text-sm leading-6 hover:text-blue-400 transition-colors">
                {t("footer.privacyPolicy")}
              </p>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
});

Footer.displayName = "Footer";
export default Footer;
