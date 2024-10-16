import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import YuklemelerimTable from "../BalanceYuklemeler"; // Make sure to import your other component

const ParentComponent = () => {
  const [showTable, setShowTable] = useState(true); // State to toggle between tables

  const data = [
    {
      id: 13545762,
      info: "Microsoft Office Specialist Excel Expert",
      date: "Jul 7, 2024",
      status: "Ödənilib",
      amount: "85AZN",
    },
    {
      id: 13545429,
      info: "Data Science Bootcamp",
      date: "Jun 15, 2024",
      status: "Ödənilib",
      amount: "120AZN",
    },
    {
      id: 13545430,
      info: "Python Programming Course",
      date: "May 28, 2024",
      status: "Ödənilməyib",
      amount: "75AZN",
    },
    {
      id: 13545431,
      info: "Machine Learning Certification",
      date: "Apr 10, 2024",
      status: "Ödənilib",
      amount: "150AZN",
    },
    {
      id: 13545432,
      info: "Web Development Workshop",
      date: "Mar 5, 2024",
      status: "Ödənilməyib",
      amount: "90AZN",
    },
    {
      id: 13545433,
      info: "Cybersecurity Fundamentals",
      date: "Feb 20, 2024",
      status: "Ödənilib",
      amount: "130AZN",
    },
    {
      id: 13545434,
      info: "SQL for Data Analytics",
      date: "Jan 10, 2024",
      status: "Ödənilib",
      amount: "100AZN",
    },
    {
      id: 13545435,
      info: "Cloud Computing Basics",
      date: "Dec 15, 2023",
      status: "Ödənilməyib",
      amount: "95AZN",
    },
    {
      id: 13545436,
      info: "Digital Marketing Strategy",
      date: "Nov 30, 2023",
      status: "Ödənilib",
      amount: "110AZN",
    },
    {
      id: 13545437,
      info: "Blockchain and Cryptography",
      date: "Oct 18, 2023",
      status: "Ödənilib",
      amount: "160AZN",
    },
    {
      id: 13545438,
      info: "Artificial Intelligence Seminar",
      date: "Sep 25, 2023",
      status: "Ödənilməyib",
      amount: "145AZN",
    },
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

  return (
    <div className="w-full px-4 font-gilroy">
      {/* Added font-gilroy here */}
      {/* Buttons to toggle between views */}
      <div className="mb-5">
        <button
          className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
            showTable ? "bg-blue100 text-blue400" : "text-neutral700"
          }`}
          onClick={() => setShowTable(true)} // Show the balance table
        >
          Tarixçə
        </button>
        <button
          className={`ml-2 text-base px-4 py-2 h-10 rounded-lg font-gilroy font-normal leading-6 ${
            !showTable ? "bg-blue100 text-blue400" : "text-neutral700"
          }`}
          onClick={() => setShowTable(false)} // Show the YuklemelerimTable
        >
          Yükləmələrim
        </button>
      </div>
      {/* Conditionally render the table or Yükləmələrim based on the selected view */}
      {showTable ? (
        <div className="w-full overflow-x-auto min-h-[400px] justify-between flex flex-col">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                  ID
                </th>
                <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                  Məlumat
                </th>
                <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                  Tarix
                </th>
                <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                  Status
                </th>
                <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                  Məbləğ
                </th>
              </tr>
            </thead>
            <tbody className="space-y-2.5">
              {paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="even:bg-boxGrayBodyColor hover:bg-gray-100"
                >
                  <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                    {item.id}
                  </td>
                  <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                    {item.info}
                  </td>
                  <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                    {item.date}
                  </td>
                  <td
                    className={`px-4 py-2.5 h-11 font-gilroy ${
                      item.status === "Ödənilib"
                        ? "text-chartGreen"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Conditionally render pagination if more than 1 page */}
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
      ) : (
        <YuklemelerimTable />
      )}
    </div>
  );
};

export default ParentComponent;
