// SualRedakte.js
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

      // Set initial values for form fields
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

    answersFromAPI.forEach((ans) => {
      const parsedValue = parseHtmlString(ans.value);
      parsedValue.forEach((val) => {
        if (!optionsMap.has(val)) {
          optionsMap.set(val, {
            id: optionsMap.size + 1, // Ensure unique IDs
            idInApi: ans.id, // Map to the correct API ID
            label: String.fromCharCode(65 + optionsMap.size),
            text: val,
            isDefault: true,
          });
        }
      });
    });

    const options = Array.from(optionsMap.values());
    setKombinasiyaOptions(options);

    const questions = answersFromAPI.map((ans, index) => {
      const parsedOptions = parseHtmlString(ans.value);
      const correctOptions = parsedOptions
        .map((optionText) => {
          const option = options.find(
            (opt) => opt.text.trim() === optionText.trim()
          );
          return option ? option.label : null;
        })
        .filter(Boolean);

      return {
        id: index + 1,
        idInApi: ans.id,
        questionText: parseHtmlString(ans.key)[0],
        selectedOptions: correctOptions,
        showDropdown: false,
      };
    });

    setKombinasiyaQuestions(questions);
  };

  const parseHtmlString = (htmlString) => {
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
      score: parseInt(score),
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
      // Initialize a Map to group answers by key
      const groupedAnswersMap = new Map();

      kombinasiyaQuestions.forEach((question) => {
        const key = question.questionText;

        // Initialize the group if it doesn't exist
        if (!groupedAnswersMap.has(key)) {
          groupedAnswersMap.set(key, []);
        }

        // Map selectedOptions to the desired format
        question.selectedOptions.forEach((label) => {
          const option = kombinasiyaOptions.find((opt) => opt.label === label);
          if (option) {
            if (option.idInApi) {
              // Existing answer with id
              groupedAnswersMap.get(key).push({
                id: option.idInApi,
                correct: option.text,
              });
            } else {
              // New answer as a simple string
              groupedAnswersMap.get(key).push(option.text);
            }
          }
        });
      });

      // Convert the Map to an array of objects
      data.answers = Array.from(groupedAnswersMap.entries()).map(
        ([key, value]) => ({
          key,
          value,
        })
      );
    }

    // Validation
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

    console.log("Data sent to API:", data);

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
      <ToastContainer />
    </>
  );
}

export default SualRedakte;
