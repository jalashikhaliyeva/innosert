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
import { useTranslation } from 'react-i18next';
function Imtahanlarim() {
  const { t } = useTranslation();
  const { savedExams } = useSavedExams();
  const [exams, setExams] = useState([]);
  const [activeTab, setActiveTab] = useState("paid");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://innocert-admin.markup.az/api/me/get-paid-exam",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.status) {
          setExams(result.data);
        } else {
          console.error("Failed to fetch exams:", result.message);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const filteredExams =
    activeTab === "paid" ? exams.filter((exam) => exam.paid) : savedExams;

  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block md:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <TitleExamsPage activeTab={activeTab} setActiveTab={setActiveTab} />
            {filteredExams.length > 0 ? (
              <ExamCard widthClass="w-[31.4%]" exams={filteredExams} />
            ) : (
              <p className="text-neutral700 text-lg font-gilroy mt-4 flex justify-center items-center">
              {activeTab === "paid"
                ? t('messages.noPaidExam')
                : t('messages.noSelectedExam')}
            </p>
            )}
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Imtahanlarim;
