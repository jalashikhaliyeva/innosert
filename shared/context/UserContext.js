// src/shared/context/UserContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [lastQuery, setLastQuery] = useState(() => {
    return localStorage.getItem("lastQuery") || null;
  });
  const [loading, setLoading] = useState(true);
  const [examDetailsSingle, setExamDetailsSingle] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [clickedExam, setClickedExam] = useState(() => {
    const storedExam = localStorage.getItem("clickedExam");
    return storedExam ? JSON.parse(storedExam) : null;
  });
  const [isCategoriesFilterValid, setIsCategoriesFilterValid] = useState(null);

  const [examToEdit, setExamToEdit] = useState(null);
  const [memberActivitySingle, setMemberActivitySingle] = useState(null);
  // Initialize filteredExams from localStorage or set to null
  const [filteredExams, setFilteredExams] = useState(() => {
    const storedExams = localStorage.getItem("filteredExams");
    return storedExams ? JSON.parse(storedExams) : null;
  });
  useEffect(() => {
    if (filteredExams !== null) {
      localStorage.setItem("filteredExams", JSON.stringify(filteredExams));
    } else {
      localStorage.removeItem("filteredExams");
    }
  }, [filteredExams]);

  // Initialize examDetails from localStorage or set to null
  const [examDetails, setExamDetails] = useState(() => {
    const storedDetails = localStorage.getItem("examDetails");
    return storedDetails ? JSON.parse(storedDetails) : null;
  });

  // Memoize updateExamDetails to prevent recreation on each render
  const updateExamDetails = useCallback((details) => {
    setExamDetails(details);
    localStorage.setItem("examDetails", JSON.stringify(details));
  }, []);

  // Existing state for selectedQuestion
  const [selectedQuestion, setSelectedQuestion] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedQuestion")) || null;
  });

  // New state for selectedQuestionsForExam
  const [selectedQuestionsForExam, setSelectedQuestionsForExam] = useState(
    () => {
      return JSON.parse(localStorage.getItem("selectedQuestionsForExam")) || [];
    }
  );

  // Existing states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // New state for timeForQuestion
  const [timeForQuestion, setTimeForQuestion] = useState(() => {
    const storedValue = localStorage.getItem("timeForQuestion");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  // New validation states for form readiness
  const [isGeneralInfoValid, setIsGeneralInfoValid] = useState(false);
  const [searchExam, setSearchExam] = useState(false);
  const [privateExam, setPrivateExam] = useState(false);
  const [isQuestionsValid, setIsQuestionsValid] = useState(false);

  const fetchUserData = useCallback(async () => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData, "userData context");
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

  const login = useCallback(async (token) => {
    localStorage.setItem("token", token);
    await fetchUserData(); // Fetch and set user data immediately
  }, [fetchUserData]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    // Optionally, you can clear other related states here
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (lastQuery !== null) {
      localStorage.setItem("lastQuery", lastQuery);
    }
  }, [lastQuery]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Sync selectedQuestion to localStorage on change
  useEffect(() => {
    if (selectedQuestion !== null) {
      localStorage.setItem(
        "selectedQuestion",
        JSON.stringify(selectedQuestion)
      );
    } else {
      localStorage.removeItem("selectedQuestion"); // Remove it if null
    }
  }, [selectedQuestion]);

  // Sync selectedQuestionsForExam to localStorage on change
  useEffect(() => {
    if (selectedQuestionsForExam.length > 0) {
      localStorage.setItem(
        "selectedQuestionsForExam",
        JSON.stringify(selectedQuestionsForExam)
      );
    } else {
      localStorage.removeItem("selectedQuestionsForExam"); // Remove it if empty
    }
  }, [selectedQuestionsForExam]);

  // Sync timeForQuestion to localStorage on change
  useEffect(() => {
    localStorage.setItem("timeForQuestion", JSON.stringify(timeForQuestion));
  }, [timeForQuestion]);

  // Sync examDetails to localStorage on change (if updated outside updateExamDetails)
  useEffect(() => {
    if (examDetails) {
      localStorage.setItem("examDetails", JSON.stringify(examDetails));
    } else {
      localStorage.removeItem("examDetails");
    }
  }, [examDetails]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        lastQuery,
        setLastQuery,
        selectedQuestion,
        setSelectedQuestion,
        selectedQuestionsForExam, // Provide the new state
        setSelectedQuestionsForExam, // Provide the setter for the new state
        fetchUserData,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        timeForQuestion, // Provide the new state
        setTimeForQuestion, // Provide the setter for the new state
        isGeneralInfoValid, // Provide validation state for GeneralInfoEditExam
        setIsGeneralInfoValid, // Setter for GeneralInfo validation
        isQuestionsValid, // Provide validation state for TableComponent
        setIsQuestionsValid, // Setter for Questions validation
        examDetails, // Provide exam details
        updateExamDetails, // Provide update function for exam details
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
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
