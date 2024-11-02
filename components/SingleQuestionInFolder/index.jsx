


import React from "react";
import MultipleChoice from "./MultipleChoice";
import Combination from "./Combination";
import Open from "./Open";

function SingleQuestionInFolder({ selectedQuestion }) {
  switch (selectedQuestion?.type) {
    case "Variantlı Sual":
      return <MultipleChoice selectedQuestion={selectedQuestion} />;
    case "Uyğunlaşdırma Sual":
      return <Combination selectedQuestion={selectedQuestion} />;
    case "Açıq sual":
      return <Open  selectedQuestion={selectedQuestion}/>;
    default:
      return <p>Question type not recognized.</p>;
  }
}

export default SingleQuestionInFolder;
