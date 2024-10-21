import BreadcrumbHome from "@/components/BreadcumbHome";
import CategoryTagsAbout from "@/components/CategoryTagsAout";
import CertificateExampleAbout from "@/components/CertificateExampleAbout";
import CompanyLogoName from "@/components/CompanyLogoName";
import Container from "@/components/Container";
import ExamDetails from "@/components/ExamDetails";
import ExamTitleDescription from "@/components/ExamTitleDescription";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import JoinButtonandPriceExam from "@/components/JoinButtonandPriceExam";
import React, { useRef } from "react";

function ExamName() {
  const footerRef = useRef(null);
  return (
    <>
      <HeaderInternal />
      <Container>
        <BreadcrumbHome />
        <div className="flex flex-col gap-8 md:flex-row w-full">
          <div className="w-full md:w-[50%]">
            <CompanyLogoName />
            <CategoryTagsAbout />
            <ExamTitleDescription />
            <JoinButtonandPriceExam />
          </div>
          <div className="w-full md:w-[50%] flex justify-end">
            <CertificateExampleAbout />
          </div>
        </div>
        <ExamDetails />
      </Container>
      <Footer />
    </>
  );
}

export default ExamName;
