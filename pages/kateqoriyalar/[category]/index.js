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

  // 2) We do a server-side fetch to check if the user is verified
  //    Usually you'd pass the user's token from session.accessToken or similar.
  const userResponse = await fetch(
    "https://api.innosert.az/api/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`, // or wherever your token is
      },
    }
  );

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

  // 3) If user is unverified => redirect to '/', or /haqqimizda
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
function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { user  , token} = useContext(UserContext);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "az";

  const [exams, setExams] = useState([]);
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState(null); // New sort state

  const handleLoginOrRulesClick = () => {
    if (token) {
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
          `https://api.innosert.az/api/exams/${category}`,
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

  // Handle sorting
  const handleSortOptionClick = (option) => {
    setSortOption(option);
  };

  // Apply sorting based on sortOption
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

  return (
    <main>
      <Head>
        <title>{t("categories")}</title>
      </Head>
      <HeaderInternal />

      <section className="my-28">
        <Container>
          <SortTitleExams
            category={category}
            onSortOptionClick={handleSortOptionClick} // Pass the handler here
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
            <ExamCard
              exams={sortedExams}
              openLoginModal={handleLoginOrRulesClick}
              openRegisterModal={handleLoginOrRulesClick}
              widthClass="w-[23.8%]"
            />
          ) : (
            <p className="text-center flex items-center justify-center font-gilroy text-lg text-gray-500 pb-72">
              &quot;{category}&quot; {t("no_exams_available_for_category")}
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
