import React, { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { PiLinkedinLogoBold } from "react-icons/pi";
import { getSettingInfo } from "@/services/getSettingInfo";
import Image from "next/image";
import Container from "../Container";
import Link from "next/link";

const Footer = React.forwardRef((props, ref) => {
  const [settingInfo, setSettingInfo] = useState(null);
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

  return (
    <div
      ref={ref}
      className="bg-brandBlue700  flex-col justify-between py-8 my-t shadow-createBox"
    >
      <Container>
        <div className="flex justify-between border-b-[1px] border-footerGrayText pb-7">
          {/* <h2 className="font-gilroy text-xl font-bold">Innosert</h2> */}
          <Image
            src="/logo/logo-innosert.png"
            width={118}
            height={38}
            alt="logo"
          />
          <div className="flex gap-5">
            <FaInstagram className="size-8 fill-neutralWhite cursor-pointer" />
            <PiLinkedinLogoBold className="size-8 fill-neutralWhite cursor-pointer" />
            <RiFacebookBoxLine className="size-8 fill-neutralWhite cursor-pointer" />
          </div>
        </div>

        <div className="flex  flex-col-reverse md:flex-row items-center  gap-20 py-20">
          <iframe
            className="w-[300px] md:w-[400px]"
            src={settingInfo}
            height="290"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="flex flex-wrap gap-8 md:gap-24 items-center justify-center">
            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5">
                Dəstək
              </h6>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5">
                Faydalı linklər
              </h6>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5">
                Şirkətimiz
              </h6>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
            </div>
            <div className="flex flex-col">
              <h6 className="font-gilroy text-base font-medium leading-6 text-neutralWhite pb-5">
                Əlaqə
              </h6>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
              <p className="font-gilroy text-base font-normal leading-6 text-inputBorder">
                Lorem ipsum
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between border-t-[1px] pt-7 border-footerGrayText">
        <p className="text-inputBorder font-gilroy font-normal text-sm leading-6">
  © 2024 İnnocert LLC - All rights reserved{" "}
  <Link href="https://markup.az/" target="_blank" rel="noopener noreferrer">
     by Markup
  </Link>
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
