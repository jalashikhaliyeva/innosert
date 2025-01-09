import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumb";
import CompanySidebar from "@/components/CompanySidebar";
import HeaderInternal from "@/components/HeaderInternal";
import InternalContainer from "@/components/InternalContainer";
import MembersNavigationTitle from "@/components/MembersNavigationTitle";
import AddMemberModal from "@/components/MembersNavigationTitle/AddMemberModal";
import MembersTable from "@/components/MembersTable";
import MembersTableorActivityNavigation from "@/components/MembersTableorActivityNavigation";
import MemberActivity from "@/components/MemberActivity";
import DeleteMemberModal from "@/components/DeleteMemberModal";
import OwnerDashboardHeader from "@/components/ResponsiveHeaderDashboard/OwnerDashboardHeader";
import CompanyContext from "@/shared/context/CompanyContext";
import Spinner from "@/components/Spinner";
import { UserContext } from "@/shared/context/UserContext";
import Head from "next/head";
import { useTranslation } from "react-i18next";
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
function Uzvler() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeView, setActiveView] = useState("edit");
  const [data, setData] = useState([]); // State to store API data
  const [activityData, setActivityData] = useState([]); // State to store activity data
  const [loading, setLoading] = useState(true); // State to manage loading
  const [activityLoading, setActivityLoading] = useState(false); // State to manage activity loading
  const { selectedCompany } = useContext(CompanyContext);

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      if (selectedCompany && selectedCompany.id) {
        const response = await axios.get(
          "https://innocert-admin.markup.az/api/me/company-teachers",
          {
            headers: {
              "X-Company-ID": selectedCompany.id,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [selectedCompany]);

  useEffect(() => {
    fetchData();
  }, [selectedCompany, fetchData]);

  const handleMemberAdded = () => {
    fetchData();
  };

  useEffect(() => {
    // Fetch data from the company-teachers-activity API when activeView is "activity"
    const fetchActivityData = async () => {
      const token = localStorage.getItem("token");
      try {
        if (selectedCompany && selectedCompany.id) {
          // console.log("Fetching activity data...");
          setActivityLoading(true);
          const response = await axios.get(
            "https://innocert-admin.markup.az/api/me/company-teachers-activity",
            {
              headers: {
                "X-Company-ID": selectedCompany.id,
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("Successful response:", response.data);
          // console.log("Successful response:", response);
          setActivityData(response.data.data);
          setActivityLoading(false);
        }
      } catch (error) {
        console.error(
          "Error fetching activity data:",
          error?.response?.data || error.message
        );
        setActivityLoading(false);
      }
    };

    fetchActivityData();
  }, [selectedCompany, activeView]);

  const memberCount = data.length;

  const handleDeleteSelected = () => {
    // console.log("Deleting selected members:", selectedRows);
    setSelectedRows([]); // Reset selectedRows after deletion
  };

  const handleDelete = (id) => {
    // console.log("Delete member with id:", id);
    setData((prevData) => prevData.filter((member) => member.id !== id));
    setSelectedRows((prevSelected) =>
      prevSelected.filter((rowId) => rowId !== id)
    );
  };
  const handleEdit = (id) => {
    // console.log("Edit member with id:", id);
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
      <Head>
        <title>{t("navigation.members")}</title>
      </Head>
      <div className="hidden lg:block">
        <HeaderInternal />
      </div>
      <div className="block lg:hidden">
        <OwnerDashboardHeader />
      </div>
      <div className="flex">
        <div className="hidden lg:block lg:w-[20%]">
          <CompanySidebar />
        </div>

        <div className="w-full lg:w-[80%] bg-boxGrayBodyColor">
          <InternalContainer>
            <Breadcrumb />

            <MembersNavigationTitle
              openModal={openModal}
              selectedRows={selectedRows}
              handleDeleteSelected={handleDeleteSelected}
              openDeleteModal={openDeleteModal}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <MembersTableorActivityNavigation
              activeView={activeView}
              setActiveView={setActiveView}
              memberCount={memberCount}
            />

            {loading ? (
              <Spinner />
            ) : activeView === "edit" ? (
              <MembersTable
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                data={data}
                searchTerm={searchTerm}
              />
            ) : activityLoading ? (
              <Spinner />
            ) : (
              <MemberActivity data={activityData} searchTerm={searchTerm} />
            )}
          </InternalContainer>
        </div>
      </div>

      {isModalOpen && (
        <AddMemberModal closeModal={closeModal} onMemberAdded={handleMemberAdded} />
      )}
      {isDeleteModalOpen && (
        <DeleteMemberModal
          member={memberToDelete}
          onCancel={closeDeleteModal}
          onDelete={confirmDelete}
        />
      )}
    </>
  );
}

export default Uzvler;
