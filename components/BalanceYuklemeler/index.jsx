import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const YuklemelerimTable = ({ data }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalAmount = data.reduce((total, item) => {
    // Extract numeric value from amount string
    const amountValue = parseFloat(item.amount.replace("AZN", "").trim());
    return total + amountValue;
  }, 0);

  return (
    <div className="w-full overflow-x-auto md:px-4 font-gilroy">
      <div className="relative" style={{ minHeight: "240px" }}>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-grayTextColor">
              <th className="px-4 py-2 text-left text-textSecondaryDefault font-gilroy">
                {t("labels.date")}
              </th>
              <th className="px-4 py-2 text-left text-textSecondaryDefault font-gilroy">
                {t("labels.status")}
              </th>
              <th className="px-4 py-2 text-left text-textSecondaryDefault font-gilroy">
                {t("labels.amount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? paginatedData.map(item => (
              <tr key={item.id} className="even:bg-gray-50">
                <td className="px-4 py-2 text-grayButtonText font-gilroy">
                  {item.tarix}
                </td>
                <td
                  className={`px-4 py-2 font-gilroy ${
                    item.status === "Ödəniş uğurludur" ? "text-chartGreen" : "text-red-500"
                  }`}
                >
                  {item.status}
                </td>
                <td className="px-4 py-2 text-grayButtonText font-gilroy">
                  {item.amount}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  {t("labels.noData")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center gap-2"
            pageClassName=""
            activeClassName=""
            previousClassName=""
            nextClassName=""
            pageLinkClassName="bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy block"
            activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy block"
            previousLinkClassName={`${
              currentPage === 0 ? "cursor-not-allowed text-gray-300" : ""
            } bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy block`}
            nextLinkClassName={`${
              currentPage === pageCount - 1 ? "cursor-not-allowed text-gray-300" : ""
            } bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy block`}
            previousLinkStyle={{}}
            nextLinkStyle={{}}
          />
        </div>
      )}

      {/* Total Amount */}
      <div className="flex justify-end items-center mt-6 relative">
        <div className="absolute top-[-37px] text-center px-9 text-2xl font-bold text-textSecondaryDefault font-gilroy">
          {totalAmount.toFixed(2)} AZN
        </div>
        <button className="bg-gray-200 text-grayButtonText px-8 py-3 mb-7 mt-3 rounded-lg cursor-not-allowed font-gilroy">
          {t("labels.totalLoaded")}
        </button>
      </div>
    </div>
  );
};

export default YuklemelerimTable;
