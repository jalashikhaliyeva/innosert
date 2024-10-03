import React, { useContext, useEffect, useState } from "react";
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

function CategoryPage({ openRegisterModal, openLoginModal }) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { category } = router.query;
  const [exams, setExams] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const examsPerPage = 8;
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
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
      {
        id: "exam-16",
        name: "Exam 16",
        duration: "2 saat",
        questions: 110,
        paid: true,
        price: 52,
      },
      {
        id: "exam-17",
        name: "Exam 17",
        duration: "3 saat",
        questions: 115,
        paid: false,
        price: 66,
      },
      {
        id: "exam-18",
        name: "Exam 18",
        duration: "1 saat",
        questions: 120,
        paid: true,
        price: 56,
      },
      {
        id: "exam-19",
        name: "Exam 19",
        duration: "2 saat",
        questions: 125,
        paid: false,
        price: 72,
      },
      {
        id: "exam-20",
        name: "Exam 20",
        duration: "3 saat",
        questions: 130,
        paid: true,
        price: 60,
      },
      {
        id: "exam-21",
        name: "Exam 21",
        duration: "1 saat",
        questions: 135,
        paid: false,
        price: 78,
      },
      {
        id: "exam-22",
        name: "Exam 22",
        duration: "2 saat",
        questions: 140,
        paid: true,
        price: 64,
      },
      {
        id: "exam-23",
        name: "Exam 23",
        duration: "3 saat",
        questions: 145,
        paid: false,
        price: 84,
      },
      {
        id: "exam-24",
        name: "Exam 24",
        duration: "1 saat",
        questions: 150,
        paid: true,
        price: 68,
      },
      {
        id: "exam-25",
        name: "Exam 25",
        duration: "2 saat",
        questions: 155,
        paid: false,
        price: 90,
      },
      {
        id: "exam-26",
        name: "Exam 26",
        duration: "3 saat",
        questions: 160,
        paid: true,
        price: 72,
      },
      {
        id: "exam-27",
        name: "Exam 27",
        duration: "1 saat",
        questions: 165,
        paid: false,
        price: 96,
      },
      {
        id: "exam-28",
        name: "Exam 28",
        duration: "2 saat",
        questions: 170,
        paid: true,
        price: 76,
      },
      {
        id: "exam-29",
        name: "Exam 29",
        duration: "3 saat",
        questions: 175,
        paid: false,
        price: 102,
      },
      {
        id: "exam-30",
        name: "Exam 30",
        duration: "1 saat",
        questions: 180,
        paid: true,
        price: 80,
      },
      {
        id: "exam-31",
        name: "Exam 31",
        duration: "2 saat",
        questions: 185,
        paid: false,
        price: 108,
      },
      {
        id: "exam-32",
        name: "Exam 32",
        duration: "3 saat",
        questions: 190,
        paid: true,
        price: 84,
      },
      {
        id: "exam-33",
        name: "Exam 33",
        duration: "1 saat",
        questions: 195,
        paid: false,
        price: 114,
      },
      {
        id: "exam-34",
        name: "Exam 34",
        duration: "2 saat",
        questions: 200,
        paid: true,
        price: 88,
      },
      {
        id: "exam-35",
        name: "Exam 35",
        duration: "3 saat",
        questions: 205,
        paid: false,
        price: 120,
      },
      {
        id: "exam-36",
        name: "Exam 36",
        duration: "1 saat",
        questions: 210,
        paid: true,
        price: 92,
      },
      {
        id: "exam-37",
        name: "Exam 37",
        duration: "2 saat",
        questions: 215,
        paid: false,
        price: 126,
      },
      {
        id: "exam-38",
        name: "Exam 38",
        duration: "3 saat",
        questions: 220,
        paid: true,
        price: 96,
      },
      {
        id: "exam-39",
        name: "Exam 39",
        duration: "1 saat",
        questions: 225,
        paid: false,
        price: 132,
      },
      {
        id: "exam-40",
        name: "Exam 40",
        duration: "2 saat",
        questions: 230,
        paid: true,
        price: 100,
      },
      {
        id: "exam-41",
        name: "Exam 41",
        duration: "3 saat",
        questions: 235,
        paid: false,
        price: 138,
      },
      {
        id: "exam-42",
        name: "Exam 42",
        duration: "1 saat",
        questions: 240,
        paid: true,
        price: 104,
      },
      {
        id: "exam-43",
        name: "Exam 43",
        duration: "2 saat",
        questions: 245,
        paid: false,
        price: 144,
      },
      {
        id: "exam-44",
        name: "Exam 44",
        duration: "3 saat",
        questions: 250,
        paid: true,
        price: 108,
      },
      {
        id: "exam-45",
        name: "Exam 45",
        duration: "1 saat",
        questions: 255,
        paid: false,
        price: 150,
      },
      {
        id: "exam-46",
        name: "Exam 46",
        duration: "2 saat",
        questions: 260,
        paid: true,
        price: 112,
      },
      {
        id: "exam-47",
        name: "Exam 47",
        duration: "3 saat",
        questions: 265,
        paid: false,
        price: 156,
      },
      {
        id: "exam-48",
        name: "Exam 48",
        duration: "1 saat",
        questions: 270,
        paid: true,
        price: 116,
      },
      {
        id: "exam-49",
        name: "Exam 49",
        duration: "2 saat",
        questions: 275,
        paid: false,
        price: 162,
      },
      {
        id: "exam-50",
        name: "Exam 50",
        duration: "3 saat",
        questions: 280,
        paid: true,
        price: 120,
      },
      {
        id: "exam-51",
        name: "Exam 51",
        duration: "1 saat",
        questions: 285,
        paid: false,
        price: 168,
      },
      {
        id: "exam-52",
        name: "Exam 52",
        duration: "2 saat",
        questions: 290,
        paid: true,
        price: 124,
      },
      {
        id: "exam-53",
        name: "Exam 53",
        duration: "3 saat",
        questions: 295,
        paid: false,
        price: 174,
      },
      {
        id: "exam-54",
        name: "Exam 54",
        duration: "1 saat",
        questions: 300,
        paid: true,
        price: 128,
      },
      {
        id: "exam-55",
        name: "Exam 55",
        duration: "2 saat",
        questions: 305,
        paid: false,
        price: 180,
      },
    ];

    setExams(fetchedExams);
  }, []); // Run only once when the component is mounted

  // Calculate the total number of pages
  const pageCount = Math.ceil(exams.length / examsPerPage);

  // Handle page click event
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0); // Optional: Scroll to the top after pagination
  };

  // Slice the exams to display based on current page
  const paginateExams = exams.slice(
    currentPage * examsPerPage,
    (currentPage + 1) * examsPerPage
  );

  // Check if exams exist, if not show the spinner
  if (!exams.length) {
    return <Spinner />;
  }
  // Function to open the ExamRulesModal
  const openExamRulesModal = () => {
    setExamRulesModalOpen(true);
  };

  // Function to open the LoginModal
  const openLoginModalFunc = () => {
    setLoginModalOpen(true);
  };

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
    <main>
      <Header
        openRegisterModal={openRegisterModal}
        scrollToFaq={() => {}}
        scrollToFooter={() => {}}
        scrollToCertificate={() => {}}
      />

      <section className="my-28">
        <Container>
          <SortTitleExams category={category} />
          {/* Rendering only the current page of exams */}
          <ExamCard
             openLoginModal={handleLoginOrRulesClick}
             openRegisterModal={handleLoginOrRulesClick}
            widthClass="w-[23.8%]"
            exams={paginateExams} // Display paginated exams
          />
          {/* Pagination */}
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={
                <span
                  className={`${currentPage === 0 ? "cursor-not-allowed" : ""}`}
                >
                  {"<"}
                </span>
              }
              nextLabel={
                <span
                  className={`${
                    currentPage === pageCount - 1 ? "cursor-not-allowed" : ""
                  }`}
                >
                  {">"}
                </span>
              }
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName={"flex justify-center mt-8 space-x-2"}
              pageClassName={`px-3 py-1 bg-gray-200 font-gilroy rounded cursor-pointer hover:bg-gray-300`} // Added hover effect and ensured the entire box is clickable
              activeClassName={"bg-blue-500 font-gilroy text-white"} // Style for active page
              previousClassName={`${
                currentPage === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              nextClassName={`${
                currentPage === pageCount - 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              breakClassName={"px-3 py-1"}
              disabledClassName={"text-gray-400  cursor-not-allowed"}
            />
          )}
        </Container>
      </section>
      {/* <ExamRulesModal /> */}
      {/* Modals */}
      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}

      <Footer />
    </main>
  );
}

export default CategoryPage;
