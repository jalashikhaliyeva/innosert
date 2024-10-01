// components/CompanySidebar.js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MdOutlineLogout } from "react-icons/md";
import { BsBarChartLine } from "react-icons/bs";
import { RiInboxArchiveLine, RiBuildingLine } from "react-icons/ri";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import LogoutModal from "@/components/LogoutModal";
import Image from "next/image";
import Link from "next/link"; // Import Link for client-side navigation
import { TbActivity } from "react-icons/tb";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { PiCertificate } from "react-icons/pi";
import { PiCoin } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";

function CompanySidebar() {
  const [user, setUser] = useState(null);
  const [activeCompanies, setActiveCompanies] = useState([]); // Only active companies
  const [companyLogo, setCompanyLogo] = useState("");
  const router = useRouter();
  const { id: companyId } = router.query; // Get company ID from the route
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false); // Dropdown open state
  const [firstCompany, setFirstCompany] = useState(null); // First created company

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        alert("User is not authenticated. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          "https://innocert-admin.markup.az/api/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData, "userData");

          setUser(userData);
          setFirstName(userData.data.first_name || "");
          setLastName(userData.data.last_name || "");
          setImagePreview(userData.data.image || "");

          // Filter only active companies (exclude pending companies)
          const activeCompaniesList = userData.data.companies.filter(
            (company) => company.status === "1"
          );
          setActiveCompanies(activeCompaniesList);

          // Set the first created company (based on creation order)
          if (activeCompaniesList.length > 0) {
            const firstCreatedCompany = activeCompaniesList[0];
            setFirstCompany(firstCreatedCompany);
            setCompanyLogo(firstCreatedCompany.logo); // Set logo for the first company
          }
        } else {
          alert("Failed to fetch user data");
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    };

    fetchUserData();
  }, []);

  // Function to open the logout modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // Function to close the logout modal
  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  // Navigate to the hesablarim/[id] page when clicking on the company div
  const handleCompanyClick = (companySlug) => {
    if (companySlug) {
      router.push(`/hesablarim/${companySlug}`);
    }
  };
  // Toggle the dropdown open state
  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen((prevState) => !prevState);
  };

  // Helper function to determine if a menu item is active
  // const isActive = (path) => router.asPath === path;
  const isActive = (path) => router.pathname.startsWith(path);

  return (
    <div className="fixed h-screen w-72 bg-white shadow-sm border mt-[88px]">
      <div className="p-4 mx-4 pt-8">
        {/* Profile Section */}
        <div className="flex items-center ">
          {imagePreview ? (
            <Image
              width={60}
              height={60}
              src={imagePreview}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
              {generateInitials(firstName, lastName)}
            </div>
          )}
          <div>
            <p className="font-gilroy text-base font-normal leading-6 flex">
              {firstName} {lastName}
            </p>
          </div>
        </div>
        {/* Company Dropdown Section */}
        {user?.data?.roles === "Owner" && activeCompanies.length > 0 && (
          <div className="mb-4">
            <div className="mb-4">
              <div
                className="flex items-center space-x-4 py-2 pb-4 cursor-pointer rounded-lg border-b border-gray-200"
                onClick={toggleCompanyDropdown}
              >
                <RiBuildingLine className="size-6 fill-grayText" />

                <p className="text-lg font-gilroy font-normal leading-6 text-grayText">
                  Şirkət seç
                </p>
                {companyDropdownOpen ? (
                  <FiChevronUp className="ml-2 text-grayText" />
                ) : (
                  <FiChevronDown className="ml-2 text-grayText" />
                )}
              </div>
            </div>

            {/* Dropdown menu for active companies */}
            {companyDropdownOpen && (
              <div className="mt-2">
                {activeCompanies.map((company) => (
                  <div
                    key={company.slug}
                    className="flex items-center mb-2 cursor-pointer border-b border-buttonGhostPressed pb-2 hover:bg-gray-100 rounded-lg"
                    onClick={() => handleCompanyClick(company.slug)}
                  >
                    {company.logo && (
                      <Image
                        width={40}
                        height={40}
                        src={company.logo}
                        alt={company.name}
                        className="w-10 h-10 rounded-full mr-4 object-cover"
                      />
                    )}
                    <p className="font-gilroy text-base font-normal leading-6 flex">
                      {company.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Items */}
{/* Menu Items */}
<nav className="mt-10">
  <ul className="mx-4">
    <li className="mb-2">
      <Link
        href={`/uzvler`}
        className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
          isActive(`/uzvler`) ? "bg-buttonGhostPressed" : ""
        }`}
      >
        <BsBarChartLine className="size-6" /> {/* Removed fill-color logic */}
        <span
          className={`text-lg font-gilroy font-normal leading-6 ${
            isActive(`/uzvler`) ? "text-brandBlue500" : ""
          }`}
        >
          Üzvlər
        </span>
      </Link>
    </li>

    <li className="mb-2">
      <Link
        href={`/hesabatlar`}
        className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
          isActive(`/hesabatlar`) ? "bg-buttonGhostPressed" : ""
        }`}
      >
        <HiOutlineClipboardDocument className="size-6" /> {/* Removed fill-color logic */}
        <span
          className={`text-lg font-gilroy font-normal leading-6 ${
            isActive(`/hesabatlar`) ? "text-brandBlue500" : ""
          }`}
        >
          Hesabatlar
        </span>
      </Link>
    </li>

    <li className="mb-2">
      <Link
        href={`/uzv-aktivliyi`}
        className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
          isActive(`/uzv-aktivliyi`) ? "bg-buttonGhostPressed" : ""
        }`}
      >
        <TbActivity className="size-6" /> {/* Removed fill-color logic */}
        <span
          className={`text-lg font-gilroy font-normal leading-6 ${
            isActive(`/uzv-aktivliyi`) ? "text-brandBlue500" : ""
          }`}
        >
          Üzv aktivliyi
        </span>
      </Link>
    </li>

    <li className="mb-2">
      <Link
        href={`/shirket-hesabi`}
        className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
          isActive("/shirket-hesabi")
            ? "bg-buttonGhostPressed text-brandBlue500"
            : "text-grayText hover:bg-gray-100"
        }`}
      >
        <FaRegCircleUser className="size-6" /> {/* Removed fill-color logic */}
        <span
          className={`text-lg font-gilroy font-normal leading-6 ${
            isActive("/shirket-hesabi") ? "text-brandBlue500" : "text-grayText"
          }`}
        >
          Hesablarım
        </span>
      </Link>
    </li>

    <li className="mb-2">
      <Link
        href={`/suallar-toplusu`}
        className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
          isActive(`/suallar-toplusu`) ? "bg-buttonGhostPressed" : ""
        }`}
      >
        <RiInboxArchiveLine className="size-6" /> {/* Removed fill-color logic */}
        <span
          className={`text-lg font-gilroy font-normal leading-6 ${
            isActive(`/suallar-toplusu`) ? "text-brandBlue500" : ""
          }`}
        >
          Suallar Toplusu
        </span>
      </Link>
    </li>

    <li className="mb-2">
      <a
        href="/logout"
        className="flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg"
        onClick={(e) => {
          e.preventDefault(); // Prevent default navigation
          handleLogoutClick(); // Show modal
        }}
      >
        <MdOutlineLogout className="size-6" /> {/* Removed fill-color logic */}
        <span className="text-lg font-gilroy font-normal leading-6">
          Çıxış
        </span>
      </a>
    </li>
  </ul>
</nav>


      <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} />
    </div>
  );
}

export default CompanySidebar;
