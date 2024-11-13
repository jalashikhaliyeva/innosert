import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "axios";
import CompanyContext from "@/shared/context/CompanyContext";
import Spinner from "../Spinner";
import { useTranslation } from "react-i18next";
// Utility function to strip HTML tags
const stripHTML = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

function SuallarComponent({ id }) {
  const { t } = useTranslation();
  const { selectedCompany } = useContext(CompanyContext);
  const [token, setToken] = useState(null);

  // Safely access localStorage in useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  const levelColors = {
    Çətin: "bg-redLow",
    Orta: "bg-violetLow",
    Asan: "bg-orangeLow",
  };

  // **All useState hooks declared at the top**
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default items per page set to 15
  const [openFilter, setOpenFilter] = useState(null);
  const [levelFilter, setLevelFilter] = useState([]);
  const [questionOrder, setQuestionOrder] = useState(null); // 'asc' or 'desc'
  const [pointsFilter, setPointsFilter] = useState({ min: "", max: "" });
  const [timeFilter, setTimeFilter] = useState({ min: "", max: "" });
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  // **All useRef hooks declared at the top**
  const dropdownRefs = {
    suallar: useRef(null),
    seviyye: useRef(null),
    xal: useRef(null),
    vaxt: useRef(null),
    tarix: useRef(null),
  };

  const router = useRouter();

  // **All useEffect hooks declared before any return statements**

  // Fetch data effect
  useEffect(() => {
    if (!token || !selectedCompany?.id) return; // Early return if token or selectedCompany.id is missing

    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://innocert-admin.markup.az/api/me/company-teachers-activity/questions/147`,
          `https://innocert-admin.markup.az/api/me/company-teachers-activity/questions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Company-ID": selectedCompany.id,
            },
          }
        );
        // Preprocess data to ensure 'time' and 'score' are numbers and strip HTML from 'title'
        const processedData = response.data.data.map((item) => ({
          ...item,
          time: parseInt(item.time, 10) || 0,
          score: parseInt(item.score, 10) || 0,
          title: stripHTML(item.title),
        }));
        setData(processedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token, selectedCompany]);

  // Handle clicks outside dropdowns
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

  // **Inspect the data (optional, for debugging)**
  useEffect(() => {
    if (!loading && !error) {
      console.log("Fetched Data:", data);
    }
  }, [loading, error, data]);

  // **Conditional Rendering After Hooks**

  // Render loading or error states
  if (loading)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error) return <p>Error fetching data: {error.message}</p>;

  // Function to reset all filters
  const resetFilters = () => {
    setLevelFilter([]);
    setQuestionOrder(null);
    setPointsFilter({ min: "", max: "" });
    setTimeFilter({ min: "", max: "" });
    setDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setOpenFilter(null);
    setCurrentPage(0);
  };

  // Handle page click for pagination
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0); // Reset to first page when items per page change
  };

  // Generate options for years, months, and days
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      // Level filter
      if (levelFilter.length > 0 && !levelFilter.includes(item.level)) {
        return false;
      }
      return true;
    })
    // Points filter
    .filter((item) => {
      const minPoints = pointsFilter.min
        ? parseInt(pointsFilter.min, 10)
        : -Infinity;
      const maxPoints = pointsFilter.max
        ? parseInt(pointsFilter.max, 10)
        : Infinity;
      if (item.score < minPoints || item.score > maxPoints) {
        return false;
      }
      return true;
    })
    // Time filter
    .filter((item) => {
      const minTime = timeFilter.min ? parseInt(timeFilter.min, 10) : -Infinity;
      const maxTime = timeFilter.max ? parseInt(timeFilter.max, 10) : Infinity;

      const itemTime = item.time || 0;

      if (itemTime < minTime || itemTime > maxTime) {
        return false;
      }
      return true;
    })
    // Date filter
    .filter((item) => {
      const { from, to } = dateFilter;
      const itemDate = new Date(item.created_at);
      let fromDate = null;
      let toDate = null;

      if (from.year && from.month && from.day) {
        fromDate = new Date(
          parseInt(from.year, 10),
          parseInt(from.month, 10) - 1,
          parseInt(from.day, 10)
        );
        if (itemDate < fromDate) {
          return false;
        }
      }

      if (to.year && to.month && to.day) {
        toDate = new Date(
          parseInt(to.year, 10),
          parseInt(to.month, 10) - 1,
          parseInt(to.day, 10)
        );
        if (itemDate > toDate) {
          return false;
        }
      }

      return true;
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

  // **Determine if the 'Vaxt' column should be shown**
  // Show the 'Vaxt' column if any item in the filtered and sorted data has time !== 0
  const showTimeColumn = sortedData.some((item) => item.time !== 0);

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
                  setOpenFilter(openFilter === "suallar" ? null : "suallar")
                }
              >
                <div className="flex items-center gap-4">
                  {t("labels.questions")}
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
                  {t("labels.level")}
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
                  {t("labels.points")}
                  <IoFunnelOutline />
                </div>
                {openFilter === "xal" && (
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
              {showTimeColumn && (
                <th
                  className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                  onClick={() =>
                    setOpenFilter(openFilter === "vaxt" ? null : "vaxt")
                  }
                >
                  <div className="flex items-center gap-4 font-gilroy">
                    {t("labels.time")}
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
                </th>
              )}
              {/* Tarix Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "tarix" ? null : "tarix")
                }
              >
                <div className="flex items-center gap-4">
                  {t("labels.date")}
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
                  {/* **Replace item.id with a sequential index** */}
                  <td className="px-4 py-2">
                    {currentPage * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 relative group">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          item.title.length > 49
                            ? item.title.substring(0, 49) + "..."
                            : item.title,
                      }}
                    />

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 whitespace-nowrap bg-white border text-black text-sm px-3 py-1 rounded shadow-shadow3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></div>

                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                  </td>

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
                  {/* **Conditionally render the 'Vaxt' <td>** */}
                  {showTimeColumn && (
                    <td className="px-4 py-2">
                      {item.time !== 0 ? item.time : ""}
                    </td>
                  )}
                  <td className="px-4 py-2 !text-sm">{item.created_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={showTimeColumn ? "7" : "6"} // Adjust colspan based on 'Vaxt' column visibility
                  className="px-4 py-2 text-center text-gray-500"
                >
                  {t("labels.noResults")}
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
              {t("members.itemsPerPage")}
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

export default SuallarComponent;
