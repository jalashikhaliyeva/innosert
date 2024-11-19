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
import { useTranslation } from "next-i18next";
const Footer = React.forwardRef(({ scrollToFaq }, ref) => {
  const [settingInfo, setSettingInfo] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();
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
            <svg
              className="size-8 fill-neutralWhite cursor-pointer"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.0212 2.5H9.93375C7.96269 2.50232 6.07304 3.28643 4.67941 4.6803C3.28578 6.07416 2.50198 7.96394 2.5 9.935L2.5 20.0225C2.50232 21.9936 3.28643 23.8832 4.6803 25.2768C6.07416 26.6705 7.96394 27.4543 9.935 27.4562H20.0225C21.9936 27.4539 23.8832 26.6698 25.2768 25.276C26.6705 23.8821 27.4543 21.9923 27.4562 20.0212V9.93375C27.4539 7.96269 26.6698 6.07304 25.276 4.67941C23.8821 3.28578 21.9923 2.50198 20.0212 2.5ZM24.9463 20.0212C24.9463 20.668 24.8189 21.3084 24.5714 21.906C24.3239 22.5035 23.9611 23.0464 23.5038 23.5038C23.0464 23.9611 22.5035 24.3239 21.906 24.5714C21.3084 24.8189 20.668 24.9463 20.0212 24.9463H9.93375C8.62778 24.9459 7.3754 24.4269 6.45206 23.5033C5.52871 22.5797 5.01 21.3272 5.01 20.0212V9.93375C5.01033 8.62778 5.52936 7.3754 6.45294 6.45206C7.37652 5.52871 8.62903 5.01 9.935 5.01H20.0225C21.3285 5.01033 22.5808 5.52936 23.5042 6.45294C24.4275 7.37652 24.9463 8.62903 24.9463 9.935V20.0212Z"
                fill="white"
              />
              <path
                d="M14.9779 8.52393C13.2672 8.52657 11.6273 9.20741 10.4178 10.4172C9.20822 11.627 8.5277 13.267 8.52539 14.9777C8.52737 16.6888 9.20792 18.3293 10.4178 19.5394C11.6276 20.7495 13.268 21.4304 14.9791 21.4327C16.6905 21.4307 18.3312 20.75 19.5413 19.5399C20.7514 18.3297 21.4322 16.689 21.4341 14.9777C21.4315 13.2665 20.7503 11.6263 19.54 10.4167C18.3297 9.20706 16.689 8.52683 14.9779 8.52518V8.52393ZM14.9779 18.9227C13.9319 18.9227 12.9288 18.5072 12.1892 17.7676C11.4496 17.028 11.0341 16.0249 11.0341 14.9789C11.0341 13.933 11.4496 12.9299 12.1892 12.1903C12.9288 11.4507 13.9319 11.0352 14.9779 11.0352C16.0238 11.0352 17.0269 11.4507 17.7665 12.1903C18.5061 12.9299 18.9216 13.933 18.9216 14.9789C18.9216 16.0249 18.5061 17.028 17.7665 17.7676C17.0269 18.5072 16.0238 18.9227 14.9779 18.9227Z"
                fill="white"
              />
              <path
                d="M21.4447 10.1189C22.2987 10.1189 22.9909 9.42659 22.9909 8.57262C22.9909 7.71865 22.2987 7.02637 21.4447 7.02637C20.5907 7.02637 19.8984 7.71865 19.8984 8.57262C19.8984 9.42659 20.5907 10.1189 21.4447 10.1189Z"
                fill="white"
              />
            </svg>

            <svg
              className="size-8 fill-neutralWhite cursor-pointer"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.25 16.4126V21.0339H18.5713V16.7214C18.5713 15.6389 18.1838 14.9001 17.2137 14.9001C16.4738 14.9001 16.0325 15.3976 15.8387 15.8801C15.7687 16.0526 15.75 16.2926 15.75 16.5326V21.0339H13.07C13.07 21.0339 13.1063 13.7314 13.07 12.9751H15.75V14.1164L15.7325 14.1426H15.75V14.1164C16.1063 13.5664 16.7412 12.7851 18.165 12.7851C19.9275 12.7851 21.25 13.9376 21.25 16.4126ZM10.2662 9.08887C9.35 9.08887 8.75 9.69137 8.75 10.4814C8.75 11.2564 9.3325 11.8751 10.2312 11.8751H10.2487C11.1837 11.8751 11.765 11.2551 11.765 10.4814C11.7475 9.69137 11.1837 9.08887 10.2662 9.08887ZM8.90875 21.0339H11.5887V12.9751H8.90875V21.0339Z"
                fill="white"
              />
              <path
                d="M7.5 5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V7.5C25 6.83696 24.7366 6.20107 24.2678 5.73223C23.7989 5.26339 23.163 5 22.5 5H7.5ZM7.5 2.5H22.5C23.8261 2.5 25.0979 3.02678 26.0355 3.96447C26.9732 4.90215 27.5 6.17392 27.5 7.5V22.5C27.5 23.8261 26.9732 25.0979 26.0355 26.0355C25.0979 26.9732 23.8261 27.5 22.5 27.5H7.5C6.17392 27.5 4.90215 26.9732 3.96447 26.0355C3.02678 25.0979 2.5 23.8261 2.5 22.5V7.5C2.5 6.17392 3.02678 4.90215 3.96447 3.96447C4.90215 3.02678 6.17392 2.5 7.5 2.5Z"
                fill="white"
              />
            </svg>

            <svg
              className="size-8 fill-neutralWhite cursor-pointer"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3684 11.1712V12.8925H12.1084V14.9962H13.3684V21.25H15.9584V14.9962H17.6959C17.6959 14.9962 17.8596 13.9875 17.9384 12.8837H15.9684V11.4462C15.9684 11.23 16.2509 10.9412 16.5309 10.9412H17.9409V8.75H16.0221C13.3046 8.75 13.3684 10.8562 13.3684 11.1712Z"
                fill="white"
              />
              <path
                d="M7.5 5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V7.5C25 6.83696 24.7366 6.20107 24.2678 5.73223C23.7989 5.26339 23.163 5 22.5 5H7.5ZM7.5 2.5H22.5C23.8261 2.5 25.0979 3.02678 26.0355 3.96447C26.9732 4.90215 27.5 6.17392 27.5 7.5V22.5C27.5 23.8261 26.9732 25.0979 26.0355 26.0355C25.0979 26.9732 23.8261 27.5 22.5 27.5H7.5C6.17392 27.5 4.90215 26.9732 3.96447 26.0355C3.02678 25.0979 2.5 23.8261 2.5 22.5V7.5C2.5 6.17392 3.02678 4.90215 3.96447 3.96447C4.90215 3.02678 6.17392 2.5 7.5 2.5Z"
                fill="white"
              />
            </svg>
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
              {t("siteMap.address")}
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
