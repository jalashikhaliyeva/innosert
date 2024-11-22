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
import Head from "next/head";

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
  // Load More state
  const [visibleCategories, setVisibleCategories] = useState(4); // Show 4 categories initially
  const itemsPerLoad = 4; // Number of categories to load each time

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

  useEffect(() => {
    // Reset visible categories when exams change
    setVisibleCategories(4);
  }, [filteredExams]);

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
  const paginatedCategoryNames = categoryNames.slice(0, visibleCategories);

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
      <Head>
        <title>{t("ana səhifə")}</title>
        {/* <meta name="description" content={landingInfo?.metatags?.meta_desc} />
        <meta
          name="keywords"
          content={landingInfo?.metatags?.meta_keywords || "default, keywords"}
        /> */}
      </Head>
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

            {categoryNames.length > visibleCategories && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() =>
                    setVisibleCategories(visibleCategories + itemsPerLoad)
                  }
                  className="flex items-center justify-center gap-2 p-3 h-11 text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary whitespace-nowrap"
                >
                  {t("loadMore")}
                </button>
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
