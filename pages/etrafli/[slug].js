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
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

function ExamName() {
  const footerRef = useRef(null);
  const router = useRouter();
  const { slug } = router.query;
  console.log(router.query, "slu");
  
  
  const [examData, setExamData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const res = await fetch(`https://innocert-admin.markup.az/api/exam/${slug}`);
          if (!res.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await res.json();
          setExamData(data);
          
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(true);
        }
      };

      fetchData();
    }
  }, [slug]);

  if (error) {
    return <div>Error loading exam details. Please try again later.</div>;
  }

  if (!examData) {
    return <div>Loading...</div>;
  }
  console.log(examData, "examData");



  return (
    <>
      <HeaderInternal />
      <Container>
        <BreadcrumbHome />
        <div className="flex flex-col gap-8 md:flex-row w-full">
          <div className="w-full md:w-[50%]">
            <CompanyLogoName  examData={examData} />
            <CategoryTagsAbout  examData={examData}  />
            <ExamTitleDescription  examData={examData}  />
            <JoinButtonandPriceExam  examData={examData}   />
          </div>
          <div className="w-full md:w-[50%] flex justify-end">
            <CertificateExampleAbout />
          </div>
        </div>
        <ExamDetails   examData={examData} />
      </Container>
      <Footer />
    </>
  );
}

export default ExamName;
