import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import EnterExamCode from "@/components/EnterExamCode";
import ExamCard from "@/components/ExamCard";
import ExamRulesModal from "@/components/ExamRulesModal";
import FilterCategories from "@/components/FilterExams";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import LoginModal from "@/components/Login";
import MostViwedExams from "@/components/MostViewedExams";
import MyProfiles from "@/components/MyProfiles";
import Sidebar from "@/components/Sidebar";
import TitleCategoryExams from "@/components/TitleCategoryExams";
import { UserContext } from "@/shared/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
function Home() {
  const { user } = useContext(UserContext);
  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  useEffect(() => {
    // In a real application, you might fetch this data from an API
    const fetchedExams = [
      {
        id: 'microsoft-office-specialist-excel-expert',
        name: 'Microsoft Office Specialist Excel Expert',
        duration: '1 saat',
        questions: 30,
        paid: true,
        price: 20,
      },
      {
        id: 'certified-project-manager',
        name: 'Certified Project Manager',
        duration: '2 saat',
        questions: 50,
        paid: false,
        price: 30,
      },
      {
        id: 'advanced-graphic-design',
        name: 'Advanced Graphic Design',
        duration: '1.5 saat',
        questions: 40,
        paid: true,
        price: 25,
      },
      {
        id: 'full-stack-developer',
        name: 'Full Stack Developer',
        duration: '3 saat',
        questions: 60,
        paid: false,
        price: 35,
      },
    
    ];

    setExams(fetchedExams);
  }, []);


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
    <>
      <HeaderInternal />
      <Container>
        <div className="mt-32 flex flex-row w-full justify-between">
          <MostViwedExams />
          <EnterExamCode />
        </div>
        <FilterCategories />
        <TitleCategoryExams />
        <ExamCard   openLoginModal={handleLoginOrRulesClick}
            openRegisterModal={handleLoginOrRulesClick}  exams={exams} widthClass="w-[77%] md:w-[23.8%]" />
        <TitleCategoryExams />
        <ExamCard   openLoginModal={handleLoginOrRulesClick}
            openRegisterModal={handleLoginOrRulesClick}  exams={exams} widthClass="w-[23.8%]" />
        <TitleCategoryExams />
        <ExamCard   openLoginModal={handleLoginOrRulesClick}
            openRegisterModal={handleLoginOrRulesClick}  exams={exams} widthClass="w-[23.8%]" />
      </Container>

      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}
      <Footer />
    </>
  );
}

export default Home;
