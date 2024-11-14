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
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
function Home() {
  const {
    user,
    selectedCategory,
    selectedSubcategory,
    filteredExams,
    setPrivateExam,
    privateExam,
    searchExam,
    setSearchExam,
  } = useContext(UserContext);
  const router = useRouter();
  const lang = router.locale || "az"; // Default to "az" if locale is not set
  const { t } = useTranslation();
  const [allExams, setAllExams] = useState({});
  const [mostViewedExams, setMostViewedExams] = useState({});
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0); // react-paginate uses zero-based indexing
  const itemsPerPage = 4; // Show 4 categories per page

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
              "Accept-Language": lang,
            },
          }
        );

        if (response.status === 200) {
          setAllExams(response.data.exams);
          setMostViewedExams(response.data.most_view);
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
  }, [lang]);

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

  const categoryNames = Object.keys(displayedExamsByCategory);
  const pageCount = Math.ceil(categoryNames.length / itemsPerPage);

  const handlePageClick = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };

  const paginatedCategoryNames = categoryNames.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
          <MostViwedExams mostViewedExams={mostViewedExams} />
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
                <p className="text-gray-500 text-xl">{t("no_exams_found")}</p>
              </div>
            ) : paginatedCategoryNames.length > 0 ? (
              paginatedCategoryNames.map((category) => {
                const isUncategorized =
                  category.toLowerCase() === "uncategorized";

                return (
                  <div key={category} className="mt-8">
                    {!isUncategorized && (
                      <TitleCategoryExams
                        combinedList={combinedList}
                        categoryName={category}
                      />
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
                <p className="text-gray-500 text-xl">{t("no_exams_found")}</p>
              </div>
            )}

            {pageCount > 1 && (
              <div className="flex justify-center mt-8">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName="flex justify-center items-center gap-2 w-full"
                  pageClassName="inline-block"
                  pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy"
                  activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy"
                  previousClassName={currentPage === 0 ? "text-gray-300" : ""}
                  previousLinkClassName={
                    currentPage === 0 ? "cursor-not-allowed" : ""
                  }
                  nextClassName={
                    currentPage === pageCount - 1 ? "text-gray-300" : ""
                  }
                  nextLinkClassName={
                    currentPage === pageCount - 1 ? "cursor-not-allowed" : ""
                  }
                />
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
