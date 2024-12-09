import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";
import CardResult from "@/components/CardResult";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyProfiles from "@/components/MyProfiles";
import ProgressPieChart from "@/components/ProgressPieChart";
import Sidebar from "@/components/Sidebar";
import TitleNavigation from "@/components/TitleNavigation";
import Spinner from "@/components/Spinner";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there is no NextAuth session, redirect to the index page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, proceed with the page rendering
  return {
    props: {
      // You can pass any additional props here
    },
  };
}
function Neticelerim() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve auth token from local storage
        const response = await axios.get(
          "https://innocert-admin.markup.az/api/me/my-results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Reverse the results to show latest first
        const reversedResults = [...response.data.data].reverse();
        setResults(reversedResults);
        console.log(reversedResults, "results");

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (error) return <p>Error loading results.</p>;

  // Pagination logic
  const pageCount = Math.ceil(results.length / itemsPerPage);
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const paginatedResults = results.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
     <Head>
        <title>{t("titles.neticelerim")}</title>
 
      </Head>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden lg:block lg:w-[20%]">
          <Sidebar />
        </div>
        <div className="w-full lg:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            <div className="flex flex-wrap gap-4 items-center justify-center mb-9">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((result) => (
                  <CardResult key={result.id} data={result} />
                ))
              ) : (
                <p className="text-neutral700 text-lg font-gilroy mt-4 flex justify-center items-center">{t("noResults")}</p>
              )}
            </div>
            {pageCount > 1 && (
              <div className="flex justify-center mt-4 mb-10">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName="flex justify-center items-center gap-2"
                  pageClassName="inline-block"
                  pageLinkClassName="block bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200"
                  activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault"
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
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Neticelerim;
