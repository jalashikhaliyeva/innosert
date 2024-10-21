import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import ExamCard from "@/components/ExamCard";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyProfiles from "@/components/MyProfiles";
import Sidebar from "@/components/Sidebar";
import TitleExamsPage from "@/components/TitleExamsPage";
import { useSavedExams } from "@/shared/context/SavedExamsContext";

function Imtahanlarim() {
  const { savedExams } = useSavedExams(); // Use saved exams from context

  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState("paid"); // State to track active tab

  useEffect(() => {
    // In a real application, you might fetch this data from an API
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
    ];

    setExams(fetchedExams);
  }, []);
  // Filter exams based on the active tab
  const filteredExams =
    activeTab === "paid"
      ? exams.filter((exam) => exam.paid) // Show paid exams
      : savedExams; // Show saved exams from context

  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block  md:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            {/* <TitleNavigation /> */}
            <TitleExamsPage activeTab={activeTab} setActiveTab={setActiveTab} />
            <ExamCard widthClass="w-[31.4%]" exams={filteredExams} />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Imtahanlarim;





