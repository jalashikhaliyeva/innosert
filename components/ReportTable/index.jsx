import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";

function ReportTable({ selectedRows, setSelectedRows, data }) {
  console.log(data, "data report table");

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
  const titleRef = useRef(null);
  const countRef = useRef(null);
  const statusRef = useRef(null);
  const dateRef = useRef(null);

  // Create a stable dropdownRefs object
  const dropdownRefs = {
    title: titleRef,
    count: countRef,
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

  // Filtering logic
  const filteredData = data
    .filter((item) => {
      // Reports filter
      if (reportsFilter && item.count < parseInt(reportsFilter)) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Status filter
      if (statusFilter) {
        const statusValue = statusFilter === "Tamamlandı";
        if (item.status !== statusValue) {
          return false;
        }
      }
      return true;
    })
    .filter((item) => {
      // Date filter
      const { from, to } = dateFilter;
      const itemDate = new Date(item.created_at);
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

  // Function to handle navigation to detail page
  const handleDetailNavigation = (id) => {
    router.push(`/xeta-bildirisleri/${id}`); // Navigate to the specific report page
  };

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white">
      {/* Table */}
      <div className="w-full flex flex-col relative">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border-borderTableCel">
            <thead className="border-b border-borderTableCel">
              <tr>
                <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                  #
                </th>
                {/* Title */}
                <th
                  className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                  onClick={() =>
                    setOpenFilter(openFilter === "title" ? null : "title")
                  }
                >
                  <div className="flex items-center gap-4">
                    Sual başlığı
                    <IoFunnelOutline />
                  </div>
                  {openFilter === "title" && (
                    <div
                      ref={titleRef}
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
                {/* Count */}
                <th
                  className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                  onClick={() =>
                    setOpenFilter(openFilter === "count" ? null : "count")
                  }
                >
                  <div className="flex items-center gap-4">
                    Bildirilən xəta sayı
                    <IoFunnelOutline />
                  </div>
                  {openFilter === "count" && (
                    <div
                      ref={countRef}
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
                paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="bg-tableBgDefault border-b border-borderTableCel hover:bg-headerTableCel"
                  >
                    <td className="px-4 py-3">
                      {currentPage * itemsPerPage + index + 1}
                    </td>{" "}
                    {/* Custom Counter */}
                    <td
                      onClick={() => handleDetailNavigation(item.id)}
                      className="flex items-center gap-3 px-4 py-3 relative group cursor-pointer !text-base text-tableCell"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    ></td>
                    <td className="px-4 py-3 !text-base">{item.count}</td>
                    {/* Conditionally set the background color based on the status */}
                    <td className="px-4 py-2">
                      <div
                        className={`text-gray200 !text-sm ${
                          item.status === true
                            ? "bg-greenMediumLight"
                            : item.status === false
                            ? "bg-redLow"
                            : ""
                        } rounded-md py-1 flex items-center justify-center w-[110px]`}
                      >
                        {item.status === true ? "Tamamlandı" : "Gözlənilir"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-linkBlue !text-base flex items-center sticky right-0 bg-white z-10">
                      <button onClick={() => handleDetailNavigation(item.id)}>
                        Bax &gt;
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    Nəticə tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Bottom Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-5 pb-5">
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

export default ReportTable;
