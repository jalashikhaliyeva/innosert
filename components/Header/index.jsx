import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "../Button";
import { MdKeyboardArrowRight, MdLogin } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io"; // Import the close icon
import Container from "../Container";
import LoginModal from "../Login";
import RegisterModal from "../Register";
import OTPmodal from "../OTPModal";
import EmailVerificationModal from "../EmailVerificationModal";
import ResetPasswordModal from "../resetPasswordModal";
import Image from "next/image";
import { ROUTER } from "@/shared/constant/router";
import { useRouter } from "next/router";
import { getSettingInfo } from "@/services/getSettingInfo";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import LanguageSwitcher from "@/shared/LanguageSwitcher";

const Header = ({
  openRegisterModal,
  scrollToFooter,
  scrollToFaq,
  scrollToCertificate,
}) => {
  const [settingInfo, setSettingInfo] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(false); // New state for menu visibility
  const { push, pathname } = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isImtahanlarDropdownOpen, setImtahanlarDropdownOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [emailForOTP, setEmailForOTP] = useState("");
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const [isEmailVerificationModalOpen, setIsEmailVerificationModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false); // New state for ResetPasswordModal
  const mainCategories = settingInfo?.filter((cat) => cat.category_id === 0);
  const subCategories = settingInfo?.filter((cat) => cat.category_id !== 0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const modalRef = useRef(null);

  // Fetch settings (header, footer, etc.) info
  useEffect(() => {
    const fetchSettingInfo = async () => {
      try {
        const data = await getSettingInfo();
        const categories = data?.category;
        setSettingInfo(categories);
      } catch (error) {
        console.error("Failed to fetch setting info:", error);
      }
    };

    fetchSettingInfo();
  }, []);

  const handleScrollToSection = (section) => {
    if (pathname === ROUTER.HOME) {
      if (section === "faq") {
        scrollToFaq();
      } else if (section === "contact") {
        scrollToFooter();
      } else if (section === "certificate") {
        scrollToCertificate();
      }
    } else {
      push(ROUTER.HOME);
    }
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleRegisterModalOpen = () => {
    setRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setRegisterModalOpen(false);
  };
  const handleOTPModalOpen = () => {
    setOTPModalOpen(true);
  };

  const handleOTPModalClose = () => {
    setOTPModalOpen(false);
  };
  const handleBackToRegister = () => {
    setOTPModalOpen(false);
    setRegisterModalOpen(true);
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterModalOpen(false);
    setOTPModalOpen(true);
  };
  const handleForgotPasswordClick = () => {
    setLoginModalOpen(false); // Close the LoginModal
    setIsEmailVerificationModalOpen(true); // Open the EmailVerificationModal
  };
  const handleBackToLogin = () => {
    setIsEmailVerificationModalOpen(false); // Close the EmailVerificationModal
    setLoginModalOpen(true); // Open the LoginModal
  };
  const handleOpenOTPModalAfterVerification = () => {
    setIsEmailVerificationModalOpen(false); // Close the EmailVerificationModal
    setOTPModalOpen(true); // Open the OTPModal
  };

  const handleOpenResetPasswordModal = () => {
    setOTPModalOpen(false); // Close OTPModal
    setIsResetPasswordModalOpen(true); // Open ResetPasswordModal
  };
  const handleDropdownToggle = () => {
    setImtahanlarDropdownOpen(!isImtahanlarDropdownOpen); // Toggle dropdown for mobile
  };

  const getSubcategories = (categoryName) => {
    return subCategories.filter((sub) => sub.category_id === categoryName);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // Toggle menu open state
    setSelectedCategory(null); // Reset to main menu
    setOpenSubmenu(null); // Close any open submenu
  };

  const handleMenuItemClick = (menu) => {
    if (menu === "İmtahanlar") {
      setSelectedCategory("İmtahanlar"); // Open exams menu
    } else {
      if (menu === "Haqqımızda") push(ROUTER.ABOUT);
      else if (menu === "Əlaqə") scrollToFooter();
      else if (menu === "FAQ") scrollToFaq();
    }
  };

  const handleExamClick = (category) => {
    if (openSubmenu === category.id) {
      setOpenSubmenu(null); // Close the submenu if it's already open
    } else {
      setOpenSubmenu(category.id); // Open the submenu for the selected exam
    }
  };

  const handleBackToMenu = () => {
    setSelectedCategory(null); // Go back to main menu
    setOpenSubmenu(null); // Close any open submenu
  };

  const handleCategoryClick = (category) => {
    const url = `/imtahanlar/${category.slug}`;
    push(url); // Navigate to the dynamic category page
    setSelectedCategory(category);
  };

  const handleSubcategoryClick = (category, subcategory) => {
    const url = `/imtahanlar/${category}/${subcategory}`;
    push(url); // Navigate to the dynamic page
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bodyColor shadow-sm ">
      <Container>
        <div className="flex justify-between items-center py-4 px-4">
          {/* Left section - logo */}
          <div className="flex">
            {!selectedCategory ? (
              <Image
                onClick={() => push(ROUTER.HOME)}
                style={{ objectFit: "cover", width: "120px", height: "30px" }}
                className="mr-8 cursor-pointer"
                src="/logo/dark-logo-innosert.png"
                alt="dark-logo-innosert"
                width={100}
                height={32}
              />
            ) : (
              <IoMdArrowBack
                className="mr-8 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
                size={24}
                onClick={handleBackToMenu}
              />
            )}
          </div>

          {/* Menu Icon for small screens */}
          <div className="lg:hidden flex-grow flex justify-end">
            {!isMenuOpen && (
              <MdLogin
                size={24}
                className="mr-4 text-textSecondaryDefault cursor-pointer bg-buttonBGresponsive p-2 w-10 h-10 rounded-md"
                onClick={handleLoginModalOpen}
              />
            )}
            {isMenuOpen ? (
              <IoMdClose
                size={24}
                className="text-textSecondaryDefault cursor-pointer bg-buttonBGresponsive p-2 w-10 h-10 rounded-md"
                onClick={toggleMenu}
              />
            ) : (
              <HiOutlineMenu
                size={24}
                className="text-textSecondaryDefault cursor-pointer bg-buttonBGresponsive p-2 w-10 h-10 rounded-md"
                onClick={toggleMenu}
              />
            )}
          </div>

          {/* Menu responsive start */}
          <div
            className={`absolute top-14 left-0 w-full h-[850px] bg-white shadow-lg rounded-xl p-4 transition-all duration-300 ease-in-out transform ${
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <ul className="flex px-4 flex-col divide-y divide-gray-200">
              <li
                onClick={() => handleMenuItemClick("Haqqımızda")}
                className="py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
              >
                Haqqımızda
              </li>
              <li
                onClick={handleDropdownToggle}
                className="flex py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue flex justify-between"
              >
                İmtahanlar
                {isImtahanlarDropdownOpen ? (
                  <IoIosArrowDown className="mt-1 fill-arrowButtonGray" />
                ) : (
                  <MdKeyboardArrowRight className="mt-1 fill-arrowButtonGray" />
                )}
              </li>

              {isImtahanlarDropdownOpen && (
                <>
                  {mainCategories?.map((category) => (
                    <li
                      key={category.id}
                      className="py-4 cursor-pointer flex flex-col justify-between items-start text-lg font-gilroy font-normal hover:text-textHoverBlue"
                      onClick={() => handleExamClick(category)}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span>{category.name}</span>
                        {openSubmenu === category.id ? (
                          <IoIosArrowDown className="mt-1 fill-arrowButtonGray" />
                        ) : (
                          <MdKeyboardArrowRight className="mt-1 fill-arrowButtonGray" />
                        )}
                      </div>
                      <ul
                        className={`${
                          openSubmenu === category.id
                            ? "max-h-screen"
                            : "max-h-0"
                        } w-full overflow-hidden transition-max-height duration-500 ease-in-out pl-4 mt-2 divide-y divide-gray-200`}
                      >
                        {getSubcategories(category.name).map((sub) => (
                          <li
                            key={sub.id}
                            className="py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
                            onClick={() =>
                              handleSubcategoryClick(category.slug, sub.slug)
                            }
                          >
                            {sub.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </>
              )}
              <li
                onClick={() => handleScrollToSection("Əlaqə")}
                className="py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
              >
                Əlaqə
              </li>
              <li
                onClick={() => handleScrollToSection("faq")}
                className="py-4 cursor-pointer text-lg font-gilroy font-normal hover:text-textHoverBlue"
              >
                FAQ
              </li>
            </ul>

            <div className="flex flex-col gap-4 px-4 py-5">
              <div onClick={handleLoginModalOpen}>
                <Button
                  color="var(--buttonDefaultPrimary)"
                  hoverColor="var(--buttonHoverPrimary)"
                  pressedColor="var(--buttonPressedPrimary)"
                  disabledColor="var(--buttonSecondaryDisabled)"
                  textColor="var(--buttonTextSecondaryDefault)"
                  disabledTextColor="var(--buttonTextSecondaryDisabled)"
                  width="100%"
                  height="44px"
                  borderRadius="8px"
                  fontFamily="var(--fontGilroy)"
                  fontWeight="500"
                >
                  Daxil ol
                </Button>
              </div>
              <div onClick={openRegisterModal}>
                <Button
                  className="flex items-center"
                  color="var(--buttonDefaultPrimary)"
                  hoverColor="var(--buttonHoverPrimary)"
                  pressedColor="var(--buttonPressedPrimary)"
                  disabledColor="var(--buttonDisabledPrimary)"
                  textColor="var(--buttonTextWhite)"
                  hoverTextColor="var(--buttonTextWhite)"
                  disabledTextColor="var(--buttonTextDisabled)"
                  width="100%"
                  height="44px"
                  borderRadius="8px"
                  fontFamily="var(--fontGilroy)"
                  fontWeight="500"
                >
                  Qeydiyyatdan keç
                </Button>
              </div>
            </div>
          </div>
          {/* Menu responsive end */}

          {/* Right section - navigation menu (hidden on small screens) */}
          <nav className="hidden lg:flex items-center xl:-ml-[300px]">
            <p
              onClick={() => push(ROUTER.ABOUT)}
              className="cursor-pointer font-gilroy font-medium text-lg text-textSecondaryDefault py-3 px-4 hover:text-textHoverBlue"
            >
              Haqqımızda
            </p>

            {/* Dropdown for "İmtahanlar" */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => {
                setDropdownOpen(false);
                setOpenSubmenu(null);
              }}
            >
              <button
                id="dropdownDelayButton"
                className="text-textSecondaryDefault text-lg inline-flex items-center font-gilroy font-medium focus:outline-none text-center py-3 px-4 hover:text-textHoverBlue"
                type="button"
              >
                İmtahanlar
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute z-10 text-lg bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-80 transition-all duration-300 ease-in-out transform ${
                  isDropdownOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <ul className="divide-y divide-gray-200 px-4">
                  {mainCategories?.map((category) => (
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
                        <MdKeyboardArrowRight className="mt-1 ml-2" />
                      </p>

                      {/* Submenu */}
                      <div
                        className={`absolute left-full top-0 mt-0 ml-1 bg-white rounded-lg shadow-lg w-48 z-20 transition-all duration-300 ease-in-out transform ${
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
                  ))}
                </ul>
              </div>
            </div>

            <p
              onClick={() => handleScrollToSection("contact")}
              className="cursor-pointer font-gilroy font-medium text-lg text-textSecondaryDefault py-3 px-4 hover:text-textHoverBlue"
            >
              Əlaqə
            </p>
            <p
              onClick={() => handleScrollToSection("faq")}
              className="cursor-pointer font-gilroy font-medium text-lg text-textSecondaryDefault py-3 px-4 hover:text-textHoverBlue"
            >
              FAQ
            </p>
          </nav>

          {/* Right section - buttons (hidden on small screens) */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <div onClick={handleLoginModalOpen}>
              <Button
                color="var(--buttonSecondaryDefault)"
                hoverColor="var(--buttonSecondaryHover)"
                pressedColor="var(--buttonSecondaryPressed)"
                disabledColor="var(--buttonSecondaryDisabled)"
                textColor="var(--buttonTextSecondaryDefault)"
                disabledTextColor="var(--buttonTextSecondaryDisabled)"
                width="96px"
                height="44px"
                borderRadius="8px"
                fontFamily="var(--fontGilroy)"
                fontWeight="500"
              >
                Daxil ol
              </Button>
            </div>
            <div onClick={openRegisterModal}>
              <Button
                className="flex items-center"
                color="var(--buttonDefaultPrimary)"
                hoverColor="var(--buttonHoverPrimary)"
                pressedColor="var(--buttonPressedPrimary)"
                disabledColor="var(--buttonDisabledPrimary)"
                textColor="var(--buttonTextWhite)"
                hoverTextColor="var(--buttonTextWhite)"
                disabledTextColor="var(--buttonTextDisabled)"
                width="228px"
                height="44px"
                borderRadius="8px"
                fontFamily="var(--fontGilroy)"
                fontWeight="500"
              >
                Qeydiyyatdan keç
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {isLoginModalOpen && (
        <div ref={modalRef}>
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setLoginModalOpen(false)}
            onOpenRegisterModal={handleRegisterModalOpen}
            onOpenOTPModal={handleOTPModalOpen}
            onForgotPasswordClick={handleForgotPasswordClick} // Pass the function here
          />
        </div>
      )}

      {isRegisterModalOpen && (
        <div ref={modalRef}>
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={handleRegisterModalClose} // Close the Register Modal
            onOpenLoginModal={() => setLoginModalOpen(true)} // Pass the function to open the Login Modal
            onSubmit={handleRegisterSubmit}
          />
        </div>
      )}

      {isOTPModalOpen && (
        <div ref={modalRef}>
          <OTPmodal
            isOpen={isOTPModalOpen}
            onClose={handleOTPModalClose}
            onBack={handleBackToRegister} // Pass the back function
            email={emailForOTP}
            onOpenResetPasswordModal={handleOpenResetPasswordModal}
          />
        </div>
      )}
      {isEmailVerificationModalOpen && (
        <EmailVerificationModal
          isOpen={isEmailVerificationModalOpen}
          onClose={() => setIsEmailVerificationModalOpen(false)}
          onBack={handleBackToLogin}
          onOpenOTPModal={handleOpenOTPModalAfterVerification}
          setEmailForOTP={setEmailForOTP} // Pass the setter function
        />
      )}

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          onClose={() => setIsResetPasswordModalOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
