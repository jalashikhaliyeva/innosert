// components/Imtahanlar.jsx
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExamRulesModal from "@/components/ExamRulesModal";
import LoginModal from "@/components/Login";
import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import RegisterModal from "@/components/Register";
import { getSettingInfo } from "@/services/getSettingInfo";
import Container from "@/components/Container";
import HeaderInternal from "@/components/HeaderInternal";

function Kateqoriyalar({ openRegisterModal, openLoginModal }) {
  const { selectedCategory, selectedSubcategory, user } =
    useContext(UserContext);
  const [settingInfo, setSettingInfo] = useState([]);
  console.log(selectedCategory, "category");
  console.log(selectedSubcategory, "subcategory");
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
    if (user) {
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
      try {
        const data = await getSettingInfo(lang);
        const categories = data?.category || [];
        setSettingInfo(categories);
        console.log(categories, "categories");
      } catch (error) {
        console.error("Failed to fetch setting info:", error);
      }
    };

    fetchSettingInfo();
  }, []);

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
        <section className="my-28 mb-56">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 font-gilroy">
            {organizedCategories.map((category) => (
              <div key={category.id}>
                <h2 className="text-xl hover:text-textHoverBlue transition-colors duration-300 font-medium mb-2">
                  <Link
                    href={`/imtahanlar/${encodeURIComponent(category.slug)}`}
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
                          className=" hover:text-textHoverBlue transition-colors duration-300 "
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
        </section>
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
