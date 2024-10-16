import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const ReportsTable = () => {
  const data = [
    {
      id: 1,
      reportName: "Annual Financial Report",
      date: "Dec 31, 2024",
      status: "Completed",
      price: "200AZN",
      fullName: "John Doe",
      email: "john.doe@example.com",
    },
    {
      id: 2,
      reportName: "Customer Satisfaction Survey",
      date: "Nov 30, 2024",
      status: "In Progress",
      price: "150AZN",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      reportName: "Market Analysis",
      date: "Oct 15, 2024",
      status: "Pending",
      price: "180AZN",
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
    {
      id: 4,
      reportName: "Project Alpha Review",
      date: "Sep 25, 2024",
      status: "Completed",
      price: "220AZN",
      fullName: "Bob Williams",
      email: "bob.williams@example.com",
    },
    {
      id: 5,
      reportName: "Risk Assessment",
      date: "Aug 10, 2024",
      status: "In Progress",
      price: "160AZN",
      fullName: "Carol Davis",
      email: "carol.davis@example.com",
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

  return (
    <div className=" mt-6">
      <h1 className="text-2xl  font-gilroy font-medium leading-8 mb-6">
        Tarixçə
      </h1>
      <div className="w-full overflow-x-auto min-h-[400px] justify-between flex flex-col">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-inputDefault">
            <tr>
              {/* ID */}
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                ID
              </th>
              {/* Reporter Name */}
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                Ad Soyad
              </th>
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                Məlumat
              </th>
              {/* Email */}
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                Email
              </th>
              {/* Date */}
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                Tarix
              </th>
              {/* Status */}
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                Status
              </th>
              {/* Price */}
              <th className="px-4 py-4 text-left font-medium text-textSecondaryDefault font-gilroy">
                Məbləğ
              </th>
              {/* Info */}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="even:bg-boxGrayBodyColor hover:bg-gray-100"
              >
                {/* ID */}
                <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                  {item.id}
                </td>
                {/* Reporter Name */}
                <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                  {item.fullName}
                </td>

                {/* Info */}
                <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                  {item.reportName}
                </td>
                {/* Email */}
                <td className="px-4 py-2.5 h-11 text-blue400 font-gilroy">
                  <a
                    href={`mailto:${item.email}?subject=Innosert&body=Salam, ${item.fullName}`}
                    className="relative group inline-block text-blue400"
                  >
                    {item.email}
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </td>

                {/* Date */}
                <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                  {item.date}
                </td>
                {/* Status */}
                <td
                  className={`px-4 py-2.5 h-11 font-gilroy ${
                    item.status === "Completed"
                      ? "text-chartGreen"
                      : item.status === "In Progress"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </td>
                {/* Price */}
                <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                  {item.price}
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
    </div>
  );
};

export default ReportsTable;
