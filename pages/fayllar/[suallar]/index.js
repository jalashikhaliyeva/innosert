// company side

import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import SuallarTable from "@/components/SuallarTable";
import SuallarTableNavigationTitle from "@/components/SuallarTableNavigationTitle";
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal"; // Import DeleteModal
import EditFolderModal from "@/components/EditFolderModal";

function ImtahanSUallariTable() {
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
      <HeaderInternal />
      <div className="flex">
        <div className="w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-[80%]">
          <InternalContainer>
            <Breadcrumb />
            <SuallarTableNavigationTitle
              selectedRows={selectedRows}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
            <SuallarTable
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
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

      {isEditModalOpen && <EditFolderModal closeModal={handleCloseEditModal} />}
    </>
  );
}

export default ImtahanSUallariTable;
