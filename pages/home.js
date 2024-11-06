// Home.jsx

import React, { useContext, useEffect, useMemo, useState } from "react";
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
import axios from "axios";
import Spinner from "@/components/Spinner";

function Home() {
  const {
    user,
    selectedCategory,
    selectedSubcategory,
    filteredExams,
    setPrivateExam,
    privateExam,
    searchExam, // Access search results from context
    setSearchExam,
  } = useContext(UserContext);

  console.log(searchExam, "searchExam");
  const combinedList = [
    ...(selectedCategory || []).map((cat) => ({
      name: cat.name,
      type: "category",
      id: cat.id,
      slug: cat.slug || "", // Ensure slug is set here
    })),
    ...(selectedSubcategory || []).map((sub) => ({
      name: sub.name,
      type: "subcategory",
      id: sub.id,
      slug: sub.slug || "", // Ensure slug is set here
    })),
  ];
  
  const [allExams, setAllExams] = useState({});
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
  };

  const handleLoginOrRulesClick = () => {
    if (user) {
      setExamRulesModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await axios.get(
          "https://innocert-admin.markup.az/api/get-all-exams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAllExams(response.data.exams);
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

  const groupExamsByCategory = (exams) => {
    const grouped = {};
    exams.forEach((exam) => {
      const categoryName = exam.category?.name || "Uncategorized";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(exam);
    });
    return grouped;
  };

  const displayedExamsByCategory = useMemo(() => {
    if (filteredExams === null) {
      return allExams;
    }
    if (filteredExams.length === 0) {
      return {}; // No exams match the filters
    }
    return groupExamsByCategory(filteredExams);
  }, [filteredExams, allExams]);

  if (loading) {
    return (
      <>
        <HeaderInternal />
        <Container>
          <div className="flex justify-center items-center h-screen">
            <Spinner />
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
        <div className="mt-32 flex flex-row w-full justify-between items-start">
          <MostViwedExams />
          <EnterExamCode />
        </div>


        {searchExam && searchExam.length > 0 ? (
          <div className="mt-8">
            <ExamCard
              exams={searchExam}
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]" // Adjust width as needed
            />
          </div>
        ) : privateExam ? (
          <div className="mt-8">
            <ExamCard
              exams={[privateExam]}
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
            />
          </div>
        ) : (
          <>
            <FilterCategories />
            {filteredExams !== null && filteredExams.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-xl">
                  Heç bir imtahan tapılmadı.
                </p>
              </div>
            ) : Object.keys(displayedExamsByCategory).length > 0 ? (
              Object.keys(displayedExamsByCategory).map((category) => {
                const isUncategorized =
                  category.toLowerCase() === "uncategorized";

                return (
                  <div key={category} className="mt-8">
                    {!isUncategorized && (
                      <TitleCategoryExams combinedList={combinedList} categoryName={category} />
                    )}
                    <ExamCard
                      exams={displayedExamsByCategory[category]}
                      openLoginModal={handleLoginOrRulesClick}
                      openRegisterModal={handleLoginOrRulesClick}
                      widthClass="w-[23.8%]"
                    />
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 text-xl">
                  Heç bir imtahan tapılmadı.
                </p>
              </div>
            )}
          </>
        )}
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
