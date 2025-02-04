// Results.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";
const parseDate = (dateString) => {
  const [time, date] = dateString.split(" ");
  const [day, month, year] = date.split(".");
  return new Date(year, month - 1, day, ...time.split(":"));
};

function Results({ examSlug, searchTerm }) {
  const router = useRouter();

  // State declarations
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [openFilter, setOpenFilter] = useState(null);
  // Define the current year
  const currentYear = new Date().getFullYear();

  // Generate an array of years from 2000 to the current year
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => 2000 + i);

  // Define months as numbers (1-12)
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // Alternatively, define months with names for better UX
  // const months = [
  //   "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
  //   "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
  // ];

  // Define days as numbers (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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

  // Fetch results data from API
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://api.innosert.az/api/exam/result/${examSlug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fetchedData = response.data.data.map((item) => ({
          ...item,
          examDate: parseDate(item.start_exam),
          completionDate: parseDate(item.finish_exam),
        }));
        setData(fetchedData);
        // console.log(fetchedData, "results data");
      } catch (err) {
        console.error("Error fetching results:", err);
        setError("Nəticələr alınarkən səhv baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    if (examSlug) {
      fetchResults();
    }
  }, [examSlug]);

  if (loading) {
    return (
      <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
        <p>Yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Filtering logic
  const filteredData = data

    .filter((item) => {
      // **Search filter: filter by user name based on searchTerm**
      if (
        searchTerm &&
        !item.user.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      if (
        nameFilter &&
        !item.user.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      const { from: examFrom, to: examTo } = examDateFilter;
      if (examFrom.year && examFrom.month && examFrom.day) {
        const fromDate = new Date(
          examFrom.year,
          examFrom.month - 1,
          examFrom.day
        );
        if (item.examDate < fromDate) return false;
      }
      if (examTo.year && examTo.month && examTo.day) {
        const toDate = new Date(examTo.year, examTo.month - 1, examTo.day);
        if (item.examDate > toDate) return false;
      }
      return true;
    })
    .filter((item) => {
      const { from: completionFrom, to: completionTo } = completionDateFilter;
      if (completionFrom.year && completionFrom.month && completionFrom.day) {
        const fromDate = new Date(
          completionFrom.year,
          completionFrom.month - 1,
          completionFrom.day
        );
        if (item.completionDate < fromDate) return false;
      }
      if (completionTo.year && completionTo.month && completionTo.day) {
        const toDate = new Date(
          completionTo.year,
          completionTo.month - 1,
          completionTo.day
        );
        if (item.completionDate > toDate) return false;
      }
      return true;
    })
    .filter((item) => {
      const result = parseInt(item.totalScore, 10);
      if (resultFilter === "75+" && result < 75) return false;
      if (resultFilter === "45+" && result < 45) return false;
      if (resultFilter === "20+" && result < 20) return false;
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
              paginatedData.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-tableBgDefault border-b border-borderTableCel hover:bg-gray-100"
                >
                  <td className="px-4 py-2">
                    {currentPage * itemsPerPage + index + 1}
                  </td>

                  <td
                    onClick={() => handleClick(item)}
                    className="px-2 py-2 cursor-pointer "
                  >
                    {item.user}
                  </td>
                  <td className="px-2 py-2">{item.start_exam}</td>
                  <td className="px-2 py-2">{item.finish_exam}</td>
                  <td className="px-2 py-2">{item.totalScore}%</td>
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

export default Results;
