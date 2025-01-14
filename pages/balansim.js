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
