// components/HeaderInternal.jsx or .tsx

import { useState, useEffect, useRef } from "react";
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

const HeaderInternal = () => {
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
    <header className="fixed top-0 left-0 right-0 bg-bodyColor shadow-sm z-30 font-gilroy">
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
                  <ul className="divide-y divide-gray-200">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <li
                          key={category.id}
                          className="relative group"
                          onMouseEnter={() => setOpenSubmenu(category.name)}
                          onMouseLeave={() => setOpenSubmenu(null)}
                        >
                          <p
                            onClick={() => handleCategoryClick(category)}
                            className="cursor-pointer block text-lg my-2 hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue flex justify-between items-center px-4 py-2"
                          >
                            {category.name}
                            <MdKeyboardArrowRight className="ml-2" />
                          </p>

                          {/* Submenu */}
                          <div
                            className={`absolute left-full top-0 mt-0 bg-white rounded-lg shadow-lg w-48 z-20 transition-all duration-300 ease-in-out transform ${
                              openSubmenu === category.name
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4 pointer-events-none"
                            }`}
                          >
                            <ul className="text-lg divide-y divide-gray-100 py-2">
                              {getSubcategories(category.name).map((sub) => (
                                <li key={sub.id}>
                                  <p
                                    onClick={() =>
                                      handleSubcategoryClick(
                                        category.slug,
                                        sub.slug
                                      )
                                    }
                                    className="cursor-pointer block px-4 py-2 hover:bg-gray-100 font-base text-textSecondaryDefault hover:text-textHoverBlue"
                                  >
                                    {sub.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="p-4 text-gray-500">No categories found.</p>
                    )}
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
            <GoBell className="size-6 cursor-pointer" />

            {/* User Icon Section and Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
              ref={userMenuRef}
            >
              {/* User Icon Section */}
              <div className="bg-brandBlue500 p-4 rounded-lg flex gap-3 ml-4 cursor-pointer">
                <AiOutlineMenu className="size-6 fill-white" />
                <FaRegCircleUser className="size-6 fill-white" />
              </div>

              {/* Dropdown Menu for User */}
              <div
                className={`absolute right-0 top-full w-40 text-lg bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                  isUserMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <ul className="p-2 divide-y divide-gray-200">
                  import Link from 'next/link';
                  <li className="mb-2">
                    <Link href="/hesablarim" passHref>
                      <p className="cursor-pointer flex items-center w-full px-4 py-2 rounded-lg text-textSecondaryDefault hover:bg-gray-100">
                        <FaRegCircleUser className="size-5 mr-2 fill-grayText" />
                        <span className="text-lg font-gilroy font-normal leading-6 text-textSecondaryDefault">
                          Hesab
                        </span>
                      </p>
                    </Link>
                  </li>
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
