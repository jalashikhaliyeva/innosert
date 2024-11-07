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

function Neticelerim() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setResults(response.data.data);
        setLoading(false);
        console.log(response.data.data, "response.data.data");
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p><Spinner /></p>;
  if (error) return <p>Error loading results.</p>;

  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block  md:w-[20%]">
          <Sidebar />
        </div>
        <div className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {results.length > 0 ? (
                results.map((result) => (
                  <CardResult key={result.id} data={result} />
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Neticelerim;
