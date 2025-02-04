import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import YuklemelerimTable from "../BalanceYuklemeler";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner";
const ParentComponent = () => {
  const { t } = useTranslation();
  const [showTable, setShowTable] = useState(true);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://api.innosert.az/api/me/balances",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.status) {
          setAllData(result.data);
        } else {
          setError(result.message || "Error fetching data");
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const historyData = allData.filter((item) => item.exam_id !== null).reverse();

  const downloadsData = allData.filter(
    (item) => item.exam_id === null && item.type === "Balans artımı"
  );

  const pageCount = Math.ceil(historyData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const paginatedData = historyData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {t("labels.error")}: {error}
      </div>
    );
  }

  return (
    <div className="w-full md:px-4 font-gilroy">
      {/* Toggle Buttons */}
      <div className="mb-5">
        <button
          className={`text-base px-4 py-2 h-10 rounded-lg font-normal ${
            showTable ? "bg-blue100 text-blue400" : "text-neutral700"
          }`}
          onClick={() => setShowTable(true)}
        >
          {t("labels.history")}
        </button>
        <button
          className={`ml-2 text-base px-4 py-2 h-10 rounded-lg font-normal ${
            !showTable ? "bg-blue100 text-blue400" : "text-neutral700"
          }`}
          onClick={() => setShowTable(false)}
        >
          {t("labels.downloads")}
        </button>
      </div>

      {showTable ? (
        <div className="w-full flex flex-col min-h-[400px]">
          <div className="overflow-x-auto overflow-y-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                    {t("labels.information")}
                  </th>
                  <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                    {t("labels.date")}
                  </th>
                  <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                    {t("labels.status")}
                  </th>
                  <th className="px-4 py-2 text-left bg-grayTextColor text-textSecondaryDefault font-gilroy">
                    {t("labels.amount")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className="even:bg-boxGrayBodyColor hover:bg-gray-100"
                    >
                      <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                        {item.id}
                      </td>
                      <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                        {item.type}
                        {item.exam_id ? ` - ${item.exam_id}` : ""}
                      </td>
                      <td className="px-4 py-2.5 h-11 text-grayText font-gilroy">
                        {item.tarix}
                      </td>
                      <td
                        className={`px-4 py-2.5 h-11 font-gilroy ${
                          item.status === "Ödəniş uğurludur"
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-grayText py-4">
                      {t("labels.noData")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pageCount > 1 && (
            <div className="flex justify-center mt-4 pb-9">
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
      ) : (
        <YuklemelerimTable data={downloadsData} />
      )}
    </div>
  );
};

export default ParentComponent;
