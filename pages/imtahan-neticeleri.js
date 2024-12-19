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

function ImtahanNeticeleri() {
  const { percentage } = useContext(UserContext);
  const router = useRouter();

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

  console.log(percentage, "percentage");

  // If percentage is null, render ExamEndFail directly
  if (percentage === null) {
    return <ExamEndFail percentage={percentage} />;
  }

  return (
    <>
      <ExamResultHeader />
      {percentage.percentage > 30 ? (
        <ExamEndSuccess percentage={percentage} />
      ) : (
        <ExamEndFail percentage={percentage} />
      )}
    </>
  );
}

export default ImtahanNeticeleri;
