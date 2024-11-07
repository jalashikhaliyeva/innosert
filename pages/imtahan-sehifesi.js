import React, { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import CombinationQuestion from "@/components/CombinationQuestion";
import ExamFooter from "@/components/ExamFooter";
import ExamHeader from "@/components/ExamHeader";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import OpenQuestion from "@/components/OpenQuestion";
import InternalContainer from "@/components/InternalContainer";
import ExamSidebar from "@/components/ExamSidebar";
import { UserContext } from "@/shared/context/UserContext";
import axios from "axios";
import FinishExamModal from "@/components/FinishExam/FinishExamModal";
import Spinner from "@/components/Spinner";

const parseDuration = (durationStr) => {
  if (typeof durationStr !== "string") return 0;
  const parts = durationStr.split(":").map(Number);
  if (parts.some(isNaN)) return 0;
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  } else if (parts.length === 1) {
    return Number(parts[0]);
  } else {
    return 0;
  }
};

const isDurationZero = (duration) => {
  if (typeof duration === "number") {
    return duration === 0;
  }
  if (typeof duration === "string") {
    return parseDuration(duration) === 0;
  }
  return false;
};

function ImtahanSehifesi() {
  const { clickedExam, setPercentage } = useContext(UserContext);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const examAreaRef = useRef(null);
  const router = useRouter();
  const [reports, setReports] = useState([]);

  const handleReportSubmit = (newReports) => {
    setReports((prevReports) => [...prevReports, ...newReports]);
  };
  const [examStartTime, setExamStartTime] = useState(null);
  const [examFinishTime, setExamFinishTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://innocert-admin.markup.az/api/start-exam/${clickedExam.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          setExamData(response.data.data);
          setExamStartTime(new Date());

          console.log(response.data.data, "response.data.data");

          setUserAnswers(Array(response.data.data.question.length).fill(null));
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (clickedExam) {
      fetchExamData();
    }
  }, [clickedExam]);

  const examDetails = examData?.exam;
  const questionsData = examData?.question;
  const currentQuestionData = questionsData?.[currentQuestion];
  const currentUserAnswer = userAnswers[currentQuestion];

  useEffect(() => {
    if (!examData || !examDetails || !currentQuestionData) return;

    if (isDurationZero(examDetails.duration)) {
      // Exam does not have total duration, per-question timing
      const questionDuration = currentQuestionData.duration;

      if (!questionDuration) {
        setTimeRemaining(null);
        return;
      }

      const durationInSeconds = parseDuration(questionDuration);
      setTimeRemaining(durationInSeconds);
    } else {
      // Exam has total duration
      if (timeRemaining === null) {
        const durationInSeconds = parseDuration(examDetails.duration);
        setTimeRemaining(durationInSeconds);
      }
    }
  }, [currentQuestion, examData]);

  // Time management useEffect
  useEffect(() => {
    if (!examData || !examDetails || !questionsData) return;
    if (timeRemaining === null) return;

    if (timeRemaining <= 0) {
      if (isDurationZero(examDetails.duration)) {
        // Per-question timing
        if (currentQuestion < questionsData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Open the finish exam modal if it's the last question
          setIsFinishModalOpen(true);
        }
      } else {
        // Total exam timing
        // Finish the exam
        setIsFinishModalOpen(true);
      }
      return;
    }

    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeRemaining, currentQuestion, examDetails, questionsData, examData]);

  // Now the conditional returns
  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!examData) {
    return <div>Exam data not found.</div>;
  }

  // Rest of your code...

  const handleNextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      // Reset timeRemaining for the new question if per-question timing
      if (isDurationZero(examDetails.duration)) {
        const questionDuration = questionsData[currentQuestion + 1].duration;
        const durationInSeconds = parseDuration(questionDuration);
        setTimeRemaining(durationInSeconds);
      }
    } else {
      // Open the finish exam modal
      setIsFinishModalOpen(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Reset timeRemaining for the previous question if per-question timing
      if (isDurationZero(examDetails.duration)) {
        const questionDuration = questionsData[currentQuestion - 1].duration;
        const durationInSeconds = parseDuration(questionDuration);
        setTimeRemaining(durationInSeconds);
      }
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    // If you have per-question timing, reset the timeRemaining for the new question
    if (isDurationZero(examDetails.duration)) {
      const questionDuration = questionsData[index].duration;
      const durationInSeconds = parseDuration(questionDuration);
      setTimeRemaining(durationInSeconds);
    }
  };

  // Function to update user's answer for the current question
  const setUserAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const calculateTotalTime = (startTime, finishTime) => {
    const diffInMs = finishTime - startTime;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    return diffInMinutes.toString();
  };

  const formatDateTime = (date) => {
    const pad = (n) => (n < 10 ? "0" + n : n);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  };

  // Determine which question component to render
  const renderQuestionComponent = () => {
    const commonProps = {
      key: currentQuestionData.id,
      questionData: currentQuestionData,
      userAnswer: currentUserAnswer,
      setUserAnswer: setUserAnswer,
      onSubmitReport: handleReportSubmit,
    };

    switch (currentQuestionData.type) {
      case "Uyğunlaşdırma Sual":
        return <CombinationQuestion {...commonProps} />;
      case "Açıq sual":
        return <OpenQuestion {...commonProps} />;
      case "Variantlı Sual":
        return <MultipleChoiceQuestion {...commonProps} />;
      default:
        return null;
    }
  };

  const buildAnswersArray = () => {
    return questionsData
      .map((question, index) => {
        const userAnswer = userAnswers[index];
        const questionId = question.id;

        switch (question.type) {
          case "Variantlı Sual": // Multiple Choice Question
            return {
              questionId: questionId,
              submittedAnswer: userAnswer ? [userAnswer] : [],
            };

          case "Açıq sual": // Open Question
            return {
              questionId: questionId,
              submittedAnswer: userAnswer || "",
            };

            case "Uyğunlaşdırma Sual": // Combination Question
            if (userAnswer && userAnswer.length > 0) {
              const submittedAnswer = {};
              userAnswer.forEach((pair) => {
                const keyIndex = pair.questionIndex;
                const keyValue = question.answers.key[keyIndex]; // Get the key string
          
                // Use the selectedOptionIds directly since they now contain the correct IDs
                const valueValues = pair.selectedOptionIds;
          
                submittedAnswer[keyValue] = valueValues;
              });
              return {
                questionId: questionId,
                submittedAnswer: submittedAnswer,
              };
            } else {
              return {
                questionId: questionId,
                submittedAnswer: {},
              };
            }
          

          default:
            return null;
        }
      })
      .filter((answer) => answer !== null);
  };

  const handleFinishExam = async () => {
    try {
      setLoading(true);
      setExamFinishTime(new Date());

      const token = localStorage.getItem("token"); // Adjust the key as needed
      const slug = clickedExam.slug;

      const data = {
        totalTime: calculateTotalTime(examStartTime, new Date()),
        start_exam: formatDateTime(examStartTime),
        finish_exam: formatDateTime(new Date()),
        report_question: reports,
        answers: buildAnswersArray(),
      };
      console.log("Data to be posted:", data);

      const response = await axios.post(
        `https://innocert-admin.markup.az/api/start-exam/${slug}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status) {
        console.log(response.data, "exam finish status");
        const percentage = response.data.data;
        setPercentage(response.data.data);
        router.push("/imtahan-neticeleri");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting exam data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ImtahanSehifesi component
  return (
    <div className="h-screen flex flex-col" ref={examAreaRef}>
      <ExamHeader
        className="flex-shrink-0"
        clickedExam={clickedExam}
        duration={timeRemaining}
        currentQuestion={currentQuestion}
        totalQuestions={questionsData.length}
        currentScore={currentQuestionData.score}
        isPerQuestionTiming={isDurationZero(examDetails.duration)}
      />

      <div className="flex-1 overflow-auto flex">
        {/* Fixed Sidebar */}
        {!isDurationZero(examDetails.duration) && (
          <div className="fixed z-10 left-0 top-20 bottom-30 w-[20%] h-[100vh] overflow-y-auto shadow-md">
            <ExamSidebar
              questions={questionsData}
              currentQuestion={currentQuestion}
              handleQuestionClick={handleQuestionClick}
              userAnswers={userAnswers}
            />
          </div>
        )}

        {/* Main Content Area with Left Margin for Sidebar */}
        <div
          className={`flex-1  overflow-auto ${
            isDurationZero(examDetails.duration) ? "ml-0" : "ml-[20%]"
          }`}
        >
          <InternalContainer>
            <div className="flex-grow">{renderQuestionComponent()}</div>
          </InternalContainer>
        </div>
      </div>

      <ExamFooter
        className="flex-shrink-0"
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        isLastQuestion={currentQuestion === questionsData.length - 1}
        showPreviousButton={!isDurationZero(examDetails.duration)}
      />

      {isFinishModalOpen && (
        <FinishExamModal
          closeModal={() => setIsFinishModalOpen(false)}
          handleFinishExam={handleFinishExam}
        />
      )}
    </div>
  );
}

export default ImtahanSehifesi;
