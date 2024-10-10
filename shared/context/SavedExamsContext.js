import React, { createContext, useState, useContext, useEffect } from "react";

// Create a new context for saved exams
const SavedExamsContext = createContext();

// Create a provider component
export const SavedExamsProvider = ({ children }) => {
  // Initialize state with saved exams from localStorage if they exist
  const [savedExams, setSavedExams] = useState(() => {
    if (typeof window !== "undefined") {
      const storedExams = localStorage.getItem("savedExams");
      return storedExams ? JSON.parse(storedExams) : [];
    }
    return [];
  });

  // Save exams to localStorage whenever the savedExams state changes
  useEffect(() => {
    localStorage.setItem("savedExams", JSON.stringify(savedExams));
  }, [savedExams]);

  // Function to add exam to the saved list
  const addExamToSaved = (exam) => {
    if (!savedExams.find((savedExam) => savedExam.id === exam.id)) {
      setSavedExams((prevExams) => [...prevExams, exam]);
    }
  };

  // Function to remove exam from the saved list
  const removeExamFromSaved = (examId) => {
    setSavedExams((prevExams) =>
      prevExams.filter((exam) => exam.id !== examId)
    );
  };

  return (
    <SavedExamsContext.Provider
      value={{ savedExams, addExamToSaved, removeExamFromSaved }}
    >
      {children}
    </SavedExamsContext.Provider>
  );
};

// Hook to use the SavedExamsContext in other components
export const useSavedExams = () => {
  return useContext(SavedExamsContext);
};
