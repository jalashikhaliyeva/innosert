import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import TeacherSidebar from "@/components/TeacherSidebar";
import { useRouter } from "next/router";
import SubExamsListTeacher from "@/components/SubExamsListTeacher";
import SubExamsListNavigationTeacher from "@/components/SubExamsListNavigationTeacher";

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
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
          <TeacherSidebar />
        </div>
        <div className="w-[80%]">
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
