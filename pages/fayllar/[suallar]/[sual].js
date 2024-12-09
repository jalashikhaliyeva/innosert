// Company Side 

import AboutQuestionBoxes from "@/components/AboutQuestionBoxes";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import QuestionSingleNavigationTitle from "@/components/QuestionSingleNavigationTitle";
import SingleQuestionInFolder from "@/components/SingleQuestionInFolder";
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
  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <QuestionSingleNavigationTitle />
            <AboutQuestionBoxes />
            <SingleQuestionInFolder />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default ImtahanSualiSingle;



// bura api'dan hansi suala click etdiyi gelecek 
// props olarag pass edecem QuestionSingleNavigationTitle -> redakte et buttonuna on click 
