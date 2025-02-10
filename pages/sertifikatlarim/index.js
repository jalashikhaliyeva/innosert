import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyCertificates from "@/components/MyCertificates";
import Sidebar from "@/components/Sidebar";
import TitleNavigation from "@/components/TitleNavigation";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { getSession } from "next-auth/react";
import { UserContext } from "@/shared/context/UserContext";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // 1) If there's no NextAuth session, not logged in => redirect to '/'
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 2) Server-side fetch to check if the user is verified
  const userResponse = await fetch("https://api.innosert.az/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!userResponse.ok) {
    // If the fetch fails, treat it like "not verified"
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await userResponse.json();

  // 3) If user is unverified => redirect to '/'
  if (userData?.data?.sv === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 4) If everything's OK, let them proceed
  return {
    props: {
      userBalance: userData?.data?.balance || 0,
    },
  };
}

function Sertifikatlarim() {
  // const { token } = useContext(UserContext);
  // console.log(token, "token context");

  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Client-side fetch for certificates
  useEffect(() => {
 

    const token = localStorage.getItem("token");
    console.log(token, "token");
    
    const fetchCertificates = async () => {
      try {
        const res = await fetch(
          "https://api.innosert.az/api/me/get-certificates",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);

        if (!res.ok) {
          throw new Error("Failed to fetch certificates");
        }
        const data = await res.json();
        console.log(data, "data");
        setCertificates(data.data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <>
      <Head>
        <title>{t("titles.sertifikatlarim")}</title>
      </Head>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden md:block md:w-[20%]">
          <Sidebar />
        </div>
        <div className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              // Pass the fetched certificates data as a prop
              <MyCertificates certificates={certificates} />
            )}
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Sertifikatlarim;
