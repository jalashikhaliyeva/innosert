import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import withModalManagement from "@/shared/hoc/withModalManagement";
import Spinner from "@/components/Spinner";
import { getLandingInfo } from "@/services/getLandingInfo";
import { getSettingInfo } from "@/services/getSettingInfo";
import Container from "@/components/Container";
import ExamCard from "@/components/ExamCard";
import SortTitleExams from "@/components/SortTitleExams";
import HeaderInternal from "@/components/HeaderInternal";
import { UserContext } from "@/shared/context/UserContext";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";

function CategoryPage({ openRegisterModal, openLoginModal }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { category } = router.query;
  console.log(category, "router.query");

  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch exams based on category slug
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://innocert-admin.markup.az/api/exams/${category}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data.data, "data CategoryPage");

        setExams(data.data); // Set the exams from the API response
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (category) {
      fetchExams();
    }
  }, [category]);

  // Function to close both modals
  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
  };

  const handleLoginOrRulesClick = () => {
    if (user) {
      setExamRulesModalOpen(true); // Open exam rules modal if logged in
    } else {
      setLoginModalOpen(true); // Open login modal if not logged in
    }
  };

  return (
    <main>
      <HeaderInternal />

      <section className="my-28">
        <Container>
          <SortTitleExams category={category} />
          {loading ? (
            <Spinner />
          ) : exams?.length > 0 ? (
            <ExamCard
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
              exams={exams} // Pass the dynamic exams data
            />
          ) : (
            <p className="text-center flex items-center justify-center font-gilroy text-lg text-gray-500 pb-72">
              "{category}" kateqoriyası üçün mövcud imtahan yoxdur.
            </p>
          )}
        </Container>
      </section>

      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}
      <Footer />
    </main>
  );
}

export default withModalManagement(CategoryPage);
