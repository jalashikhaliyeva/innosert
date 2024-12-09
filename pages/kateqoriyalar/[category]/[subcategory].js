// pages/kateqoriyalar/[category]/[subcategory].jsx

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import withModalManagement from "@/shared/hoc/withModalManagement";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import ExamCard from "@/components/ExamCard";
import SortTitleExams from "@/components/SortTitleExams";
import { UserContext } from "@/shared/context/UserContext";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import Head from "next/head";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there is no NextAuth session, redirect to the index page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, proceed with the page rendering
  return {
    props: {
      // You can pass any additional props here
    },
  };
}
const SubcategoryPage = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { category, subcategory } = router.query;
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "az";

  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(null); // New sort state

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

  // Handle sorting
  const handleSortOptionClick = (option) => {
    setSortOption(option);
  };

  // Fetch exams based on category and subcategory slugs
  useEffect(() => {
    const fetchExams = async () => {
      if (!category || !subcategory) return; // Wait until category and subcategory are available

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(t("authentication_token_not_found"));
        }

        const response = await fetch(
          `https://innocert-admin.markup.az/api/exams/${category}/${subcategory}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "Accept-Language": lang,
            },
          }
        );

        if (!response.ok) {
          throw new Error(t("failed_to_fetch_exams"));
        }

        const data = await response.json();
        console.log(data.data, "data SubcategoryPage");

        setExams(data.data); // Set exams from the API response
      } catch (error) {
        console.error("Failed to fetch exams:", error);
        setError(
          error.response?.data?.message || error.message || t("an_error_occurred")
        );
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchExams();
  }, [category, subcategory, lang, t]);

  // Apply sorting based on sortOption
  const sortedExams = React.useMemo(() => {
    if (!sortOption) return exams;

    const sorted = [...exams];
    switch (sortOption) {
      case "price_low_high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_high_low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "new_to_old":
        sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        break;
      case "old_to_new":
        sorted.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [exams, sortOption]);

  return (
    <div>
      <Head>
        <title>{t("categories")}</title>
      </Head>
      <HeaderInternal />

      <section className="my-28">
        <Container>
          <SortTitleExams
            category={subcategory}
            onSortOptionClick={handleSortOptionClick} // Pass the handler here
          />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : sortedExams?.length > 0 ? (
            <ExamCard
              exams={sortedExams} // Pass the sorted exams
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
            />
          ) : (
            <p className="text-center flex items-center justify-center font-gilroy text-lg text-gray-500 pb-72">
              &quot;{subcategory}&quot; {t("no_exams_available_for_category")}
            </p>
          )}
        </Container>
      </section>

      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}
      <Footer />
    </div>
  );
};

export default withModalManagement(SubcategoryPage);
