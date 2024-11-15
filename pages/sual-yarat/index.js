import React, { useContext, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import EditOrPreviewTitle from "@/components/EditOrPreviewTitle";
import HeaderInternal from "@/components/HeaderInternal";
import QuestionEditNavigationTitle from "@/components/QuestionEditNavigationTitle";
import EditQuestionSection from "@/components/EditQuestionSection";
import PreviewQuestionSection from "@/components/PreviewQuestionSection";
import EditQuestionDetails from "@/components/EditQuestionDetails";
import { UserContext } from "@/shared/context/UserContext";
import CompanyContext from "@/shared/context/CompanyContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionCreateNavigationTitle from "@/components/QuestionCreateNavigationTitle";

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
    { id: "A", label: "A", correct: false, isDefault: true, text: "" },
    { id: "B", label: "B", correct: false, isDefault: true, text: "" },
    { id: "C", label: "C", correct: false, isDefault: true, text: "" },
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

    // Validation and data adjustment based on question type
    if (type_id === 1) {
      // Variantli sual (Multiple-choice question)
      if (answers.length === 0) {
        console.error("Please provide at least one answer.");
        toast.error("Zəhmət olmasa cavabları daxil edin.");
        return;
      }
      data.answers = answers.map((answer) => ({
        answer: answer.text,
        right: answer.correct,
      }));
    } else if (type_id === 2) {
      // Açıq sual (Open-ended question)
      if (!openAnswer) {
        console.error("Please provide the answer.");
        toast.error("Zəhmət olmasa cavabı daxil edin.");
        return;
      }
      data.answer = openAnswer;
    } else if (type_id === 3) {
      // Kombinasiya sualı (Combination question)
      // Validate that all questions have text and selectedOptions
      for (let question of kombinasiyaQuestions) {
        if (!question.questionText) {
          console.error("Please provide all question texts.");
          toast.error("Zəhmət olmasa bütün sual mətnlərini daxil edin.");
          return;
        }
        if (
          !question.selectedOptions ||
          question.selectedOptions.length === 0
        ) {
          console.error("Please select options for all questions.");
          toast.error("Zəhmət olmasa bütün suallar üçün seçimlər edin.");
          return;
        }
      }
      // Validate that all kombinasiyaOptions have text
      for (let option of kombinasiyaOptions) {
        if (!option.text) {
          console.error("Please provide all kombinasiya option texts.");
          toast.error(
            "Zəhmət olmasa bütün kombinasiya seçimlərini daxil edin."
          );
          return;
        }
      }
      data.answers = kombinasiyaQuestions.map((question) => {
        const selectedOptionsTexts = question.selectedOptions.map(
          (selectedLabel) => {
            const selectedOption = kombinasiyaOptions.find(
              (opt) => opt.label === selectedLabel
            );
            return selectedOption ? selectedOption.text : "";
          }
        );
        return {
          key: question.questionText, // key cannot be empty
          value: selectedOptionsTexts, // value can be empty
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
      (type_id === 3 && !data.answers)
    ) {
      console.error("Please fill in all required fields.");
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }
    console.log(data, "data posted");

    fetch(
      `https://innocert-admin.markup.az/api/questions/create/${lastQuery}`,
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

          // Show success message
          toast.success("Sualınız əlavə edildi");
          console.log("Question saved successfully", body);
        } else {
          console.error("Failed to save the question", body);
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
            />
            <EditQuestionDetails
              level={level}
              setLevel={setLevel}
              score={score}
              setScore={setScore}
            />
          </>
        ) : (
          <PreviewQuestionSection selectedOption={selectedOption} />
        )}
      </Container>
      {/* Include the ToastContainer */}
      <ToastContainer />
    </>
  );
}

export default SualYarat;
