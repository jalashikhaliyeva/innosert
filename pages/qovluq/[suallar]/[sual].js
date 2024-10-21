// teacher side

import AboutQuestionBoxes from "@/components/AboutQuestionBoxes";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import QuestionSingleNavigationTitle from "@/components/QuestionSingleNavigationTitle";
import SingleQuestionInFolder from "@/components/SingleQuestionInFolder";
import TeacherSidebar from "@/components/TeacherSidebar";
import { UserContext } from "@/shared/context/UserContext";
import { useContext } from "react";

function ImtahanSualiSingle() {
  const { user } = useContext(UserContext); 
  return (
    <>
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
        {user?.data.roles === "Teacher" && <TeacherSidebar />}
        {user?.data.roles === "Owner" && <CompanySidebar />}
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
