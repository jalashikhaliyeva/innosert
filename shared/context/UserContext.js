import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import OTPRegister from "@/components/OTP-register";

const UserContext = createContext();

function UserProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  const [lastQuery, setLastQuery] = useState(null);
  const [examDetailsSingle, setExamDetailsSingle] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [clickedExam, setClickedExam] = useState(null);
  const [isCategoriesFilterValid, setIsCategoriesFilterValid] = useState(null);
  const [examToEdit, setExamToEdit] = useState(null);
  const [memberActivitySingle, setMemberActivitySingle] = useState(null);
  const [filteredExams, setFilteredExams] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedQuestionsForExam, setSelectedQuestionsForExam] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [timeForQuestion, setTimeForQuestion] = useState(false);
  const [isGeneralInfoValid, setIsGeneralInfoValid] = useState(false);
  const [searchExam, setSearchExam] = useState(false);
  const [privateExam, setPrivateExam] = useState(false);
  const [isQuestionsValid, setIsQuestionsValid] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      const storedLastQuery = localStorage.getItem("lastQuery") || null;
      setLastQuery(storedLastQuery);

      const storedClickedExam = localStorage.getItem("clickedExam");
      setClickedExam(storedClickedExam ? JSON.parse(storedClickedExam) : null);

      const storedFilteredExams = localStorage.getItem("filteredExams");
      setFilteredExams(
        storedFilteredExams ? JSON.parse(storedFilteredExams) : null
      );

      const storedExamDetails = localStorage.getItem("examDetails");
      setExamDetails(storedExamDetails ? JSON.parse(storedExamDetails) : null);

      const storedSelectedQuestion = localStorage.getItem("selectedQuestion");
      setSelectedQuestion(
        storedSelectedQuestion ? JSON.parse(storedSelectedQuestion) : null
      );

      const storedSelectedQuestionsForExam = localStorage.getItem(
        "selectedQuestionsForExam"
      );
      setSelectedQuestionsForExam(
        storedSelectedQuestionsForExam
          ? JSON.parse(storedSelectedQuestionsForExam)
          : []
      );

      const storedTimeForQuestion = localStorage.getItem("timeForQuestion");
      setTimeForQuestion(
        storedTimeForQuestion ? JSON.parse(storedTimeForQuestion) : false
      );
    }
  }, []);

  const updateExamDetails = (details) => {
    setExamDetails(details);
  };

  useEffect(() => {
    if (lastQuery !== null && typeof window !== "undefined") {
      localStorage.setItem("lastQuery", lastQuery);
    }
  }, [lastQuery]);

  useEffect(() => {
    if (clickedExam !== null && typeof window !== "undefined") {
      localStorage.setItem("clickedExam", JSON.stringify(clickedExam));
    }
  }, [clickedExam]);

  useEffect(() => {
    if (filteredExams !== null && typeof window !== "undefined") {
      localStorage.setItem("filteredExams", JSON.stringify(filteredExams));
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("filteredExams");
    }
  }, [filteredExams]);

  useEffect(() => {
    if (selectedQuestion !== null && typeof window !== "undefined") {
      localStorage.setItem(
        "selectedQuestion",
        JSON.stringify(selectedQuestion)
      );
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("selectedQuestion");
    }
  }, [selectedQuestion]);

  useEffect(() => {
    if (selectedQuestionsForExam.length > 0 && typeof window !== "undefined") {
      localStorage.setItem(
        "selectedQuestionsForExam",
        JSON.stringify(selectedQuestionsForExam)
      );
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("selectedQuestionsForExam");
    }
  }, [selectedQuestionsForExam]);

  useEffect(() => {
    if (timeForQuestion !== null && typeof window !== "undefined") {
      localStorage.setItem("timeForQuestion", JSON.stringify(timeForQuestion));
    }
  }, [timeForQuestion]);

  useEffect(() => {
    if (examDetails && typeof window !== "undefined") {
      localStorage.setItem("examDetails", JSON.stringify(examDetails));
    } else if (typeof window !== "undefined") {
      localStorage.removeItem("examDetails");
    }
  }, [examDetails]);

  const fetchUserData = useCallback(async () => {
    if (!token) {
      // console.log(token, "no token");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        // Store it
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        toast.error("Failed to fetch user data");
        setUser(null);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Public routes: index ('/'), haqqimizda ('/haqqimizda'), imtahanlar ('/imtahanlar'), imtahanlar/[slug] ('/imtahanlar/:slug')
    const publicRoutes = ["/", "/haqqimizda", "/imtahanlar"];
    // Check if current route is public
    const isPublicRoute =
      publicRoutes.includes(router.pathname) ||
      router.pathname.startsWith("/imtahanlar/");

    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token, fetchUserData]);

  // UserContext.js
  const login = useCallback(async (newToken) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", newToken);
      }
      setToken(newToken);
    } catch (error) {
      console.error("Error storing token:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          await fetch("https://innocert-admin.markup.az/api/logout", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
        } catch (error) {
          console.error("Error during logout API call:", error);
        }
        localStorage.removeItem("token");
      }
    }
    setToken(null);
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        lastQuery,
        setLastQuery,
        selectedQuestion,
        setSelectedQuestion,
        selectedQuestionsForExam,
        setSelectedQuestionsForExam,
        fetchUserData,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        timeForQuestion,
        setTimeForQuestion,
        isGeneralInfoValid,
        setIsGeneralInfoValid,
        isQuestionsValid,
        setIsQuestionsValid,
        examDetails,
        setExamDetails,
        examDetailsSingle,
        setExamDetailsSingle,
        examToEdit,
        setExamToEdit,
        memberActivitySingle,
        setMemberActivitySingle,
        setFilteredExams,
        filteredExams,
        isCategoriesFilterValid,
        setIsCategoriesFilterValid,
        privateExam,
        setPrivateExam,
        searchExam,
        setSearchExam,
        clickedExam,
        setClickedExam,
        percentage,
        setPercentage,
        login,
        logout,
        updateExamDetails,
        loading,
      }}
    >
      {children}
      <OTPModalManager />
    </UserContext.Provider>
  );
}

function OTPModalManager() {
  const { user, loading } = useContext(UserContext);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  useEffect(() => {
    // If user data is loaded and sv=0, open OTP modal
    if (!loading && user && user?.data?.sv == 0) {
      setIsOtpModalOpen(true);
    } else {
      setIsOtpModalOpen(false);
    }
  }, [user, loading]);

  const handleOtpClose = () => {
    setIsOtpModalOpen(false);
  };

  return (
    <>
      {isOtpModalOpen && (
        <OTPRegister
          isOpen={isOtpModalOpen}
          onClose={handleOtpClose}
          email={user?.email}
          token={user?.token}
        />
      )}
    </>
  );
}

export { UserContext, UserProvider };
