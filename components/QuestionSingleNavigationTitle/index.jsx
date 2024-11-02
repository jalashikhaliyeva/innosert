import React from "react";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/router"; // Import useRouter from Next.js

function QuestionSingleNavigationTitle({ selectedQuestion }) {
  const router = useRouter();
  const { push } = router;

  const handleEditClick = () => {
    push("/sual-redakte"); // Push to the sual-redakte page
  };

  return (
    <div className="flex justify-between relative font-gilroy mb-5 md:mb-0">
      <h1
        className="text-2xl font-medium leading-8"
        dangerouslySetInnerHTML={{ __html: selectedQuestion?.question }}
      ></h1>

      <div>
        <button
          className="flex items-center justify-center gap-2 py-3 px-4 h-11 w-full text-white leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
          onClick={handleEditClick} // Navigate to sual-redakte page on button click
        >
          <FaPen className="fill-white text-white" />
          Redaktə et
        </button>
      </div>
    </div>
  );
}

export default QuestionSingleNavigationTitle;
