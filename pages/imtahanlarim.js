// src/pages/Imtahanlarim.jsx
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
import { useTranslation } from "react-i18next";
import LoginModal from "@/components/Login";
import ExamRulesModal from "@/components/ExamRulesModal";
import Head from "next/head";
import { getSession } from "next-auth/react";

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

  // 2) Server-side fetch to check if the user is verified
  const userResponse = await fetch("https://api.innosert.az/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!userResponse.ok) {
    // If the fetch fails, treat it like "not verified"
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await userResponse.json();

  // 3) If user is unverified => redirect to '/'
  if (userData?.data?.sv === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 4) If everything's OK, let them proceed
  return {
    props: {
      // pass anything you want to the component
      userBalance: userData?.data?.balance || 0,
    },
  };
}

function Imtahanlarim() {
  const { t } = useTranslation();
  const { savedExams } = useSavedExams();

  // State for exams:
  // "exams" will hold the fetched paid exams.
  const [exams, setExams] = useState([]);

  // activeTab: "paid" for paid exams, "saved" for saved exams.
  const [activeTab, setActiveTab] = useState("paid");

  // State for modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isExamRulesModalOpen, setIsExamRulesModalOpen] = useState(false);

  // Fetch paid exams when the component mounts or when activeTab switches to "paid"
  useEffect(() => {
    if (activeTab === "paid") {
      const fetchExams = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://api.innosert.az/api/me/get-paid-exam",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          console.log(result, "paid exams");

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
    }
  }, [activeTab]);

  // Functions to open/close modals
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openExamRulesModal = () => setIsExamRulesModalOpen(true);
  const closeExamRulesModal = () => setIsExamRulesModalOpen(false);

  return (
    <>
      <Head>
        <title>{t("titles.myExams")}</title>
      </Head>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden lg:block lg:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full lg:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            {/* Tab group for switching between paid and saved exams */}
            <TitleExamsPage activeTab={activeTab} setActiveTab={setActiveTab} />
            <h2 className="font-gilroy text-2xl font-medium leading-8 pb-6">
              {t("titles.myExams")}
            </h2>

            {activeTab === "paid" && (
              <>
                {exams.length > 0 ? (
                  <ExamCard
                    widthClass="w-[31.4%]"
                    exams={exams}
                    openLoginModal={openLoginModal}
                    openRegisterModal={openExamRulesModal}
                  />
                ) : (
                  <p className="text-neutral700 text-lg font-gilroy mt-4 flex justify-center items-center">
                    {t("messages.noPaidExam")}
                  </p>
                )}
              </>
            )}

            {activeTab === "saved" && (
              <>
                {savedExams.length > 0 ? (
                  <ExamCard
                    widthClass="w-[31.4%]"
                    exams={savedExams}
                    openLoginModal={openLoginModal}
                    openRegisterModal={openExamRulesModal}
                  />
                ) : (
                  <p className="text-neutral700 text-lg font-gilroy mt-4 flex justify-center items-center">
                    {t("messages.noSavedExam")}
                  </p>
                )}
              </>
            )}
          </InternalContainer>
        </div>
      </div>
      {/* Render Modals */}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isExamRulesModalOpen && <ExamRulesModal onClose={closeExamRulesModal} />}
    </>
  );
}

export default Imtahanlarim;
