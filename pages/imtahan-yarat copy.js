"use client";
import React, { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import { UserContext } from "@/shared/context/UserContext";
import Container from "@/components/Container";
import ExamCreateTitleNavigation from "@/components/ExamCreateTitleNavigation";
import CreateExamTabGroup from "@/components/CreateExamTabGroup";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "react-i18next";
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
function ImtahanYarat() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    examDetails,
    selectedQuestionsForExam,
    isGeneralInfoValid,
    isQuestionsValid,
    updateExamDetails,
    setSelectedQuestionsForExam,
  } = useContext(UserContext);
  const { selectedCompany } = useContext(CompanyContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const hasEnoughQuestions = selectedQuestionsForExam.length >= 10;
  const isFormValid =
    isGeneralInfoValid && isQuestionsValid && hasEnoughQuestions;

  const { qovluq } = router.query;
  const slugParam = Array.isArray(qovluq) ? qovluq[qovluq.length - 1] : qovluq;
  const [activeTab, setActiveTab] = useState("general");
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const handleSubmit = async () => {
    if (!isFormValid) {
      if (!hasEnoughQuestions) {
        enqueueSnackbar("Ən azı 10 sual seçməlisiniz.", { variant: "error" });
      } else {
        enqueueSnackbar(
          "Form düzgün deyil. Zəhmət olmasa məlumatlarınızı yoxlayın.",
          { variant: "error" }
        );
      }
      return;
    }
  
    if (!selectedCompany) {
      enqueueSnackbar("Şirkət məlumatları mövcud deyil.", { variant: "error" });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
  
      const headers = {
        Authorization: `Bearer ${token}`,
        "X-Company-ID": selectedCompany.id,
        "Content-Type": "application/json",
      };
  
      console.log(headers, "headers");
  
      const formattedQuestions = selectedQuestionsForExam.map((question) => {
        const formattedQuestion = { id: question.id };
  
        if (
          question.minute !== undefined &&
          question.minute !== null &&
          question.second !== undefined &&
          question.second !== null
        ) {
          formattedQuestion.minute = String(question.minute);
          formattedQuestion.second = String(question.second);
        }
  
        return formattedQuestion;
      });
  
      // Destructure duration and code from examDetails
      const { duration, code, ...otherExamDetails } = examDetails;
  
      // Initialize requestBody with otherExamDetails and questions
      const requestBody = {
        ...otherExamDetails,
        code: code || "", // Ensure code is always included
        question: formattedQuestions,
      };
  
      // Conditionally add duration if it's not an empty string
      if (duration !== "") {
        requestBody.duration = duration;
      }
  
      console.log(requestBody, "requestBody ");
  
      let apiEndpoint = "https://api.innosert.az/api/exam/create";
      if (slugParam) {
        const encodedSlug = encodeURIComponent(slugParam);
        apiEndpoint += `/${encodedSlug}`;
      }
  
      const response = await axios.post(apiEndpoint, requestBody, { headers });
      console.log(response.data, "exam response");
  
      enqueueSnackbar(t("examCreate"), { variant: "success" });
  
      updateExamDetails(null);
      setSelectedQuestionsForExam([]);
  
      router.push("/umumi-imtahanlar");
    } catch (err) {
      console.error("API Error:", err);
      enqueueSnackbar(
        err.response?.data?.message || err.message || "Xəta baş verdi.",
        { variant: "error" }
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleApplyGeneralInfo = () => {
    // e.g. you can call GeneralInfoEditExam’s local function via ref,
    // or if you store the local state in a parent variable, do it here
    // updateExamDetails({ ...someLocalStateInParent });
  };

  return (
    <>
      <Head>
        <title>{t("labels.exams")}</title>
      </Head>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <ExamCreateTitleNavigation
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          hasEnoughQuestions={hasEnoughQuestions}
        />
        <CreateExamTabGroup
          isLoadingQuestions={isLoadingQuestions}
          activeTab={activeTab}
          onSwitchToQuestions={handleApplyGeneralInfo}
          setActiveTab={setActiveTab}
        />
      </Container>
    </>
  );
}

export default ImtahanYarat;
