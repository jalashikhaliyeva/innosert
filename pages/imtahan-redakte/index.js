// src/pages/imtahan-redakte/index.js
"use client";

import React, { useContext, useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import { UserContext } from "@/shared/context/UserContext";
import Container from "@/components/Container";
import CreateExamTabGroup from "@/components/CreateExamTabGroup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import ExamEditTitleNavigation from "@/components/ExamEditTitleNavigation";

function ImtahanRedakte() {
  const {
    examToEdit,
    updateExamDetails,
    selectedQuestionsForExam,
    setSelectedQuestionsForExam,
    isGeneralInfoValid,
    isQuestionsValid,
    examDetails,
  } = useContext(UserContext);

  console.log(examToEdit, "examToEdit");
  console.log(examDetails, "examDetailsas");

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { selectedCompany, selectedCategory, selectedSubcategory } =
    useContext(UserContext);

  console.log(selectedCategory, "selectedCategory");
  console.log(selectedSubcategory, "selectedSubcategory");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const isFormValid = isGeneralInfoValid && isQuestionsValid;
  const { qovluq } = router.query;
  const slugParam = examToEdit.slug;

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoadingQuestions(true);
      try {
        const token = localStorage.getItem("token");
        if (!examToEdit?.slug) {
          throw new Error("Exam slug is missing.");
        }

        const response = await axios.get(
          `https://innocert-admin.markup.az/api/exam/questions/${encodeURIComponent(
            examToEdit.slug
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        const fetchedQuestions = response.data.data;
        setSelectedQuestionsForExam(
          fetchedQuestions.map((q) => ({
            id: q.id,
            title: q.title,
            level: q.level,
            score: q.score,
            minute: q.minute || 0,
            second: q.second || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching questions:", error);
        enqueueSnackbar(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch questions.",
          { variant: "error" }
        );
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    if (examToEdit) {
      // Parse category if it's a JSON string
      const parsedCategory =
        typeof examToEdit.category === "string"
          ? JSON.parse(examToEdit.category)
          : examToEdit.category;

      // Build a combined list of categories and subcategories
      const combinedList = [
        ...(selectedCategory || []).map((cat) => ({
          name: cat.name,
          type: "category",
          id: cat.id,
        })),
        ...(selectedSubcategory || []).map((sub) => ({
          name: sub.name,
          type: "subcategory",
          id: sub.id,
        })),
      ];

      console.log(combinedList, "combinedList");

      // Map category names to their corresponding IDs
      const mappedCategoryIds = parsedCategory
        .map((name) => {
          const found = combinedList.find((item) => item.name === name);
          return found ? Number(found.id) : null; // Ensure ID is a number
        })
        .filter(Boolean); // Remove any null values

      // Update exam details in context with mapped category IDs
      updateExamDetails({
        name: examToEdit.name || "",
        desc: examToEdit.desc || "",
        price:
          examToEdit.price !== undefined ? examToEdit.price.toString() : "",
        ...(examToEdit.code ? { code: examToEdit.code } : {}),
        duration: examToEdit.duration || "00:00:00",
        category_id: mappedCategoryIds, // Now an array of IDs
      });

      // Fetch questions from API
      fetchQuestions();
    } else {
      // If not editing, reset to default values
      updateExamDetails({
        name: "",
        desc: "",
        price: "",
        ...(false && { code: "" }), // This line ensures code is omitted
        duration: "00:00:00",
        category_id: [],
      });
      setSelectedQuestionsForExam([]);
    }
  }, [
    examToEdit,
    updateExamDetails,
    setSelectedQuestionsForExam,
    selectedCategory,
    selectedSubcategory,
    enqueueSnackbar,
  ]);

  const handleSubmit = async () => {
    // Validation Checks
    if (!isFormValid) {
      enqueueSnackbar("Form is not valid. Please check your inputs.", {
        variant: "error",
      });
      return;
    }

    if (!slugParam) {
      enqueueSnackbar("Exam slug is missing.", { variant: "error" });
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
        "Content-Type": "application/json",
      };

      const formattedQuestions = selectedQuestionsForExam.map((question) => {
        const formattedQuestion = { id: question.id };
        if (question.minute !== undefined && question.second !== undefined) {
          formattedQuestion.minute = String(question.minute);
          formattedQuestion.second = String(question.second);
        }
        return formattedQuestion;
      });

      // Destructure code from examDetails
      const { code, ...otherDetails } = examDetails;

      // Conditionally include code if it's not empty
      const requestBody = {
        ...otherDetails,
        ...(code ? { code } : {}),
        question: formattedQuestions,
      };

      console.log(requestBody, "requestBody");

      // Always use the update API endpoint
      const encodedSlug = examToEdit.id;
      const apiEndpoint = `https://innocert-admin.markup.az/api/exam/update/${encodedSlug}`;

      const response = await axios.post(apiEndpoint, requestBody, { headers });

      console.log(response, "Response edit");

      enqueueSnackbar("Exam updated successfully!", { variant: "success" });

      router.push("/umumi-imtahanlar");
    } catch (err) {
      console.error("API Error:", err);
      enqueueSnackbar(
        err.response?.data?.message || err.message || "An error occurred.",
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
        <ExamEditTitleNavigation
          isFormValid={isFormValid}
          onSubmit={handleSubmit} // Passing handleSubmit as onSubmit prop
          isSubmitting={isSubmitting}
        />
        <CreateExamTabGroup isLoadingQuestions={isLoadingQuestions} />
      </Container>
    </>
  );
}

export default ImtahanRedakte;
