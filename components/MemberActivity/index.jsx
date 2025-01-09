import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import LoginModal from "../Login";
import { UserContext } from "@/shared/context/UserContext";
import { useTranslation } from 'react-i18next';
function MemberActivity({ data, searchTerm }) {
  const { t } = useTranslation();
  const { setMemberActivitySingle } = useContext(UserContext);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [openFilter, setOpenFilter] = useState(null);
  const [nameOrder, setNameOrder] = useState(null);
  const [publishedQuestionsFilter, setPublishedQuestionsFilter] = useState("");
  const [publishedExamsFilter, setPublishedExamsFilter] = useState("");

  const fullNameRef = useRef(null);
  const publishedQuestionsRef = useRef(null);
  const publishedExamsRef = useRef(null);

  const dropdownRefs = {
    fullName: fullNameRef,
    publishedQuestions: publishedQuestionsRef,
    publishedExams: publishedExamsRef,
  };

  const resetFilters = () => {
    setNameOrder(null);
    setPublishedQuestionsFilter("");
    setPublishedExamsFilter("");
    setOpenFilter(null);
    setCurrentPage(0);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openFilter &&
        dropdownRefs[openFilter] &&
        dropdownRefs[openFilter].current &&
        !dropdownRefs[openFilter].current.contains(event.target)
      ) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter, dropdownRefs]);

  // Update filteredData to include search filtering
  const filteredData = data
    .filter((item) => {
      if (
        publishedQuestionsFilter &&
        item.publishedQuestions < parseInt(publishedQuestionsFilter)
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (
        publishedExamsFilter &&
        item.publishedExams < parseInt(publishedExamsFilter)
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Search filter: check if fullName includes the search term
      const fullName = item.fullName
        ? item.fullName.toLowerCase()
        : `${item.first_name} ${item.last_name}`.toLowerCase();
      const term = searchTerm.toLowerCase();
      return fullName.includes(term);
    });

  const sortedData = nameOrder
    ? [...filteredData].sort((a, b) => {
        if (nameOrder === "asc") {
          return a.fullName.localeCompare(b.fullName);
        } else {
          return b.fullName.localeCompare(a.fullName);
        }
      })
    : filteredData;

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDetailNavigation = (userId) => {
    const selectedMember = data.find((item) => item.id === userId);

    // console.log(selectedMember); // Check the structure of each member in data

    if (selectedMember) {
      setMemberActivitySingle(
        selectedMember.fullName ||
          selectedMember.first_name ||
          selectedMember.name
      ); // Adjust to match the correct key
      router.push({
        pathname: "/uzv-aktivliyi/",
        query: { id: userId },
      });
    }
  };

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white">
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                #
              </th>
              <th
                className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "fullName" ? null : "fullName")
                }
              >
                <div className="flex items-center gap-4">
                {t('members.memberName')}
                  <IoFunnelOutline />
                </div>
                {openFilter === "fullName" && (
                  <div
                    ref={fullNameRef}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-2xl p-2 divide-y w-40"
                  >
                    <div
                      className={`cursor-pointer hover:bg-gray-100 px-2 py-1 ${
                        nameOrder === "asc" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setNameOrder("asc");
                        setOpenFilter(null);
                      }}
                    >
                      A-Z
                    </div>
                    <div
                      className={`cursor-pointer hover:bg-gray-200 px-2 py-1 ${
                        nameOrder === "desc" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setNameOrder("desc");
                        setOpenFilter(null);
                      }}
                    >
                      Z-A
                    </div>
                  </div>
                )}
              </th>
              <th
                className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(
                    openFilter === "publishedQuestions"
                      ? null
                      : "publishedQuestions"
                  )
                }
              >
                <div className="flex items-center gap-4">
                {t('members.sharedQuestionCount')}
                  <IoFunnelOutline />
                </div>
                {openFilter === "publishedQuestions" && (
                  <div
                    ref={publishedQuestionsRef}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="number"
                      placeholder="Minimum questions"
                      value={publishedQuestionsFilter}
                      onChange={(e) =>
                        setPublishedQuestionsFilter(e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-2 py-1 rounded w-full"
                      onClick={() => setOpenFilter(null)}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </th>
              <th
                className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(
                    openFilter === "publishedExams" ? null : "publishedExams"
                  )
                }
              >
                <div className="flex items-center gap-4">
                {t('members.sharedExamCount')}
                  <IoFunnelOutline />
                </div>
                {openFilter === "publishedExams" && (
                  <div
                    ref={publishedExamsRef}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="number"
                      placeholder="Minimum exams"
                      value={publishedExamsFilter}
                      onChange={(e) => setPublishedExamsFilter(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-2 py-1 rounded w-full"
                      onClick={() => setOpenFilter(null)}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </th>
              <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                {/* Action */}
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-tableBgDefault border-b border-borderTableCel hover:bg-headerTableCel"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{item.first_name}</td>
                  <td className="px-4 py-3">{item.question_count}</td>
                  <td className="px-4 py-3">{item.exam_count}</td>
                  <td className="px-4 py-3 text-linkBlue !text-base">
                    <button onClick={() => handleDetailNavigation(item.id)}>
                    {t('buttons.view')} &gt;
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                {t('members.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-5 pb-5">
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="mr-2">
            {t('members.itemsPerPage')}
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1 bg-white font-gilroy"
            >
              {[15, 10, 5, 3].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>

          {pageCount > 1 && (
            <div>
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center items-center gap-2 w-full"
                pageClassName="inline-block" // Minimal styling on li elements
                pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy" // Apply styles to a elements
                activeClassName="" // Remove active styles from li elements
                activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy" // Active styles on a elements
                previousClassName={currentPage === 0 ? "text-gray-300" : ""}
                previousLinkClassName={
                  currentPage === 0 ? "cursor-not-allowed" : ""
                }
                previousLinkStyle={
                  currentPage === 0 ? { cursor: "not-allowed" } : {}
                }
                nextClassName={
                  currentPage === pageCount - 1 ? "text-gray-300" : ""
                }
                nextLinkClassName={
                  currentPage === pageCount - 1 ? "cursor-not-allowed" : ""
                }
                nextLinkStyle={
                  currentPage === pageCount - 1 ? { cursor: "not-allowed" } : {}
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemberActivity;
