import React from "react";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookBoxLine } from "react-icons/ri";
import { PiLinkedinLogoBold } from "react-icons/pi";
function Footer() {
  return (
    <div className="bg-grayBox rounded-2xl flex-col justify-between py-8 px-16">
      <div className="flex justify-between border-b-2 border-grayLineFooter pb-7">
        <h2 className="font-gilroy text-xl font-bold">Innosert</h2>
        <div className="flex gap-5">
          <FaInstagram className="size-8" />
          <PiLinkedinLogoBold className="size-8" />
          <RiFacebookBoxLine className="size-8" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-20 py-20 ">
        <div className="flex flex-col">
          <h6 className="font-gilroy text-base font-medium leading-6 text-textSecondaryDefault pb-5">
            Dəstək
          </h6>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
        </div>
        <div className="flex flex-col">
          <h6 className="font-gilroy text-base font-medium leading-6 text-textSecondaryDefault pb-5">
            Faydalı linklər
          </h6>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
        </div>
        <div className="flex flex-col">
          <h6 className="font-gilroy text-base font-medium leading-6 text-textSecondaryDefault pb-5">
            Şirkətimiz
          </h6>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
        </div>
        <div className="flex flex-col">
          <h6 className="font-gilroy text-base font-medium leading-6 text-textSecondaryDefault pb-5">
            Əlaqə
          </h6>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
          <p className="font-gilroy text-base font-normal leading-6 text-footerGrayText">
            Lorem ipsum
          </p>
        </div>
      </div>
      <div className="flex justify-between border-t-2 pt-7 border-grayLineFooter">
        <p className="text-footerDarkGrayText font-gilroy font-normal text-sm leading-6">
          © 2024 İnnocert LLC - All rights reserved
        </p>
        <p className="text-footerDarkGrayText font-gilroy font-normal text-sm leading-6">
          Help Center
        </p>
        <p className="text-footerDarkGrayText font-gilroy font-normal text-sm leading-6">
          Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Footer;
