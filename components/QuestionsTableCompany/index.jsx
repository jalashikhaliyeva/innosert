import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import CompanyContext from "@/shared/context/CompanyContext";
import axios from "axios";

function QuestionsTableCompany() {
  const { selectedCompany } = useContext(CompanyContext);
  // console.log(selectedCompany, "QuestionsTableCompany selectedCompany");

  const levelColors = {
    Çətin: "bg-redLow",
    Orta: "bg-violetLow",
    Asan: "bg-orangeLow",
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // if (!token || !selectedCompany) return;

        const response = await axios.get(
          "https://innocert-admin.markup.az/api/all-questions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Company-ID": selectedCompany.id,
            },
          }
        );

        // console.log(response.data, "response QUESTION TABLE COMPANY");

        setQuestions(response.data.data); // Update questions state with API data
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [selectedCompany]);

  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [openFilter, setOpenFilter] = useState(null);
  const [levelFilter, setLevelFilter] = useState([]);
  const [questionOrder, setQuestionOrder] = useState(null); // 'asc' or 'desc'
  const [pointsFilter, setPointsFilter] = useState({ min: "", max: "" });
  const [timeFilter, setTimeFilter] = useState({ min: "", max: "" });
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });
  const [fullnameFilter, setFullnameFilter] = useState("");

  const dropdownRefs = {
    suallar: useRef(null),
    fullname: useRef(null),
    seviyye: useRef(null),
    xal: useRef(null),
    vaxt: useRef(null),
    tarix: useRef(null),
  };

  const resetFilters = () => {
    setLevelFilter([]);
    setQuestionOrder(null);
    setPointsFilter({ min: "", max: "" });
    setTimeFilter({ min: "", max: "" });
    setDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setFullnameFilter("");
    setOpenFilter(null);
    setCurrentPage(0);
  };

  // Handle page click for pagination
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page change
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

  const filteredData = questions
    .filter((item) => {
      // Level filter
      if (levelFilter.length > 0 && !levelFilter.includes(item.level)) {
        return false;
      }
      return true;
    })
    // Other filters
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
    // Date filter logic
    .filter((item) => {
      const { from, to } = dateFilter;
      const itemDate = new Date(item.created_at);

      let fromDate = null;
      let toDate = null;

      // Create fromDate if at least the year is provided
      if (from.year) {
        const fromYear = from.year;
        const fromMonth = from.month ? from.month.padStart(2, "0") : "01";
        const fromDay = from.day ? from.day.padStart(2, "0") : "01";
        fromDate = new Date(`${fromYear}-${fromMonth}-${fromDay}`);

        // If the item date is before fromDate, filter it out
        if (itemDate < fromDate) {
          return false;
        }
      }

      // Create toDate if at least the year is provided
      if (to.year) {
        const toYear = to.year;
        const toMonth = to.month ? to.month.padStart(2, "0") : "12";
        const toDay = to.day ? to.day.padStart(2, "0") : "31";
        toDate = new Date(`${toYear}-${toMonth}-${toDay}`);

        // If the item date is after toDate, filter it out
        if (itemDate > toDate) {
          return false;
        }
      }

      return true; // Return true if it passes all date filter conditions
    })
    .filter((item) => {
      if (!fullnameFilter) return true;
      return item.username.toLowerCase().includes(fullnameFilter.toLowerCase());
    });

  // Sorting logic
  const sortedData = questionOrder
    ? [...filteredData].sort((a, b) => {
        if (questionOrder === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      })
    : filteredData;

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
      {/* Table */}
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy"></th>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                #
              </th>
              {/* Suallar Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "fullname" ? null : "fullname")
                }
              >
                <div className="flex items-center gap-4">
                  İstifadəçi Adı
                  <IoFunnelOutline />
                </div>
                {openFilter === "fullname" && (
                  <div
                    ref={dropdownRefs.fullname}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="text"
                      placeholder="Axtarış..."
                      value={fullnameFilter}
                      onChange={(e) => setFullnameFilter(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-2 py-1 rounded w-full"
                      onClick={() => setOpenFilter(null)}
                    >
                      Tətbiq et
                    </button>
                  </div>
                )}
              </th>
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
              {/* Member Name Header */}

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
                      Filteri Sıfırla
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
              {/* Vaxt Header */}
              {/* <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "vaxt" ? null : "vaxt")
                }
              >
                <div className="flex items-center gap-4 font-gilroy">
                  Vaxt
                  <IoFunnelOutline />
                </div>
                {openFilter === "vaxt" && (
                  <div
                    ref={dropdownRefs.vaxt}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Minimum"
                        value={timeFilter.min}
                        onChange={(e) =>
                          setTimeFilter((prev) => ({
                            ...prev,
                            min: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 w-20 font-gilroy"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Maksimum"
                        value={timeFilter.max}
                        onChange={(e) =>
                          setTimeFilter((prev) => ({
                            ...prev,
                            max: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 w-20"
                      />
                    </div>
                    <button
                      className="mt-2  font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-2 py-1 rounded w-full"
                      onClick={() => setOpenFilter(null)}
                    >
                      Tətbiq et
                    </button>
                  </div>
                )}
              </th> */}
              {/* Tarix Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "tarix" ? null : "tarix")
                }
              >
                <div className="flex items-center gap-4">
                  Tarix
                  <IoFunnelOutline />
                </div>
                {openFilter === "tarix" && (
                  <div
                    ref={dropdownRefs.tarix}
                    className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-48"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col space-y-4">
                      {/* From Date */}
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
                                from: { ...prev.from, year: e.target.value },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">İl</option>
                            {years.map((year) => (
                              <option key={year} value={year.toString()}>
                                {year}
                              </option>
                            ))}
                          </select>

                          <select
                            value={dateFilter.from.month}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                from: { ...prev.from, month: e.target.value },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">Ay</option>
                            {months.map((month) => (
                              <option
                                key={month}
                                value={month.toString().padStart(2, "0")}
                              >
                                {month}
                              </option>
                            ))}
                          </select>

                          <select
                            value={dateFilter.from.day}
                            onChange={(e) =>
                              setDateFilter((prev) => ({
                                ...prev,
                                from: { ...prev.from, day: e.target.value },
                              }))
                            }
                            className="border rounded px-2 py-1 w-1/3"
                          >
                            <option value="">Gün</option>
                            {days.map((day) => (
                              <option
                                key={day}
                                value={day.toString().padStart(2, "0")}
                              >
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/* To Date */}
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
                        className="mt-2  font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                        onClick={() => setOpenFilter(null)}
                      >
                        Tətbiq et
                      </button>
                    </div>
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
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">{index + 1}</td>{" "}
                  {/* Custom numbering */}
                  <td className="flex items-center gap-3 px-4 py-2">
                    {item.photo &&
                    item.photo !== "https://innocert-admin.markup.az" ? (
                      <img
                        src={item.photo}
                        alt={item.username}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-xs text-blue-800 font-medium">
                        {item.username
                          .split(" ")
                          .map((name) => name.charAt(0))
                          .join("")}
                      </div>
                    )}
                    {item.username}
                  </td>
                  <td className="px-4 py-2 relative group">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          item.title.length > 49
                            ? item.title.substring(0, 49) + "..."
                            : item.title,
                      }}
                    ></div>

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 whitespace-nowrap bg-white border text-black text-sm px-3 py-1 rounded shadow-shadow3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></div>

                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                  </td>
                  {/* Member Name Cell */}
                  <td className="px-4 py-2 w-[130px]">
                    <div
                      className={`${
                        levelColors[item.level]
                      } rounded-md py-1 flex items-center justify-center`}
                    >
                      {item.level}
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.score}</td>
                  {/* <td className="px-4 py-2">{item.time}</td> */}
                  <td className="px-4 py-2 !text-sm">{item.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 text-center text-gray-500">
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

export default QuestionsTableCompany;
