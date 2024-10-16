import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";

function Registrations({ selectedRows, setSelectedRows }) {
  const data = [
    {
      id: 1,
      fullname: "John Doe",
      mail: "john.doe@example.com",
      price: 100,
      date: "2022-02-12",
    },
    {
      id: 2,
      fullname: "Jane Smith",
      mail: "jane.smith@example.com",
      price: 150,
      date: "2022-02-13",
    },
    {
      id: 3,
      fullname: "Alice Johnson",
      mail: "alice.johnson@example.com",
      price: 200,
      date: "2022-02-14",
    },
    {
      id: 4,
      fullname: "Bob Williams",
      mail: "bob.williams@example.com",
      price: 120,
      date: "2022-02-15",
    },
    {
      id: 5,
      fullname: "Michael Brown",
      mail: "michael.brown@example.com",
      price: 180,
      date: "2022-02-16",
    },
    {
      id: 6,
      fullname: "Emily Davis",
      mail: "emily.davis@example.com",
      price: 210,
      date: "2022-02-17",
    },
    {
      id: 7,
      fullname: "Christopher Miller",
      mail: "chris.miller@example.com",
      price: 190,
      date: "2022-02-18",
    },
    {
      id: 8,
      fullname: "Sophia Garcia",
      mail: "sophia.garcia@example.com",
      price: 140,
      date: "2022-02-19",
    },
    {
      id: 9,
      fullname: "James Wilson",
      mail: "james.wilson@example.com",
      price: 170,
      date: "2022-02-20",
    },
    {
      id: 10,
      fullname: "Olivia Martinez",
      mail: "olivia.martinez@example.com",
      price: 160,
      date: "2022-02-21",
    },
    {
      id: 11,
      fullname: "William Anderson",
      mail: "william.anderson@example.com",
      price: 220,
      date: "2022-02-22",
    },
    {
      id: 12,
      fullname: "Mia Thomas",
      mail: "mia.thomas@example.com",
      price: 230,
      date: "2022-02-23",
    },
    {
      id: 13,
      fullname: "David Jackson",
      mail: "david.jackson@example.com",
      price: 250,
      date: "2022-02-24",
    },
    {
      id: 14,
      fullname: "Amelia White",
      mail: "amelia.white@example.com",
      price: 130,
      date: "2022-02-25",
    },
    {
      id: 15,
      fullname: "Elijah Harris",
      mail: "elijah.harris@example.com",
      price: 240,
      date: "2022-02-26",
    },
    {
      id: 16,
      fullname: "Isabella Clark",
      mail: "isabella.clark@example.com",
      price: 260,
      date: "2022-02-27",
    },
    {
      id: 17,
      fullname: "Logan Rodriguez",
      mail: "logan.rodriguez@example.com",
      price: 170,
      date: "2022-02-28",
    },
    {
      id: 18,
      fullname: "Emma Lewis",
      mail: "emma.lewis@example.com",
      price: 190,
      date: "2022-03-01",
    },
    {
      id: 19,
      fullname: "Lucas Walker",
      mail: "lucas.walker@example.com",
      price: 180,
      date: "2022-03-02",
    },
    {
      id: 20,
      fullname: "Charlotte Young",
      mail: "charlotte.young@example.com",
      price: 150,
      date: "2022-03-03",
    },
    {
      id: 21,
      fullname: "Henry King",
      mail: "henry.king@example.com",
      price: 170,
      date: "2022-03-04",
    },
    {
      id: 22,
      fullname: "Lily Wright",
      mail: "lily.wright@example.com",
      price: 130,
      date: "2022-03-05",
    },
    {
      id: 23,
      fullname: "Benjamin Scott",
      mail: "benjamin.scott@example.com",
      price: 210,
      date: "2022-03-06",
    },
    {
      id: 24,
      fullname: "Evelyn Hill",
      mail: "evelyn.hill@example.com",
      price: 160,
      date: "2022-03-07",
    },
    {
      id: 25,
      fullname: "Daniel Green",
      mail: "daniel.green@example.com",
      price: 140,
      date: "2022-03-08",
    },
    {
      id: 26,
      fullname: "Ava Adams",
      mail: "ava.adams@example.com",
      price: 230,
      date: "2022-03-09",
    },
    {
      id: 27,
      fullname: "Jackson Baker",
      mail: "jackson.baker@example.com",
      price: 220,
      date: "2022-03-10",
    },
    {
      id: 28,
      fullname: "Sofia Gonzalez",
      mail: "sofia.gonzalez@example.com",
      price: 200,
      date: "2022-03-11",
    },
    {
      id: 29,
      fullname: "Sebastian Perez",
      mail: "sebastian.perez@example.com",
      price: 240,
      date: "2022-03-12",
    },
    {
      id: 30,
      fullname: "Mason Turner",
      mail: "mason.turner@example.com",
      price: 250,
      date: "2022-03-13",
    },
  ];

  const router = useRouter();

  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15); // Default items per page set to 15
  const [openFilter, setOpenFilter] = useState(null);

  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  // Refs for each dropdown to handle clicks outside
  const dropdownRefs = {
    fullname: useRef(null),
    mail: useRef(null),
    price: useRef(null),
    date: useRef(null),
  };

  // Function to reset all filters
  const resetFilters = () => {
    setNameFilter("");
    setEmailFilter("");
    setPriceFilter({ min: "", max: "" });
    setDateFilter({
      from: { year: "", month: "", day: "" },
      to: { year: "", month: "", day: "" },
    });
    setOpenFilter(null);
    setCurrentPage(0);
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
      // Full Name filter
      if (
        nameFilter &&
        !item.fullname.toLowerCase().includes(nameFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Email filter
      if (
        emailFilter &&
        !item.mail.toLowerCase().includes(emailFilter.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .filter((item) => {
      // Price filter
      const minPrice = priceFilter.min
        ? parseFloat(priceFilter.min)
        : -Infinity;
      const maxPrice = priceFilter.max ? parseFloat(priceFilter.max) : Infinity;
      if (item.price < minPrice || item.price > maxPrice) {
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

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset to first page when items per page change
  };

  return (
    <div className="w-full p-4 font-gilroy border border-borderTableCel rounded bg-white mt-3">
      {/* Table */}
      <div className="w-full overflow-x-auto min-h-[400px] flex flex-col relative">
        <table className="min-w-full table-auto border-collapse border-borderTableCel">
          <thead className="border-b border-borderTableCel">
            <tr>
              <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                #
              </th>
              {/* Full Name Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "fullname" ? null : "fullname")
                }
              >
                <div className="flex items-center gap-4">
                  Full Name
                  <IoFunnelOutline />
                </div>
                {openFilter === "fullname" && (
                  <div
                    ref={dropdownRefs.fullname}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-xl p-2 w-60"
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
                  >
                    <input
                      type="text"
                      placeholder="Search by name"
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      className="mt-2 gap-1 font-gilroy text-textSecondaryBlue py-1 rounded flex items-center w-full justify-center"
                      onClick={resetFilters}
                    >
                      <RiLoopLeftLine />
                      Reset Filter
                    </button>
                  </div>
                )}
              </th>
              {/* Email Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "mail" ? null : "mail")
                }
              >
                <div className="flex items-center gap-4">
                  Email
                  <IoFunnelOutline />
                </div>
                {openFilter === "mail" && (
                  <div
                    ref={dropdownRefs.mail}
                    className="absolute z-20 mt-2 bg-white border rounded shadow-xl p-2 w-60"
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
                  >
                    <input
                      type="text"
                      placeholder="Search by email"
                      value={emailFilter}
                      onChange={(e) => setEmailFilter(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      className="mt-2 gap-1 font-gilroy text-textSecondaryBlue py-1 rounded flex items-center w-full justify-center"
                      onClick={resetFilters}
                    >
                      <RiLoopLeftLine />
                      Reset Filter
                    </button>
                  </div>
                )}
              </th>
              {/* Price Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "price" ? null : "price")
                }
              >
                <div className="flex items-center gap-4">
                  Price
                  <IoFunnelOutline />
                </div>
                {openFilter === "price" && (
                  <div
                    ref={dropdownRefs.price}
                    className="absolute z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Minimum"
                        value={priceFilter.min}
                        onChange={(e) =>
                          setPriceFilter((prev) => ({
                            ...prev,
                            min: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 w-20"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="Maximum"
                        value={priceFilter.max}
                        onChange={(e) =>
                          setPriceFilter((prev) => ({
                            ...prev,
                            max: e.target.value,
                          }))
                        }
                        className="border rounded px-2 py-1 w-20"
                      />
                    </div>
                    <button
                      className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-2 py-1 rounded w-full"
                      onClick={() => setOpenFilter(null)}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </th>
              {/* Date Header */}
              <th
                className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                onClick={() =>
                  setOpenFilter(openFilter === "date" ? null : "date")
                }
              >
                <div className="flex items-center gap-4">
                  Date
                  <IoFunnelOutline />
                </div>
                {openFilter === "date" && (
                  <div
                    ref={dropdownRefs.date}
                    className="absolute mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-44"
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing the dropdown
                  >
                    <div className="flex flex-col space-y-4">
                      {/* From Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          From Date
                        </label>
                        <div className="flex space-x-2 mt-1 ">
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
                            <option value="">Year</option>
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
                            <option value="">Month</option>
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
                            <option value="">Day</option>
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
                          To Date
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
                            <option value="">Year</option>
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
                            <option value="">Month</option>
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
                            <option value="">Day</option>
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
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="bg-tableBgDefault border-b border-borderTableCel hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.fullname}</td>
                  <td className="px-4 py-2 text-mailBlue cursor-pointer">
                    <a
                      href={`mailto:${item.mail}?subject=Innosert&body=Salam, ${item.fullname}`}
                      className="relative inline-block text-mailBlue after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px] after:bg-mailBlue after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {item.mail}
                    </a>
                  </td>

                  <td className="px-4 py-2 text-gray200">₼ {item.price}</td>
                  <td className="px-4 py-2 !text-base text-gray200">
                    {item.date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No results found.
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
              Items per page:
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

export default Registrations;
