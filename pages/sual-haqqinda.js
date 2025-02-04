// teacher side

import AboutQuestionBoxes from "@/components/AboutQuestionBoxes";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import QuestionSingleNavigationTitle from "@/components/QuestionSingleNavigationTitle";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import SingleQuestionInFolder from "@/components/SingleQuestionInFolder";
import TeacherSidebar from "@/components/TeacherSidebar";
import { UserContext } from "@/shared/context/UserContext";
import { useContext } from "react";
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
function ImtahanSualiSingle() {
  const { user } = useContext(UserContext);
  const { selectedQuestion } = useContext(UserContext);
  console.log(selectedQuestion, "setSelectedQuestion");

  return (
    <>
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        {user?.data.roles === "Teacher" && <TeacherDashboardHeader />}
        {user?.data.roles === "Owner" && <OwnerDashboardHeader />}
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          {user?.data.roles === "Teacher" && <TeacherSidebar />}
          {user?.data.roles === "Owner" && <CompanySidebar />}
        </div>

        <div className="w-full md:w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <QuestionSingleNavigationTitle
              selectedQuestion={selectedQuestion}
            />
            <AboutQuestionBoxes selectedQuestion={selectedQuestion} />
            <SingleQuestionInFolder selectedQuestion={selectedQuestion} />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default ImtahanSualiSingle;

// bura api'dan hansi suala click etdiyi gelecek
// props olarag pass edecem QuestionSingleNavigationTitle -> redakte et buttonuna on click
