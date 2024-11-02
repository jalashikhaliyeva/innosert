import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { BsTrash3 } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { FiRefreshCw } from "react-icons/fi";
import { UserContext } from "@/shared/context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TableComponent({
  selectedRows,
  setSelectedRows,
  questions,
  showActionButtons = false,
  showDeleteButton = false,
}) {
  console.log(questions, "QuestionsTableCompany from API add quest");
  const data = questions;

  const {
    setSelectedQuestion,
    selectedQuestionsForExam,
    setSelectedQuestionsForExam,
    timeForQuestion,
    setIsQuestionsValid,
  } = useContext(UserContext);

  // **Handler for the Add Button**
  const handleAdd = () => {
    // Filter the selected questions based on selectedRows
    const selectedQuestions = data.filter((question) =>
      selectedRows.includes(question.id)
    );

    // Map selected questions to include minute and second if timeForQuestion is true
    const selectedQuestionsWithTime = selectedQuestions.map((q) => ({
      ...q,
      minute: timeForQuestion ? (questionTimes[q.id]?.minutes || 0) : undefined,
      second: timeForQuestion ? (questionTimes[q.id]?.seconds || 0) : undefined,
    }));

    // Update the context by appending new questions with time data
    setSelectedQuestionsForExam((prevSelectedQuestions) => {
      // Create a Set of existing question IDs to prevent duplicates
      const existingQuestionIds = new Set(
        prevSelectedQuestions.map((q) => q.id)
      );

      // Filter out any questions that are already selected
      const newUniqueQuestions = selectedQuestionsWithTime.filter(
        (q) => !existingQuestionIds.has(q.id)
      );

      // Append the unique new questions with time data
      return [...prevSelectedQuestions, ...newUniqueQuestions];
    });

    // Optional: Provide feedback to the user
    toast.success(`${selectedQuestions.length} question(s) added to the exam.`);
    console.log(selectedQuestionsWithTime, "question(s) added to the exam with time");

    // Optional: Clear the selection after adding
    setSelectedRows([]);
  };

  // **Initialize questionTimes from selectedQuestionsForExam**
  useEffect(() => {
    const initialTimes = {};
    selectedQuestionsForExam.forEach((q) => {
      if (q.minute !== undefined && q.second !== undefined) {
        initialTimes[q.id] = { minutes: q.minute, seconds: q.second };
      }
    });
    setQuestionTimes(initialTimes);
  }, [selectedQuestionsForExam]);

  // **Initialize minutes and seconds when timeForQuestion changes**
  useEffect(() => {
    if (timeForQuestion) {
      setSelectedQuestionsForExam((prevSelectedQuestions) =>
        prevSelectedQuestions.map((q) => ({
          ...q,
          minute: q.minute !== undefined ? q.minute : 0,
          second: q.second !== undefined ? q.second : 0,
        }))
      );
    } else {
      // Optionally, remove minute and second if timeForQuestion is disabled
      setSelectedQuestionsForExam((prevSelectedQuestions) =>
        prevSelectedQuestions.map((q) => {
          const { minute, second, ...rest } = q;
          return rest;
        })
      );
      setQuestionTimes({});
    }
  }, [timeForQuestion, setSelectedQuestionsForExam]);

  // **Update Validation Logic**
  useEffect(() => {
    if (!timeForQuestion) {
      setIsQuestionsValid(selectedQuestionsForExam.length >= 10);
    } else {
      const allTimesValid = selectedQuestionsForExam.every(
        (q) => q.minute > 0 || q.second > 0
      );
      setIsQuestionsValid(
        selectedQuestionsForExam.length >= 10 && allTimesValid
      );

      // Optional: Notify user if validation fails
      if (
        selectedQuestionsForExam.length >= 10 &&
        !allTimesValid
      ) {
        toast.warning("Hər bir sual üçün ən azı bir sıfırdan fərqli vaxt dəyəri olmalıdır.");
      }
    }
  }, [selectedQuestionsForExam, timeForQuestion, setIsQuestionsValid]);

  const handleRemoveQuestion = (id) => {
    // Remove the question from selectedQuestionsForExam
    setSelectedQuestionsForExam((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );

    // If the removed question is in selectedRows, remove it
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((rowId) => rowId !== id)
    );

    // Remove the time entry for the removed question
    setQuestionTimes((prevTimes) => {
      const updatedTimes = { ...prevTimes };
      delete updatedTimes[id];
      return updatedTimes;
    });

    // Provide feedback to the user
    toast.success("Question removed from the exam.");
  };

  // Adjusted levelColors to match your data
  const levelColors = {
    Çətin: "bg-redLow",
    Orta: "bg-violetLow",
    Asan: "bg-orangeLow",
  };

  const handleCheckboxChange = (id) => {
    // Ensure selectedRows is an array before accessing it
    const rows = Array.isArray(selectedRows) ? selectedRows : [];

    if (rows.includes(id)) {
      setSelectedRows(rows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...rows, id]);
    }
  };

  // **State for time per question**
  const [questionTimes, setQuestionTimes] = useState({});

  const handleMinutesChange = (id, value) => {
    const minutes = Math.max(0, Math.min(59, Number(value)));
    setQuestionTimes((prevTimes) => ({
      ...prevTimes,
      [id]: {
        ...prevTimes[id],
        minutes,
      },
    }));

    // Update selectedQuestionsForExam
    setSelectedQuestionsForExam((prevSelectedQuestions) =>
      prevSelectedQuestions.map((q) =>
        q.id === id ? { ...q, minute: minutes } : q
      )
    );
  };

  const handleSecondsChange = (id, value) => {
    const seconds = Math.max(0, Math.min(59, Number(value)));
    setQuestionTimes((prevTimes) => ({
      ...prevTimes,
      [id]: {
        ...prevTimes[id],
        seconds,
      },
    }));

    // Update selectedQuestionsForExam
    setSelectedQuestionsForExam((prevSelectedQuestions) =>
      prevSelectedQuestions.map((q) =>
        q.id === id ? { ...q, second: seconds } : q
      )
    );
  };

  const router = useRouter();
  const handleEdit = (question) => {
    console.log(question, "handle edit");
    setSelectedQuestion(question);
    // Navigate to the sual-redakte page with question data in query params
    router.push({
      pathname: "/sual-redakte",
    });
  };

  const handleClick = (question) => {
    console.log(question, "handle click");
    setSelectedQuestion(question);
    router.push("/sual-haqqinda");
  };

  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [openFilter, setOpenFilter] = useState(null);
  const [levelFilter, setLevelFilter] = useState([]);
  const [questionOrder, setQuestionOrder] = useState(null);
  const [pointsFilter, setPointsFilter] = useState({ min: "", max: "" });
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  // Arrays for date selection
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Refs for each dropdown to handle clicks outside
  const dropdownRefs = {
    suallar: useRef(null),
    seviyye: useRef(null),
    xal: useRef(null),
    tarix: useRef(null),
  };

  // Handle "select all" checkbox change
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Handle page click for pagination
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  // Close dropdown when clicking outside
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

  const stripHtml = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

  const filteredData = data
    ?.filter((item) => {
      const { from, to } = dateFilter;
      const itemDate = new Date(item.created_at);

      let fromDate = new Date(-8640000000000000); // Minimum date
      let toDate = new Date(8640000000000000); // Maximum date

      if (from.year && from.month && from.day) {
        fromDate = new Date(from.year, from.month - 1, from.day);
      }

      if (to.year && to.month && to.day) {
        toDate = new Date(to.year, to.month - 1, to.day);
      }

      return itemDate >= fromDate && itemDate <= toDate;
    })
    .filter((item) => {
      const minPoints = pointsFilter.min
        ? parseInt(pointsFilter.min)
        : -Infinity;
      const maxPoints = pointsFilter.max
        ? parseInt(pointsFilter.max)
        : Infinity;
      const itemScore = parseInt(item.score);
      if (itemScore < minPoints || itemScore > maxPoints) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (levelFilter.length === 0) {
        return true;
      }
      return levelFilter.includes(item.level);
    });

  // Sorting logic
  const sortedData = questionOrder
    ? [...filteredData]?.sort((a, b) => {
        const aTitle = stripHtml(a.title);
        const bTitle = stripHtml(b.title);
        if (questionOrder === "asc") {
          return aTitle.localeCompare(bTitle);
        } else {
          return bTitle.localeCompare(aTitle);
        }
      })
    : filteredData;

  const pageCount = Math.ceil(sortedData?.length / itemsPerPage);

  const paginatedData = sortedData?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Function to reset all filters
  const resetFilters = () => {
    setLevelFilter([]);
    setQuestionOrder(null);
    setPointsFilter({ min: "", max: "" });
    setDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setOpenFilter(null);
    setCurrentPage(0);
  };

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
      {/* Table */}
      <div className="w-full overflow-auto max-h-[340px] relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                <input
                  type="checkbox"
                  checked={
                    selectedRows?.length === data?.length && data?.length > 0
                  }
                  onChange={handleSelectAllChange}
                />
              </th>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                #
              </th>

              {/* Suallar Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "suallar" ? null : "suallar")
                }
              >
                <div className="flex items-center gap-4">
                  Suallar
                  <IoFunnelOutline />
                </div>
                {openFilter === "suallar" && (
                  <div
                    ref={dropdownRefs.suallar}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-2xl p-2 divide-y w-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={`cursor-pointer hover:bg-gray-100 px-2 py-1 ${
                        questionOrder === "asc" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setQuestionOrder("asc");
                        setOpenFilter(null);
                      }}
                    >
                      A-Z
                    </div>
                    <div
                      className={`cursor-pointer hover:bg-gray-200 px-2 py-1 ${
                        questionOrder === "desc" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setQuestionOrder("desc");
                        setOpenFilter(null);
                      }}
                    >
                      Z-A
                    </div>
                  </div>
                )}
              </th>

              {/* Səviyyə Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "seviyye" ? null : "seviyye")
                }
              >
                <div className="flex items-center gap-4">
                  Səviyyə
                  <IoFunnelOutline />
                </div>
                {openFilter === "seviyye" && (
                  <div
                    ref={dropdownRefs.seviyye}
                    className="absolute z-20 mt-2 w-48 bg-white border rounded shadow-xl p-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={levelFilter.includes("Asan")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLevelFilter((prev) =>
                            isChecked
                              ? [...prev, "Asan"]
                              : prev.filter((l) => l !== "Asan")
                          );
                        }}
                      />
                      Asan
                    </label>
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={levelFilter.includes("Orta")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLevelFilter((prev) =>
                            isChecked
                              ? [...prev, "Orta"]
                              : prev.filter((l) => l !== "Orta")
                          );
                        }}
                      />
                      Orta
                    </label>
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={levelFilter.includes("Çətin")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLevelFilter((prev) =>
                            isChecked
                              ? [...prev, "Çətin"]
                              : prev.filter((l) => l !== "Çətin")
                          );
                        }}
                      />
                      Çətin
                    </label>
                    <button
                      className="mt-2 gap-1 font-gilroy text-textSecondaryBlue py-1 rounded flex items-center w-full justify-center"
                      onClick={resetFilters}
                    >
                      <RiLoopLeftLine />
                      Filteri Sifirla
                    </button>
                  </div>
                )}
              </th>

              {/* Xal Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "xal" ? null : "xal")
                }
              >
                <div className="flex items-center gap-4">
                  Xal
                  <IoFunnelOutline />
                </div>
                {openFilter === "xal" && (
                  <div
                    ref={dropdownRefs.xal}
                    className="absolute z-20 mt-2 bg-white  border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Minimum"
                        value={pointsFilter.min}
                        onChange={(e) =>
                          setPointsFilter((prev) => ({
                            ...prev,
                            min: e.target.value,
                          }))
                        }
                        className="hover:bg-inputBgHover  border rounded px-2 py-1 w-20"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Maksimum"
                        value={pointsFilter.max}
                        onChange={(e) =>
                          setPointsFilter((prev) => ({
                            ...prev,
                            max: e.target.value,
                          }))
                        }
                        className="border hover:bg-inputBgHover rounded px-2 py-1 w-20"
                      />
                    </div>
                    <button
                      className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-2 py-1 rounded w-full"
                      onClick={() => setOpenFilter(null)}
                    >
                      Tətbiq et
                    </button>
                  </div>
                )}
              </th>

              {timeForQuestion && (
                <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                  Vaxt təyin etmək
                </th>
              )}
              <th
                className="relative flex items-center gap-4 px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={resetFilters} // Added onClick handler
              >
                Sıfırla
                <FiRefreshCw />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData.map((item, indexInPage) => {
                const customIndex =
                  currentPage * itemsPerPage + indexInPage + 1;
                const plainTitle = stripHtml(item?.title);
                const displayedTitle =
                  plainTitle.length > 49
                    ? plainTitle.substring(0, 49) + "..."
                    : plainTitle;

                // Get current time for the question, default to 0 if not set
                const currentTime =
                  questionTimes[item.id] || {
                    minutes: item.minute || 0,
                    seconds: item.second || 0,
                  };

                return (
                  <tr
                    key={item?.id}
                    className="bg-tableBgDefault border-b border-borderTableCel "
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(selectedRows) &&
                          selectedRows.includes(item.id)
                        }
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td className="px-4 py-2">{customIndex}</td>

                    <td
                      onClick={() => handleClick(item)}
                      className="px-4 py-2 relative group cursor-pointer"
                    >
                      {displayedTitle}

                      {/* Tooltip */}
                      <div className="absolute !text-xs bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 whitespace-nowrap bg-white border text-black  px-3 py-1 rounded shadow-shadow3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                      </div>

                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                    </td>

                    <td className="px-4 py-2 w-[100px]">
                      <div
                        className={`${
                          levelColors[item.level]
                        } rounded-md py-1 flex items-center justify-center`}
                      >
                        {item.level}
                      </div>
                    </td>
                    <td className="px-4 py-2">{item.score}</td>
                    {timeForQuestion && (
                      <td className="px-4 py-2">
                        <div className="flex items-start space-x-4">
                          {/* Minutes Section */}
                          <div className="flex flex-col items-center">
                            <label
                              htmlFor={`minutes-${item.id}`}
                              className="text-[10px] mb-1"
                            >
                              Minutes
                            </label>
                            <input
                              id={`minutes-${item.id}`}
                              type="number"
                              min="0"
                              max="59"
                              value={currentTime.minutes}
                              onChange={(e) =>
                                handleMinutesChange(item.id, e.target.value)
                              }
                              className="w-12 p-0 text-center focus:outline-none focus:border-blue-500 border rounded"
                            />
                          </div>

                          {/* Separator */}
                          <span className="self-end text-lg">:</span>

                          {/* Seconds Section */}
                          <div className="flex flex-col items-center">
                            <label
                              htmlFor={`seconds-${item.id}`}
                              className="text-[10px] mb-1"
                            >
                              Seconds
                            </label>
                            <input
                              id={`seconds-${item.id}`}
                              type="number"
                              min="0"
                              max="59"
                              value={currentTime.seconds}
                              onChange={(e) =>
                                handleSecondsChange(item.id, e.target.value)
                              }
                              className="w-12 p-0 text-center focus:outline-none focus:border-blue-500 border rounded"
                            />
                          </div>
                        </div>
                      </td>
                    )}
                    <td className="sticky right-0 bg-white z-10 sm:static px-2 md:px-4 py-2 ">
                      <div className="flex items-center">
                        {showDeleteButton && (
                          <div className="relative flex items-center group">
                            <BsTrash3
                              onClick={() => handleRemoveQuestion(item.id)}
                              className="mx-2 size-5 cursor-pointer text-red400 hover:bg-gray-100"
                            />
                            <span className="absolute bottom-full mb-2 hidden px-2 py-1 text-base text-gray-700 bg-white border  rounded-md whitespace-nowrap group-hover:block">
                              Bu sualı yalnız imtahandan silin
                            </span>
                          </div>
                        )}
                        <VscEdit
                          onClick={() => handleEdit(item)}
                          className="mx-2 size-5 cursor-pointer text-brandBlue400 hover:bg-gray-100"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={timeForQuestion ? "7" : "6"}
                  className="px-4 py-2 text-center text-gray-500"
                >
                  Heç bir nəticə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-5 pb-5">
          {/* Items Per Page Selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="mr-2">
              Səhifə başına sual:
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

          {/* Pagination */}
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
                pageClassName="inline-block"
                pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy"
                activeClassName=""
                activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy"
                previousClassName={currentPage === 0 ? "text-gray-300" : ""}
                previousLinkClassName={
                  currentPage === 0 ? "cursor-not-allowed" : ""
                }
                nextClassName={
                  currentPage === pageCount - 1 ? "text-gray-300" : ""
                }
                nextLinkClassName={
                  currentPage === pageCount - 1 ? "cursor-not-allowed" : ""
                }
              />
            </div>
          )}
        </div>
      </div>
      {/* Conditionally Render Action Buttons */}
      {showActionButtons && (
        <div className="flex gap-2 justify-end mt-3">
          <button className="bg-buttonSecondaryDefault hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed py-2 px-4 text-base font-normal leading-6 font-gilroy text-grayButtonText rounded-lg">
            Ləğv et
          </button>
          <button
            className={`py-2 px-4 text-base font-normal leading-6 font-gilroy text-white rounded-lg 
      ${
        selectedRows.length === 0
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
      }`}
            disabled={selectedRows.length === 0}
            onClick={handleAdd} // **Attach the handler here**
          >
            Əlavə et
          </button>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default TableComponent;
