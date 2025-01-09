import CompanyContext from "@/shared/context/CompanyContext";
import React, { useContext } from "react";
import { IoWarningOutline } from "react-icons/io5";

function DeleteMemberModal({ member, onCancel, onDelete }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };
  const { selectedCompany } = useContext(CompanyContext);
  // console.log(selectedCompany , "selectedCompany");
  // console.log(member , "member");
  
  const confirmDelete = async () => {
    // console.log(memberToDelete, "memberToDelete");
    
    if (memberToDelete && memberToDelete.id) {
      try {
        const response = await fetch(
          `https://innocert-admin.markup.az/api/me/deleteUser/${member.id}`,
          {
            method: "DELETE",
            headers: {
              "X-Company-ID": selectedCompany.id, // Use selected company ID from context
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Assuming the user's token is stored in the user context
            },
          }
        );
  
        if (response.ok) {
          // console.log(response, "response DELETE");
  
          // Successfully deleted
          handleDelete(memberToDelete.id); // Update the UI
          closeDeleteModal(); // Close the modal
        } else {
          // Handle error response
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  

  return (
    <div onClick={handleBackgroundClick} className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-[999]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96 m-8 lg:m-0">
        <div className="flex justify-center mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <IoWarningOutline style={{ fontSize: "32px", color: "red", fill: "red" }} />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 text-center" style={{ fontFamily: 'Gilroy' }}>
          Üzvü sil
        </h3>

        <p className="text-sm text-gray-600 text-center mt-2" style={{ fontFamily: 'Gilroy' }}>
          {`${member.first_name} ${member.last_name} (${member.email})`}
          <br />
          Üzvü silmək istədiyinizə əminsinizmi?    <br />  Bu əməliyyat geri alına bilməz.
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={onCancel}
            className="w-full py-2 px-4 mr-2 bg-buttonSecondaryDefault text-gray-700 rounded-lg hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed focus:outline-none"
            style={{ fontFamily: 'Gilroy' }}
          >
            Ləğv et
          </button>
          <button
            onClick={onDelete}
            className="w-full py-2 px-4 ml-2 bg-errorButtonDefault text-white rounded-lg hover:bg-errorButtonHover active:bg-errorButtonPressed focus:outline-none"
            style={{ fontFamily: 'Gilroy' }}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}


export default DeleteMemberModal;
