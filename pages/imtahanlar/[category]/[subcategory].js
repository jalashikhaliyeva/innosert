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
import ReactPaginate from "react-paginate";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { useTranslation } from "react-i18next";
const SubcategoryPage = ({
  openRegisterModal,
  openLoginModal,
  landingInfo: initialLandingInfo,
  settingInfo: initialSettingInfo,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { category, subcategory } = router.query;

  const faqRef = useRef(null);
  const footerRef = useRef(null);
  const certificateRef = useRef(null);

  const [landingInfo, setLandingInfo] = useState(initialLandingInfo);
  const [settingInfo, setSettingInfo] = useState(initialSettingInfo);
  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const examsPerPage = 8;
  // Fetch exams based on category and subcategory slugs
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://innocert-admin.markup.az/api/exams/${category}/${subcategory}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data.data, "data SubcategoryPage");

        setExams(data.data); // Set exams from the API response
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    if (category && subcategory) {
      fetchExams();
    }
  }, [category, subcategory]);

  // Pagination logic
  const pageCount = Math.ceil(exams?.length / examsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0); // Optional: Scroll to the top after pagination
  };

  const paginateExams = exams?.slice(
    currentPage * examsPerPage,
    (currentPage + 1) * examsPerPage
  );

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

  if (!landingInfo || !settingInfo) {
    return <Spinner />;
  }

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
    <div>
      <Head>
        <title>{t("labels.exams")}</title>
        {/* <meta name="description" content={landingInfo?.metatags?.meta_desc} />
        <meta
          name="keywords"
          content={landingInfo?.metatags?.meta_keywords || "default, keywords"}
        /> */}
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
          <SortTitleExams category={subcategory} />

          {loading ? (
            <Spinner />
          ) : paginateExams?.length > 0 ? (
            <ExamCard
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
              exams={paginateExams} // Display paginated exams
            />
          ) : (
            <p className="text-center flex items-center justify-center font-gilroy text-lg text-gray-500 pb-72">
              &quot;{subcategory}&quot; kateqoriyası üçün mövcud imtahan yoxdur.
            </p>
          )}

          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex justify-center items-center gap-2 w-full"
              pageClassName="inline-block" // Minimal styling on li elements
              pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy" // Apply styles to a elements
              activeClassName="" // Remove active styles from li elements
              activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy" // Active styles on a elements
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
                currentPage === pageCount - 1 ? { cursor: "not-allowed" } : {}
              }
            />
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

// Fetch landing and setting info on server side
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
