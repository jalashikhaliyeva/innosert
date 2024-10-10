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

function TeacherSidebar() {
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
    <div className="fixed h-screen w-72 bg-white shadow-sm border mt-[80px]">
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
              href={`/suallar-toplusu`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/suallar-toplusu`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 3L22 7V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V7.00353L4 3H20ZM20 9H4V19H20V9ZM13 10V14H16L12 18L8 14H11V10H13ZM18.7639 5H5.23656L4.23744 7H19.7639L18.7639 5Z"
                  fill="#79797A"
                />
              </svg>

              {/* Removed fill-color logic */}
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive(`/suallar-toplusu`) ? "text-brandBlue500" : ""
                }`}
              >
                Suallar toplusu
              </span>
            </Link>
          </li>

          <li className="mb-2">
            <Link
              href={`/imtahanlar-siyahisi`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/imtahanlar-siyahisi`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 2H17C17.7956 2 18.5587 2.31607 19.1213 2.87868C19.6839 3.44129 20 4.20435 20 5V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V5C4 4.20435 4.31607 3.44129 4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2ZM7 4C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5V19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4H7ZM9 17H11C11.2652 17 11.5196 17.1054 11.7071 17.2929C11.8946 17.4804 12 17.7348 12 18C12 18.2652 11.8946 18.5196 11.7071 18.7071C11.5196 18.8946 11.2652 19 11 19H9C8.73478 19 8.48043 18.8946 8.29289 18.7071C8.10536 18.5196 8 18.2652 8 18C8 17.7348 8.10536 17.4804 8.29289 17.2929C8.48043 17.1054 8.73478 17 9 17ZM15 5C15.2652 5 15.5196 5.10536 15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6C16 6.26522 15.8946 6.51957 15.7071 6.70711C15.5196 6.89464 15.2652 7 15 7C14.7348 7 14.4804 6.89464 14.2929 6.70711C14.1054 6.51957 14 6.26522 14 6C14 5.73478 14.1054 5.48043 14.2929 5.29289C14.4804 5.10536 14.7348 5 15 5ZM15 8C15.2652 8 15.5196 8.10536 15.7071 8.29289C15.8946 8.48043 16 8.73478 16 9C16 9.26522 15.8946 9.51957 15.7071 9.70711C15.5196 9.89464 15.2652 10 15 10C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8ZM9 14H15C15.2652 14 15.5196 14.1054 15.7071 14.2929C15.8946 14.4804 16 14.7348 16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H9C8.73478 16 8.48043 15.8946 8.29289 15.7071C8.10536 15.5196 8 15.2652 8 15C8 14.7348 8.10536 14.4804 8.29289 14.2929C8.48043 14.1054 8.73478 14 9 14ZM9 11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13H9C8.73478 13 8.48043 12.8946 8.29289 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.29289 11.2929C8.48043 11.1054 8.73478 11 9 11ZM9.5 5H11.5C11.8978 5 12.2794 5.15804 12.5607 5.43934C12.842 5.72064 13 6.10218 13 6.5V8.5C13 8.89782 12.842 9.27936 12.5607 9.56066C12.2794 9.84196 11.8978 10 11.5 10H9.5C9.10218 10 8.72064 9.84196 8.43934 9.56066C8.15804 9.27936 8 8.89782 8 8.5V6.5C8 6.10218 8.15804 5.72064 8.43934 5.43934C8.72064 5.15804 9.10218 5 9.5 5Z"
                  fill="#79797A"
                />
              </svg>

              {/* Removed fill-color logic */}
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive(`/imtahanlar-siyahisi`) ? "text-brandBlue500" : ""
                }`}
              >
                İmtahanlar
              </span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              href={`/bildirilen-xetalar`}
              className={`flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg ${
                isActive(`/bildirilen-xetalar`) ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <FiAlertOctagon className="size-6" />{" "}
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive(`/bildirilen-xetalar`) ? "text-brandBlue500" : ""
                }`}
              >
             Bildirlən xətalar
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

          <li className="mb-2">
            <a
              href="/logout"
              className="flex items-center space-x-4 px-4 py-2 text-grayButtonText hover:bg-gray-100 rounded-lg"
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                handleLogoutClick(); // Show modal
              }}
            >
              <MdOutlineLogout className="size-6" />{" "}
              {/* Removed fill-color logic */}
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

export default TeacherSidebar;
