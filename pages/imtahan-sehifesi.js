import React, { useState, useRef, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import CombinationQuestion from "@/components/CombinationQuestion";
import ExamFooter from "@/components/ExamFooter";
import ExamHeader from "@/components/ExamHeader";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import OpenQuestion from "@/components/OpenQuestion";
import InternalContainer from "@/components/InternalContainer";
import ExamSidebar from "@/components/ExamSidebar";
import { IoWarningOutline } from "react-icons/io5";
import { UserContext } from "@/shared/context/UserContext";
import axios from "axios";
import FinishExamModal from "@/components/FinishExam/FinishExamModal";
import Spinner from "@/components/Spinner";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

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
  const [hasFetchedExam, setHasFetchedExam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [showWarningModal, setShowWarningModal] = useState(false);
  const examAreaRef = useRef(null);
  const router = useRouter();
  const [reports, setReports] = useState([]);
  const [outsideLeaveCount, setOutsideLeaveCount] = useState(0);
  const [examStartTime, setExamStartTime] = useState(null);
  const [examFinishTime, setExamFinishTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const hasQuestionChanged = useRef(false);

  const handleReportSubmit = (newReports) => {
    setReports((prevReports) => [...prevReports, ...newReports]);
  };

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://innocert-admin.markup.az/api/get-exam/${clickedExam.slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // Check if the API returned success status and we got questions
        if (response.data.status && response.data.data?.question?.length) {
          setExamData(response.data.data);
          setHasFetchedExam(true);
  
          // Set the exam start time here
          setExamStartTime(new Date());
        } else {
          console.log("Exam not paid or no questions. Data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (!hasFetchedExam && clickedExam?.slug) {
      fetchExamData();
    }
  }, [clickedExam, hasFetchedExam]);
  
  const examDetails = examData?.exam;
  const questionsData = examData?.question;
  const currentQuestionData = questionsData?.[currentQuestion];
  const currentUserAnswer = userAnswers[currentQuestion];

  useEffect(() => {
    if (!examData || !examDetails || !currentQuestionData) return;
    hasQuestionChanged.current = false;
    if (isDurationZero(examDetails.duration)) {
      const questionDuration = currentQuestionData.duration;
      if (!questionDuration || parseDuration(questionDuration) === 0) {
        setTimeRemaining(null);
        return;
      }
      const durationInSeconds = parseDuration(questionDuration);
      setTimeRemaining(durationInSeconds);
    } else {
      if (timeRemaining === null) {
        const durationInSeconds = parseDuration(examDetails.duration);
        setTimeRemaining(durationInSeconds);
      }
    }
  }, [currentQuestion, examData]);

  useEffect(() => {
    if (!examData || !examDetails || !questionsData) return;
    if (timeRemaining === null) return;
    if (timeRemaining <= 0) {
      if (!hasQuestionChanged.current) {
        hasQuestionChanged.current = true;
        if (isDurationZero(examDetails.duration)) {
          if (currentQuestion < questionsData.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
          } else {
            setIsFinishModalOpen(true);
          }
        } else {
          setIsFinishModalOpen(true);
        }
      }
      return;
    }
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeRemaining, currentQuestion, examDetails, questionsData, examData]);

  useEffect(() => {
    const handleUserExit = () => {
      if (outsideLeaveCount === 0) {
        setOutsideLeaveCount(1);
        setModalContent(
          "Siz imtahan sahəsindən kənara çıxdınız! Yenidən bunu etsəniz, imtahan bitiriləcək."
        );
        setShowWarningModal(true);
      } else {
        setModalContent(
          "Limitdən kənara çıxma sayınız dolub! İmtahan bitirildi."
        );
        setShowWarningModal(true);
        setTimeout(() => {
          router.push("/imtahan-neticeleri");
        }, 2400);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleUserExit();
      }
    };

    const handleWindowBlur = () => {
      handleUserExit();
    };

    const handleBeforeUnload = (e) => {
      if (outsideLeaveCount === 0) {
        e.preventDefault();
        e.returnValue = "";
        handleUserExit();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [outsideLeaveCount, router]);

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

  const handleNextQuestion = () => {
    if (currentQuestion < questionsData.length - 1) {
      const nextQuestionIndex = currentQuestion + 1;
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      if (isDurationZero(examDetails.duration)) {
        const questionDuration = questionsData[nextQuestionIndex].duration;
        const durationInSeconds = parseDuration(questionDuration);
        setTimeRemaining(durationInSeconds);
      }
    } else {
      setIsFinishModalOpen(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      const prevQuestionIndex = currentQuestion - 1;
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
      if (isDurationZero(examDetails.duration)) {
        const questionDuration = questionsData[prevQuestionIndex].duration;
        const durationInSeconds = parseDuration(questionDuration);
        setTimeRemaining(durationInSeconds);
      }
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
    if (isDurationZero(examDetails.duration)) {
      const questionDuration = questionsData[index].duration;
      const durationInSeconds = parseDuration(questionDuration);
      setTimeRemaining(durationInSeconds);
    }
  };

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
    if (!date) return ""; // or return some default
    const pad = (n) => (n < 10 ? "0" + n : n);
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${hours}:${minutes} ${day}.${month}.${year}`;
  };
  

  const renderQuestionComponent = () => {
    const commonProps = {
      key: currentQuestionData?.id,
      questionData: currentQuestionData,
      userAnswer: currentUserAnswer,
      setUserAnswer: setUserAnswer,
      onSubmitReport: handleReportSubmit,
    };

    switch (currentQuestionData?.type) {
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
        const questionId = question?.id;

        switch (question.type) {
          case "Variantlı Sual":
            return {
              questionId: questionId,
              submittedAnswer: userAnswer || [],
            };
          case "Açıq sual":
            return {
              questionId: questionId,
              submittedAnswer: userAnswer || "",
            };
          case "Uyğunlaşdırma Sual":
            if (userAnswer && userAnswer?.length > 0) {
              const submittedAnswer = {};
              userAnswer.forEach((pair) => {
                const keyId = pair?.questionId;
                const valueIds = pair?.selectedOptionIds;
                submittedAnswer[keyId] = valueIds;
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

      const token = localStorage.getItem("token");
      const slug = clickedExam?.slug;

      const data = {
        totalTime: calculateTotalTime(examStartTime, new Date()),
        start_exam: formatDateTime(examStartTime),
        finish_exam: formatDateTime(new Date()),
        report_question: reports,
        answers: buildAnswersArray(),
      };

      // console.log(data, "data exam send");

      const response = await axios.post(
        `https://innocert-admin.markup.az/api/start-exam/${slug}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data, "--start-exam api");

      if (response.data.status) {
        const percentageData = response.data.data;
        setPercentage(percentageData);
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

  const handleMouseLeave = async () => {
    if (outsideLeaveCount === 0) {
      setOutsideLeaveCount(1);
      setModalContent(
        "Siz imtahan sahəsindən kənara çıxdınız! Yenidən bunu etsəniz, imtahan bitiriləcək."
      );
      setShowWarningModal(true);
    } else {
      setModalContent(
        "Limitdən kənara çıxma sayınız dolub! İmtahan bitirildi."
      );
      setShowWarningModal(true);

      try {
        const token = localStorage.getItem("token");
        const slug = clickedExam.slug;

        const emptyData = {
          totalTime: "0",
          start_exam: formatDateTime(examStartTime || new Date()),
          finish_exam: formatDateTime(new Date()),
          report_question: [],
          answers: [],
        };

        const response = await axios.post(
          `https://innocert-admin.markup.az/api/start-exam/${slug}`,
          emptyData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log the response to see its content
        // console.log("Response from API:", response);

        // Redirect to the results page
        setTimeout(() => {
          const percentageData = response.data.data;
          setPercentage(percentageData);
          router.push("/imtahan-neticeleri");
        }, 2400);
      } catch (error) {
        console.error("Error submitting empty exam data:", error);
      }
    }
  };

  return (
    <div
      className="h-screen flex flex-col"
      ref={examAreaRef}
      onMouseLeave={handleMouseLeave}
    >
      <ExamHeader
        className="flex-shrink-0"
        clickedExam={clickedExam}
        duration={timeRemaining}
        currentQuestion={currentQuestion}
        totalQuestions={questionsData?.length}
        currentScore={currentQuestionData?.score}
        isPerQuestionTiming={isDurationZero(examDetails?.duration)}
      />

      <div className="flex-1 overflow-auto flex">
        {!isDurationZero(examDetails?.duration) && (
          <div className="hidden lg:block fixed z-10 left-0 top-20 bottom-30 w-[20%] h-[100vh] overflow-y-auto shadow-md ">
            <ExamSidebar
              questions={questionsData}
              currentQuestion={currentQuestion}
              handleQuestionClick={handleQuestionClick}
              userAnswers={userAnswers}
            />
          </div>
        )}

        <div
          className={`flex-1 overflow-auto ${
            isDurationZero(examDetails?.duration) ? "ml-0" : "ml-0  lg:ml-[20%]"
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
        isLastQuestion={currentQuestion === questionsData?.length - 1}
        showPreviousButton={!isDurationZero(examDetails?.duration)}
      />

      {isFinishModalOpen && (
        <FinishExamModal
          closeModal={() => setIsFinishModalOpen(false)}
          handleFinishExam={handleFinishExam}
        />
      )}

      {showWarningModal && (
        <div
          onClick={() => setShowWarningModal(false)}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <IoWarningOutline
                  style={{ fontSize: "32px", color: "red", fill: "red" }}
                />
              </div>
            </div>
            <h3
              className="text-lg font-semibold text-gray-900 text-center"
              style={{ fontFamily: "Gilroy" }}
            >
              Diqqət!
            </h3>
            <p
              className="text-sm text-gray-800 text-center mt-2"
              style={{ fontFamily: "Gilroy" }}
            >
              {modalContent}
            </p>
            <div className="mt-6 flex justify-center w-full">
              <button
                onClick={() => setShowWarningModal(false)}
                className="py-2 px-4 bg-errorButtonDefault w-full text-white rounded-lg hover:bg-errorButtonHover active:bg-errorButtonPressed focus:outline-none"
                style={{ fontFamily: "Gilroy" }}
              >
                Oldu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImtahanSehifesi;
