import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";

function Results({ selectedRows, setSelectedRows, handleDelete, handleEdit }) {
  const router = useRouter();

  const data = [
    {
      id: 1,
      name: "John Doe",
      examDate: "2023-10-01",
      completionDate: "2023-10-05",
      result: "80",
    },
    {
      id: 2,
      name: "Jane Smith",
      examDate: "2023-09-28",
      completionDate: "2023-09-30",
      result: "20",
    },
    {
      id: 3,
      name: "Alex Johnson",
      examDate: "2023-10-02",
      completionDate: "2023-10-06",
      result: "95",
    },
    {
      id: 4,
      name: "Emily Davis",
      examDate: "2023-09-29",
      completionDate: "2023-10-01",
      result: "45",
    },
    {
      id: 5,
      name: "Michael Brown",
      examDate: "2023-10-03",
      completionDate: "2023-10-07",
      result: "60",
    },
    {
      id: 6,
      name: "Sarah Miller",
      examDate: "2023-09-30",
      completionDate: "2023-10-02",
      result: "85",
    },
    {
      id: 7,
      name: "Chris Wilson",
      examDate: "2023-10-04",
      completionDate: "2023-10-08",
      result: "70",
    },
    {
      id: 8,
      name: "Jessica Taylor",
      examDate: "2023-10-05",
      completionDate: "2023-10-09",
      result: "90",
    },
    {
      id: 9,
      name: "David Anderson",
      examDate: "2023-10-06",
      completionDate: "2023-10-10",
      result: "55",
    },
    {
      id: 10,
      name: "Sophia Martinez",
      examDate: "2023-10-07",
      completionDate: "2023-10-11",
      result: "75",
    },
    {
      id: 11,
      name: "Daniel Moore",
      examDate: "2023-09-27",
      completionDate: "2023-09-29",
      result: "68",
    },
    {
      id: 12,
      name: "Olivia Thomas",
      examDate: "2023-09-25",
      completionDate: "2023-09-27",
      result: "92",
    },
    {
      id: 13,
      name: "Liam Garcia",
      examDate: "2023-10-08",
      completionDate: "2023-10-12",
      result: "58",
    },
    {
      id: 14,
      name: "Emma Robinson",
      examDate: "2023-09-26",
      completionDate: "2023-09-28",
      result: "84",
    },
    {
      id: 15,
      name: "James White",
      examDate: "2023-09-24",
      completionDate: "2023-09-26",
      result: "50",
    },
    {
      id: 16,
      name: "Mia Hall",
      examDate: "2023-10-09",
      completionDate: "2023-10-13",
      result: "93",
    },
    {
      id: 17,
      name: "Benjamin Allen",
      examDate: "2023-09-23",
      completionDate: "2023-09-25",
      result: "76",
    },
    {
      id: 18,
      name: "Amelia Young",
      examDate: "2023-09-22",
      completionDate: "2023-09-24",
      result: "62",
    },
    {
      id: 19,
      name: "Ethan Hernandez",
      examDate: "2023-09-21",
      completionDate: "2023-09-23",
      result: "47",
    },
    {
      id: 20,
      name: "Ava King",
      examDate: "2023-09-20",
      completionDate: "2023-09-22",
      result: "88",
    },
    {
      id: 21,
      name: "Lucas Wright",
      examDate: "2023-10-10",
      completionDate: "2023-10-14",
      result: "91",
    },
    {
      id: 22,
      name: "Isabella Lopez",
      examDate: "2023-09-19",
      completionDate: "2023-09-21",
      result: "69",
    },
    {
      id: 23,
      name: "Mason Gonzalez",
      examDate: "2023-10-11",
      completionDate: "2023-10-15",
      result: "77",
    },
    {
      id: 24,
      name: "Charlotte Clark",
      examDate: "2023-09-18",
      completionDate: "2023-09-20",
      result: "53",
    },
    {
      id: 25,
      name: "William Lewis",
      examDate: "2023-10-12",
      completionDate: "2023-10-16",
      result: "89",
    },
    {
      id: 26,
      name: "Harper Walker",
      examDate: "2023-09-17",
      completionDate: "2023-09-19",
      result: "81",
    },
    {
      id: 27,
      name: "Henry Lee",
      examDate: "2023-10-13",
      completionDate: "2023-10-17",
      result: "66",
    },
    {
      id: 28,
      name: "Evelyn Scott",
      examDate: "2023-09-16",
      completionDate: "2023-09-18",
      result: "73",
    },
    {
      id: 29,
      name: "Sebastian Green",
      examDate: "2023-10-14",
      completionDate: "2023-10-18",
      result: "59",
    },
    {
      id: 30,
      name: "Abigail Adams",
      examDate: "2023-09-15",
      completionDate: "2023-09-17",
      result: "67",
    }
  ];
  

  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [openFilter, setOpenFilter] = useState(null);

  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [examDateFilter, setExamDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });
  const [completionDateFilter, setCompletionDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });
  const [resultFilter, setResultFilter] = useState("");

  // Refs for each dropdown to handle clicks outside
  const dropdownRefs = {
    name: useRef(null),
    examDate: useRef(null),
    completionDate: useRef(null),
    result: useRef(null),
  };

  // Function to reset all filters
  const resetFilters = () => {
    setNameFilter("");
    setExamDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setCompletionDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setResultFilter("");
    setOpenFilter(null);
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

  // Generate options for years, months, and days
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      // Name filter
      if (
        nameFilter &&
        !item.name.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Exam Date filter
      const { from: examFrom, to: examTo } = examDateFilter;
      const itemExamDate = new Date(item.examDate);
      if (examFrom.year && examFrom.month && examFrom.day) {
        const examFromDate = new Date(
          examFrom.year,
          examFrom.month - 1,
          examFrom.day
        );
        if (itemExamDate < examFromDate) {
          return false;
        }
      }
      if (examTo.year && examTo.month && examTo.day) {
        const examToDate = new Date(examTo.year, examTo.month - 1, examTo.day);
        if (itemExamDate > examToDate) {
          return false;
        }
      }
      return true;
    })
    .filter((item) => {
      // Completion Date filter
      const { from: completionFrom, to: completionTo } = completionDateFilter;
      const itemCompletionDate = new Date(item.completionDate);
      if (completionFrom.year && completionFrom.month && completionFrom.day) {
        const completionFromDate = new Date(
          completionFrom.year,
          completionFrom.month - 1,
          completionFrom.day
        );
        if (itemCompletionDate < completionFromDate) {
          return false;
        }
      }
      if (completionTo.year && completionTo.month && completionTo.day) {
        const completionToDate = new Date(
          completionTo.year,
          completionTo.month - 1,
          completionTo.day
        );
        if (itemCompletionDate > completionToDate) {
          return false;
        }
      }
      return true;
    })
    .filter((item) => {
      // Result filter by percentage ranges
      const result = parseInt(item.result, 10);
      if (resultFilter === "75+" && result < 75) {
        return false;
      }
      if (resultFilter === "45+" && result < 45) {
        return false;
      }
      if (resultFilter === "20+" && result < 20) {
        return false;
      }
      return true;
    });

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const handleClick = (item) => {
    if (!router.isReady) return;

    const { firstDynamicParam } = router.query;
    const secondDynamicParam = item.name;

    router.push(`/fayllar/${firstDynamicParam}/${secondDynamicParam}`);
  };

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="px-2 py-2 text-left bg-headerTableCel text-textSecondaryDefault">
                #
              </th>
              {/* Name Header */}
              <th
                className="relative px-2 py-2 text-left bg-headerTableCel text-textSecondaryDefault cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "name" ? null : "name")
                }
              >
                <div className="flex items-center gap-4 font-medium">
                  Ad Soyad
                  <IoFunnelOutline />
                </div>
                {openFilter === "name" && (
                  <div
                    ref={dropdownRefs.name}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-xl p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      placeholder="Ad Soyad üzrə axtarış"
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      className="border rounded px-2 py-1 w-full font-normal"
                    />
                    <button
                      className="mt-2 gap-1 font-medium font-gilroy text-textSecondaryBlue py-1 rounded flex items-center w-full justify-center"
                      onClick={resetFilters}
                    >
                      <RiLoopLeftLine />
                      Filteri sıfırla
                    </button>
                  </div>
                )}
              </th>
              {/* Exam Date Header */}
              <th
                className="relative px-2 py-2 text-left bg-headerTableCel text-textSecondaryDefault cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "examDate" ? null : "examDate")
                }
              >
                <div className="flex items-center gap-4 font-medium">
                  İmtahanın verilmə tarixi
                  <IoFunnelOutline />
                </div>
                {openFilter === "examDate" && (
                  <div
                    ref={dropdownRefs.examDate}
                    className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col space-y-4">
                      {/* From Date */}
                      <div>
                        <label className="block text-sm font-normal text-gray-700">
                          Başlanğıc tarixi
                        </label>
                        <div className="flex space-x-2 mt-1 ">
                          <select
                            value={examDateFilter.from.year}
                            onChange={(e) =>
                              setExamDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  year: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">İl</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={examDateFilter.from.month}
                            onChange={(e) =>
                              setExamDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  month: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={examDateFilter.from.day}
                            onChange={(e) =>
                              setExamDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  day: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option className="font-normal" value="">
                              Gün
                            </option>
                            {days.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* To Date */}
                      <div>
                        <label className="block text-sm font-normal text-gray-700">
                          Bitmə tarixi
                        </label>
                        <div className="flex space-x-2 mt-1">
                          <select
                            value={examDateFilter.to.year}
                            onChange={(e) =>
                              setExamDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  year: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">İl</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={examDateFilter.to.month}
                            onChange={(e) =>
                              setExamDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  month: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={examDateFilter.to.day}
                            onChange={(e) =>
                              setExamDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  day: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
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
                        className="mt-2 font-gilroy font-normal bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                        onClick={() => setOpenFilter(null)}
                      >
                        Tətbiq et
                      </button>
                    </div>
                  </div>
                )}
              </th>
              {/* Completion Date Header */}
              <th
                className="relative px-2 py-2 text-left bg-headerTableCel text-textSecondaryDefault cursor-pointer"
                onClick={() =>
                  setOpenFilter(
                    openFilter === "completionDate" ? null : "completionDate"
                  )
                }
              >
                <div className="flex items-center gap-4 font-medium">
                  İmtahanın bitirmə tarixi
                  <IoFunnelOutline />
                </div>
                {openFilter === "completionDate" && (
                  <div
                    ref={dropdownRefs.completionDate}
                    className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col space-y-4">
                      {/* From Date */}
                      <div>
                        <label className="block text-sm font-normal text-gray-700">
                          Başlanğıc tarixi
                        </label>
                        <div className="flex space-x-2 mt-1 ">
                          <select
                            value={completionDateFilter.from.year}
                            onChange={(e) =>
                              setCompletionDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  year: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 !font-normal"
                          >
                            <option className="font-normal" value="">
                              İl
                            </option>
                            {years.map((year) => (
                              <option
                                className="font-normal"
                                key={year}
                                value={year}
                              >
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={completionDateFilter.from.month}
                            onChange={(e) =>
                              setCompletionDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  month: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={completionDateFilter.from.day}
                            onChange={(e) =>
                              setCompletionDateFilter((prev) => ({
                                ...prev,
                                from: {
                                  ...prev.from,
                                  day: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option className="font-normal" value="">
                              Gün
                            </option>
                            {days.map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* To Date */}
                      <div>
                        <label className="block text-sm font-normal text-gray-700">
                          Bitmə tarixi
                        </label>
                        <div className="flex space-x-2 mt-1">
                          <select
                            value={completionDateFilter.to.year}
                            onChange={(e) =>
                              setCompletionDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  year: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">İl</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <select
                            value={completionDateFilter.to.month}
                            onChange={(e) =>
                              setCompletionDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  month: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            value={completionDateFilter.to.day}
                            onChange={(e) =>
                              setCompletionDateFilter((prev) => ({
                                ...prev,
                                to: {
                                  ...prev.to,
                                  day: e.target.value,
                                },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3 font-normal"
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
                        className="mt-2 font-gilroy font-normal bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                        onClick={() => setOpenFilter(null)}
                      >
                        Tətbiq et
                      </button>
                    </div>
                  </div>
                )}
              </th>
              {/* Result Header */}
              <th
                className="relative px-2 py-2 text-left bg-headerTableCel text-textSecondaryDefault cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "result" ? null : "result")
                }
              >
                <div className="flex items-center gap-4 font-medium">
                  Nəticə
                  <IoFunnelOutline />
                </div>
                {openFilter === "result" && (
                  <div
                    ref={dropdownRefs.result}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-xl p-2 w-60 -ml-40"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <select
                      value={resultFilter}
                      onChange={(e) => setResultFilter(e.target.value)}
                      className="border rounded px-2 py-1 w-full font-normal"
                    >
                      <option value="">Nəticəni seçin</option>
                      <option value="75+">75%+</option>
                      <option value="45+">45%+</option>
                      <option value="20+">20%+</option>
                    </select>
                    <button
                      className="mt-2 gap-1 font-medium font-gilroy text-textSecondaryBlue py-1 rounded flex items-center w-full justify-center"
                      onClick={resetFilters}
                    >
                      <RiLoopLeftLine />
                      Filteri sıfırla
                    </button>
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-tableBgDefault border-b border-borderTableCel hover:bg-gray-100"
                >
                  <td className="px-2 py-2">{item.id}</td>
                  <td
                    onClick={() => handleClick(item)}
                    className="px-2 py-2 cursor-pointer "
                  >
                    {item.name}
                  </td>
                  <td className="px-2 py-2">{item.examDate}</td>
                  <td className="px-2 py-2">{item.completionDate}</td>
                  <td className="px-2 py-2">{item.result}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-2 py-2 text-center text-gray-500">
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
              Səhifə başına:
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
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"flex items-center space-x-2"}
                pageClassName={
                  "px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                }
                activeClassName={"bg-blue-500 text-white"}
                previousClassName={"cursor-pointer"}
                nextClassName={"cursor-pointer"}
                disabledClassName={"text-gray-400 cursor-not-allowed"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Results;
