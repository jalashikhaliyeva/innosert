// src/components/Footer.js
import React, { useEffect, useState, useContext } from "react";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { getSettingInfo } from "@/services/getSettingInfo";
import Image from "next/image";
import Container from "../Container";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext"; // Import UserContext

const Footer = React.forwardRef(({ scrollToFaq }, ref) => {
  const [settingInfo, setSettingInfo] = useState(null);
  const router = useRouter();

  // Access user state from UserContext
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchSettingInfo = async () => {
      try {
        const data = await getSettingInfo();
        const map = data?.contact?.map;
        setSettingInfo(map);
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
            <FaInstagram className="size-8 fill-neutralWhite cursor-pointer" />
            <PiLinkedinLogoBold className="size-8 fill-neutralWhite cursor-pointer" />
            <RiFacebookBoxLine className="size-8 fill-neutralWhite cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-start gap-20 py-20">
          <iframe
            className="w-full md:w-[620px]"
            src={settingInfo}
            height="290"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map"
          ></iframe>

          <div className="flex flex-col md:flex-row gap-8 md:gap-24 items-start justify-start">
            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5 whitespace-nowrap">
                Sayt xəritəsi
              </h6>
              {/* Home Link */}
              <Link
                href="/"
                className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
              >
                Ana Səhifə
              </Link>

              {/* Haqqımızda Button */}
              <button
                onClick={handleAboutClick}
                className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
              >
                Haqqımızda
              </button>

              {/* Conditionally Render Bloq or FAQ as Links */}
              {user ? (
                <Link
                  href="/bloq"
                  className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
                >
                  Bloq
                </Link>
              ) : (
                <Link
                  href="/"
                  onClick={handleFaqClick}
                  className="cursor-pointer font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
                >
                  FAQ
                </Link>
              )}
            </div>

            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5 whitespace-nowrap">
                Əlaqə
              </h6>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400">
                +994 50 837 58 54
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400">
                +994 50 604 58 54
              </p>
              <a
                href="mailto:contact@innosert.az?subject=İnnosert ilə əlaqə&body=Salam İnnosert komandası,"
                className="font-gilroy text-base font-normal leading-6 text-inputBorder hover:text-blue-400"
              >
                contact@innosert.az
              </a>
            </div>

            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5 whitespace-nowrap">
                Ünvan
              </h6>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Nizami küç. 203b AF Business House
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between border-t-[1px] pt-7 border-footerGrayText">
          <p className="text-inputBorder font-gilroy font-normal text-sm leading-6">
            © 2024 İnnosert LLC - All rights reserved
          </p>

          <p className="text-inputBorder font-gilroy font-normal text-sm leading-6">
            Help Center
          </p>
          <p className="text-inputBorder font-gilroy font-normal text-sm leading-6">
            Privacy Policy
          </p>
        </div>
      </Container>
    </div>
  );
});
Footer.displayName = "Footer";
export default Footer;
