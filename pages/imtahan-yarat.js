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

  console.log(examDetails, "examDetails");
  console.log(selectedQuestionsForExam, "selectedQuestionsForExam API conn");
  console.log(isFormValid, "isFormValid");

  const { qovluq } = router.query;
  const slugParam = Array.isArray(qovluq) ? qovluq[qovluq.length - 1] : qovluq;

  const handleSubmit = async () => {
    if (!isFormValid) {
      if (!hasEnoughQuestions) {
        enqueueSnackbar("Ən azı 10 sual seçməlisiniz.", { variant: "error" });
      } else {
        enqueueSnackbar(
          "Form düzgün deyil. Zəhmət olmasa məlumatlarınızı yoxlayın.",
          {
            variant: "error",
          }
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

      const formattedQuestions = selectedQuestionsForExam.map((question) => {
        const formattedQuestion = { id: question.id };
        console.log(formattedQuestion, "formattedQuestions");

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

      const requestBody = {
        ...examDetails,
        question: formattedQuestions,
      };

      console.log("Request Body:", requestBody);

      let apiEndpoint = "https://innocert-admin.markup.az/api/exam/create";
      if (slugParam) {
        const encodedSlug = encodeURIComponent(slugParam);
        apiEndpoint += `/${encodedSlug}`;
      }

      console.log("API Endpoint:", apiEndpoint);

      const response = await axios.post(apiEndpoint, requestBody, { headers });

      console.log("API Response:", response.data);
      enqueueSnackbar("İmtahan uğurla yaradıldı!", { variant: "success" });

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
        <CreateExamTabGroup />
      </Container>
    </>
  );
}

export default ImtahanYarat;
