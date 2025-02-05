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
import ReactPaginate from "react-paginate";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // 1) If there's no NextAuth session, not logged in => redirect to '/'
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 2) Server-side fetch to check if the user is verified.
  const userResponse = await fetch("https://api.innosert.az/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`, // or wherever your token is stored
    },
  });

  if (!userResponse.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await userResponse.json();

  // 3) If user is unverified => redirect to '/', or /haqqimizda
  if (userData?.data?.sv === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 4) Everything's OK – let them proceed.
  return {
    props: {
      userBalance: userData?.data?.balance || 0,
    },
  };
}

const SubcategoryPage = () => {
  const router = useRouter();
  const { user, token } = useContext(UserContext);
  const { category, subcategory } = router.query;
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "az";

  // State for exams, loading, error and sorting
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(null);

  // States for pagination (ReactPaginate is zero-indexed)
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // States for modals
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Function to close both modals
  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
  };

  const handleLoginOrRulesClick = () => {
    if (token) {
      setExamRulesModalOpen(true); // Open exam rules modal if logged in
    } else {
      setLoginModalOpen(true); // Open login modal if not logged in
    }
  };

  // Handle sorting
  const handleSortOptionClick = (option) => {
    setSortOption(option);
  };

  // Fetch exams from the API based on category, subcategory and current page
  useEffect(() => {
    const fetchExams = async () => {
      if (!category || !subcategory) return; // Wait until both parameters are available

      setLoading(true);
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          throw new Error(t("authentication_token_not_found"));
        }

        // API pages are assumed to be 1-indexed
        const response = await fetch(
          `https://api.innosert.az/api/exams/${category}/${subcategory}?page=${currentPage + 1}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedToken}`,
              "Accept-Language": lang,
            },
          }
        );

        if (!response.ok) {
          throw new Error(t("failed_to_fetch_exams"));
        }

        const data = await response.json();
        setExams(data.data); // Set exams from the API response

        // Set total page count using API pagination metadata
        if (data.meta && data.meta.last_page) {
          setPageCount(data.meta.last_page);
        } else {
          setPageCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch exams:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            t("an_error_occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [category, subcategory, lang, t, currentPage]);

  // Apply sorting based on sortOption for the current page's exams
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
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "old_to_new":
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      default:
        break;
    }
    return sorted;
  }, [exams, sortOption]);

  // Handle page changes from ReactPaginate
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0);
  };

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
            onSortOptionClick={handleSortOptionClick}
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
            <>
              <ExamCard
                exams={sortedExams}
                openLoginModal={handleLoginOrRulesClick}
                openRegisterModal={handleLoginOrRulesClick}
                widthClass="w-[23.8%]"
              />
              {/* Render ReactPaginate only if more than one page is available */}
              {pageCount > 1 && (
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName="flex justify-center items-center gap-2 w-full mt-6"
                  pageClassName="inline-block"
                  pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy"
                  activeClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy"
                  previousClassName={currentPage === 0 ? "text-gray-300" : ""}
                  previousLinkClassName={
                    currentPage === 0 ? "cursor-not-allowed" : ""
                  }
                  previousLinkStyle={
                    currentPage === 0 ? { cursor: "not-allowed" } : {}
                  }
                  nextClassName={
                    currentPage === pageCount - 1 ? "text-gray-300" : ""
                  }
                  nextLinkClassName={
                    currentPage === pageCount - 1 ? "cursor-not-allowed" : ""
                  }
                  nextLinkStyle={
                    currentPage === pageCount - 1
                      ? { cursor: "not-allowed" }
                      : {}
                  }
                />
              )}
            </>
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
