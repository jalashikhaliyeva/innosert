import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { BsTrash3 } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SuallarTable() {
  const levelColors = {
    Hard: "bg-redLow",
    Medium: "bg-violetLow",
    Easy: "bg-orangeLow",
  };

  // Sample data
  const data = [
    {
      id: 1,
      title: "What is the capital of France?",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "Explain Newton's Second Law of Motion.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-09-28",
    },
    {
      id: 3,
      title: "Solve the integral of sin(x) dx.",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-09-25",
    },
    {
      id: 4,
      title: "Describe the process of photosynthesis.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-09-20",
    },
    {
      id: 5,
      title: "What is the significance of the Treaty of Versailles?",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-09-18",
    },
    {
      id: 6,
      title: "Explain the concept of object-oriented programming.",
      level: "Hard",
      points: 20,
      time: "6 min",
      date: "2023-09-15",
    },
    {
      id: 7,
      title: "What is the derivative of e^x?",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-09-10",
    },
    {
      id: 8,
      title: "Discuss the impacts of climate change.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-09-05",
    },
    {
      id: 9,
      title: "What are the main features of a democratic government?",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-09-02",
    },
    {
      id: 10,
      title: "Analyze the economic effects of the Industrial Revolution.",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-08-30",
    },
    {
      id: 11,
      title: "Define the term 'ecosystem'.",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-08-25",
    },
    {
      id: 12,
      title: "Explain the theory of relativity.",
      level: "Hard",
      points: 20,
      time: "8 min",
      date: "2023-08-20",
    },
    {
      id: 13,
      title: "What is the importance of the Magna Carta?",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-08-15",
    },
    {
      id: 14,
      title: "Describe the water cycle.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-08-10",
    },
    {
      id: 15,
      title: "Discuss the principles of quantum mechanics.",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-08-05",
    },
    {
      id: 16,
      title: "Explain the process of cellular respiration.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-07-30",
    },
    {
      id: 17,
      title: "What is Pythagoras' Theorem?",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-07-28",
    },
    {
      id: 18,
      title: "Explain the Schrödinger's Cat thought experiment.",
      level: "Hard",
      points: 20,
      time: "8 min",
      date: "2023-07-25",
    },
    {
      id: 19,
      title: "What is the function of mitochondria in cells?",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-07-22",
    },
    {
      id: 20,
      title: "Discuss the economic impact of globalization.",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-07-20",
    },
    {
      id: 21,
      title: "Solve the quadratic equation x^2 + 5x + 6 = 0.",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-07-15",
    },
    {
      id: 22,
      title: "What is the greenhouse effect?",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-07-10",
    },
    {
      id: 23,
      title: "Explain the causes of World War I.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-07-05",
    },
    {
      id: 24,
      title: "What is the formula for calculating momentum?",
      level: "Hard",
      points: 20,
      time: "6 min",
      date: "2023-07-01",
    },
    {
      id: 25,
      title: "Describe the process of evaporation.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-06-28",
    },
    {
      id: 26,
      title: "Discuss the principles of supply and demand.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-06-25",
    },
    {
      id: 27,
      title: "What is the value of Planck's constant?",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-06-20",
    },
    {
      id: 28,
      title: "Define the concept of biodiversity.",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-06-18",
    },
    {
      id: 29,
      title: "Explain the law of diminishing returns.",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-06-15",
    },
    {
      id: 30,
      title: "What is Fermat's Last Theorem?",
      level: "Hard",
      points: 20,
      time: "8 min",
      date: "2023-06-10",
    },
    {
      id: 31,
      title: "Describe the process of osmosis.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-06-05",
    },
    {
      id: 32,
      title: "What are the main causes of the Great Depression?",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-06-01",
    },
    {
      id: 33,
      title: "What is the speed of light in a vacuum?",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-05-30",
    },
    {
      id: 34,
      title: "Explain how vaccines work.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-05-25",
    },
    {
      id: 35,
      title: "Describe the main events of the Cold War.",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-05-20",
    },
    {
      id: 36,
      title:
        "What is the significance of the Heisenberg Uncertainty Principle?",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-05-15",
    },
    {
      id: 37,
      title: "What is the function of chlorophyll in plants?",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-05-10",
    },
    {
      id: 38,
      title: "Explain the effects of inflation on an economy.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-05-05",
    },
    {
      id: 39,
      title: "What is Maxwell's equations in electromagnetism?",
      level: "Hard",
      points: 20,
      time: "8 min",
      date: "2023-05-01",
    },
    {
      id: 40,
      title: "Describe the process of condensation.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-04-28",
    },
    {
      id: 41,
      title: "What were the key outcomes of the Treaty of Versailles?",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-04-25",
    },
    {
      id: 42,
      title: "What is the significance of the Big Bang theory?",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-04-20",
    },
    {
      id: 43,
      title: "Explain the importance of photosynthesis.",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-04-15",
    },
    {
      id: 44,
      title: "Discuss the consequences of Brexit.",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-04-10",
    },
    {
      id: 45,
      title: "What is the principle of conservation of momentum?",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-04-05",
    },
    {
      id: 46,
      title: "What is the primary function of red blood cells?",
      level: "Easy",
      points: 10,
      time: "2 min",
      date: "2023-04-01",
    },
    {
      id: 47,
      title: "Explain the impacts of climate change on biodiversity.",
      level: "Medium",
      points: 15,
      time: "6 min",
      date: "2023-03-28",
    },
    {
      id: 48,
      title: "What is the equation for gravitational force?",
      level: "Hard",
      points: 20,
      time: "7 min",
      date: "2023-03-25",
    },
    {
      id: 49,
      title: "Describe the role of enzymes in digestion.",
      level: "Easy",
      points: 10,
      time: "3 min",
      date: "2023-03-20",
    },
    {
      id: 50,
      title: "Explain the effects of the Industrial Revolution.",
      level: "Medium",
      points: 15,
      time: "5 min",
      date: "2023-03-15",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default items per page set to 15
  const [openFilter, setOpenFilter] = useState(null);
  const [levelFilter, setLevelFilter] = useState([]);
  const [questionOrder, setQuestionOrder] = useState(null); // 'asc' or 'desc'
  const [pointsFilter, setPointsFilter] = useState({ min: "", max: "" });
  const [timeFilter, setTimeFilter] = useState({ min: "", max: "" });
  const [dateFilter, setDateFilter] = useState({ from: null, to: null });

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page change
  };

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      // Level filter
      if (levelFilter.length > 0 && !levelFilter.includes(item.level)) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Points filter
      const minPoints = pointsFilter.min
        ? parseInt(pointsFilter.min)
        : -Infinity;
      const maxPoints = pointsFilter.max
        ? parseInt(pointsFilter.max)
        : Infinity;
      if (item.points < minPoints || item.points > maxPoints) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Time filter
      const minTime = timeFilter.min ? parseInt(timeFilter.min) : -Infinity;
      const maxTime = timeFilter.max ? parseInt(timeFilter.max) : Infinity;
      const itemTime = parseInt(item.time);
      if (itemTime < minTime || itemTime > maxTime) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Date filter
      const itemDate = new Date(item.date);
      if (dateFilter.from && itemDate < dateFilter.from) {
        return false;
      }
      if (dateFilter.to && itemDate > dateFilter.to) {
        return false;
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

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white">
      {/* Table */}
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                <input type="checkbox" />
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
                  <div className="absolute z-10 mt-2 bg-white border rounded shadow-2xl p-2 divide-y">
                    <div
                      className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                      onClick={() => {
                        setQuestionOrder("asc");
                        setOpenFilter(null);
                      }}
                    >
                      A-Z
                    </div>
                    <div
                      className="cursor-pointer hover:bg-gray-200 px-2 py-1"
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
                  <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-xl p-2">
                    <label className="block hover:bg-gray-100">
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={levelFilter.includes("Easy")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLevelFilter((prev) =>
                            isChecked
                              ? [...prev, "Easy"]
                              : prev.filter((l) => l !== "Easy")
                          );
                        }}
                      />
                      Asan
                    </label>
                    <label className="block  hover:bg-gray-100">
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={levelFilter.includes("Medium")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLevelFilter((prev) =>
                            isChecked
                              ? [...prev, "Medium"]
                              : prev.filter((l) => l !== "Medium")
                          );
                        }}
                      />
                      Orta
                    </label>
                    <label className="block  hover:bg-gray-100">
                      <input
                        className="mr-2"
                        type="checkbox"
                        checked={levelFilter.includes("Hard")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setLevelFilter((prev) =>
                            isChecked
                              ? [...prev, "Hard"]
                              : prev.filter((l) => l !== "Hard")
                          );
                        }}
                      />
                      Çətin
                    </label>
                    <button
                      className="mt-2  gap-1 font-gilroy text-textSecondaryBlue  py-1 rounded flex items-center"
                      onClick={() => setOpenFilter(null)}
                    >
                      <RiLoopLeftLine />
                      Filteri sifirla
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
                  <div className="absolute z-10 mt-2 bg-white border rounded shadow p-2">
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
                        className="border rounded px-2 py-1 w-20"
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
                        className="border rounded px-2 py-1 w-20"
                      />
                    </div>
                    <button
                      className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => setOpenFilter(null)}
                    >
                      Tətbiq et
                    </button>
                  </div>
                )}
              </th>
              {/* Vaxt Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "vaxt" ? null : "vaxt")
                }
              >
                <div className="flex items-center gap-4">
                  Vaxt
                  <IoFunnelOutline />
                </div>
                {openFilter === "vaxt" && (
                  <div className="absolute z-10 mt-2 bg-white border rounded shadow p-2">
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
                        className="border rounded px-2 py-1 w-20"
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
                      className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => setOpenFilter(null)}
                    >
                      Tətbiq et
                    </button>
                  </div>
                )}
              </th>
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
                  <div className="absolute z-10 mt-2 bg-white border rounded shadow p-2">
                    <div className="flex items-center space-x-2">
                      <DatePicker
                        selected={dateFilter.from}
                        onChange={(date) =>
                          setDateFilter((prev) => ({ ...prev, from: date }))
                        }
                        selectsStart
                        startDate={dateFilter.from}
                        endDate={dateFilter.to}
                        placeholderText="Başlanğıc Tarix"
                        className="border rounded px-2 py-1 w-32"
                      />
                      <span>-</span>
                      <DatePicker
                        selected={dateFilter.to}
                        onChange={(date) =>
                          setDateFilter((prev) => ({ ...prev, to: date }))
                        }
                        selectsEnd
                        startDate={dateFilter.from}
                        endDate={dateFilter.to}
                        minDate={dateFilter.from}
                        placeholderText="Son Tarix"
                        className="border rounded px-2 py-1 w-32"
                      />
                    </div>
                    <button
                      className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => setOpenFilter(null)}
                    >
                      Tətbiq et
                    </button>
                  </div>
                )}
              </th>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                {/* Əməliyyatlar */}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="bg-tableBgDefault border-b border-borderTableCel"
              >
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2 relative group cursor-pointer">
                  {item.title}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </td>

                <td className="px-4 py-2 ">
                  <div
                    className={`${
                      levelColors[item.level]
                    } rounded-md py-1 flex items-center justify-center`}
                  >
                    {item.level}
                  </div>
                </td>
                <td className="px-4 py-2">{item.points}</td>
                <td className="px-4 py-2">{item.time}</td>
                <td className="px-4 py-2 !text-sm">{item.date}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <BsTrash3 className="mx-2 size-5 cursor-pointer text-red400" />
                    <VscEdit className="mx-2 size-5 cursor-pointer text-brandBlue400" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Bottom Controls */}
        <div className="flex justify-between items-center mt-5 pb-5">
          {/* Items Per Page Selector */}
          <div>
            <label htmlFor="itemsPerPage" className="mr-2">
              Sayfa başına soru:
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

export default SuallarTable;
