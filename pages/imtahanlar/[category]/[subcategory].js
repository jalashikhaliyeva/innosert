// pages/kateqoriyalar/[category]/[subcategory].jsx

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import withModalManagement from "@/shared/hoc/withModalManagement";
import Spinner from "@/components/Spinner";
import { getLandingInfo } from "@/services/getLandingInfo";
import { getSettingInfo } from "@/services/getSettingInfo";
import Container from "@/components/Container";
import ExamCard from "@/components/ExamCard";
import SortTitleExams from "@/components/SortTitleExams";
import ReactPaginate from "react-paginate";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const SubcategoryPage = ({
  openRegisterModal,
  openLoginModal,
  landingInfo: initialLandingInfo,
  settingInfo: initialSettingInfo,
}) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { user, token } = useContext(UserContext);
  const { category, subcategory } = router.query;

  const faqRef = useRef(null);
  const footerRef = useRef(null);
  const certificateRef = useRef(null);

  const [landingInfo, setLandingInfo] = useState(initialLandingInfo);
  const [settingInfo, setSettingInfo] = useState(initialSettingInfo);
  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // react-paginate is zero-indexed
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(null);

  const lang = i18n.language || "az";

  // Fetch exams from the API based on category, subcategory, and page number
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const storedToken =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        const response = await fetch(
          `https://api.innosert.az/api/exams/${category}/${subcategory}?page=${
            currentPage + 1
          }`,
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
        console.log(data.data, "data SubcategoryPage");

        // Set exams from the API response (ensure it’s an array)
        if (Array.isArray(data.data)) {
          setExams(data.data);
        } else {
          setExams([]);
        }
        // Set the total page count using the API's pagination metadata
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

    if (category && subcategory) {
      fetchExams();
    }
  }, [category, subcategory, lang, t, currentPage]);

  // Fetch landing and setting info (if needed)
  useEffect(() => {
    const fetchData = async (locale) => {
      try {
        const landingData = await getLandingInfo(locale);
        const settingData = await getSettingInfo(locale);

        const mappedSlides = settingData.category?.map((item) => ({
          imageSrc: item.image,
          text: item.name,
        }));

        setLandingInfo(landingData);
        setSettingInfo({
          slides: mappedSlides,
          map: settingData?.contact?.map,
        });
      } catch (error) {
        console.error("Failed to fetch landing or setting info:", error);
      }
    };

    if (router.locale) {
      fetchData(router.locale);
    }
  }, [router.locale]);

  // Handle sorting on the current page's exams
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setCurrentPage(0); // Reset to first page when sorting changes
  };

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

  // Handle page changes via ReactPaginate
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0);
  };

  if (!landingInfo || !settingInfo) {
    return <Spinner />;
  }

  // Function to close both modals
  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
  };

  const handleLoginOrRulesClick = () => {
    if (token) {
      setExamRulesModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <div>
      <Head>
        <title>{t("labels.exams")}</title>
      </Head>
      <Header
        openRegisterModal={openRegisterModal}
        scrollToFaq={() =>
          faqRef.current.scrollIntoView({ behavior: "smooth" })
        }
        scrollToFooter={() =>
          footerRef.current.scrollIntoView({ behavior: "smooth" })
        }
        scrollToCertificate={() =>
          certificateRef.current.scrollIntoView({ behavior: "smooth" })
        }
      />

      <section className="my-28">
        <Container>
          <SortTitleExams
            category={subcategory}
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
                exams={sortedExams} // Use the (sorted) exams returned from the API
              />
              {/* Render pagination if there is more than one page */}
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
              &quot;{subcategory}&quot; kateqoriyası üçün mövcud imtahan yoxdur.
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
    </div>
  );
};

// Fetch landing and setting info on the server side
export async function getServerSideProps(context) {
  const lang = context.locale || "az";
  try {
    const landingInfo = await getLandingInfo(lang);
    const settingInfo = await getSettingInfo(lang);

    const mappedSlides = settingInfo.category?.map((item) => ({
      imageSrc: item.image,
      text: item.name,
    }));

    return {
      props: {
        landingInfo,
        settingInfo: {
          slides: mappedSlides,
          map: settingInfo?.contact?.map,
        },
      },
    };
  } catch (error) {
    console.error("Failed to fetch landing or setting info:", error);
    return {
      props: {
        landingInfo: null,
        settingInfo: null,
      },
    };
  }
}

export default withModalManagement(SubcategoryPage);
