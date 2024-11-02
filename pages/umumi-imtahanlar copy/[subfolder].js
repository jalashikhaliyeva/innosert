import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import TeacherSidebar from "@/components/TeacherSidebar";
import { useRouter } from "next/router";
import SubExamsListTeacher from "@/components/SubExamsListTeacher";
import SubExamsListNavigationTeacher from "@/components/SubExamsListNavigationTeacher";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";

function SubImtahan() {
  const router = useRouter();
  const [selectedExams, setSelectedExams] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("Son Yaradilan");
  // Wait until the router is ready before accessing router.query
  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  const openDeleteModal = () => {
    console.log("deletemodal");

    // Your logic to open the delete modal
  };
  const openAddExamModal = () => {
    console.log("addExamModal");
    // Your logic to open the add exam modal
  };
  const slugParam = router.query.subfolder;

  console.log("slug in SubImtahan:", router.query.subfolder);

  return (
    <>
     <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <TeacherDashboardHeader />
      </div>
      <div className="flex">
      <div className="hidden lg:block md:w-[20%]">
          <TeacherSidebar />
        </div>
        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />
            <SubExamsListNavigationTeacher
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              selectedExams={selectedExams}
              openAddExamModal={openAddExamModal}
              openDeleteModal={openDeleteModal}
            />
            <SubExamsListTeacher
             viewMode={viewMode} // Pass viewMode
             sortOption={sortOption} // Pass sortOption
              folderSlug={slugParam}
              selectedExams={selectedExams}
              setSelectedExams={setSelectedExams}
            />
          </InternalContainer>
        </div>
      </div>
    </>
  );
}

export default SubImtahan;
