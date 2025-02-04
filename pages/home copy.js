// Home.jsx
import React, { useContext, useEffect, useState } from "react";
import HeaderInternal from "@/components/HeaderInternal";
import Container from "@/components/Container";
import MostViwedExams from "@/components/MostViewedExams";
import EnterExamCode from "@/components/EnterExamCode";
import FilterCategories from "@/components/FilterExams";
import TitleCategoryExams from "@/components/TitleCategoryExams";
import ExamCard from "@/components/ExamCard";
import Footer from "@/components/Footer";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import { UserContext } from "@/shared/context/UserContext";
import axios from "axios"; // Using axios for HTTP requests
import Spinner from "@/components/Spinner";

function Home() {
  const { user, selectedCategory, selectedSubcategory } =
    useContext(UserContext);

  const combinedList = [
    ...(selectedCategory || []).map((cat) => ({
      name: cat.name,
      type: "category",
      id: cat.id,
      slug: cat.slug, // assuming slug is available in category data
    })),
    ...(selectedSubcategory || []).map((sub) => ({
      name: sub.name,
      type: "subcategory",
      id: sub.id,
      slug: sub.slug, // assuming slug is available in subcategory data
    })),
  ];
  // console.log(combinedList, "combinedList home");

  const [examsByCategory, setExamsByCategory] = useState({});
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token"); // Adjust the key if different
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await axios.get(
          "https://api.innosert.az/api/get-all-exams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data.exams;
          setExamsByCategory(data);
        } else {
          throw new Error("Failed to fetch exams.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while fetching exams.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return (
      <>
        <HeaderInternal />
        <Container>
          <div className="flex justify-center items-center h-screen">
            <p>
              <Spinner />
            </p>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderInternal />
        <Container>
          <div className="flex justify-center items-center h-screen">
            <p className="text-red-500">{error}</p>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <HeaderInternal />
      <Container>
        <div className="mt-32 flex flex-row w-full justify-between">
          <MostViwedExams />
          <EnterExamCode />
        </div>
        <FilterCategories />
        {/* Dynamically render categories and their exams */}
        {Object.keys(examsByCategory).map((category) => (
          <div key={category}>
            <TitleCategoryExams
              combinedList={combinedList}
              categoryName={category}
            />
            <ExamCard
              exams={examsByCategory[category]}
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
            />
          </div>
        ))}
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
