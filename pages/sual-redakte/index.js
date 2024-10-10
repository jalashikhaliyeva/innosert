import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import EditOrPreviewTitle from "@/components/EditOrPreviewTitle";
import HeaderInternal from "@/components/HeaderInternal";
import QuestionEditNavigationTitle from "@/components/QuestionEditNavigationTitle";
import EditQuestionSection from "@/components/EditQuestionSection";
import PreviewQuestionSection from "@/components/PreviewQuestionSection";
import EditQuestionDetails from "@/components/EditQuestionDetails";

function SualRedakte() {
  const [activeView, setActiveView] = useState("edit"); // State to track active view
  const [selectedOption, setSelectedOption] = useState("Variantli sual"); // State to track selected question type

  return (
    <>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        {/* Pass selectedOption and setSelectedOption as props */}
        <QuestionEditNavigationTitle
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <EditOrPreviewTitle
          activeView={activeView}
          setActiveView={setActiveView}
        />
        {/* Conditionally render the Edit or Preview section based on the active view */}
        {activeView === "edit" ? (
          // Pass selectedOption as a prop
          <EditQuestionSection selectedOption={selectedOption} />
        ) : (
          <PreviewQuestionSection selectedOption={selectedOption} />
        )}
      </Container>
    </>
  );
}

export default SualRedakte;
