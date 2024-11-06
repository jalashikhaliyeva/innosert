import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import DeleteReportModal from "./DeleteReportModal";

function ReportSingleTable({ reportData }) {
  const router = useRouter();
  const [data, setData] = useState(reportData || []);
  console.log(reportData, "reportData");

  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page set to 10
  const [openFilter, setOpenFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  // Update data state when reportData prop changes
  useEffect(() => {
    setData(reportData || []);
  }, [reportData]);

  // Handle confirming the action from the modal
  const handleConfirmAction = () => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === selectedId) {
          return {
            ...item,
            updated_data: true,
            status: selectedAction === "Düzəliş edildi" ? true : false,
          };
        }
        return item;
      })
    );
    setIsModalOpen(false);
  };

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

  // Filter data based on status and date
  const filteredData = (data || [])
    .filter((item) => {
      // Status filter
      if (statusFilter) {
        if (
          statusFilter === "Düzəliş edildi" &&
          (!item.updated_data || !item.status)
        ) {
          return false;
        }
        if (
          statusFilter === "Xəta deyil" &&
          (!item.updated_data || item.status)
        ) {
          return false;
        }
      }
      return true;
    })
    .filter((item) => {
      // Date filter logic
      const { from, to } = dateFilter;
      const itemDate = new Date(item.created_at); // Assuming 'created_at' is the date
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
    <div className="w-full p-4 font-gilroy border min-h-[400px] border-borderTableCel rounded bg-white">
      {/* Table */}
      <div className="w-full flex flex-col relative">
        <div className="overflow-x-auto">
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
                paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="bg-tableBgDefault border-b border-borderTableCel hover:bg-headerTableCel"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{item.user}</td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3 relative group">
                      {item.title.length > 30
                        ? `${item.title.substring(0, 30)}...`
                        : item.title}

                      {item.title.length > 30 && (
                        <span className="absolute hidden group-hover:block bg-white text-gray-800 border text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 z-10 whitespace-nowrap">
                          {item.title}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">{item.created_at}</td>
                    <td className="px-4 py-3">
                      {item.updated_data ? (
                        <span
                          style={{
                            color: item.status
                              ? "#30B83E" // "Düzəliş edildi"
                              : "#E03D3E", // "Xəta deyil"
                          }}
                        >
                          {item.status ? "Düzəliş edildi" : "Xəta deyil"}
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
                  <td
                    colSpan="6"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    Nəticə tapılmadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination and items per page controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-5 pb-5">
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
              pageClassName="inline-block"
              pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy"
              activeClassName=""
              activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy"
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
          selectedId={selectedId} // Pass selected ID
        />
      )}
    </div>
  );
}

export default ReportSingleTable;
