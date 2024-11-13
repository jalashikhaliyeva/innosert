import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const ReportsTable = ({ reportData, filteredDateRange }) => {
  const data = reportData?.history || []; // Use the history data from reportData
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.tarix);
    const fromDate = new Date(filteredDateRange?.from);
    const toDate = new Date(filteredDateRange?.to);

    return (
      (!filteredDateRange?.from || itemDate >= fromDate) &&
      (!filteredDateRange?.to || itemDate <= toDate)
    );
  });

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-gilroy font-medium leading-8 mb-6">
        {t("table.history")}
      </h1>
      {filteredData.length === 0 ? (
        <p className="text-gray-400 font-gilroy text-lg flex items-center justify-center">
          {t("table.noData")}
        </p>
      ) : (
        <div className="w-full overflow-x-auto min-h-[400px] justify-between flex flex-col">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-inputDefault">
              <tr>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  ID
                </th>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  {t("table.fullName")}
                </th>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  {t("table.information")}
                </th>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  {t("table.date")}
                </th>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  {t("table.type")}
                </th>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  {t("table.status")}
                </th>
                <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                  {t("table.amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => {
                const customIndex = currentPage * itemsPerPage + index + 1; // Calculate the correct index for each item

                return (
                  <tr
                    key={index}
                    className="even:bg-boxGrayBodyColor hover:bg-gray-100"
                  >
                    <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                      {customIndex}
                    </td>
                    <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                      {item.user}
                    </td>
                    <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                      {item.exam_id}
                    </td>
                    <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                      {item.tarix || "N/A"}
                    </td>
                    <td className="px-4 py-2.5 h-11 font-gilroy text-grayText">
                      {item.type}
                    </td>
                    <td
                      className={`px-4 py-2.5 h-11 font-gilroy ${
                        item.status === "Ödəniş uğurludur"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                      {item.amount}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {pageCount > 1 && (
            <div className="flex justify-center mt-10 pb-9">
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
                nextClassName={
                  currentPage === pageCount - 1 ? "text-gray-300" : ""
                }
                nextLinkClassName={
                  currentPage === pageCount - 1 ? "cursor-not-allowed" : ""
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
