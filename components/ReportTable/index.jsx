import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";

function ReportTable({ selectedRows, setSelectedRows }) {
  const router = useRouter(); // Initialize useRouter hook
  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page set to 10
  const [openFilter, setOpenFilter] = useState(null);
  const [titleOrder, setTitleOrder] = useState(null); // 'asc' or 'desc'
  const [reportsFilter, setReportsFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  // Initialize refs at the top level of the component
  const questionTitleRef = useRef(null);
  const quantityOfReportsRef = useRef(null);
  const statusRef = useRef(null);
  const dateRef = useRef(null);

  // Create a stable dropdownRefs object
  const dropdownRefs = {
    questionTitle: questionTitleRef,
    quantityOfReports: quantityOfReportsRef,
    status: statusRef,
    date: dateRef,
  };

  // Function to reset all filters
  const resetFilters = () => {
    setTitleOrder(null);
    setReportsFilter("");
    setStatusFilter("");
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

  const data = [
    {
      id: 1,
      questionTitle: "Sayt dizaynı",
      quantityOfReports: 5,
      status: "Tamamlandı",
      date: "2023-10-01",
      slug: "sayt-dizaynı",
    },
    {
      id: 2,
      questionTitle: "Verilənlər bazası",
      quantityOfReports: 3,
      status: "Gözlənilir",
      date: "2023-09-28",
      slug: "verilənlər-bazası",
    },
    {
      id: 3,
      questionTitle: "HTML ilə səhifə strukturunun yaradılması",
      quantityOfReports: 2,
      status: "Tamamlandı",
      date: "2023-09-30",
      slug: "html-ilə-səhifə-strukturunun-yaradılması",
    },
    {
      id: 4,
      questionTitle: "CSS ilə səhifənin stilinin tətbiqi",
      quantityOfReports: 4,
      status: "Tamamlandı",
      date: "2023-10-02",
      slug: "css-ilə-səhifənin-stilinin-tətbiqi",
    },
    {
      id: 5,
      questionTitle: "JavaScript-də funksiyaların yaradılması",
      quantityOfReports: 6,
      status: "Gözlənilir",
      date: "2023-10-05",
      slug: "javascript-də-funksiyaların-yaradılması",
    },
    {
      id: 6,
      questionTitle: "DOM manipulasiya üsulları",
      quantityOfReports: 3,
      status: "Tamamlandı",
      date: "2023-09-25",
      slug: "dom-manipulasiya-üsulları",
    },
    {
      id: 7,
      questionTitle: "API sorğularının hazırlanması",
      quantityOfReports: 7,
      status: "Gözlənilir",
      date: "2023-09-29",
      slug: "api-sorğularının-hazırlanması",
    },
    {
      id: 8,
      questionTitle: "Verilənlər bazası əlaqələrinin izahı",
      quantityOfReports: 5,
      status: "Tamamlandı",
      date: "2023-09-27",
      slug: "verilənlər-bazası-əlaqələrinin-izahı",
    },
    {
      id: 9,
      questionTitle: "Git ilə versiya nəzarətinin əsasları",
      quantityOfReports: 2,
      status: "Tamamlandı",
      date: "2023-10-01",
      slug: "git-ilə-versiya-nəzarətinin-əsasları",
    },
    {
      id: 10,
      questionTitle: "React komponentlərinin yaradılması",
      quantityOfReports: 8,
      status: "Gözlənilir",
      date: "2023-10-03",
      slug: "react-komponentlərinin-yaradılması",
    },
    {
      id: 11,
      questionTitle: "Vue.js ilə tək səhifəlik tətbiq yaradılması",
      quantityOfReports: 4,
      status: "Tamamlandı",
      date: "2023-09-22",
      slug: "vue-js-ilə-tək-səhifəlik-tətbiq-yaradılması",
    },
    {
      id: 12,
      questionTitle: "PHP ilə backend proqramlaşdırma",
      quantityOfReports: 9,
      status: "Gözlənilir",
      date: "2023-09-26",
      slug: "php-ilə-backend-proqramlaşdırma",
    },
    {
      id: 13,
      questionTitle: "Node.js server proqramlaşdırma",
      quantityOfReports: 6,
      status: "Tamamlandı",
      date: "2023-10-04",
      slug: "node-js-server-proqramlaşdırma",
    },
    {
      id: 14,
      questionTitle: "SQL sorğularının yazılması",
      quantityOfReports: 5,
      status: "Tamamlandı",
      date: "2023-09-30",
      slug: "sql-sorğularının-yazılması",
    },
    {
      id: 15,
      questionTitle: "Python ilə skriptlərin yazılması",
      quantityOfReports: 3,
      status: "Gözlənilir",
      date: "2023-10-01",
      slug: "python-ilə-skriptlərin-yazılması",
    },
    {
      id: 16,
      questionTitle: "Django framework istifadəsi",
      quantityOfReports: 4,
      status: "Tamamlandı",
      date: "2023-09-24",
      slug: "django-framework-istifadəsi",
    },
    {
      id: 17,
      questionTitle: "Mobil tətbiq inkişafı üçün React Native",
      quantityOfReports: 7,
      status: "Gözlənilir",
      date: "2023-09-29",
      slug: "mobil-tətbiq-inkişafı-üçün-react-native",
    },
    {
      id: 18,
      questionTitle: "Test avtomatlaşdırılması ilə Selenium",
      quantityOfReports: 2,
      status: "Tamamlandı",
      date: "2023-09-27",
      slug: "test-avtomatlaşdırılması-ilə-selenium",
    },
    {
      id: 19,
      questionTitle: "WebSocket ilə real-time tətbiqlərin qurulması",
      quantityOfReports: 8,
      status: "Tamamlandı",
      date: "2023-10-05",
      slug: "websocket-ilə-real-time-tətbiqlərin-qurulması",
    },
    {
      id: 20,
      questionTitle: "Redux ilə vəziyyətin idarə edilməsi",
      quantityOfReports: 5,
      status: "Gözlənilir",
      date: "2023-09-28",
      slug: "redux-ilə-vəziyyətin-idarə-edilməsi",
    },
  ];

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      // Reports filter
      if (reportsFilter && item.quantityOfReports < parseInt(reportsFilter)) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Status filter
      if (statusFilter && item.status !== statusFilter) {
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
  const sortedData = titleOrder
    ? [...filteredData].sort((a, b) => {
        if (titleOrder === "asc") {
          return a.questionTitle.localeCompare(b.questionTitle);
        } else {
          return b.questionTitle.localeCompare(a.questionTitle);
        }
      })
    : filteredData;

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Function to handle navigation to detail page
  const handleDetailNavigation = (slug) => {
    router.push(`/xeta-bildirisleri/${slug}`); // Navigate to the specific report page
  };

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white">
      {/* Table */}
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                #
              </th>
              {/* Sual başlığı */}
              <th
                className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(
                    openFilter === "questionTitle" ? null : "questionTitle"
                  )
                }
              >
                <div className="flex items-center gap-4">
                  Sual başlığı
                  <IoFunnelOutline />
                </div>
                {openFilter === "questionTitle" && (
                  <div
                    ref={questionTitleRef}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-2xl p-2 divide-y w-40"
                  >
                    <div
                      className={`cursor-pointer hover:bg-gray-100 px-2 py-1 ${
                        titleOrder === "asc" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setTitleOrder("asc");
                        setOpenFilter(null);
                      }}
                    >
                      A-Z
                    </div>
                    <div
                      className={`cursor-pointer hover:bg-gray-200 px-2 py-1 ${
                        titleOrder === "desc" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => {
                        setTitleOrder("desc");
                        setOpenFilter(null);
                      }}
                    >
                      Z-A
                    </div>
                  </div>
                )}
              </th>
              {/* Bildirilən xəta sayı */}
              <th
                className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(
                    openFilter === "quantityOfReports"
                      ? null
                      : "quantityOfReports"
                  )
                }
              >
                <div className="flex items-center gap-4">
                  Bildirilən xəta sayı
                  <IoFunnelOutline />
                </div>
                {openFilter === "quantityOfReports" && (
                  <div
                    ref={quantityOfReportsRef}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="number"
                      placeholder="Minimum xəta sayı"
                      value={reportsFilter}
                      onChange={(e) => setReportsFilter(e.target.value)}
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
              {/* Status */}
              <th
                className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "status" ? null : "status")
                }
              >
                <div className="flex items-center gap-4">
                  Status
                  <IoFunnelOutline />
                </div>

                {openFilter === "status" && (
                  <div
                    ref={statusRef}
                    className="absolute left-0 z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col">
                      <div
                        className={`cursor-pointer hover:bg-gray-100 px-2 py-1 ${
                          statusFilter === "Tamamlandı" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => {
                          setStatusFilter("Tamamlandı");
                          setOpenFilter(null);
                        }}
                      >
                        Tamamlandı
                      </div>
                      <div
                        className={`cursor-pointer hover:bg-gray-100 px-2 py-1 ${
                          statusFilter === "Gözlənilir" ? "bg-gray-200" : ""
                        }`}
                        onClick={() => {
                          setStatusFilter("Gözlənilir");
                          setOpenFilter(null);
                        }}
                      >
                        Gözlənilir
                      </div>
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

              <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer">
                <button
                  className="flex items-center gap-4"
                  onClick={resetFilters}
                >
                  {/* Yenilə */}
                  <RiLoopLeftLine />
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-tableBgDefault border-b border-borderTableCel hover:bg-headerTableCel"
                >
                  <td className="px-4 py-3">{item.id}</td>
                  <td
                    onClick={() => handleDetailNavigation(item.slug)}
                    className="flex items-center gap-3 px-4 py-3 relative group cursor-pointer !text-base text-tableCell"
                  >
                    {item.questionTitle}
                  </td>
                  <td className="px-4 py-3 !text-base">
                    {item.quantityOfReports}
                  </td>
                  {/* Conditionally set the background color based on the status */}
                  <td className="px-4 py-2">
                    <div
                      className={`text-gray200 !text-sm ${
                        item.status === "Tamamlandı"
                          ? "bg-greenMediumLight"
                          : item.status === "Gözlənilir"
                          ? "bg-redLow"
                          : ""
                      } rounded-md py-1 flex items-center justify-center w-[110px]`}
                    >
                      {item.status}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-linkBlue !text-base flex items-center">
                    <button onClick={() => handleDetailNavigation(item.slug)}>
                      Bax &gt;
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-3 text-center text-gray-500">
                  Nəticə tapılmadı.
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
              Səhifə başına element:
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

export default ReportTable;
