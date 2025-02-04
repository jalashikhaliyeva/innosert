import React, { useContext, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MemberActivityQuestionOrExam from "@/components/MemberActivityQuestionOrExam";
import MemberActivityName from "@/components/MemberActivityName";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import { useRouter } from "next/router";
import { UserContext } from "@/shared/context/UserContext";
import { getSession } from "next-auth/react";
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
    "https://api.innosert.az/api/user",
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
function UzvAktivliyi() {
  const { memberActivitySingle } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // You can use the `id` here for fetching data or any other logic
      // console.log("ID from query:", id);
    }
  }, [id]);

  return (
    <>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <MemberActivityName memberActivitySingle={memberActivitySingle} />
            <MemberActivityQuestionOrExam id={id} />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default UzvAktivliyi;
