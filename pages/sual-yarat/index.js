// SualYarat.js

import React, { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import EditOrPreviewTitle from "@/components/EditOrPreviewTitle";
import HeaderInternal from "@/components/HeaderInternal";
import QuestionCreateNavigationTitle from "@/components/QuestionCreateNavigationTitle";
import EditQuestionSection from "@/components/EditQuestionSection";
import PreviewQuestionSection from "@/components/PreviewQuestionSection";
import EditQuestionDetails from "@/components/EditQuestionDetails";
import { UserContext } from "@/shared/context/UserContext";
import CompanyContext from "@/shared/context/CompanyContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    props: {},
  };
}

function SualYarat() {
  const [activeView, setActiveView] = useState("edit");
  const [selectedOption, setSelectedOption] = useState("Variantli sual");
  const [openAnswer, setOpenAnswer] = useState("");
  const { lastQuery } = useContext(UserContext);
  const { selectedCompany } = useContext(CompanyContext);

  // State variables for question data
  const [titleText, setTitleText] = useState("");
  const [conditionText, setConditionText] = useState("");
  const [level, setLevel] = useState("");
  const [score, setScore] = useState("");

  // Initialize answers with default variants
  const [answers, setAnswers] = useState([
    { id: 1, label: "A variantı", text: "", correct: false, isDefault: true },
    { id: 2, label: "B variantı", text: "", correct: false, isDefault: true },
    { id: 3, label: "C variantı", text: "", correct: false, isDefault: true },
  ]);

  // Default kombinasiya options and questions
  const defaultKombinasiyaOptions = [
    { id: 1, label: "A", text: "", isDefault: true },
    { id: 2, label: "B", text: "", isDefault: true },
    { id: 3, label: "C", text: "", isDefault: true },
  ];
  const defaultKombinasiyaQuestions = [
    { id: 1, questionText: "", selectedOptions: [], showDropdown: false },
    { id: 2, questionText: "", selectedOptions: [], showDropdown: false },
    { id: 3, questionText: "", selectedOptions: [], showDropdown: false },
  ];

  const [kombinasiyaOptions, setKombinasiyaOptions] = useState([
    ...defaultKombinasiyaOptions,
  ]);
  const [kombinasiyaQuestions, setKombinasiyaQuestions] = useState([
    ...defaultKombinasiyaQuestions,
  ]);

  // Initialize counters for dynamic IDs
  const [nextOptionId, setNextOptionId] = useState(4);
  const [nextQuestionId, setNextQuestionId] = useState(4);

  const stripHtml = (html) => {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  // Map selectedOption to type_id
  const type_id =
    selectedOption === "Variantli sual"
      ? 1
      : selectedOption === "Açıq sual"
      ? 2
      : 3;

  const handleSave = () => {
    // Map level to level_id
    let level_id;
    if (level === "Asan") level_id = 1;
    else if (level === "Orta") level_id = 2;
    else if (level === "Çətin") level_id = 3;

    const token = localStorage.getItem("token");

    // Common data for all question types
    let data = {
      title: titleText,
      question: conditionText,
      type_id: type_id,
      level_id: level_id,
      score: parseInt(score),
    };

    if (type_id === 1) {
      // Variantli sual
      if (answers.length === 0) {
        toast.error("Zəhmət olmasa cavabları daxil edin.");
        return;
      }

      const hasCorrectAnswer = answers.some((answer) => answer.correct);
      if (!hasCorrectAnswer) {
        toast.error("Zəhmət olmasa ən azı bir doğru cavabı seçin.");
        return;
      }

      // Duplicate check for variantli sual
      const strippedTexts = answers.map((ans) =>
        stripHtml(ans.text).trim().toLowerCase()
      );
      const duplicates = strippedTexts.filter(
        (text, index) => strippedTexts.indexOf(text) !== index && text !== ""
      );

      if (duplicates.length > 0) {
        toast.error("Cavab variantları təkrarlanmamalıdır.");
        return;
      }

      data.answers = answers.map((answer) => ({
        answer: answer.text,
        right: answer.correct,
      }));
    } else if (type_id === 2) {
      // Açıq sual
      if (!openAnswer) {
        toast.error("Zəhmət olmasa cavabı daxil edin.");
        return;
      }
      data.answer = openAnswer;
    } else if (type_id === 3) {
      // Kombinasiya sualı
      for (let question of kombinasiyaQuestions) {
        if (!question.questionText) {
          toast.error("Zəhmət olmasa bütün sual mətnlərini daxil edin.");
          return;
        }
        if (
          !question.selectedOptions ||
          question.selectedOptions.length === 0
        ) {
          toast.error("Zəhmət olmasa bütün suallar üçün seçimlər edin.");
          return;
        }
      }

      // Validate that all kombinasiyaOptions have text
      for (let option of kombinasiyaOptions) {
        if (!option.text) {
          toast.error(
            "Zəhmət olmasa bütün kombinasiya seçimlərini daxil edin."
          );
          return;
        }
      }

      // **New Duplicate Checks for Combination Questions**

      // Check duplicate kombinasiya question texts
      const questionTexts = kombinasiyaQuestions.map((q) =>
        stripHtml(q.questionText).trim().toLowerCase()
      );
      const questionDuplicates = questionTexts.filter(
        (text, index) => questionTexts.indexOf(text) !== index && text !== ""
      );
      if (questionDuplicates.length > 0) {
        toast.error("Kombinasiya sualları təkrarlanmamalıdır.");
        return;
      }

      // Check duplicate kombinasiya options texts
      const optionTexts = kombinasiyaOptions.map((opt) =>
        stripHtml(opt.text).trim().toLowerCase()
      );
      const optionDuplicates = optionTexts.filter(
        (text, index) => optionTexts.indexOf(text) !== index && text !== ""
      );
      if (optionDuplicates.length > 0) {
        toast.error("Kombinasiya variantları təkrarlanmamalıdır.");
        return;
      }

      // Construct data.answers
      data.answers = kombinasiyaQuestions.map((question) => {
        const selectedOptionsTexts = question.selectedOptions.map(
          (selectedOptionId) => {
            const selectedOption = kombinasiyaOptions.find(
              (opt) => opt.id === selectedOptionId
            );
            return selectedOption ? stripHtml(selectedOption.text) : "";
          }
        );

        return {
          key: stripHtml(question.questionText),
          value: selectedOptionsTexts,
        };
      });
    }

    // Check for required fields
    if (
      !data.title ||
      !data.question ||
      !data.type_id ||
      !data.level_id ||
      !data.score ||
      (type_id === 1 && !data.answers) ||
      (type_id === 2 && !data.answer) ||
      (type_id === 3 && data.answers.length === 0)
    ) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    fetch(
      `https://api.innosert.az/api/questions/create/${lastQuery}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Company-ID": selectedCompany?.id,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((body) => {
        if (body.status === true) {
          // Reset form fields after successful save
          setTitleText("");
          setConditionText("");
          setLevel("");
          setScore("");
          setAnswers([
            {
              id: 1,
              label: "A variantı",
              text: "",
              correct: false,
              isDefault: true,
            },
            {
              id: 2,
              label: "B variantı",
              text: "",
              correct: false,
              isDefault: true,
            },
            {
              id: 3,
              label: "C variantı",
              text: "",
              correct: false,
              isDefault: true,
            },
          ]);
          setOpenAnswer("");
          setKombinasiyaOptions([...defaultKombinasiyaOptions]);
          setKombinasiyaQuestions([...defaultKombinasiyaQuestions]);
          setNextOptionId(4);
          setNextQuestionId(4);
          toast.success("Sualınız əlavə edildi");
        } else {
          toast.error("Sual əlavə edilmədi");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Xəta baş verdi");
      });
  };

  return (
    <>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <QuestionCreateNavigationTitle
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onSave={handleSave}
        />

        <EditOrPreviewTitle
          activeView={activeView}
          setActiveView={setActiveView}
        />

        {activeView === "edit" ? (
          <>
            <EditQuestionDetails
              level={level}
              setLevel={setLevel}
              score={score}
              setScore={setScore}
            />
            <EditQuestionSection
              selectedOption={selectedOption}
              lastQuery={lastQuery}
              titleText={titleText}
              setTitleText={setTitleText}
              conditionText={conditionText}
              setConditionText={setConditionText}
              answers={answers}
              setAnswers={setAnswers}
              openAnswer={openAnswer}
              setOpenAnswer={setOpenAnswer}
              kombinasiyaOptions={kombinasiyaOptions}
              setKombinasiyaOptions={setKombinasiyaOptions}
              kombinasiyaQuestions={kombinasiyaQuestions}
              setKombinasiyaQuestions={setKombinasiyaQuestions}
              nextOptionId={nextOptionId}
              setNextOptionId={setNextOptionId}
              nextQuestionId={nextQuestionId}
              setNextQuestionId={setNextQuestionId}
            />
          </>
        ) : (
          <PreviewQuestionSection
            selectedOption={selectedOption}
            titleText={titleText}
            conditionText={conditionText}
            answers={answers}
            openAnswer={openAnswer}
            kombinasiyaOptions={kombinasiyaOptions}
            kombinasiyaQuestions={kombinasiyaQuestions}
          />
        )}
      </Container>
      {/* <ToastContainer /> */}
    </>
  );
}

export default SualYarat;
