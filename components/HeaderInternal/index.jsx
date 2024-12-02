// components/HeaderInternal.jsx or .tsx
import { useState, useEffect, useRef, useContext } from "react";
import Container from "../Container";
import { CiBookmark } from "react-icons/ci";
import { PiCoin } from "react-icons/pi";
import { PiCertificate } from "react-icons/pi";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { TbBell } from "react-icons/tb";
import { MdEqualizer } from "react-icons/md";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { LuSearch } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import LanguageSwitcher from "@/shared/LanguageSwitcher";
import { getSettingInfo } from "@/services/getSettingInfo";
import { MdOutlineLogout } from "react-icons/md";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/router";
import LogoutModal from "@/components/LogoutModal";
import Link from "next/link";
import { UserContext } from "@/shared/context/UserContext";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { RiBuildingLine } from "react-icons/ri";
import CompanyContext from "@/shared/context/CompanyContext";
import { FaRegCircleUser } from "react-icons/fa6";
import MobileLanguageSwitcher from "@/shared/MobileLanguageSwitcher";
import NotificationsDropdown from "../NotificationsDropdown";
import { useTranslation } from "next-i18next";
const HeaderInternal = () => {
  const { user, setSearchExam } = useContext(UserContext);
  const { t } = useTranslation();
  const router = useRouter();
  const lang = router.locale || "az";
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef(null);
  // const router = useRouter();
  const { setSelectedCompany } = useContext(CompanyContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [isImtahanlarDropdownOpen, setIsImtahanlarDropdownOpen] =
    useState(false);
  console.log(user, "active_company.logo");
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [showOnlyCategories, setShowOnlyCategories] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const hideTimeout = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setSelectedCategory, setSelectedSubcategory } =
    useContext(UserContext);
  const isSpecialPage =
    router.pathname === "/home" ||
    router.pathname === "/bloq" ||
    router.pathname.startsWith("/etrafli") ||
    router.pathname.startsWith("/kateqoriyalar");

  const handleNotificationMouseEnter = () => {
    clearTimeout(hideTimeout.current); // Clear any existing timeout
    setIsNotificationOpen(true);
  };
  const dropdownTimer = useRef(null);
  const submenuTimer = useRef(null);

  function handleSearchKeyDown(event) {
    if (event.key === "Enter") {
      // Implement your search logic here
      setIsSearchOpen(false);
    }
  }
  const handleNotificationMouseLeave = () => {
    // Set a delay before closing the dropdown
    hideTimeout.current = setTimeout(() => {
      setIsNotificationOpen(false);
    }, 100); // Adjust delay as needed
  };
  const showSearch =
    router.pathname === "/home" &&
    !router.pathname.startsWith("/kateqoriyalar");

  const toggleCompanyDropdown = () => {
    setCompanyDropdownOpen(!companyDropdownOpen);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company); // Set the selected company in context

    if (user?.data?.roles === "Owner") {
      router.push(`/hesabatlar`);
      // router.push(`/shirket-hesabi`); // Redirect for Owner role
    } else if (user?.data?.roles === "Teacher") {
      router.push(`/sual-bazasi`);
      // router.push(`/muellim-hesabi`); // Redirect for Teacher role
    }
  };

  const handleLoginModalOpen = () => {
    // Implement login modal opening logic
  };

  const handleClick = (route) => {
    router.push(route);
  };
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Toggle language dropdown visibility
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  // Handle language change logic
  const handleLanguageChange = (lang) => {
    // Replace this with your language-switching logic
    console.log(`Switched to ${lang}`);
    setIsLanguageDropdownOpen(false); // Close dropdown after selection
  };

  // const activeCompanies =
  //   user?.data?.roles === "Owner"
  //     ? user.data.companies.filter((company) => company.status === 1)
  //     : [];

  const handleDropdownToggle = () => {
    setIsImtahanlarDropdownOpen(!isImtahanlarDropdownOpen);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
    setShowOnlyCategories(false); // Reset to show logo when menu is closed
    setOpenSubmenu(null); // Reset any open submenus
    setIsImtahanlarDropdownOpen(false); // Close the category dropdown
  };
  const activeCompanies =
    user?.data?.roles === "Owner" || user?.data?.roles === "Teacher"
      ? user.data.companies.filter((company) => company.status === 1)
      : [];
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const { push } = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Add this line
  const userMenuRef = useRef(null);
  // Function to handle search input visibility

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    }

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleDigerClick = () => {
    router.push("/home"); // Navigate to /home page
  };
  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };
  // Focus the search input when it appears
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current.focus();
      document.addEventListener("keydown", handleCloseSearch);
      document.addEventListener("click", handleCloseSearch);
    } else {
      document.removeEventListener("keydown", handleCloseSearch);
      document.removeEventListener("click", handleCloseSearch);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseSearch);
      document.removeEventListener("click", handleCloseSearch);
    };
  }, [isSearchOpen]);

  // Function to handle search input visibility
  const handleSearchIconClick = () => {
    setIsSearchOpen(true);
  };

  // Function to close search input on click outside or "Enter" key
  const handleCloseSearch = (e) => {
    if (
      e.key === "Enter" ||
      (searchInputRef.current && !searchInputRef.current.contains(e.target))
    ) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("keydown", handleCloseSearch);
      document.addEventListener("click", handleCloseSearch);
    } else {
      document.removeEventListener("keydown", handleCloseSearch);
      document.removeEventListener("click", handleCloseSearch);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseSearch);
      document.removeEventListener("click", handleCloseSearch);
    };
  }, [isSearchOpen]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show the logout modal when the user clicks logout
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false); // Close the logout modal
  };
  const handleExamClick = (category) => {
    if (openSubmenu === category.id) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(category.id);
      // Redirect to category page
      push(`/kateqoriyalar/${category.slug}`);
    }
  };

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getSettingInfo(lang);

        const mainCategories = data?.category.filter(
          (cat) => cat.category_id === 0
        );
        const subCategories = data?.category.filter(
          (cat) => cat.category_id !== 0
        );

        if (mainCategories.length > 0) {
          setSelectedCategory(mainCategories);
          // console.log(mainCategories, "mainCategories");
        }
        if (subCategories.length > 0) {
          // console.log(subCategories, "subCategories");

          setSelectedSubcategory(subCategories);
        }

        setCategories(mainCategories || []);
        setSubCategories(subCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const openRegisterModal = () => {
    // Implement register modal opening logic
  };
  const handleCategoryExpand = (categoryId) => {
    // Toggle the visibility of subcategories for the clicked category
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };
  const handleCategoryClick = (category) => {
    push(`/kateqoriyalar/${category.slug}`);
    setShowOnlyCategories(false);
  };

  const handleBackToCategories = () => {
    setShowOnlyCategories(true); // Show categories
    setCurrentCategory(null); // Reset the current category
  };
  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    push(`/kateqoriyalar/${categorySlug}/${subcategorySlug}`);
  };

  const getSubcategories = (categoryId) => {
    return subCategories.filter((sub) => sub.category_id === categoryId);
  };

  // const handleSubmenuToggle = (category) => {
  //   setOpenSubmenu(openSubmenu === category.id ? null : category.id);
  // };
  const handleSubmenuToggle = (category) => {
    setOpenSubmenu(openSubmenu === category ? null : category);
  };
  const handleCategoriesToggle = (e) => {
    e.preventDefault();
    setShowOnlyCategories(true); // Show only categories
    setIsImtahanlarDropdownOpen(!isImtahanlarDropdownOpen); // Toggle category dropdown
  };

  const handleBackButtonClick = () => {
    setShowOnlyCategories(false); // Show the full menu
    setIsImtahanlarDropdownOpen(false); // Close the category dropdown
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value; // Trim any whitespace
    setSearchValue(query);

    if (query.length === 0) {
      setSearchExam([]); // Clear search results from context if input is empty
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://innocert-admin.markup.az/api/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ search: e.target.value }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data, "data search exam");

        setSearchExam(data.exams); // Store exams in context
      } else {
        console.error("Search API response error:", response.status);
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  // Function to handle mouse enter on the main dropdown
  const handleDropdownMouseEnter = () => {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
      dropdownTimer.current = null;
    }
    setDropdownOpen(true);
  };

  // Function to handle mouse leave on the main dropdown
  const handleDropdownMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setDropdownOpen(false);
      setOpenSubmenu(null);
    }, 200); // 200ms delay
  };

  // Function to handle mouse enter on a submenu item
  const handleSubmenuMouseEnter = (categoryName) => {
    if (submenuTimer.current) {
      clearTimeout(submenuTimer.current);
      submenuTimer.current = null;
    }
    setOpenSubmenu(categoryName);
  };

  // Function to handle mouse leave on a submenu item
  const handleSubmenuMouseLeave = () => {
    submenuTimer.current = setTimeout(() => {
      setOpenSubmenu(null);
    }, 200); // 200ms delay
  };

  useEffect(() => {
    // Cleanup timers on unmount
    return () => {
      if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
      if (submenuTimer.current) clearTimeout(submenuTimer.current);
    };
  }, []);
  return (
    <header className="markup fixed top-0 left-0 right-0 bg-bodyColor shadow-createBox z-30 font-gilroy">
      <Container>
        {/* Mobile and tablet menu start */}
        <div className="flex justify-between items-center py-4 lg:hidden">
          {isSpecialPage ? (
            <>
              {/* Display logo or back button on the left */}
              {!showOnlyCategories ? (
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
              ) : (
                <button
                  onClick={handleBackButtonClick}
                  className="text-lg font-gilroy font-normal text-blue-600"
                >
                  &larr; Geri
                </button>
              )}

              {/* Menu toggle and avatar on the right */}
              <div className="lg:hidden flex-grow flex justify-end">
                {isMenuOpen ? (
                  <IoMdClose
                    size={34}
                    className="cursor-pointer bg-buttonBGresponsive p-2 text-2xl rounded-md"
                    onClick={toggleMenu}
                  />
                ) : (
                  <div className="flex gap-3 items-center">
                    {/* <LuSearch size={24} /> */}
                    <NotificationsDropdown />
                    <div
                      onClick={toggleMenu}
                      className="bg-buttonPrimaryDefault p-2 rounded-md flex items-center gap-2"
                    >
                      <HiOutlineMenu
                        size={20}
                        className="cursor-pointer text-white"
                      />
                      <FaRegCircleUser
                        size={20}
                        className="cursor-pointer text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Conditional rendering for other pages */}
              {isMenuOpen ? (
                <>
                  {/* When the menu is open, display the logo and close button */}
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

                  <IoMdClose
                    size={34}
                    className="cursor-pointer bg-buttonBGresponsive p-2 text-2xl rounded-md"
                    onClick={toggleMenu}
                  />
                </>
              ) : (
                <>
                  {/* When the menu is closed, display the menu icon and SVG */}
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
            </>
          )}

          {/* Categories Menu */}
          <div
            className={`absolute top-14 left-0 w-full h-[850px] bg-white shadow-lg rounded-xl p-4 transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <ul className="flex px-4 flex-col divide-y divide-gray-200">
              {!showOnlyCategories ? (
                isSpecialPage ? (
                  <>
                    {/* Existing menu content for special pages */}
                    <li
                      onClick={() => handleClick("/hesablarim")}
                      className="py-4 flex items-center gap-3 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      <FaRegCircleUser /> Profilim
                    </li>

                    {/* Company List for Owners and Teachers */}
                    {(user?.data?.roles === "Owner" ||
                      user?.data?.roles === "Teacher") &&
                      activeCompanies.length > 0 && (
                        <div className="relative mt-2">
                          <div
                            className="flex items-center space-x-1 justify-between py-4 cursor-pointer rounded-lg"
                            onClick={toggleCompanyDropdown}
                          >
                            <div className="flex gap-3">
                              <RiBuildingLine className="size-[20px] fill-textSecondaryDefault" />
                              <p className="text-lg font-gilroy font-normal leading-6 text-textSecondaryDefault">
                                Şirkətlərim
                              </p>
                            </div>
                            {companyDropdownOpen ? (
                              <FiChevronUp className="ml-2 text-grayText" />
                            ) : (
                              <MdKeyboardArrowRight className="ml-2 text-grayText" />
                            )}
                          </div>
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
                                    <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-base font-gilroy font-bold mr-4">
                                      {company.name[0]}
                                    </div>
                                  )}
                                  <p
                                    className="font-gilroy text-base font-normal leading-6 max-w-[300px] truncate"
                                    title={company.name}
                                  >
                                    {company.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                    <li
                      onClick={handleCategoriesToggle}
                      className="flex py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue justify-between"
                    >
                      Kateqoriyalar
                      {isImtahanlarDropdownOpen ? (
                        <IoMdClose className="mt-1 fill-arrowButtonGray" />
                      ) : (
                        <MdKeyboardArrowRight className="mt-1 fill-arrowButtonGray" />
                      )}
                    </li>

                    <li
                      onClick={() => handleClick("/bloq")}
                      className="py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      Bloq
                    </li>

                    <MobileLanguageSwitcher />
                    <li
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogoutClick();
                      }}
                      className="py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      Çixis
                    </li>
                  </>
                ) : (
                  <>
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

                    {/* Company Dropdown Section */}
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
                      onClick={() => handleClick("/neticelerim")}
                      className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      <MdEqualizer className="size-6 fill-grayButtonText" />
                      Nəticələrim
                    </li>

                    <li
                      onClick={() => handleClick("/imtahanlarim")}
                      className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      <CiBookmark className="size-6 fill-grayButtonText" />
                      İmtahanlarım
                    </li>

                    <li
                      onClick={() => handleClick("/balansim")}
                      className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      <PiCoin className="size-6 fill-grayButtonText" />
                      Balansım
                    </li>

                    <li
                      onClick={() => handleClick("/hesablarim")}
                      className="py-4 cursor-pointer text-grayButtonText text-lg flex items-center gap-5 font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      <FaRegCircleUser className="size-6 fill-grayButtonText" />
                      Hesablarım
                    </li>
                    <MobileLanguageSwitcher />

                    {/* Add other menu items as needed */}
                  </>
                )
              ) : (
                // Show only categories
                <>
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="py-4 cursor-pointer flex flex-col justify-between items-start text-lg font-gilroy font-normal hover:text-textHoverBlue"
                    >
                      <div className="flex justify-between items-center w-full">
                        <span onClick={() => handleCategoryClick(category)}>
                          {category.name}
                        </span>
                        <MdKeyboardArrowRight
                          onClick={() => handleSubmenuToggle(category.name)}
                          className="mt-1 fill-arrowButtonGray cursor-pointer size-6"
                        />
                      </div>

                      {openSubmenu === category.name && (
                        <ul className="pl-4 mt-2">
                          {subCategories
                            .filter((sub) => sub.category_id === category.name)
                            .map((sub) => (
                              <li
                                key={sub.id}
                                className="mb-2"
                                onClick={() =>
                                  handleSubcategoryClick(
                                    category.slug,
                                    sub.slug
                                  )
                                }
                              >
                                {sub.name}
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
        {/* Mobile and tablet menu end */}

        {/* web header start*/}
        <div className="hidden lg:block">
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
                  width={120}
                  height={30}
                />
              </Link>

              <nav className="hidden lg:flex items-center gap-6">
                {/* Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button
                    className="text-textSecondaryDefault cursor-pointer text-lg inline-flex items-center font-medium focus:outline-none text-center py-3 hover:text-textHoverBlue"
                    type="button"
                    onClick={() => router.push("/kateqoriyalar")}
                  >
                    {t("categories")}
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
                      {categories.slice(0, 5).map((category) => (
                        <li
                          key={category.id}
                          className="relative group"
                          onMouseEnter={() =>
                            handleSubmenuMouseEnter(category.name)
                          }
                          onMouseLeave={handleSubmenuMouseLeave}
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

                      {/* "Digər" Item */}
                      {categories.length > 5 && (
                        <li
                          className="cursor-pointer block text-lg my-2 rounded-lg hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue flex justify-between items-center px-4 py-2"
                          // onClick={handleDigerClick}  Add click handler
                          onClick={() => router.push("/kateqoriyalar")}
                        >
                          Digər
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <p
                  onClick={() => handleClick("/bloq")}
                  className="cursor-pointer font-medium text-lg text-textSecondaryDefault py-3 hover:text-textHoverBlue"
                >
                  {t("blog")}
                </p>

                {showSearch && (
                  <div className="group flex items-center bg-bodyColor border border-inputBorder rounded-full mx-20 px-4 py-2 focus-within:border-inputRingFocus hover:bg-gray-100">
                    <CiSearch className="text-inputPlaceholderText size-6" />
                    <input
                      type="text"
                      placeholder={t("search_exam_placeholder")}
                      value={searchValue}
                      onChange={handleSearchChange}
                      ref={searchInputRef}
                      className="ml-2 text-inputRingFocus bg-bodyColor outline-none placeholder-inputPlaceholderText pl-2 group-hover:bg-gray-100" // Add hover style
                    />
                  </div>
                )}
              </nav>
            </div>

            {/* Right section with hover dropdown (User Menu) */}

            <div className="relative hidden lg:flex items-center">
              <LanguageSwitcher />
              <NotificationsDropdown />
              <div
                className="relative"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
                ref={userMenuRef}
              >
                <div className="bg-brandBlue500 py-[10px] px-4 rounded-lg flex gap-3 ml-4 cursor-pointer">
                  <AiOutlineMenu className="size-6 fill-white" />
                  <FaRegCircleUser className="size-6 fill-white" />
                </div>

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
                            {t("my_profile")}
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
                            <p className="text-md font-gilroy font-normal leading-6 text-textSecondaryDefault">
                              {t("my_companies")}
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
                                    <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-base font-gilroy font-bold mr-4">
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
                                  {company.name.length > 9 && (
                                    <div className="absolute right-full ml-2 top-1/2 -translate-y-1/2 p-2 min-w-max bg-white shadow-lg border z-20 text-textSecondaryDefault text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                      {company.name}
                                    </div>
                                  )}
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
                          {t("logout")}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* web header end*/}
      </Container>
      {/* Logout Modal */}
      <LogoutModal show={showLogoutModal} onClose={handleCloseLogoutModal} />
    </header>
  );
};

export default HeaderInternal;
