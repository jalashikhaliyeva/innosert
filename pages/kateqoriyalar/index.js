// components/Kateqoriyalar.jsx
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import Breadcrumb from "@/components/Breadcrumb";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import RegisterModal from "@/components/Register";

import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { getSettingInfo } from "@/services/getSettingInfo";
import Container from "@/components/Container";
import Spinner from "@/components/Spinner";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there is no NextAuth session, redirect to the index page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, proceed with the page rendering
  return {
    props: {
      // You can pass any additional props here
    },
  };
}
function Kateqoriyalar({ openRegisterModal, openLoginModal }) {
  const { selectedCategory, selectedSubcategory, user } =
    useContext(UserContext);
  const [settingInfo, setSettingInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  // console.log(selectedCategory, "category");
  // console.log(selectedSubcategory, "subcategory");
  const router = useRouter();
  const lang = router.locale || "az";
  const { t } = useTranslation();
  const [isExamRulesModalOpen, setExamRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false); // State for Register Modal

  const closeModals = () => {
    setExamRulesModalOpen(false);
    setLoginModalOpen(false);
    setRegisterModalOpen(false); // Close Register Modal as well
  };

  const handleLoginOrRulesClick = () => {
    if (token) {
      setExamRulesModalOpen(true); // Open exam rules modal if logged in
    } else {
      setLoginModalOpen(true); // Open login modal if not logged in
    }
  };

  // Function to open Register Modal
  const handleOpenRegisterModal = () => {
    setRegisterModalOpen(true);
  };

  useEffect(() => {
    const fetchSettingInfo = async () => {
      setIsLoading(true); // Start loading
      try {
        const data = await getSettingInfo(lang);
        const categories = data?.category || [];
        setSettingInfo(categories);
        // console.log(categories, "categories");
      } catch (error) {
        console.error("Failed to fetch setting info:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchSettingInfo();
  }, [lang]); // Add 'lang' as a dependency if it can change

  // Function to organize categories and subcategories
  const getOrganizedCategories = () => {
    const mainCategories = settingInfo.filter((cat) => cat.category_id === 0);

    const subCategories = settingInfo.filter((cat) => cat.category_id !== 0);

    // Create a mapping from main category name to its subcategories
    const categoryMap = mainCategories.map((mainCat) => ({
      ...mainCat,
      subcategories: subCategories.filter(
        (subCat) => subCat.category_id === mainCat.name
      ),
    }));

    return categoryMap;
  };

  const organizedCategories = getOrganizedCategories();

  return (
    <main>
      <Head>
        <title>{t("labels.exams")}</title>
        {/* Add meta tags if needed */}
      </Head>
      <HeaderInternal
        openRegisterModal={handleOpenRegisterModal}
        scrollToFaq={() => {}}
        scrollToFooter={() => {}}
        scrollToCertificate={() => {}}
      />
      <Container>
        <container>
          <Breadcrumb />

          <section className="flex justify-center">
            {isLoading ? (
              // Loading Indicator Outside of the bg-white Container
              <div className="text-center w-full  justify-center items-center flex p-10 rounded-lg">
                <Spinner />
              </div>
            ) : (
              // Categories Content Inside the bg-white Container
              <div className="bg-white justify-center items-center flex shadow-lg p-10 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-gilroy">
                  {organizedCategories.map((category) => (
                    <div key={category.id}>
                      <h2 className="text-xl hover:text-textHoverBlue transition-colors duration-300 font-medium mb-2">
                        <Link
                          href={`/imtahanlar/${encodeURIComponent(
                            category.slug
                          )}`}
                        >
                          {category.name}
                        </Link>
                      </h2>
                      {category.subcategories.length > 0 ? (
                        <ul className="text-gray-600">
                          {category.subcategories.map((sub) => (
                            <li key={sub.id} className="mb-1">
                              <Link
                                href={`/imtahanlar/${encodeURIComponent(
                                  category.slug
                                )}/${encodeURIComponent(sub.slug)}`}
                                className="hover:text-textHoverBlue transition-colors duration-300"
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600"></p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </container>
      </Container>

      {/* Modals */}
      {isExamRulesModalOpen && <ExamRulesModal onClose={closeModals} />}
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}
      {isRegisterModalOpen && (
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeModals} />
      )}

      <Footer />
    </main>
  );
}

export default Kateqoriyalar;
