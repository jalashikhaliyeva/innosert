import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MyProfiles from "@/components/MyProfiles";
import Sidebar from "@/components/Sidebar";
import BalanceInfo from "@/components/BalanceInfo";
import BalanceTable from "@/components/BalanceTable";
import BalanceHistory from "@/components/BalanceHistory";
import React, { useContext } from "react";
import TitleNavigation from "@/components/TitleNavigation";
import { useTranslation } from "react-i18next";
import Head from "next/head";
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

  // 2) We do a server-side fetch to check if the user is verified
  //    Usually you'd pass the user's token from session.accessToken or similar.
  const userResponse = await fetch(
    "https://innocert-admin.markup.az/api/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`, // or wherever your token is
      },
    }
  );

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

  // 3) If user is unverified => redirect to '/', or /haqqimizda
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
      // pass anything you want to the component
      userBalance: userData?.data?.balance || 0,
    },
  };
}

function Balansim() {
  const { user } = useContext(UserContext);

  // console.log(user?.data.balance, "user balance");
  const userBalance = user?.data?.balance;

  console.log(userBalance, "userBalance");

  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("titles.balansim")}</title>
      </Head>
      <HeaderInternal />
      <div className="flex">
        <div className="hidden lg:block  lg:w-[20%]">
          <Sidebar />
        </div>

        <div className="w-full lg:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <TitleNavigation />
            <BalanceInfo userBalance={userBalance} />
            {/* <BalanceHistory /> */}
            <BalanceTable />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default Balansim;
