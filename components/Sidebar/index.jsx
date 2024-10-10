import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { MdEqualizer, MdOutlineLogout } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { PiCertificate, PiCoin } from "react-icons/pi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import LogoutModal from "@/components/LogoutModal";
import { RiBuildingLine } from "react-icons/ri";
import Image from "next/image";
import CompanyContext from "@/shared/context/CompanyContext";
import Link from "next/link";
import { UserContext } from "@/shared/context/UserContext";

function Sidebar() {
  const { user } = useContext(UserContext);

  console.log(user?.data, "user data sidebaeee");

  const { setSelectedCompany } = useContext(CompanyContext);
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false); // Dropdown open state

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

  const handleCompanyClick = (company) => {
    setSelectedCompany(company); // Set the selected company in context

    if (user?.data?.roles === "Owner") {
      router.push(`/shirket-hesabi`); // Redirect for Owner role
    } else if (user?.data?.roles === "Teacher") {
      router.push(`/muellim-hesabi`); // Redirect for Teacher role
    }
  };
  // Toggle the dropdown open state
  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen((prevState) => !prevState);
  };

  // Helper function to determine if a menu item is active
  const isActive = (path) => router.pathname.startsWith(path);

  // Extract active companies if the user has the "Owner" role
  const activeCompanies =
    user?.data?.roles === "Owner" || user?.data?.roles === "Teacher"
      ? user.data.companies.filter((company) => company.status === 1)
      : [];

  // console.log(user?.data?.companies, "activeCompanies");

  return (
    <div className="fixed h-screen w-72 bg-white shadow-sm border mt-[80px]">
      <div className="p-4 mx-4 pt-8">
        {/* Profile Section */}
        <div className="flex items-center mb-2 pb-3 border-b border-buttonGhostPressed">
          {!user?.data?.image || user.data.image === null ? (
            <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
              {generateInitials(user?.data?.first_name, user?.data?.last_name)}
            </div>
          ) : (
            <Image
              width={60}
              height={60}
              src={user.data.image}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4 object-cover"
            />
          )}

          <div>
            <p className="font-gilroy text-base font-normal leading-6 flex">
              {user?.data?.first_name} {user?.data?.last_name}
            </p>
          </div>
        </div>

        {/* Company Dropdown Section */}
        {(user?.data?.roles === "Owner" || user?.data?.roles === "Teacher") &&
          activeCompanies.length > 0 && (
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
                      onClick={() => handleCompanyClick(company)} // Navigate to company page
                    >
                      {company.logo ? (
                        <Image
                          width={40}
                          height={40}
                          src={company.logo}
                          alt={company.name}
                          className="w-10 h-10 rounded-full mr-4 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-lg font-gilroy font-bold mr-4">
                          {generateInitials(company.name, "")}
                        </div>
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
      <nav className="mt-10">
        <ul className="mx-4">
          <li className="mb-4">
            <Link
              href="/neticelerim"
              className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
                isActive("/neticelerim") ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <MdEqualizer
                className={`size-6 ${
                  isActive("/neticelerim") ? "fill-brandBlue500" : ""
                }`}
              />
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive("/neticelerim") ? "text-brandBlue500" : ""
                }`}
              >
                Nəticələrim
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/imtahanlarim"
              className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
                isActive("/imtahanlarim") ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <CiBookmark
                className={`size-6 ${
                  isActive("/imtahanlarim") ? "fill-brandBlue500" : ""
                }`}
              />
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive("/imtahanlarim") ? "text-brandBlue500" : ""
                }`}
              >
                İmtahanlarım
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/sertifikatlarim"
              className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
                isActive("/sertifikatlarim") ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <PiCertificate
                className={`size-6 ${
                  isActive("/sertifikatlarim") ? "fill-brandBlue500" : ""
                }`}
              />
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive("/sertifikatlarim") ? "text-brandBlue500" : ""
                }`}
              >
                Sertifikatlarım
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/balansim"
              className={`flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg ${
                isActive("/balansim") ? "bg-buttonGhostPressed" : ""
              }`}
            >
              <PiCoin
                className={`size-6 ${
                  isActive("/balansim") ? "fill-brandBlue500" : ""
                }`}
              />
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive("/balansim") ? "text-brandBlue500" : ""
                }`}
              >
                Balansım
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/hesablarim"
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                isActive("/hesablarim")
                  ? "bg-buttonGhostPressed"
                  : "text-grayText hover:bg-gray-100"
              }`}
            >
              <FaRegCircleUser
                className={`size-6 ${
                  isActive("/hesablarim")
                    ? "fill-brandBlue500"
                    : "fill-grayText"
                }`}
              />
              <span
                className={`text-lg font-gilroy font-normal leading-6 ${
                  isActive("/hesablarim")
                    ? "text-brandBlue500"
                    : "text-grayText"
                }`}
              >
                Hesablarım
              </span>
            </Link>
          </li>
          <li className="mb-4">
            <a
              href="/logout"
              className="flex items-center space-x-4 px-4 py-2 text-grayText hover:bg-gray-100 rounded-lg"
              onClick={(e) => {
                e.preventDefault(); // Prevent default navigation
                handleLogoutClick(); // Show modal
              }}
            >
              <MdOutlineLogout className="size-6 fill-grayText" />
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

export default Sidebar;
