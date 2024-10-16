import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import DeleteReportModal from "./DeleteReportModal";

function ReportSingleTable() {
  const router = useRouter(); // Initialize useRouter hook
  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [modifiedItems, setModifiedItems] = useState(() => {
    // Retrieve modified items from local storage on component mount
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("modifiedItems");
      return savedData ? JSON.parse(savedData) : {};
    }
    return {};
  });

  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page set to 10
  const [openFilter, setOpenFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  const handleConfirmAction = () => {
    const updatedItems = {
      ...modifiedItems,
      [selectedId]: selectedAction,
    };

    // Save the updated modified items to state and local storage
    setModifiedItems(updatedItems);
    localStorage.setItem("modifiedItems", JSON.stringify(updatedItems)); // Save to local storage

    setIsModalOpen(false); // Close the modal
  };
  // Refs for dropdowns
  const statusRef = useRef(null);
  const dateRef = useRef(null);

  // Reset filters function
  const resetFilters = () => {
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
        ((statusRef.current && !statusRef.current.contains(event.target)) ||
          (dateRef.current && !dateRef.current.contains(event.target)))
      ) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

  const data = [
    {
      id: 1,
      reporter: "John Doe",
      errorType: "UI Bug",
      details: "Buttons are not aligned on the homepage correctly",
      date: "2023-10-01",
      status: "Tamamlandı",
    },
    {
      id: 2,
      reporter: "Jane Smith",
      errorType: "Backend Error",
      details: "API request fails on login",
      date: "2023-09-28",
      status: "Gözlənilir",
    },
    {
      id: 3,
      reporter: "Alice Johnson",
      errorType: "UI Bug",
      details: "Text overlap in mobile view",
      date: "2023-09-30",
      status: "Tamamlandı",
    },
    {
      id: 4,
      reporter: "Mark Williams",
      errorType: "Performance Issue",
      details: "Slow page load on dashboard",
      date: "2023-09-27",
      status: "Gözlənilir",
    },
    {
      id: 5,
      reporter: "Emma Brown",
      errorType: "Security Vulnerability",
      details: "Weak password policy",
      date: "2023-09-29",
      status: "Tamamlandı",
    },
    {
      id: 6,
      reporter: "Michael Davis",
      errorType: "Backend Error",
      details: "Database connection timeout",
      date: "2023-09-25",
      status: "Tamamlandı",
    },
    {
      id: 7,
      reporter: "Sophia Miller",
      errorType: "UI Bug",
      details: "Footer links not clickable",
      date: "2023-09-24",
      status: "Gözlənilir",
    },
    {
      id: 8,
      reporter: "James Wilson",
      errorType: "UI Bug",
      details: "Header alignment off in IE",
      date: "2023-09-23",
      status: "Tamamlandı",
    },
    {
      id: 9,
      reporter: "Olivia Martinez",
      errorType: "Backend Error",
      details: "500 error on form submission",
      date: "2023-09-22",
      status: "Gözlənilir",
    },
    {
      id: 10,
      reporter: "Liam Anderson",
      errorType: "UI Bug",
      details: "Image carousel not working",
      date: "2023-09-21",
      status: "Tamamlandı",
    },
    {
      id: 11,
      reporter: "Isabella Thomas",
      errorType: "Performance Issue",
      details: "High memory usage on reports",
      date: "2023-09-20",
      status: "Gözlənilir",
    },
    {
      id: 12,
      reporter: "Noah Lee",
      errorType: "Backend Error",
      details: "Incorrect data returned by API",
      date: "2023-09-19",
      status: "Tamamlandı",
    },
    {
      id: 13,
      reporter: "Mia Walker",
      errorType: "Security Vulnerability",
      details: "Sensitive data exposed in logs",
      date: "2023-09-18",
      status: "Tamamlandı",
    },
    {
      id: 14,
      reporter: "Ethan Harris",
      errorType: "UI Bug",
      details: "Modal not closing on click",
      date: "2023-09-17",
      status: "Gözlənilir",
    },
    {
      id: 15,
      reporter: "Amelia Clark",
      errorType: "Backend Error",
      details: "Session timeout too short",
      date: "2023-09-16",
      status: "Tamamlandı",
    },
    {
      id: 16,
      reporter: "Logan Martinez",
      errorType: "UI Bug",
      details: "Sidebar not scrolling",
      date: "2023-09-15",
      status: "Gözlənilir",
    },
    {
      id: 17,
      reporter: "Charlotte Hall",
      errorType: "Performance Issue",
      details: "High CPU usage on user profile",
      date: "2023-09-14",
      status: "Tamamlandı",
    },
    {
      id: 18,
      reporter: "Aiden Allen",
      errorType: "Backend Error",
      details: "API rate limit exceeded",
      date: "2023-09-13",
      status: "Gözlənilir",
    },
    {
      id: 19,
      reporter: "Harper Young",
      errorType: "UI Bug",
      details: "Search box not returning results",
      date: "2023-09-12",
      status: "Tamamlandı",
    },
    {
      id: 20,
      reporter: "Daniel King",
      errorType: "Security Vulnerability",
      details: "SQL injection vulnerability",
      date: "2023-09-11",
      status: "Gözlənilir",
    },
  ];

  // Filtering and sorting logic (you can extend this as needed)
  const filteredData = data
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

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
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
              <th className="px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault">
                #
              </th>
              <th className="px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault">
                Bildirən şəxs
              </th>
              <th className="px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault">
                Xəta növü
              </th>
              <th className="px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault">
                Ətraflı
              </th>
              <th className="px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault">
                Tarix
              </th>
              <th className="px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault">
                Status
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
                  <td className="px-4 py-3">{item.reporter}</td>
                  <td className="px-4 py-3">{item.errorType}</td>
                  <td className="px-4 py-3 relative group">
                    {item.details.length > 30
                      ? `${item.details.substring(0, 30)}...`
                      : item.details}

                    <span className="absolute hidden group-hover:block bg-white text-gray-800 border text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
                      {item.details}
                    </span>
                  </td>

                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">
                    {modifiedItems[item.id] ? (
                      <span
                        style={{
                          color:
                            modifiedItems[item.id] === "Düzəliş edildi"
                              ? "#30B83E"
                              : "#E03D3E",
                        }}
                      >
                        {modifiedItems[item.id]}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          className="text-white rounded-md py-1 px-4 bg-succesButtonTable"
                          onClick={() => {
                            setSelectedAction("Düzəliş edildi");
                            setSelectedId(item.id);
                            setIsModalOpen(true);
                          }}
                        >
                          Düzəliş edildi
                        </button>
                        <button
                          className="text-white rounded-md py-1 px-4 bg-errorButtonTable"
                          onClick={() => {
                            setSelectedAction("Xəta deyil");
                            setSelectedId(item.id);
                            setIsModalOpen(true);
                          }}
                        >
                          Xəta deyil
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  Nəticə tapılmadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination and items per page controls */}
        <div className="flex justify-between items-center mt-5 pb-5">
          {/* Items per page */}
          <div className="flex items-center space-x-2">
            <label htmlFor="itemsPerPage" className="mr-2">
              Səhifə başına element:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded px-2 py-1 bg-white"
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
          )}
        </div>
      </div>

      {isModalOpen && (
        <DeleteReportModal
          onCancel={() => setIsModalOpen(false)}
          onDelete={handleConfirmAction}
          actionType={selectedAction} // Pass selected action
        />
      )}
    </div>
  );
}

export default ReportSingleTable;
