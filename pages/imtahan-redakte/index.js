"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import { UserContext } from "@/shared/context/UserContext";
import Container from "@/components/Container";
import CreateExamTabGroup from "@/components/CreateExamTabGroup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import ExamEditTitleNavigation from "@/components/ExamEditTitleNavigation";
import { useTranslation } from "react-i18next";
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
    "https://innocert-admin.markup.az/api/user",
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

function ImtahanRedakte() {
  const {
    examToEdit,
    updateExamDetails,
    selectedQuestionsForExam,
    setSelectedQuestionsForExam,
    isGeneralInfoValid,
    isQuestionsValid,
    examDetails,
    selectedCategory,
    selectedSubcategory,
    setExamToEdit,
  } = useContext(UserContext);
  console.log(examToEdit, "examToEdit");

  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const isFormValid = isGeneralInfoValid && isQuestionsValid;
  const { slug: slugParam } = examToEdit || {};
  const isFetchingRef = useRef(false); // To prevent multiple fetches

  useEffect(() => {
    const fetchQuestions = async () => {
      if (isFetchingRef.current) return; // Prevent multiple fetches
      isFetchingRef.current = true;

      setIsLoadingQuestions(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          enqueueSnackbar("Authentication token not found.", {
            variant: "error",
          });
          return;
        }

        if (!slugParam) {
          throw new Error("Exam slug is missing.");
        }

        const response = await axios.get(
          `https://innocert-admin.markup.az/api/exam/questions/${slugParam}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedQuestions = response.data.data || [];
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
        isFetchingRef.current = false; // Reset fetch status
      }
    };

    if (examToEdit) {
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
        duration: "00:00:00",
        category_id: [],
      });
      setSelectedQuestionsForExam([]);
    }
  }, [
    examToEdit,
    selectedCategory,
    selectedSubcategory,
    enqueueSnackbar,
    slugParam,
  ]);

  const handleSubmit = async () => {
    if (!isFormValid) {
      enqueueSnackbar(t("notValid"), {
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

      // Force sync update of questions before building request body
      const latestQuestions = [...selectedQuestionsForExam];

      const formattedQuestions = latestQuestions.map((question) => {
        const formattedQuestion = { id: question.id };
        if (question.minute !== undefined && question.second !== undefined) {
          formattedQuestion.minute = String(question.minute);
          formattedQuestion.second = String(question.second);
        }
        return formattedQuestion;
      });

      // Extract code and duration separately for custom handling
      const { code, duration, ...otherDetails } = examDetails;

      // Conditionally add 'duration' only if it's not an empty string
      const requestBody = {
        ...otherDetails,
        ...(code ? { code } : {}),
        ...(duration !== "" ? { duration } : {}),
        question: formattedQuestions,
      };
      console.log(requestBody, "requestBody");

      const examId = examToEdit.id; // Renamed for clarity
      const apiEndpoint = `https://innocert-admin.markup.az/api/exam/update/${examId}`;

      await axios.post(apiEndpoint, requestBody, { headers });
      updateExamDetails({
        name: "",
        desc: "",
        price: "",
        duration: "",
        code: "",
        category_id: [],
      });
      setSelectedQuestionsForExam([]);
      setExamToEdit(null);

      enqueueSnackbar(t("examUpdate"), { variant: "success" });
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
  const handleApplyGeneralInfo = () => {
    // e.g. you can call GeneralInfoEditExam’s local function via ref,
    // or if you store the local state in a parent variable, do it here
    // updateExamDetails({ ...someLocalStateInParent });
  };

  return (
    <>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <ExamEditTitleNavigation
          isFormValid={isFormValid}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
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

export default ImtahanRedakte;
