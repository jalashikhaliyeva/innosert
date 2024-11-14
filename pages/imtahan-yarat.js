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

function ImtahanYarat() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    examDetails,
    selectedQuestionsForExam,
    isGeneralInfoValid,
    isQuestionsValid,
  } = useContext(UserContext);
  const { selectedCompany } = useContext(CompanyContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasEnoughQuestions = selectedQuestionsForExam.length >= 10; // New condition
  const isFormValid = isGeneralInfoValid && isQuestionsValid && hasEnoughQuestions; // Updated validation

  console.log(examDetails, "examDetails");
  console.log(selectedQuestionsForExam, "selectedQuestionsForExam API conn");
  console.log(isFormValid, "isFormValid");

  // Extract 'qovluq' from query parameters
  const { qovluq } = router.query;

  // Normalize 'qovluq' to a single string if it's an array
  const slugParam = Array.isArray(qovluq) ? qovluq[qovluq.length - 1] : qovluq;

  const handleSubmit = async () => {
    // Validation Checks
    if (!isFormValid) {
      if (!hasEnoughQuestions) {
        enqueueSnackbar("Ən azı 10 sual seçməlisiniz.", { variant: "error" });
      } else {
        enqueueSnackbar("Form düzgün deyil. Zəhmət olmasa məlumatlarınızı yoxlayın.", {
          variant: "error",
        });
      }
      return;
    }

    if (!selectedCompany) {
      enqueueSnackbar("Şirkət məlumatları mövcud deyil.", { variant: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Prepare the headers
      const headers = {
        Authorization: `Bearer ${token}`,
        "X-Company-ID": selectedCompany.id,
        "Content-Type": "application/json",
      };

      // Format the selected questions
      const formattedQuestions = selectedQuestionsForExam.map((question) => {
        const formattedQuestion = { id: question.id };
        console.log(formattedQuestion, "formattedQuestions");

        // Check if 'minute' and 'second' are defined (including 0)
        if (
          question.minute !== undefined &&
          question.minute !== null &&
          question.second !== undefined &&
          question.second !== null
        ) {
          // Convert to strings if necessary
          formattedQuestion.minute = String(question.minute);
          formattedQuestion.second = String(question.second);
        }

        return formattedQuestion;
      });

      // Construct the request body
      const requestBody = {
        ...examDetails,
        question: formattedQuestions,
      };

      console.log("Request Body:", requestBody);

      // Determine the API endpoint based on the presence of 'slugParam'
      let apiEndpoint = "https://innocert-admin.markup.az/api/exam/create";
      if (slugParam) {
        // Ensure the slug is URL-safe
        const encodedSlug = encodeURIComponent(slugParam);
        apiEndpoint += `/${encodedSlug}`;
      }

      console.log("API Endpoint:", apiEndpoint);

      // Make the POST request
      const response = await axios.post(apiEndpoint, requestBody, { headers });

      console.log("API Response:", response.data);
      enqueueSnackbar("İmtahan uğurla yaradıldı!", { variant: "success" });

      // Redirect to the exams list or another appropriate page
      router.push("/umumi-imtahanlar");
      // Optionally, you can redirect to a detailed view of the created exam
      // router.push(`/umumi-imtahanlar/${response.data.examId}`);
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
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <ExamCreateTitleNavigation
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          hasEnoughQuestions={hasEnoughQuestions} // Pass the new prop
        />
        <CreateExamTabGroup />
      </Container>
    </>
  );
}

export default ImtahanYarat;
