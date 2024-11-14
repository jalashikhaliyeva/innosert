// pages/kateqoriyalar/[category].jsx

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import axios from "axios";
import HeaderInternal from "@/components/HeaderInternal";
import Container from "@/components/Container";
import SortTitleExams from "@/components/SortTitleExams";
import ExamCard from "@/components/ExamCard";
import Spinner from "@/components/Spinner";
import Footer from "@/components/Footer";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import withModalManagement from "@/shared/hoc/withModalManagement";
import { UserContext } from "@/shared/context/UserContext";

function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { user } = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "az";

  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoginOrRulesClick = () => {
    if (user) {
      setExamRulesModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
  };

  useEffect(() => {
    const fetchExams = async () => {
      if (!category) return; // Wait until category is available

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(t("authentication_token_not_found"));
        }

        const response = await axios.get(
          `https://innocert-admin.markup.az/api/exams/${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Accept-Language": lang,
            },
          }
        );

        if (response.status === 200) {
          setExams(response.data.data); // Adjust based on your API response structure
        } else {
          throw new Error(t("failed_to_fetch_exams"));
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || err.message || t("an_error_occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [category, lang, t]);

  return (
    <main>
      <HeaderInternal />

      <section className="my-28">
        <Container>
          <SortTitleExams category={category} />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-red-500">{error}</p>
            </div>
          ) : exams?.length > 0 ? (
            <ExamCard
              exams={exams}
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
            />
          ) : (
            <p className="text-center flex items-center justify-center font-gilroy text-lg text-gray-500 pb-72">
              "{category}" {t("no_exams_available_for_category")}
            </p>
          )}
        </Container>
      </section>

      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}
      <Footer />
    </main>
  );
}

export default withModalManagement(CategoryPage);
