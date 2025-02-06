// ImtahanNeticeleri.jsx

import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import ExamEndFail from "@/components/FinishExam/ExamEndFail";
import ExamEndSuccess from "@/components/FinishExam/ExamEndSucces";
import ExamResultHeader from "@/components/FinishExam/ExamResultHeader";
import Spinner from "@/components/Spinner";
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
      userBalance: userData?.data?.balance || 0,
    },
  };
}

function ImtahanNeticeleri() {
  const { percentage } = useContext(UserContext);
  const router = useRouter();

  // If percentage is null, assign default values
  const examData = percentage || { correct: 0, wrong: 0, blank: 0, percentage: 0 };

  useEffect(() => {
    // Handler for the popstate event
    const handlePopState = (event) => {
      // Prevent the default back action
      event.preventDefault();
      // Redirect to the desired page
      router.push("/neticelerim");
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopState);

    // Optional: Push a new state to the history to prevent immediate back navigation
    window.history.pushState(null, "", window.location.href);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  useEffect(() => {
    // Optional: Prevent users from navigating back using history manipulation
    const handleRouteChangeStart = (url) => {
      if (url === "/neticelerim") {
        // Allow navigation to /neticelerim
        return;
      } else {
        // Redirect to /neticelerim for any other navigation attempt
        router.push("/neticelerim");
      }
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
    };
  }, [router]);

  return (
    <>
      <ExamResultHeader />
      {examData.percentage > 70 ? (
        <ExamEndSuccess percentage={examData} />
      ) : (
        <ExamEndFail percentage={examData} />
      )}
    </>
  );
}

export default ImtahanNeticeleri;
