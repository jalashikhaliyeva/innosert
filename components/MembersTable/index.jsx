import React, { useState, useEffect, useRef, useContext } from "react";
import ReactPaginate from "react-paginate";
import { BsTrash3 } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { IoFunnelOutline } from "react-icons/io5";
import { RiLoopLeftLine } from "react-icons/ri";
import { useRouter } from "next/router";
import DeleteMemberModal from "@/components/DeleteMemberModal";
import { UserContext } from "@/shared/context/UserContext";
import CompanyContext from "@/shared/context/CompanyContext";
import { useTranslation } from "react-i18next";
function MembersTable({
  selectedRows,
  setSelectedRows,
  handleDelete,
  handleEdit,
  searchTerm,
  data,
}) {
  const router = useRouter();
  const { user } = useContext(UserContext); // Get user from UserContext
  // const { user } = useContext(CompanyContext);
  const { t } = useTranslation();
  const { selectedCompany } = useContext(CompanyContext);
  // console.log(selectedCompany, "selectedCompany in Uzvler of company");

  // State declarations
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page set to 15
  const [openFilter, setOpenFilter] = useState(null);
  const [nameOrder, setNameOrder] = useState(null); // 'asc' or 'desc'
  const [emailFilter, setEmailFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({
    from: { year: "", month: "", day: "" },
    to: { year: "", month: "", day: "" },
  });

  // Refs for each dropdown to handle clicks outside
  const dropdownRefs = {
    fullname: useRef(null),
    email: useRef(null),
    mobile: useRef(null),
    date: useRef(null),
  };

  // Function to reset all filters
  const resetFilters = () => {
    setNameOrder(null);
    setEmailFilter("");
    setMobileFilter("");
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

  // Generate options for years, months, and days
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // const filteredData = Array.isArray(data)
  //   ? data
  //       .filter((item) => {
  //         // Email filter
  //         if (
  //           emailFilter &&
  //           !item.email.toLowerCase().includes(emailFilter.toLowerCase())
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       })
  //       .filter((item) => {
  //         // Mobile filter
  //         if (
  //           mobileFilter &&
  //           !item.mobile.toLowerCase().includes(mobileFilter.toLowerCase())
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       })
  //       .filter((item) => {
  //         // Date filter
  //         const { from, to } = dateFilter;
  //         const itemDate = new Date(item.dateJoined);
  //         let fromDate = null;
  //         let toDate = null;

  //         if (from.year && from.month && from.day) {
  //           fromDate = new Date(from.year, from.month - 1, from.day);
  //           if (itemDate < fromDate) {
  //             return false;
  //           }
  //         }

  //         if (to.year && to.month && to.day) {
  //           toDate = new Date(to.year, to.month - 1, to.day);
  //           if (itemDate > toDate) {
  //             return false;
  //           }
  //         }

  //         return true;
  //       })
  //   : [];

  const filteredData = Array.isArray(data)
    ? data
        .filter((item) => {
          // Search filter: check if fullname or email includes the search term
          const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
          const email = item.email.toLowerCase();
          const term = searchTerm.toLowerCase();
          return fullName.includes(term) || email.includes(term);
        })
        .filter((item) => {
          // Existing email filter
          if (
            emailFilter &&
            !item.email.toLowerCase().includes(emailFilter.toLowerCase())
          ) {
            return false;
          }
          return true;
        })
        .filter((item) => {
          // Existing mobile filter
          if (
            mobileFilter &&
            !item.mobile.toLowerCase().includes(mobileFilter.toLowerCase())
          ) {
            return false;
          }
          return true;
        })
        .filter((item) => {
          // Existing date filter
          const { from, to } = dateFilter;
          const itemDate = new Date(item.dateJoined);
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
        })
    : []; // Return an empty array if data is not an array

  // Sorting logic
  const sortedData = nameOrder
    ? [...filteredData].sort((a, b) => {
        if (nameOrder === "asc") {
          return a.fullname.localeCompare(b.fullname);
        } else {
          return b.fullname.localeCompare(a.fullname);
        }
      })
    : filteredData;

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);

  const paginatedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null); // Track which member to delete

  const openDeleteModal = (member) => {
    setMemberToDelete(member); // Set the entire member object
    setIsDeleteModalOpen(true);
  };
  // Close the delete modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setMemberToDelete(null);
  };

  const confirmDelete = async () => {
    if (memberToDelete && memberToDelete.id) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://api.innosert.az/api/me/deleteUser/${memberToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              "X-Company-ID": selectedCompany.id,
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();
        // console.log(responseData, "responseData delete");

        if (response.ok) {
          // console.log(responseData, "response DELETE ");
          handleDelete(memberToDelete.id);
          closeDeleteModal();
        } else {
          console.error("Failed to delete user:", responseData);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="w-full  p-4 font-gilroy border border-borderTableCel rounded bg-white">
      {/* Table */}
      {Array.isArray(data) && data.length === 0 ? (
        <div className="flex justify-center items-center relative min-h-[400px]">
          <p className="text-gray-500 font-gilroy text-center text-wrap text-lg">
            {t("members.noMembers")}
          </p>
        </div>
      ) : paginatedData.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500 font-gilroy text-center text-wrap text-lg">
            {t("members.noMembers")}
          </p>
        </div>
      ) : (
        <div className="w-full min-h-[400px] flex flex-col ">
          <div className="overflow-x-auto overflow-y-auto  ">
            <table className="min-w-full z-10 table-auto border-collapse border-borderTableCel">
              <thead className="border-b  border-borderTableCel">
                <tr>
                  <th className="relative px-4 py-2 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedRows(
                          e.target.checked ? data.map((row) => row.id) : []
                        )
                      }
                    />
                  </th>
                  {/* <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy">
                    #
                  </th> */}
                  {/* Tam Ad Başlıq */}
                  <th
                    className="relative  px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                    onClick={() =>
                      setOpenFilter(
                        openFilter === "fullname" ? null : "fullname"
                      )
                    }
                  >
                    <div className="flex relative items-center gap-4">
                      {t("members.fullName")}
                      <IoFunnelOutline />
                    </div>
                    {openFilter === "fullname" && (
                      <div
                        ref={dropdownRefs.fullname}
                        className=" fixed z-50 mt-2 bg-white border rounded shadow-2xl p-2 divide-y w-40 "
                        onClick={(e) => e.stopPropagation()} // Klikləmə dropdown-u bağlamasın
                      >
                        <div
                          className={`cursor-pointer hover:bg-gray-100 px-2 py-1 ${
                            nameOrder === "asc" ? "bg-gray-200" : ""
                          }`}
                          onClick={() => {
                            setNameOrder("asc");
                            setOpenFilter(null);
                          }}
                        >
                          A-Z
                        </div>
                        <div
                          className={`cursor-pointer hover:bg-gray-200 px-2 py-1 ${
                            nameOrder === "desc" ? "bg-gray-200" : ""
                          }`}
                          onClick={() => {
                            setNameOrder("desc");
                            setOpenFilter(null);
                          }}
                        >
                          Z-A
                        </div>
                      </div>
                    )}
                  </th>
                  {/* Elektron Poçt Ünvanı Başlıq */}
                  <th
                    className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                    onClick={() =>
                      setOpenFilter(openFilter === "email" ? null : "email")
                    }
                  >
                    <div className="flex items-center gap-4">
                      {t("members.email")}
                      <IoFunnelOutline />
                    </div>
                    {openFilter === "email" && (
                      <div
                        ref={dropdownRefs.email}
                        className="fixed z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                        onClick={(e) => e.stopPropagation()} // Klikləmə dropdown-u bağlamasın
                      >
                        <input
                          type="text"
                          placeholder="Elektron poçt axtar"
                          value={emailFilter}
                          onChange={(e) => setEmailFilter(e.target.value)}
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
                  {/* Mobil Nömrə Başlıq */}
                  <th
                    className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                    onClick={() =>
                      setOpenFilter(openFilter === "mobile" ? null : "mobile")
                    }
                  >
                    <div className="flex items-center gap-4">
                      {t("members.phoneNumber")}
                      <IoFunnelOutline />
                    </div>
                    {openFilter === "mobile" && (
                      <div
                        ref={dropdownRefs.mobile}
                        className="fixed z-20 mt-2 bg-white border rounded shadow p-2 w-60"
                        onClick={(e) => e.stopPropagation()} // Klikləmə dropdown-u bağlamasın
                      >
                        <input
                          type="text"
                          placeholder="Mobil nömrə axtar"
                          value={mobileFilter}
                          onChange={(e) => setMobileFilter(e.target.value)}
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
                  {/* Qatılma Tarixi Başlıq */}
                  <th
                    className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer"
                    onClick={() =>
                      setOpenFilter(openFilter === "date" ? null : "date")
                    }
                  >
                    <div className="flex items-center gap-4">
                      {t("members.joinDate")}
                      <IoFunnelOutline />
                    </div>
                    {openFilter === "date" && (
                      <div
                        ref={dropdownRefs.date}
                        className="fixed mt-2 bg-white border rounded shadow-lg p-4 w-72 -ml-24"
                        onClick={(e) => e.stopPropagation()} // Klikləmə dropdown-u bağlamasın
                      >
                        <div className="flex flex-col space-y-4">
                          {/* Tarixdən */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Tarixdən
                            </label>
                            <div className="flex space-x-2 mt-1">
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
                                <option value="">İl</option>
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
                                <option value="">Ay</option>
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
                                <option value="">Gün</option>
                                {days.map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {/* Tarixə qədər */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Tarixə qədər
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
                                <option value="">İl</option>
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
                                <option value="">Ay</option>
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
                                <option value="">Gün</option>
                                {days.map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <button
                            className="mt-2 font-gilroy bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded w-full"
                            onClick={() => setOpenFilter(null)}
                          >
                            Tətbiq et
                          </button>
                        </div>
                      </div>
                    )}
                  </th>
                  <th className="relative px-4 py-3 text-left text-base font-medium leading-6 bg-headerTableCel text-textSecondaryDefault font-gilroy cursor-pointer">
                    <button
                      className="flex items-center gap-4"
                      onClick={resetFilters}
                    >
                      {t("members.refresh")}
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
                      className="bg-tableBgDefault border-b border-borderTableCel hover:bg-gray-100"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </td>
                      {/* <td className="px-4 py-3">{item.id}</td> */}
                      <td className="flex items-center gap-3 px-4 py-3 relative group cursor-pointer !text-base text-gray200">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="24" height="24" rx="12" fill="#EDEFFD" />
                          <path
                            d="M16.364 16.909C16.364 16.1478 16.364 15.7672 16.27 15.4575C16.0585 14.7602 15.5128 14.2145 14.8155 14.0029C14.5058 13.909 14.1252 13.909 13.364 13.909H10.6367C9.8755 13.909 9.49489 13.909 9.18519 14.0029C8.48788 14.2145 7.9422 14.7602 7.73067 15.4575C7.63672 15.7672 7.63672 16.1478 7.63672 16.909M14.4549 9.54537C14.4549 10.901 13.356 11.9999 12.0004 11.9999C10.6447 11.9999 9.54581 10.901 9.54581 9.54537C9.54581 8.18976 10.6447 7.09082 12.0004 7.09082C13.356 7.09082 14.4549 8.18976 14.4549 9.54537Z"
                            stroke="#2826A7"
                            strokeWidth="1.09091"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {item.first_name && item.last_name ? (
                          `${item.first_name} ${item.last_name}`.length > 49 ? (
                            `${item.first_name} ${item.last_name}`.substring(
                              0,
                              49
                            ) + "..."
                          ) : (
                            `${item.first_name} ${item.last_name}`
                          )
                        ) : (
                          <span>No name provided</span>
                        )}
                        {/* Tooltip */}
                      </td>

                      <td className="px-4 py-3 !text-base">
                        <a
                          href={`mailto:${item.email}?subject=Innosert&body=Salam ${item.fullname}, `}
                          className="text-mailBlue underline !text-base"
                        >
                          {item.email}
                        </a>
                      </td>

                      <td className="px-4 py-3 text-gray200">{item.mobile}</td>
                      <td className="px-4 py-3  text-gray200 !text-base">
                        {item.date_of_join}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-end justify-end">
                          <FaTrashCan
                            onClick={() => openDeleteModal(item)}
                            className="mx-2 cursor-pointer text-red400"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      {t("members.noResults")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Bottom Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center mt-5 pb-5">
            {/* Items Per Page Selector */}
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="mr-2">
                {t("members.itemsPerPage")}
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
                    currentPage === pageCount - 1
                      ? { cursor: "not-allowed" }
                      : {}
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          member={memberToDelete}
          onCancel={closeDeleteModal}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default MembersTable;
