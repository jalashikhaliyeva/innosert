// components/CompanySidebar.js

import React, { useState, useEffect, useContext } from "react";
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
import CompanyContext from "@/shared/context/CompanyContext";
import { FiUsers } from "react-icons/fi";
import { CgFileDocument } from "react-icons/cg";
import { FiAlertOctagon } from "react-icons/fi";

function CompanySidebar() {
  const [user, setUser] = useState(null);
  const [activeCompanies, setActiveCompanies] = useState([]); // Only active companies
  const [companyLogo, setCompanyLogo] = useState("");
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false); // Dropdown open state
  const [firstCompany, setFirstCompany] = useState(null); // First created company

  const { selectedCompany } = useContext(CompanyContext);
  if (!selectedCompany) {
    return <div>Zəhmət olmasa, şirkət seçin.</div>;
  }

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
  // const isActive = (path) => router.pathname.startsWith(path);
  const isActive = (path) => {
    const currentPath = router.pathname;
    // Mark 'Suallar Toplusu' as active when on /suallar-toplusu or any /fayllar/[dynamic] path
    if (path === "/suallar-toplusu" && currentPath.startsWith("/fayllar/")) {
      return true;
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="fixed h-screen w-72 bg-white shadow-sm border mt-[79px]">
      <div className="p-4 mx-4 pt-8">
        {/* Profile Section */}
        <div className="flex items-center ">
          <Image
            width={60}
            height={60}
            src={selectedCompany?.logo}
            alt="Company Profile Photo"
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />

          <div>
            <p className="font-gilroy text-base font-normal leading-6 flex">
              {selectedCompany?.name}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      {/* Menu Items */}
      <nav className="mt-10">
        <ul className="mx-4">
          <li className="mb-2">
            <Link
              href={`/hesabatlar`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/hesabatlar`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <HiOutlineClipboardDocument className="size-6" />{" "}
              {/* Removed fill-color logic */}
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
              href={`/uzvler`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/uzvler`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <FiUsers className="size-6" /> {/* Removed fill-color logic */}
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
              href={`/sual-bazasi`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/sual-bazasi`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <RiInboxArchiveLine className="size-6" />{" "}
              {/* Removed fill-color logic */}
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive(`/sual-bazasi`) ? "text-brandBlue500" : ""
                }`}
              >
                Sual Bazası
              </span>
            </Link>
          </li>

          <li className="mb-2">
            <Link
              href={`/umumi-imtahanlar`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/umumi-imtahanlar`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <CgFileDocument className="size-6" />{" "}
              {/* Removed fill-color logic */}
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive(`/umumi-imtahanlar`) ? "text-brandBlue500" : ""
                }`}
              >
                İmtahanlar
              </span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={`/xeta-bildirisleri`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/xeta-bildirisleri`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <FiAlertOctagon className="size-6" />{" "}
  
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive(`/xeta-bildirisleri`) ? "text-brandBlue500" : ""
                }`}
              >
                Xəta bildirişləri
              </span>
            </Link>
          </li>

          {/* <li className="mb-2">
            <Link
              href={`/shirket-hesabi`}
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                isActive("/shirket-hesabi")
                  ? "bg-buttonGhostPressed text-brandBlue500"
                  : "text-grayButtonText hover:bg-gray-100"
              }`}
            >
              <FaRegCircleUser className="size-6" />{" "}
           
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive("/shirket-hesabi")
                    ? "text-brandBlue500"
                    : "text-grayButtonText"
                }`}
              >
                Hesab
              </span>
            </Link>
          </li> */}
{/* 
          <li className="mb-2">
            <a
              href="/logout"
              className="flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg"
              onClick={(e) => {
                e.preventDefault(); 
                handleLogoutClick(); 
              }}
            >
              <MdOutlineLogout className="size-6" />{" "}
          
              <span className="text-lg font-gilroy font-normal leading-6">
                Çıxış
              </span>
            </a>
          </li> */}
        </ul>
      </nav>

      <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} />
    </div>
  );
}

export default CompanySidebar;
