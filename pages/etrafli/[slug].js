import React, { useContext, useState } from "react";
import { UserContext } from "@/shared/context/UserContext";
import Header from "@/components/Header";
import HeaderInternal from "@/components/HeaderInternal";
import BreadcrumbHome from "@/components/BreadcumbHome";
import CertificateExampleAbout from "@/components/CertificateExampleAbout";
import CompanyLogoName from "@/components/CompanyLogoName";
import Container from "@/components/Container";
import ExamDetails from "@/components/ExamDetails";
import ExamTitleDescription from "@/components/ExamTitleDescription";
import Footer from "@/components/Footer";
import JoinButtonandPriceExam from "@/components/JoinButtonandPriceExam";
import Spinner from "@/components/Spinner";
import CategoryTagsAbout from "@/components/CategoryTagsAout";
import RegisterModal from "@/components/Register";
import { getSession } from "next-auth/react";

function ExamName({ examData, error }) {
  const { user , token} = useContext(UserContext);
  // console.log(user, "user");

  // State for Register Modal
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  if (error) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!examData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  // console.log(examData, "examData");

  return (
    <>
      {user ? (
        <HeaderInternal />
      ) : (
        <Header openRegisterModal={handleOpenRegisterModal} />
      )}

      <Container>
        <BreadcrumbHome />

        <div className="flex flex-col gap-8 md:flex-row w-full">
          <div className="w-full md:w-[50%]">
            <CompanyLogoName examData={examData} />

            <CategoryTagsAbout examData={examData} />

            <ExamTitleDescription examData={examData} />

            <JoinButtonandPriceExam examData={examData} />
          </div>

          <div className="w-full md:w-[50%] flex justify-end">
            <CertificateExampleAbout />
          </div>
        </div>

        <ExamDetails examData={examData} />
      </Container>

      {/* Render Register Modal */}
      {isRegisterModalOpen && (
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
        />
      )}

      <Footer />
    </>
  );
}

export default ExamName;

export async function getServerSideProps(context) {
  const { slug } = context.params; // Extract slug from the URL parameters

  try {
    const res = await fetch(
      `https://innocert-admin.markup.az/api/exam/${slug}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return {
      props: {
        examData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        examData: null,
        error: true,
      },
    };
  }
}
