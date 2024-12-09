// company side

import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import SuallarTable from "@/components/SuallarTable";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";
import { useContext, useState } from "react";
import DeleteModal from "@/components/DeleteModal"; // Import DeleteModal
import EditFolderModal from "@/components/EditFolderModal";
import CreateSubFolderOrQuestion from "@/components/CreateSubFolderOrQuestion";
import { UserContext } from "@/shared/context/UserContext";
import TeacherDashboardHeader from "@/components/ResponsiveHeaderDashboard/TeacherDashboardHeader";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import TeacherSidebar from "@/components/TeacherSidebar";
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
function ImtahanSUallariTable() {
  const { user } = useContext(UserContext);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    // Open the delete modal
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    // Open the edit modal
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    // Implement delete logic here
    console.log("Delete selected rows:", selectedRows);
    setIsDeleteModalOpen(false); // Close modal after deletion
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal without deletion
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Close the edit modal
  };
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
            <SuallarTableNavigationTitle
              selectedRows={selectedRows}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
            {/* <SuallarTable
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            /> */}
          </InternalContainer>
        </div>
      </div>

      {/* Render the modals conditionally */}
      {isDeleteModalOpen && (
        <DeleteModal
          onCancel={handleCloseDeleteModal}
          onDelete={handleConfirmDelete}
        />
      )}

      {isEditModalOpen && (
        <CreateSubFolderOrQuestion closeModal={handleCloseEditModal} />
      )}
    </>
  );
}

export default ImtahanSUallariTable;
