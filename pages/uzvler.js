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
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
function Uzvler() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeView, setActiveView] = useState("edit");

  const data = [
    {
      id: 1,
      fullname: "Əli Həsənov",
      email: "ali.hesenov@example.az",
      mobile: "+994-50-123-45-67",
      dateJoined: "2023-10-01",
    },
    {
      id: 2,
      fullname: "Leyla Məmmədova",
      email: "leyla.mammadova@example.az",
      mobile: "+994-55-987-65-43",
      dateJoined: "2023-09-28",
    },
    {
      id: 3,
      fullname: "Taleh İbrahimov",
      email: "taleh.ibrahimov@example.az",
      mobile: "+994-70-456-78-90",
      dateJoined: "2023-09-25",
    },
    {
      id: 4,
      fullname: "Nigar Əliyeva",
      email: "nigar.aliyeva@example.az",
      mobile: "+994-77-654-32-10",
      dateJoined: "2023-09-20",
    },
    {
      id: 5,
      fullname: "Kamran Quliyev",
      email: "kamran.quliyev@example.az",
      mobile: "+994-51-234-56-78",
      dateJoined: "2023-09-15",
    },
    {
      id: 6,
      fullname: "Aytən Rzayeva",
      email: "ayten.rzayeva@example.az",
      mobile: "+994-50-345-67-89",
      dateJoined: "2023-09-10",
    },
    {
      id: 7,
      fullname: "Rəşad Hüseynov",
      email: "reshad.huseynov@example.az",
      mobile: "+994-55-876-54-32",
      dateJoined: "2023-09-05",
    },
    {
      id: 8,
      fullname: "Zeynəb Musayeva",
      email: "zeyneb.musayeva@example.az",
      mobile: "+994-70-765-43-21",
      dateJoined: "2023-08-30",
    },
    {
      id: 9,
      fullname: "Orxan Vəliyev",
      email: "orxan.veliyev@example.az",
      mobile: "+994-77-543-21-98",
      dateJoined: "2023-08-25",
    },
    {
      id: 10,
      fullname: "Günay Qasımova",
      email: "gunay.qasimova@example.az",
      mobile: "+994-51-654-32-89",
      dateJoined: "2023-08-20",
    },
    {
      id: 11,
      fullname: "Emin İsmayılov",
      email: "emin.ismayilov@example.az",
      mobile: "+994-50-567-89-01",
      dateJoined: "2023-08-15",
    },
    {
      id: 12,
      fullname: "Fidan Abbasova",
      email: "fidan.abbasova@example.az",
      mobile: "+994-55-876-54-21",
      dateJoined: "2023-08-10",
    },
    {
      id: 13,
      fullname: "Elvin Rəhimov",
      email: "elvin.rehimov@example.az",
      mobile: "+994-70-543-32-19",
      dateJoined: "2023-08-05",
    },
    {
      id: 14,
      fullname: "Gülşən Kərimova",
      email: "gulshem.kerimova@example.az",
      mobile: "+994-77-654-21-90",
      dateJoined: "2023-07-30",
    },
    {
      id: 15,
      fullname: "Vüsal Əhmədov",
      email: "vusal.ehmedov@example.az",
      mobile: "+994-51-765-43-21",
      dateJoined: "2023-07-25",
    },
    {
      id: 16,
      fullname: "Aysel Quliyeva",
      email: "aysel.quliyeva@example.az",
      mobile: "+994-50-876-54-32",
      dateJoined: "2023-07-20",
    },
    {
      id: 17,
      fullname: "İlqar Həsənli",
      email: "ilqar.hesenli@example.az",
      mobile: "+994-55-987-65-43",
      dateJoined: "2023-07-15",
    },
    {
      id: 18,
      fullname: "Xədicə Nəsrullayeva",
      email: "xədicə.nəsrullayeva@example.az",
      mobile: "+994-70-123-45-67",
      dateJoined: "2023-07-10",
    },
    {
      id: 19,
      fullname: "Cavid Hüseynov",
      email: "cavid.huseynov@example.az",
      mobile: "+994-77-234-56-78",
      dateJoined: "2023-07-05",
    },
    {
      id: 20,
      fullname: "Ramil Abdullayev",
      email: "ramil.abdullayev@example.az",
      mobile: "+994-51-345-67-89",
      dateJoined: "2023-07-01",
    },
    {
      id: 21,
      fullname: "Səbinə İsmayılova",
      email: "sebina.ismayilova@example.az",
      mobile: "+994-50-456-78-90",
      dateJoined: "2023-06-28",
    },
    {
      id: 22,
      fullname: "Murad Qasımov",
      email: "murad.qasimov@example.az",
      mobile: "+994-55-567-89-01",
      dateJoined: "2023-06-25",
    },
    {
      id: 23,
      fullname: "Aynur Babayeva",
      email: "aynur.babayeva@example.az",
      mobile: "+994-70-654-32-10",
      dateJoined: "2023-06-20",
    },
    {
      id: 24,
      fullname: "Tural Əliyev",
      email: "tural.aliyev@example.az",
      mobile: "+994-77-543-21-09",
      dateJoined: "2023-06-15",
    },
    {
      id: 25,
      fullname: "Nurlan Quliyev",
      email: "nurlan.quliyev@example.az",
      mobile: "+994-51-765-43-21",
      dateJoined: "2023-06-10",
    },
    {
      id: 26,
      fullname: "Əsmər Məmmədova",
      email: "esmer.mammadova@example.az",
      mobile: "+994-50-876-54-32",
      dateJoined: "2023-06-05",
    },
    {
      id: 27,
      fullname: "Elgün Rəsulov",
      email: "elgun.resulov@example.az",
      mobile: "+994-55-987-65-43",
      dateJoined: "2023-06-01",
    },
    {
      id: 28,
      fullname: "Gülnarə Muradova",
      email: "gulnare.muradova@example.az",
      mobile: "+994-70-123-45-67",
      dateJoined: "2023-05-28",
    },
    {
      id: 29,
      fullname: "Fərid Əhmədli",
      email: "farid.ehmedli@example.az",
      mobile: "+994-77-234-56-78",
      dateJoined: "2023-05-25",
    },
    {
      id: 30,
      fullname: "Samir Nəsirov",
      email: "samir.nesirov@example.az",
      mobile: "+994-51-345-67-89",
      dateJoined: "2023-05-20",
    },
  ];
  const memberCount = data.length; // Get the count of members

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
      <div className="hidden lg:block ">
        <HeaderInternal />
      </div>
      <div className="block  lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block md:w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-full md:w-[80%] bg-boxGrayBodyColor">
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
              memberCount={memberCount}
            />

            {activeView === "edit" ? (
              <MembersTable
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                data={data}
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
