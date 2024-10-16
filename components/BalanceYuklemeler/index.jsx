import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const YuklemelerimTable = () => {
  const data = [
    {
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },
    {
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },
    {
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },
    {
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },
    {
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },
    {
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },

    // Add more data as needed
  ];

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
    // Calculate total assuming amount is a string with AZN suffix
    const amountValue = parseInt(item.amount.replace("AZN", ""));
    return total + amountValue;
  }, 0);

  return (
    <div className="w-full overflow-x-auto px-4 font-gilroy">
      {" "}
      {/* Added font-gilroy here */}
      <div className="relative" style={{ minHeight: "240px" }}>
        {/* Set minHeight for consistent layout */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-grayTextColor">
              <th className="px-4 py-2 text-left text-textSecondaryDefault font-gilroy">
                Tarix
              </th>
              <th className="px-4 py-2 text-left text-textSecondaryDefault font-gilroy">
                Status
              </th>
              <th className="px-4 py-2 text-left text-textSecondaryDefault font-gilroy">
                Məbləğ
              </th>
            </tr>
          </thead>
          <tbody
            className="space-y-2.5"
            style={{
              minHeight: "200px",
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {paginatedData.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="px-4 py-2 text-grayButtonText font-gilroy">
                  {item.date}
                </td>
                <td className="px-4 py-2 text-chartGreen font-gilroy">
                  {item.status}
                </td>
                <td className="px-4 py-2 text-grayButtonText font-gilroy">
                  {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Component */}
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
          // Remove styles from li elements
          pageClassName=""
          activeClassName=""
          previousClassName=""
          nextClassName=""
          // Apply styles to a elements
          pageLinkClassName="bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy block"
          activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy block"
          previousLinkClassName={`${
            currentPage === 0 ? "cursor-not-allowed text-gray-300" : ""
          } bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy block`}
          nextLinkClassName={`${
            currentPage === pageCount - 1
              ? "cursor-not-allowed text-gray-300"
              : ""
          } bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy block`}
          // Remove inline styles (if any) for previous and next links
          previousLinkStyle={{}}
          nextLinkStyle={{}}
        />
      </div>
      {/* Total Amount on Top of Button with 17px Gap */}
      <div className="flex justify-end items-center mt-6 relative">
        <div className="absolute top-[-37px] text-center px-9 text-2xl font-bold text-textSecondaryDefault font-gilroy">
          {totalAmount} AZN
        </div>
        <button className="bg-gray-200 text-grayButtonText px-8 py-3 mb-7 mt-3 rounded-lg cursor-not-allowed font-gilroy">
          Ümumi yüklənən
        </button>
      </div>
    </div>
  );
};

export default YuklemelerimTable;
