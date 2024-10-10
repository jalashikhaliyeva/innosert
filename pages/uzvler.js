import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MembersNavigationTitle from "@/components/MembersNavigationTitle";
import AddMemberModal from "@/components/MembersNavigationTitle/AddMemberModal";
import MembersTable from "@/components/MembersTable";
import MembersTableorActivityNavigation from "@/components/MembersTableorActivityNavigation";
import MemberActivity from "@/components/MemberActivity"; // Assuming you have this component
import DeleteMemberModal from "@/components/DeleteMemberModal";
function Uzvler() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeView, setActiveView] = useState("edit");

  const handleDeleteSelected = () => {
    console.log("Deleting selected members:", selectedRows);
    // Implement delete logic here (e.g., filter out selectedRows from your data)
    setSelectedRows([]); // Reset selectedRows after deletion
  };

  const handleDelete = (id) => {
    console.log("Delete member with id:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit member with id:", id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

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

            {/* Pass selectedRows and delete function to MembersNavigationTitle */}
            <MembersNavigationTitle
              openModal={openModal}
              selectedRows={selectedRows}
              handleDeleteSelected={handleDeleteSelected}
              openDeleteModal={openDeleteModal}
            />

            <MembersTableorActivityNavigation
              activeView={activeView}
              setActiveView={setActiveView}
            />

            {activeView === "edit" ? (
              <MembersTable
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ) : (
              <MemberActivity />
            )}
          </InternalContainer>
        </div>
      </div>

      {isModalOpen && <AddMemberModal closeModal={closeModal} />}
      {/* Modal for deleting members */}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          onCancel={closeDeleteModal}
          onDelete={handleDeleteSelected}
        />
      )}
    </>
  );
}

export default Uzvler;
