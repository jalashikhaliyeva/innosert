import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import withModalManagement from "@/shared/hoc/withModalManagement";
import Spinner from "@/components/Spinner";
import { getLandingInfo } from "@/services/getLandingInfo";
import { getSettingInfo } from "@/services/getSettingInfo";
import Container from "@/components/Container";
import ExamCard from "@/components/ExamCard";
import SortTitleExams from "@/components/SortTitleExams";
import HeaderInternal from "@/components/HeaderInternal";
const SubcategoryPage = ({ openRegisterModal, openLoginModal }) => {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const faqRef = useRef(null);
  const footerRef = useRef(null);
  const certificateRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [landingInfo, setLandingInfo] = useState(null);
  const [settingInfo, setSettingInfo] = useState(null);
  const [exams, setExams] = useState([]);
  useEffect(() => {
    // In a real application, you might fetch this data from an API
    const fetchedExams = [
      {
        id: 'microsoft-office-specialist-excel-expert',
        name: 'Microsoft Office Specialist Excel Expert',
        duration: '1 saat',
        questions: 30,
        paid: true,
        price: 20,
      },
      {
        id: 'certified-project-manager',
        name: 'Certified Project Manager',
        duration: '2 saat',
        questions: 50,
        paid: false,
        price: 30,
      },
      {
        id: 'advanced-graphic-design',
        name: 'Advanced Graphic Design',
        duration: '1.5 saat',
        questions: 40,
        paid: true,
        price: 25,
      },
      {
        id: 'full-stack-developer',
        name: 'Full Stack Developer',
        duration: '3 saat',
        questions: 60,
        paid: false,
        price: 35,
      },
      {
        id: 'data-science-specialist',
        name: 'Data Science Specialist',
        duration: '2.5 saat',
        questions: 45,
        paid: true,
        price: 28,
      },
      {
        id: 'digital-marketing-expert',
        name: 'Digital Marketing Expert',
        duration: '1.2 saat',
        questions: 35,
        paid: false,
        price: 22,
      },
      {
        id: 'cyber-security-analyst',
        name: 'Cyber Security Analyst',
        duration: '2 saat',
        questions: 40,
        paid: true,
        price: 27,
      },
      {
        id: 'cloud-computing-engineer',
        name: 'Cloud Computing Engineer',
        duration: '2.5 saat',
        questions: 50,
        paid: false,
        price: 33,
      },
    ];

    setExams(fetchedExams);
  }, []);
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

  // Fetch data whenever the locale changes
  useEffect(() => {
    if (router.locale) {
      fetchData(router.locale); // Re-fetch data when locale changes
    }
  }, [router.locale]);

  if (!landingInfo || !settingInfo) {
    return <Spinner />;
  }



  return (
    <div>
      <HeaderInternal

      />

      <section className="my-28">
        <Container>
          <SortTitleExams category={subcategory} />
          <ExamCard
            openLoginModal={openLoginModal} // Pass it here
            openRegisterModal={openRegisterModal}
            widthClass="w-[23.8%]"
            exams={exams}
          />
        </Container>
      </section>
    </div>
  );
};

// Fetch landing and setting info on server side
export async function getServerSideProps(context) {
  const lang = context.locale || "az"; // Get the language from the context locale
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
