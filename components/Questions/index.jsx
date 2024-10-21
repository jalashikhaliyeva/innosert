import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { BsTrash3 } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

function Questions({
  selectedRows,
  setSelectedRows,
  handleDelete,
  handleEdit,
}) {
  const levelColors = {
    Hard: "bg-redLow",
    Medium: "bg-violetLow",
    Easy: "bg-orangeLow",
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

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

  const router = useRouter();

  const handleClick = (item) => {
    // Ensure router is ready before using query parameters
    if (!router.isReady) return;

    // Extract firstDynamicParam from the URL query (assuming it's part of the dynamic route)
    const { firstDynamicParam } = router.query;

    // Extract secondDynamicParam from the clicked item's title or name
    const secondDynamicParam = item.title || item.name; // replace with actual field based on the item's structure

    // Now navigate to the desired route using these dynamic parameters
    router.push(`/qovluq/${firstDynamicParam}/${secondDynamicParam}`);
  };

  // State declarations
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

  // Refs for each dropdown to handle clicks outside
  const dropdownRefs = {
    suallar: useRef(null),
    seviyye: useRef(null),
    xal: useRef(null),
    vaxt: useRef(null),
    tarix: useRef(null),
  };

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

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      // Level filter
      if (levelFilter.length > 0 && !levelFilter.includes(item.level)) {
        return false;
      }
      return true;
    })
    // Add other filters (points, time, date, etc.) as necessary
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
      const itemTimeMatch = item.time.match(/(\d+)/);
      const itemTime = itemTimeMatch ? parseInt(itemTimeMatch[1]) : 0;
      if (itemTime < minTime || itemTime > maxTime) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Date filter
      const { from, to } = dateFilter;
      const itemDate = new Date(item.date);
      let fromDate = null;
      let toDate = null;

      if (from.year && from.month && from.day) {
        fromDate = new Date(from.year, from.month - 1, from.day);
        if (itemDate < fromDate) {
          return false;
        }
      }

      if (to.year && to.month && to.day) {
        toDate = new Date(to.year, to.month - 1, to.day);
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

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
      {/* Table */}
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                {/* <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked ? data.map((row) => row.id) : []
                    )
                  }
                /> */}
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
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
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
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
                  >
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
                        className="mr-2"
                        type="checkbox"
                        // checked={selectedRows.includes(row.id)}
                        // onChange={() => handleCheckboxChange(row.id)}
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
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
                        className="mr-2"
                        type="checkbox"
                        // checked={selectedRows.includes(row.id)}
                        // onChange={() => handleCheckboxChange(row.id)}
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
                    <label className="block hover:bg-gray-100 px-2 py-1 rounded">
                      <input
                        className="mr-2"
                        type="checkbox"
                        // checked={selectedRows.includes(row.id)}
                        // onChange={() => handleCheckboxChange(row.id)}
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
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
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
              <th
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
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
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
                    // style={{ left: "-74px" }}
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
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
              {/* <div>
                <button
                  className="flex items-center gap-4 p-0 m-0 relative px-4 py-2 text-left text-base flex-row font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                  onClick={resetFilters}
                >
                  Sıfırla
                  <RiLoopLeftLine />
                </button>
              </div> */}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-tableBgDefault border-b border-borderTableCel hover:bg-gray-100"
                >
                  <td className="px-4 py-2">
                    {/* <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    /> */}
                  </td>
                  <td className="px-4 py-2">{item.id}</td>
                  <td
                    onClick={handleClick}
                    className="px-4 py-2 relative group cursor-pointer"
                  >
                    {item.title.length > 49
                      ? item.title.substring(0, 49) + "..."
                      : item.title}

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 whitespace-nowrap bg-white border text-black text-sm px-3 py-1 rounded shadow-shadow3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {item.title}
                    </div>

                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                  </td>

                  <td className="px-4 py-2">
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
                  {/* <td className="px-4 py-2">
                    <div className="flex items-center">
                      <BsTrash3
                        onClick={handleDelete}
                        className="mx-2 size-5 cursor-pointer text-red400"
                      />
                      <VscEdit
                        onClick={handleEdit}
                        className="mx-2 size-5 cursor-pointer text-brandBlue400"
                      />
                    </div>
                  </td> */}
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

export default Questions;
