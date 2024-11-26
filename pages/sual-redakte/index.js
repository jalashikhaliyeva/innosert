// SualRedakte.js

"use client";
import React, { useContext, useState, useEffect } from "react";
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
import { useRouter } from "next/router";
import axios from "axios";
import DeleteModal from "@/components/DeleteQuestionModal"; // Ensure correct path

function SualRedakte() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("edit");
  const [selectedOption, setSelectedOption] = useState("Variantli sual");
  const [openAnswer, setOpenAnswer] = useState("");
  const { selectedQuestion, lastQuery } = useContext(UserContext);
  const { selectedCompany } = useContext(CompanyContext);
  const [titleText, setTitleText] = useState("");
  const [conditionText, setConditionText] = useState("");
  const [level, setLevel] = useState("");
  const [score, setScore] = useState("");
  const [answers, setAnswers] = useState([]);
  const [kombinasiyaOptions, setKombinasiyaOptions] = useState([]);
  const [kombinasiyaQuestions, setKombinasiyaQuestions] = useState([]);
  const [nextOptionId, setNextOptionId] = useState(1);
  const [nextQuestionId, setNextQuestionId] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  console.log(selectedQuestion, "selectedQuestion");

  const typeMapping = {
    "Variantlı Sual": "Variantli sual",
    "Açıq Sual": "Açıq sual",
    "Açıq sual": "Açıq sual",
    "Kombinasiya Sualı": "Kombinasiya sualı",
    "Uyğunlaşdırma Sual": "Kombinasiya sualı",
  };

  useEffect(() => {
    if (selectedQuestion) {
      const mappedOption = typeMapping[selectedQuestion.type];
      setSelectedOption(mappedOption);
      setTitleText(selectedQuestion.title || "");
      setConditionText(selectedQuestion.question || "");
      setLevel(selectedQuestion.level || "");
      setScore(selectedQuestion.score || "");
      if (mappedOption === "Variantli sual") {
        initializeVariantliSual(selectedQuestion.answers);
      } else if (mappedOption === "Açıq sual") {
        setOpenAnswer(selectedQuestion.answers || "");
      } else if (mappedOption === "Kombinasiya sualı") {
        initializeKombinasiyaSual(selectedQuestion.answers);
      }
    }
  }, [selectedQuestion]);

  const initializeVariantliSual = (answersFromAPI) => {
    const initAnswers = answersFromAPI.map((ans, index) => ({
      id: index + 1,
      idInApi: ans.id,
      label: `${String.fromCharCode(65 + index)} variantı`,
      text: ans.answer,
      correct: ans.right,
      isDefault: true,
    }));
    setAnswers(initAnswers);
  };

  const initializeKombinasiyaSual = (answersFromAPI) => {
    const optionsMap = new Map();
    let maxOptionId = 0;
    let maxQuestionId = 0;

    answersFromAPI.forEach((ans) => {
      ans.values.forEach((valObj) => {
        const val = valObj.value.trim();
        if (!optionsMap.has(val)) {
          optionsMap.set(val, {
            id: valObj.id,
            label: String.fromCharCode(65 + optionsMap.size),
            text: val,
            isDefault: true,
          });
          if (valObj.id > maxOptionId) {
            maxOptionId = valObj.id;
          }
        }
      });
    });

    const options = Array.from(optionsMap.values());
    setKombinasiyaOptions(options);
    setNextOptionId(maxOptionId + 1);

    const questions = answersFromAPI.map((ans, index) => {
      const questionText = parseHtmlString(ans.key)[0] || `Sual ${index + 1}`;
      const selectedOptions = ans.values
        .map((valObj) => {
          const option = options.find(
            (opt) => opt.text.trim() === valObj.value.trim()
          );
          return option ? option.id : null;
        })
        .filter(Boolean);

      if (ans.id > maxQuestionId) {
        maxQuestionId = ans.id;
      }

      return {
        id: ans.id,
        idInApi: ans.id || null,
        questionText: questionText,
        selectedOptions: selectedOptions,
        showDropdown: false,
      };
    });

    setKombinasiyaQuestions(questions);
    setNextQuestionId(maxQuestionId + 1);
  };

  const parseHtmlString = (htmlString) => {
    if (typeof window === "undefined") return [""];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return [doc.body.textContent || ""];
  };

  const handleSave = () => {
    let level_id = ["Asan", "Orta", "Çətin"].indexOf(level) + 1;
    const token = localStorage.getItem("token");
    let data = {
      title: titleText,
      question: conditionText,
      type_id: {
        "Variantli sual": 1,
        "Açıq sual": 2,
        "Kombinasiya sualı": 3,
      }[selectedOption],
      level_id: level_id,
      score: score,
    };

    if (data.type_id === 1) {
      if (answers.length === 0) {
        toast.error("Zəhmət olmasa cavabları daxil edin.");
        return;
      }
      data.answers = answers.map((answer) => ({
        id: answer.idInApi,
        answer: answer.text,
        right: answer.correct,
      }));
    } else if (data.type_id === 2) {
      if (!openAnswer) {
        toast.error("Zəhmət olmasa cavabı daxil edin.");
        return;
      }
      data.answer = openAnswer;
    } else if (data.type_id === 3) {
      const groupedAnswersMap = new Map();

      kombinasiyaQuestions.forEach((question) => {
        const key = question.questionText;
        const keyId = question.idInApi || null;

        if (!groupedAnswersMap.has(key)) {
          groupedAnswersMap.set(key, {
            id: keyId,
            key: key,
            values: [],
          });
        }

        question.selectedOptions.forEach((optionId) => {
          const option = kombinasiyaOptions.find((opt) => opt.id === optionId);
          if (option) {
            if (option.idInApi) {
              groupedAnswersMap.get(key).values.push({
                id: option.idInApi,
                value: option.text,
              });
            } else {
              groupedAnswersMap.get(key).values.push({
                value: option.text,
              });
            }
          }
        });
      });

      data.answers = Array.from(groupedAnswersMap.values());
    }

    if (
      !data.title ||
      !data.question ||
      !data.type_id ||
      !data.level_id ||
      !data.score
    ) {
      toast.error("Zəhmət olmasa bütün sahələri doldurun.");
      return;
    }

    console.log("Data sent to API:", JSON.stringify(data, null, 2));
    const isUpdating = selectedQuestion && selectedQuestion.id;
    const url = isUpdating
      ? `https://innocert-admin.markup.az/api/questions/${selectedQuestion.id}`
      : `https://innocert-admin.markup.az/api/questions/create/${lastQuery}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Company-ID": selectedCompany?.id,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          let errorMessage = "Xəta baş verdi";
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }
        return response.json();
      })
      .then((body) => {
        if (body.status === true) {
          resetForm();
          toast.success(
            isUpdating ? "Sualınız uğurla yeniləndi" : "Sualınız əlavə edildi"
          );
          setTimeout(() => router.push("/sual-bazasi"), 1300);
        } else {
          toast.error(isUpdating ? "Sual yenilənmədi" : "Sual əlavə edilmədi");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const resetForm = () => {
    setTitleText("");
    setConditionText("");
    setLevel("");
    setScore("");
    setAnswers([]);
    setOpenAnswer("");
    setKombinasiyaOptions([]);
    setKombinasiyaQuestions([]);
    setNextOptionId(1);
    setNextQuestionId(1);
  };

  const handleDelete = async () => {
    if (!questionToDelete) return;
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      await axios.delete(
        `https://innocert-admin.markup.az/api/questions/${questionToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Company-ID": selectedCompany.id,
          },
        }
      );

      toast.success("Sual uğurla silindi");
      setIsDeleteModalOpen(false);
      router.push("/sual-bazasi");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Sual silinərkən xəta baş verdi");
    }
  };

  const openDeleteModal = (id) => {
    setQuestionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <QuestionEditNavigationTitle
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          onSave={handleSave}
          onDelete={() => openDeleteModal(selectedQuestion.id)} // Pass the delete function
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
              nextOptionId={nextOptionId}
              setNextOptionId={setNextOptionId}
              nextQuestionId={nextQuestionId}
              setNextQuestionId={setNextQuestionId}
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
      <ToastContainer />

      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default SualRedakte;
