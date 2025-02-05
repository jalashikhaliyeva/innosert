// pages/kateqoriyalar/[category].jsx

import React, { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import Container from "@/components/Container";
import ExamCard from "@/components/ExamCard";
import SortTitleExams from "@/components/SortTitleExams";
import ReactPaginate from "react-paginate";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import withModalManagement from "@/shared/hoc/withModalManagement";

function CategoryPage({ openRegisterModal, openLoginModal }) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { token } = useContext(UserContext);
  const { category } = router.query;
  const lang = i18n.language || "az";

  // States for exams and pagination
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // react-paginate is zero-indexed
  const [pageCount, setPageCount] = useState(0); // total pages as provided by the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Sorting state (client-side sorting on the current page)
  const [sortOption, setSortOption] = useState(null);

  // States for modals
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // When the category changes, reset the current page to the first one.
  useEffect(() => {
    setCurrentPage(0);
  }, [category]);

  // Fetch exams from API based on category and page number
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        // Note: API page numbers are 1-indexed, so we add 1 to currentPage.
        const response = await fetch(
          `https://api.innosert.az/api/exams/${category}?page=${currentPage + 1}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: storedToken ? `Bearer ${storedToken}` : "",
              "Accept-Language": lang,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data.data, "data CategoryPage");

        // Set the exams (ensure it’s an array)
        if (Array.isArray(data.data)) {
          setExams(data.data);
        } else {
          setExams([]);
        }
        // Use the pagination meta from the API to set total pages
        if (data.meta && data.meta.last_page) {
          setPageCount(data.meta.last_page);
        } else {
          setPageCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch exams:", error);
        setError(
          t("errors.fetch_exams_failed") ||
            "İmtahanlar yüklənərkən bir xəta baş verdi."
        );
        setExams([]);
        setPageCount(0);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchExams();
    }
  }, [category, lang, t, currentPage]);

  // Client-side sorting on the current page’s exams
  const sortedExams = useMemo(() => {
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

  // Handle sort option change
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    // Optionally, reset to the first page when sorting changes
    setCurrentPage(0);
  };

  // Handle pagination clicks from ReactPaginate
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0); // Scroll to the top after page change
  };

  // Function to close both modals
  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
  };

  // Open the exam rules modal if logged in, or login modal if not
  const handleLoginOrRulesClick = () => {
    if (token) {
      setExamRulesModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <main>
      <Head>
        <title>{t("labels.exams")}</title>
      </Head>
      <Header
        openRegisterModal={openRegisterModal}
        scrollToFaq={() => {}}
        scrollToFooter={() => {}}
        scrollToCertificate={() => {}}
      />

      <section className="my-28">
        <Container>
          <SortTitleExams
            category={category}
            onSortOptionClick={handleSortOptionClick}
          />

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-center font-gilroy text-lg text-red-500 py-20">
              {error}
            </p>
          ) : sortedExams.length > 0 ? (
            <>
              <ExamCard
                openLoginModal={handleLoginOrRulesClick}
                openRegisterModal={handleLoginOrRulesClick}
                widthClass="w-[23.8%]"
                exams={sortedExams} // Use the (sorted) exams from the current API page
              />
              {/* Render pagination only if there is more than one page */}
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
            <p className="text-center font-gilroy text-lg text-gray-500 py-20">
              &quot;{category}&quot; kateqoriyası üçün mövcud imtahan yoxdur.
            </p>
          )}
        </Container>
      </section>

      {/* Modals */}
      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}

      <Footer />
    </main>
  );
}

export default withModalManagement(CategoryPage);
