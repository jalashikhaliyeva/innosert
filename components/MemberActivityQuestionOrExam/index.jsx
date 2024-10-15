import React, { useState } from "react";
import { TbQuestionMark } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import SuallarComponent from "./SuallarComponent";
import ImtahanlarComponent from "./ImtahanlarComponent";

function MemberActivityQuestionOrExam() {
  const [activeView, setActiveView] = useState("suallar");

  return (
    <>
      <div className="flex flex-row gap-4 mb-6 font-gilroy">
        {/* Suallar Tab */}
        <button
          className={`flex items-center gap-2 text-lg px-4 py-3 rounded-lg font-normal leading-6 ${
            activeView === "suallar"
              ? "bg-blue100 text-blue400"
              : "text-neutral700"
          }`}
          onClick={() => setActiveView("suallar")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 3L22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.00353L4 3H20ZM20 9H4V19H20V9ZM13 10V14H16L12 18L8 14H11V10H13ZM18.7639 5H5.23656L4.23744 7H19.7639L18.7639 5Z"
              fill={activeView === "suallar" ? "#3366FF" : "#79797A"} // Color changes based on active view
            />
          </svg>
          Suallar
        </button>

        {/* İmtahanlar Tab */}
        <button
          className={`flex items-center gap-2 text-lg px-4 py-3 rounded-lg font-normal leading-6 ${
            activeView === "imtahanlar"
              ? "bg-blue100 text-blue400"
              : "text-neutral700"
          }`}
          onClick={() => setActiveView("imtahanlar")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 2H17C17.7956 2 18.5587 2.31607 19.1213 2.87868C19.6839 3.44129 20 4.20435 20 5V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V5C4 4.20435 4.31607 3.44129 4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2ZM7 4C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5V19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4H7ZM9 17H11C11.2652 17 11.5196 17.1054 11.7071 17.2929C11.8946 17.4804 12 17.7348 12 18C12 18.2652 11.8946 18.5196 11.7071 18.7071C11.5196 18.8946 11.2652 19 11 19H9C8.73478 19 8.48043 18.8946 8.29289 18.7071C8.10536 18.5196 8 18.2652 8 18C8 17.7348 8.10536 17.4804 8.29289 17.2929C8.48043 17.1054 8.73478 17 9 17ZM15 5C15.2652 5 15.5196 5.10536 15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6C16 6.26522 15.8946 6.51957 15.7071 6.70711C15.5196 6.89464 15.2652 7 15 7C14.7348 7 14.4804 6.89464 14.2929 6.70711C14.1054 6.51957 14 6.26522 14 6C14 5.73478 14.1054 5.48043 14.2929 5.29289C14.4804 5.10536 14.7348 5 15 5ZM15 8C15.2652 8 15.5196 8.10536 15.7071 8.29289C15.8946 8.48043 16 8.73478 16 9C16 9.26522 15.8946 9.51957 15.7071 9.70711C15.5196 9.89464 15.2652 10 15 10C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8ZM9 14H15C15.2652 14 15.5196 14.1054 15.7071 14.2929C15.8946 14.4804 16 14.7348 16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H9C8.73478 16 8.48043 15.8946 8.29289 15.7071C8.10536 15.5196 8 15.2652 8 15C8 14.7348 8.10536 14.4804 8.29289 14.2929C8.48043 14.1054 8.73478 14 9 14ZM9 11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13H9C8.73478 13 8.48043 12.8946 8.29289 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.29289 11.2929C8.48043 11.1054 8.73478 11 9 11ZM9.5 5H11.5C11.8978 5 12.2794 5.15804 12.5607 5.43934C12.842 5.72064 13 6.10218 13 6.5V8.5C13 8.89782 12.842 9.27936 12.5607 9.56066C12.2794 9.84196 11.8978 10 11.5 10H9.5C9.10218 10 8.72064 9.84196 8.43934 9.56066C8.15804 9.27936 8 8.89782 8 8.5V6.5C8 6.10218 8.15804 5.72064 8.43934 5.43934C8.72064 5.15804 9.10218 5 9.5 5Z"
              fill={activeView === "imtahanlar" ? "#3366FF" : "#79797A"} // Color changes based on active view
            />
          </svg>
          İmtahanlar
        </button>
      </div>

      {/* Conditional Rendering */}
      {activeView === "suallar" ? (
        <SuallarComponent />
      ) : (
        <ImtahanlarComponent />
      )}
    </>
  );
}

export default MemberActivityQuestionOrExam;
