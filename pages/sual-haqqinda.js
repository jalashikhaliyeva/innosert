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
function ImtahanSualiSingle() {
  const { user } = useContext(UserContext);
  const { selectedQuestion } = useContext(UserContext);
  // console.log(selectedQuestion, "setSelectedQuestion");

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
            <QuestionSingleNavigationTitle selectedQuestion={selectedQuestion} />
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
