import AboutQuestionBoxes from "@/components/AboutQuestionBoxes";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import QuestionSingleNavigationTitle from "@/components/QuestionSingleNavigationTitle";
import SingleQuestionInFolder from "@/components/SingleQuestionInFolder";

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
