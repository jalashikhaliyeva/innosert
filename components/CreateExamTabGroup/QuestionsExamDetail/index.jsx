import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { BsTrash3 } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { FiRefreshCw } from "react-icons/fi";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext";

function QuestionsExamDetails({
  selectedRows,
  setSelectedRows,
  openDeleteModal,
  questions,
  searchTerm,
}) {
  console.log(questions, "QuestionsTableCompany from API add quest");
  // const data = questions;

  const { setSelectedQuestion } = useContext(UserContext);
  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const data = filteredQuestions;

  // Define level colors
  const levelColors = {
    Çətin: "bg-redLow",
    Orta: "bg-violetLow",
    Asan: "bg-orangeLow",
  };

  // Handle checkbox change for individual rows
  const handleCheckboxChange = (id) => {
    const rows = Array.isArray(selectedRows) ? selectedRows : [];

    if (rows.includes(id)) {
      setSelectedRows(rows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...rows, id]);
    }
  };

  const router = useRouter();

  // Handle edit action
  const handleEdit = (question) => {
    console.log(question, "handle edit");
    setSelectedQuestion(question);
    router.push({
      pathname: "/sual-redakte",
    });
  };

  // Handle delete action
  const handleDeleteClick = (id) => {
    openDeleteModal(id);
  };

  // Handle row click to view question details
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
  const [timeOrder, setTimeOrder] = useState(null); // New state for time sorting
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
    vaxt: useRef(null), // New ref for Time filter
    tarix: useRef(null),
  };

  // Determine if any question has non-zero minutes or seconds
  const hasTime = data.some((q) => (q.minute || 0) > 0 || (q.second || 0) > 0);

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

  // Utility function to strip HTML tags
  const stripHtml = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

  // Filter data based on date, points, and level
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
      return itemScore >= minPoints && itemScore <= maxPoints;
    })
    .filter((item) => {
      if (levelFilter.length === 0) {
        return true;
      }
      return levelFilter.includes(item.level);
    });

  // Sorting logic
  let sortedData = [...filteredData];

  // Sort by question title if applicable
  if (questionOrder) {
    sortedData.sort((a, b) => {
      const aTitle = stripHtml(a.title);
      const bTitle = stripHtml(b.title);
      if (questionOrder === "asc") {
        return aTitle.localeCompare(bTitle);
      } else {
        return bTitle.localeCompare(aTitle);
      }
    });
  }

  // Sort by time if applicable
  if (timeOrder && hasTime) {
    sortedData.sort((a, b) => {
      const aTotalSeconds = (a.minute || 0) * 60 + (a.second || 0);
      const bTotalSeconds = (b.minute || 0) * 60 + (b.second || 0);
      if (timeOrder === "asc") {
        return aTotalSeconds - bTotalSeconds;
      } else {
        return bTotalSeconds - aTotalSeconds;
      }
    });
  }

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Function to reset all filters
  const resetFilters = () => {
    setLevelFilter([]);
    setQuestionOrder(null);
    setTimeOrder(null); // Reset time sorting
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
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              {/* Select All Checkbox */}
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                <input
                  type="checkbox"
                  checked={
                    selectedRows?.length === data?.length && data?.length > 0
                  }
                  onChange={handleSelectAllChange}
                />
              </th>

              {/* Index Column */}
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
                  {/* <IoFunnelOutline /> */}
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
                  {/* <IoFunnelOutline /> */}
                </div>
                {openFilter === "seviyye" && (
                  <div
                    ref={dropdownRefs.seviyye}
                    className="absolute z-20 mt-2 w-48 bg-white border rounded shadow-xl p-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
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
                  {/* <IoFunnelOutline /> */}
                </div>
                {/* {openFilter === "xal" && (
                  <div
                    ref={dropdownRefs.xal}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
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
                        className="hover:bg-inputBgHover border rounded px-2 py-1 w-20"
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
                )} */}
              </th>

              {/* Conditionally Render Time Headers */}
              {hasTime && (
                <>
                  {/* Dəqiqə Header */}
                  <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                    Dəqiqə
                  </th>

                  {/* Saniyə Header */}
                  <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                    Saniyə
                  </th>
                </>
              )}

              {/* Tarix Header with Dropdown */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "tarix" ? null : "tarix")
                }
              >
                <div className="flex items-center gap-4">
                  Tarix
                  {/* <IoFunnelOutline /> */}
                </div>
                {/* {openFilter === "tarix" && (
                  <div
                    ref={dropdownRefs.tarix}
                    className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-48"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col space-y-4">
                    
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Başlanğıc Tarix
                        </label>
                        <div className="flex space-x-2 mt-1">
                          <select
                            value={dateFilter.from.year}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  year: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">İl</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={dateFilter.from.month}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  month: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={dateFilter.from.day}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  day: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">Gün</option>
                            {days.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

             
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Son Tarix
                        </label>
                        <div className="flex space-x-2 mt-1">
                          <select
                            value={dateFilter.to.year}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  year: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">İl</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={dateFilter.to.month}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  month: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={dateFilter.to.day}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  day: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">Gün</option>
                            {days.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                        onClick={() => setOpenFilter(null)}
                      >
                        Tətbiq et
                      </button>
                    </div>
                  </div>
                )} */}
              </th>

              {/* Reset Filters Button */}
              <th
                className="relative flex items-center gap-4 px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={resetFilters}
              >
                Sıfırla
                <FiRefreshCw />
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, indexInPage) => {
                const customIndex =
                  currentPage * itemsPerPage + indexInPage + 1;
                const plainTitle = stripHtml(item.question);
                const displayedTitle =
                  plainTitle.length > 49
                    ? plainTitle.substring(0, 49) + "..."
                    : plainTitle;

                return (
                  <tr
                    key={item.id}
                    className="bg-tableBgDefault border-b border-borderTableCel"
                  >
                    {/* Select Checkbox */}
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

                    {/* Index */}
                    <td className="px-4 py-2">{customIndex}</td>

                    {/* Suallar */}
                    <td
                      onClick={() => handleClick(item)}
                      className="px-4 py-2 relative group cursor-pointer"
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: displayedTitle }}
                      />

                      {/* Tooltip */}
                      <div className="absolute !text-xs bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 whitespace-nowrap bg-white border text-black px-3 py-1 rounded shadow-shadow3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                      </div>

                      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                    </td>

                    {/* Səviyyə */}
                    <td className="px-4 py-2 w-[100px]">
                      <div
                        className={`${
                          levelColors[item.level]
                        } rounded-md py-1 flex items-center justify-center`}
                      >
                        {item.level}
                      </div>
                    </td>

                    {/* Xal */}
                    <td className="px-4 py-2">{item.score}</td>

                    {/* Conditionally Render Time Cells */}
                    {hasTime && (
                      <>
                        {/* Dəqiqə */}
                        <td className="px-4 py-2">
                          <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded px-2 py-1">
                            <span className="font-mono text-sm text-gray-700">
                              {String(item.minute).padStart(2, "0")}
                            </span>
                          </div>
                        </td>

                        {/* Saniyə */}
                        <td className="px-4 py-2">
                          <div className="flex items-center justify-center bg-gray-100 border border-gray-300 rounded px-2 py-1">
                            <span className="font-mono text-sm text-gray-700">
                              {String(item.second).padStart(2, "0")}
                            </span>
                          </div>
                        </td>
                      </>
                    )}

                    {/* Tarix */}
                    <td className="px-4 py-2">{item.created_at}</td>

                    {/* Actions */}
                    <td className="sticky right-0 bg-white z-10 sm:static px-2 md:px-4 py-2">
                      <div className="flex items-center">
                        <BsTrash3
                          onClick={() => handleDeleteClick(item.id)}
                          className="mx-2 size-5 cursor-pointer text-red400 hover:bg-gray-100"
                        />
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
                  colSpan={hasTime ? "8" : "7"}
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
    </div>
  );
}

export default QuestionsExamDetails;
