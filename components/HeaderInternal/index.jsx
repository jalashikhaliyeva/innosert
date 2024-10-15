// components/HeaderInternal.jsx or .tsx

import { useState, useEffect, useRef, useContext } from "react";
import Container from "../Container";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import LanguageSwitcher from "@/shared/LanguageSwitcher";
import { getSettingInfo } from "@/services/getSettingInfo";
import { MdKeyboardArrowRight, MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/router";
import LogoutModal from "@/components/LogoutModal";
import Link from "next/link";
import { UserContext } from "@/shared/context/UserContext";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiBuildingLine } from "react-icons/ri";
import CompanyContext from "@/shared/context/CompanyContext";

const HeaderInternal = () => {
  const { user } = useContext(UserContext);
  const { setSelectedCompany } = useContext(CompanyContext);
  const router = useRouter();
  // console.log(user?.data?.active_company?.logo, "HeaderInternal");
  console.log(user, "active_company.logo");
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen(!companyDropdownOpen);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company); // Set the selected company in context

    if (user?.data?.roles === "Owner") {
      router.push(`/hesabatlar`);
     // router.push(`/shirket-hesabi`); // Redirect for Owner role
    } else if (user?.data?.roles === "Teacher") {
      router.push(`/suallar-toplusu`);
     // router.push(`/muellim-hesabi`); // Redirect for Teacher role
    }
  };
  // const activeCompanies =
  //   user?.data?.roles === "Owner"
  //     ? user.data.companies.filter((company) => company.status === 1)
  //     : [];

  const activeCompanies =
    user?.data?.roles === "Owner" || user?.data?.roles === "Teacher"
      ? user.data.companies.filter((company) => company.status === 1)
      : [];

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { push } = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Add this line
  const userMenuRef = useRef(null);

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the logout modal when the user clicks logout
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false); // Close the logout modal
  };

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getSettingInfo();
        const mainCategories = data?.category.filter(
          (cat) => cat.category_id === 0
        );
        const subCategories = data?.category.filter(
          (cat) => cat.category_id !== 0
        );

        setCategories(mainCategories || []);
        setSubCategories(subCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    push(`/kateqoriyalar/${category.slug}`);
  };

  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    push(`/kateqoriyalar/${categorySlug}/${subcategorySlug}`);
  };

  const getSubcategories = (categoryName) => {
    return subCategories.filter((sub) => sub.category_id === categoryName);
  };

  return (
    <header className="markup fixed top-0 left-0 right-0 bg-bodyColor shadow-createBox z-30 font-gilroy">
      <Container>
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-16">
            <Link href="/home">
              <Image
                style={{
                  objectFit: "cover",
                  width: "120px",
                  height: "30px",
                }}
                className="cursor-pointer"
                src="/logo/dark-logo-innosert.png"
                alt="dark-logo-innosert"
                width={100}
                height={32}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => {
                  setDropdownOpen(false);
                  setOpenSubmenu(null);
                }}
              >
                <button
                  className="text-textSecondaryDefault text-lg inline-flex items-center font-medium focus:outline-none text-center py-3 hover:text-textHoverBlue"
                  type="button"
                >
                  Kateqoriyalar
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute z-10 text-lg bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-80 transition-all duration-300 ease-in-out transform ${
                    isDropdownOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-4 pointer-events-none"
                  }`}
                >
                  <ul className="divide-y divide-gray-200 px-4">
                    {categories?.map((category) => (
                      <li
                        key={category.id}
                        className="relative group"
                        onMouseEnter={() => setOpenSubmenu(category.name)}
                        onMouseLeave={() => setOpenSubmenu(null)}
                      >
                        <p
                          onClick={() => handleCategoryClick(category)}
                          className="cursor-pointer block text-lg my-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue flex justify-between items-center px-4 py-2"
                        >
                          {category.name}
                          {getSubcategories(category.name).length > 0 && (
                            <MdKeyboardArrowRight className="mt-1 ml-2" />
                          )}
                        </p>

                        {/* Submenu */}
                        {getSubcategories(category.name).length > 0 && (
                          <div
                            className={`absolute left-full top-0 mt-0 ml-1 bg-white rounded-lg shadow-lg w-48 z-20 transition-all duration-300 ease-in-out transform ${
                              openSubmenu === category.name
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4 pointer-events-none"
                            }`}
                          >
                            {getSubcategories(category.name).map((sub) => (
                              <ul
                                className="text-lg divide-y divide-gray-100 py-1"
                                key={sub.id}
                              >
                                <li className="border-b border-gray-100">
                                  <p
                                    onClick={() =>
                                      handleSubcategoryClick(
                                        category.slug,
                                        sub.slug
                                      )
                                    }
                                    className="cursor-pointer block px-4 py-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue"
                                  >
                                    {sub.name}
                                  </p>
                                </li>
                              </ul>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="cursor-pointer font-medium text-lg text-textSecondaryDefault py-3 hover:text-textHoverBlue">
                Bloq
              </p>

              {/* Search */}
              <div className="flex items-center bg-bodyColor border border-inputBorder rounded-full mx-20 px-4 py-2 focus-within:border-inputRingFocus">
                <CiSearch className="text-inputPlaceholderText size-6" />
                <input
                  type="text"
                  placeholder="Imtahan axtar"
                  className="ml-2 text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2"
                />
              </div>
            </nav>
          </div>

          {/* Right section with hover dropdown (User Menu) */}

          <div className="relative hidden lg:flex items-center">
            <LanguageSwitcher />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.4407 17.4998C11.2942 17.7524 11.0839 17.962 10.8309 18.1078C10.5779 18.2535 10.291 18.3302 9.99902 18.3302C9.70704 18.3302 9.42018 18.2535 9.16717 18.1078C8.91415 17.962 8.70387 17.7524 8.55736 17.4998M14.999 6.6665C14.999 5.34042 14.4722 4.06865 13.5346 3.13097C12.5969 2.19329 11.3251 1.6665 9.99902 1.6665C8.67294 1.6665 7.40117 2.19329 6.46349 3.13097C5.52581 4.06865 4.99902 5.34042 4.99902 6.6665C4.99902 12.4998 2.49902 14.1665 2.49902 14.1665H17.499C17.499 14.1665 14.999 12.4998 14.999 6.6665Z"
                stroke="#101828"
                stroke-width="1.82293"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            {/* <GoBell className="size-6 cursor-pointer" /> */}

            {/* User Icon Section and Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
              ref={userMenuRef}
            >
              {/* User Icon Section */}
              <div className="bg-brandBlue500 py-[10px] px-4 rounded-lg flex gap-3 ml-4 cursor-pointer">
                <AiOutlineMenu className="size-6 fill-white" />
                <FaRegCircleUser className="size-6 fill-white" />
              </div>

              {/* Dropdown Menu for User */}
              <div
                className={`absolute right-0 top-full w-48 text-lg bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                  isUserMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <ul className="p-2 divide-y divide-gray-200">
                  <li className="mb-2">
                    <Link href="/hesablarim" passHref>
                      <p className="cursor-pointer flex items-center w-full px-4 py-2 rounded-lg text-textSecondaryDefault hover:bg-gray-100">
                        <FaRegCircleUser className="size-5 mr-2 fill-grayText" />
                        <span className="text-lg font-gilroy font-normal leading-6 text-textSecondaryDefault">
                          Profilim
                        </span>
                      </p>
                    </Link>
                  </li>

                  {/* Company Selection Dropdown */}
                  {(user?.data?.roles === "Owner" ||
                    user?.data?.roles === "Teacher") &&
                    activeCompanies.length > 0 && (
                      <div className="relative z-50">
                        <div
                          className="flex items-center space-x-1 mb-2 mt-2 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-100"
                          onClick={toggleCompanyDropdown}
                        >
                          <RiBuildingLine className="size-[20px] fill-grayText" />
                          <p className="text-md font-gilroy  font-normal leading-6 text-textSecondaryDefault">
                            Şirkətlərim
                          </p>
                          {companyDropdownOpen ? (
                            <FiChevronUp className="ml-2 text-grayText" />
                          ) : (
                            <FiChevronDown className="ml-2 text-grayText" />
                          )}
                        </div>

                        {/* Dropdown menu for active companies */}
                        {companyDropdownOpen && (
                          <div className="relative w-full z-10 mt-2">
                            {activeCompanies.map((company) => (
                              <div
                                key={company.slug}
                                className="flex items-center cursor-pointer pb-2 px-4 py-2 hover:bg-gray-100 rounded-lg relative group"
                                onClick={() => handleCompanyClick(company)}
                              >
                                {company.logo ? (
                                  <Image
                                    width={24}
                                    height={24}
                                    src={company.logo}
                                    alt={company.name}
                                    className="w-6 h-6 rounded-full mr-4 object-cover"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-base font-gilroy font-bold mr-4 ">
                                    {company.name[0]}
                                  </div>
                                )}
                                <p
                                  className="font-gilroy text-base font-normal leading-6 max-w-[100px] truncate"
                                  title={company.name} // Tooltip with full company name
                                >
                                  {company.name}
                                </p>

                                {/* Custom tooltip */}
                                <div className="absolute left-0 bottom-full mb-2 p-2 min-w-max bg-white shadow-lg border z-20 text-textSecondaryDefault text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                  {company.name}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                  <li className="mb-2">
                    <a
                      href="#"
                      className="flex items-center w-full mt-2 px-4 py-2 text-textSecondaryDefault hover:bg-gray-100 rounded-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogoutClick();
                      }}
                    >
                      <MdOutlineLogout className="size-5 mr-2 fill-grayText" />
                      <span className="text-lg font-gilroy font-light leading-6">
                        Çıxış
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Logout Modal */}
      <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} />
    </header>
  );
};

export default HeaderInternal;
