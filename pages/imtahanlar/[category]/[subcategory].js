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

const SubcategoryPage = ({
  openRegisterModal,
  openLoginModal,
  landingInfo: initialLandingInfo,
  settingInfo: initialSettingInfo,
}) => {
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
  const examsPerPage = 8;
  useEffect(() => {
    // Unique list of exams (no duplicates)
    const fetchedExams = [
      {
        id: "microsoft-office-specialist-excel-expert",
        name: "Microsoft Office Specialist Excel Expert",
        duration: "1 saat",
        questions: 30,
        paid: true,
        price: 20,
      },
      {
        id: "certified-project-manager",
        name: "Certified Project Manager",
        duration: "2 saat",
        questions: 50,
        paid: false,
        price: 30,
      },
      {
        id: "advanced-graphic-design",
        name: "Advanced Graphic Design",
        duration: "1.5 saat",
        questions: 40,
        paid: true,
        price: 25,
      },
      {
        id: "full-stack-developer",
        name: "Full Stack Developer",
        duration: "3 saat",
        questions: 60,
        paid: false,
        price: 35,
      },
      {
        id: "data-science-specialist",
        name: "Data Science Specialist",
        duration: "2.5 saat",
        questions: 45,
        paid: true,
        price: 28,
      },
      {
        id: "digital-marketing-expert",
        name: "Digital Marketing Expert",
        duration: "1.2 saat",
        questions: 35,
        paid: false,
        price: 22,
      },
      {
        id: "cyber-security-analyst",
        name: "Cyber Security Analyst",
        duration: "2 saat",
        questions: 40,
        paid: true,
        price: 27,
      },
      {
        id: "cloud-computing-engineer",
        name: "Cloud Computing Engineer",
        duration: "2.5 saat",
        questions: 50,
        paid: false,
        price: 33,
      },
      {
        id: "exam-1",
        name: "Exam 1",
        duration: "2 saat",
        questions: 35,
        paid: false,
        price: 18,
      },
      {
        id: "exam-2",
        name: "Exam 2",
        duration: "3 saat",
        questions: 40,
        paid: true,
        price: 24,
      },
      {
        id: "exam-3",
        name: "Exam 3",
        duration: "1 saat",
        questions: 45,
        paid: false,
        price: 24,
      },
      {
        id: "exam-4",
        name: "Exam 4",
        duration: "2 saat",
        questions: 50,
        paid: true,
        price: 28,
      },
      {
        id: "exam-5",
        name: "Exam 5",
        duration: "3 saat",
        questions: 55,
        paid: false,
        price: 30,
      },
      {
        id: "exam-6",
        name: "Exam 6",
        duration: "1 saat",
        questions: 60,
        paid: true,
        price: 32,
      },
      {
        id: "exam-7",
        name: "Exam 7",
        duration: "2 saat",
        questions: 65,
        paid: false,
        price: 36,
      },
      {
        id: "exam-8",
        name: "Exam 8",
        duration: "3 saat",
        questions: 70,
        paid: true,
        price: 36,
      },
      {
        id: "exam-9",
        name: "Exam 9",
        duration: "1 saat",
        questions: 75,
        paid: false,
        price: 42,
      },
      {
        id: "exam-10",
        name: "Exam 10",
        duration: "2 saat",
        questions: 80,
        paid: true,
        price: 40,
      },
      {
        id: "exam-11",
        name: "Exam 11",
        duration: "3 saat",
        questions: 85,
        paid: false,
        price: 48,
      },
      {
        id: "exam-12",
        name: "Exam 12",
        duration: "1 saat",
        questions: 90,
        paid: true,
        price: 44,
      },
      {
        id: "exam-13",
        name: "Exam 13",
        duration: "2 saat",
        questions: 95,
        paid: false,
        price: 54,
      },
      {
        id: "exam-14",
        name: "Exam 14",
        duration: "3 saat",
        questions: 100,
        paid: true,
        price: 48,
      },
      {
        id: "exam-15",
        name: "Exam 15",
        duration: "1 saat",
        questions: 105,
        paid: false,
        price: 60,
      },
    ];

    setExams(fetchedExams);
  }, []); // Run only once when the component is mounted

  // Pagination logic
  const pageCount = Math.ceil(exams.length / examsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0); // Optional: Scroll to the top after pagination
  };

  const paginateExams = exams.slice(
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
          <ExamCard
            openLoginModal={handleLoginOrRulesClick}
            openRegisterModal={handleLoginOrRulesClick}
            widthClass="w-[23.8%]"
            exams={paginateExams} // Display paginated exams
          />
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
