// new

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  MdKeyboardArrowRight,
  MdEqualizer,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { RiBuildingLine } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import { PiCoin } from "react-icons/pi";
import MobileLanguageSwitcher from "@/shared/MobileLanguageSwitcher";
import Container from "../Container";
import { UserContext } from "@/shared/context/UserContext";
import CompanyContext from "@/shared/context/CompanyContext";
import { FiAlertOctagon } from "react-icons/fi";

function OwnerDashboardHeader() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  // console.log(user, "user TeacherDashboardHeader");
  const { setSelectedCompany } = useContext(CompanyContext);

  const activeCompanies = user?.data?.companies.filter(
    (company) => company?.status === 1
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOnlyCategories, setShowOnlyCategories] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isImtahanlarDropdownOpen, setIsImtahanlarDropdownOpen] =
    useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowOnlyCategories(false);
    setOpenSubmenu(null);
    setIsImtahanlarDropdownOpen(false);
  };

  const handleClick = (route) => {
    router.push(route);
  };

  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen(!companyDropdownOpen);
  };

  const handleCompanyClick = (company) => {
    // console.log("Selected Company:", company);
  };

  const handleCategoriesToggle = (e) => {
    e.preventDefault();
    setShowOnlyCategories(true);
    setIsImtahanlarDropdownOpen(!isImtahanlarDropdownOpen);
  };

  const handleBackButtonClick = () => {
    setShowOnlyCategories(false);
    setIsImtahanlarDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    // console.log("Logout Clicked");
  };

  const handleSubmenuToggle = (category) => {
    setOpenSubmenu(openSubmenu === category.name ? null : category.name);
  };

  const handleCategoryClick = (category) => {
    // console.log("Category Clicked:", category);
  };

  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    // console.log("Subcategory Clicked:", categorySlug, subcategorySlug);
  };

  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <header className="markup fixed top-0 left-0 right-0 bg-bodyColor shadow-createBox z-30 font-gilroy">
      {/* Mobile and tablet menu start */}
      <Container>
        <div className="flex justify-between items-center py-4 lg:hidden">
          {isMenuOpen ? (
            <>
              <Link href="/home">
                <Image
                  style={{ objectFit: "cover", width: "120px", height: "30px" }}
                  className="cursor-pointer"
                  src="/logo/dark-logo-innosert.png"
                  alt="dark-logo-innosert"
                  width={100}
                  height={32}
                />
              </Link>

              <IoMdClose
                size={34}
                className="cursor-pointer bg-buttonBGresponsive p-2 text-2xl rounded-md"
                onClick={toggleMenu}
              />
            </>
          ) : (
            <>
              <HiOutlineMenu
                size={28}
                className="cursor-pointer text-white bg-buttonPrimaryDefault px-2 py-1 rounded-lg w-9 h-8"
                onClick={toggleMenu}
              />

              <svg
                onClick={() => handleClick("/hesablarim")}
                className="size-9"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="12" fill="#EDEFFD" />
                <path
                  d="M16.364 16.909C16.364 16.1478 16.364 15.7672 16.27 15.4575C16.0585 14.7602 15.5128 14.2145 14.8155 14.0029C14.5058 13.909 14.1252 13.909 13.364 13.909H10.6367C9.8755 13.909 9.49489 13.909 9.18519 14.0029C8.48788 14.2145 7.9422 14.7602 7.73067 15.4575C7.63672 15.7672 7.63672 16.1478 7.63672 16.909M14.4549 9.54537C14.4549 10.901 13.356 11.9999 12.0004 11.9999C10.6447 11.9999 9.54581 10.901 9.54581 9.54537C9.54581 8.18976 10.6447 7.09082 12.0004 7.09082C13.356 7.09082 14.4549 8.18976 14.4549 9.54537Z"
                  stroke="#2826A7"
                  strokeWidth="1.09091"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}

          {/*  Menu */}
          <div
            className={`absolute top-14 left-0 w-full h-[850px] bg-white shadow-lg rounded-xl p-4 transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <ul className="flex px-4 flex-col divide-y divide-gray-200">
              <div
                onClick={() => handleClick("/hesablarim")}
                className="flex items-center mb-2 py-4"
              >
                {!user?.data?.image || user.data.image === null ? (
                  <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                    {generateInitials(
                      user?.data?.first_name,
                      user?.data?.last_name
                    )}
                  </div>
                ) : (
                  <Image
                    width={50}
                    height={50}
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

              {(user?.data?.roles === "Owner" ||
                user?.data?.roles === "Teacher") &&
                activeCompanies.length > 0 && (
                  <div className="">
                    <div className="">
                      <div
                        className="flex items-center justify-between space-x-4 py-2 pb-4 cursor-pointer rounded-lg"
                        onClick={toggleCompanyDropdown}
                      >
                        <div className="flex items-center gap-5">
                          <RiBuildingLine className="size-6 fill-grayText" />
                          <p className="text-lg font-gilroy font-normal leading-6 text-grayText">
                            Şirkət seç
                          </p>
                        </div>

                        {companyDropdownOpen ? (
                          <MdKeyboardArrowDown className="ml-2 text-grayText" />
                        ) : (
                          <MdKeyboardArrowRight className="ml-2 text-grayText" />
                        )}
                      </div>
                    </div>

                    {companyDropdownOpen && (
                      <div className="mt-2">
                        {activeCompanies.map((company) => (
                          <div
                            key={company.slug}
                            className="flex items-center mb-2 cursor-pointer pb-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => handleCompanyClick(company)}
                          >
                            {company.logo ? (
                              <Image
                                width={20}
                                height={20}
                                src={company.logo}
                                alt={company.name}
                                className="w-8 h-8 rounded-full mr-4 object-cover"
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

              <li
                onClick={() => handleClick("/hesabatlar")}
                className="py-4  cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
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
                Hesabatlar
              </li>

              <li
                onClick={() => handleClick("/uzvler")}
                className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                    stroke="#79797A"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                Üzvlər
              </li>
              <li
                onClick={() => handleClick("/sual-bazasi")}
                className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
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
                Sual Bazası
              </li>
              <li
                onClick={() => handleClick("/umumi-imtahanlar")}
                className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 2H17C17.7956 2 18.5587 2.31607 19.1213 2.87868C19.6839 3.44129 20 4.20435 20 5V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V5C4 4.20435 4.31607 3.44129 4.87868 2.87868C5.44129 2.31607 6.20435 2 7 2ZM7 4C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5V19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20H17C17.2652 20 17.5196 19.8946 17.7071 19.7071C17.8946 19.5196 18 19.2652 18 19V5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4H7ZM9 17H11C11.2652 17 11.5196 17.1054 11.7071 17.2929C11.8946 17.4804 12 17.7348 12 18C12 18.2652 11.8946 18.5196 11.7071 18.7071C11.5196 18.8946 11.2652 19 11 19H9C8.73478 19 8.48043 18.8946 8.29289 18.7071C8.10536 18.5196 8 18.2652 8 18C8 17.7348 8.10536 17.4804 8.29289 17.2929C8.48043 17.1054 8.73478 17 9 17ZM15 5C15.2652 5 15.5196 5.10536 15.7071 5.29289C15.8946 5.48043 16 5.73478 16 6C16 6.26522 15.8946 6.51957 15.7071 6.70711C15.5196 6.89464 15.2652 7 15 7C14.7348 7 14.4804 6.89464 14.2929 6.70711C14.1054 6.51957 14 6.26522 14 6C14 5.73478 14.1054 5.48043 14.2929 5.29289C14.4804 5.10536 14.7348 5 15 5ZM15 8C15.2652 8 15.5196 8.10536 15.7071 8.29289C15.8946 8.48043 16 8.73478 16 9C16 9.26522 15.8946 9.51957 15.7071 9.70711C15.5196 9.89464 15.2652 10 15 10C14.7348 10 14.4804 9.89464 14.2929 9.70711C14.1054 9.51957 14 9.26522 14 9C14 8.73478 14.1054 8.48043 14.2929 8.29289C14.4804 8.10536 14.7348 8 15 8ZM9 14H15C15.2652 14 15.5196 14.1054 15.7071 14.2929C15.8946 14.4804 16 14.7348 16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H9C8.73478 16 8.48043 15.8946 8.29289 15.7071C8.10536 15.5196 8 15.2652 8 15C8 14.7348 8.10536 14.4804 8.29289 14.2929C8.48043 14.1054 8.73478 14 9 14ZM9 11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13H9C8.73478 13 8.48043 12.8946 8.29289 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.29289 11.2929C8.48043 11.1054 8.73478 11 9 11ZM9.5 5H11.5C11.8978 5 12.2794 5.15804 12.5607 5.43934C12.842 5.72064 13 6.10218 13 6.5V8.5C13 8.89782 12.842 9.27936 12.5607 9.56066C12.2794 9.84196 11.8978 10 11.5 10H9.5C9.10218 10 8.72064 9.84196 8.43934 9.56066C8.15804 9.27936 8 8.89782 8 8.5V6.5C8 6.10218 8.15804 5.72064 8.43934 5.43934C8.72064 5.15804 9.10218 5 9.5 5Z"
                    fill="#79797A"
                  />
                </svg>
                İmtahanlar
              </li>
              <li
                onClick={() => handleClick("/xeta-bildirisleri")}
                className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
              >
                <FiAlertOctagon className="size-6 " />
                Xəta bildirişləri
              </li>

              <MobileLanguageSwitcher />
            </ul>
          </div>
        </div>
        {/* Mobile and tablet menu end */}
      </Container>
    </header>
  );
}

export default OwnerDashboardHeader;
