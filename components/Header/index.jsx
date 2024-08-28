import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "../Button";
import styles from "./style.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import Container from "../Container";
import LoginModal from "../Login";
import RegisterModal from "../Register";
import OTPmodal from "../OTPmodal";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isImtahanlarDropdownOpen, setImtahanlarDropdownOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };
  const handleRegisterModalOpen = () => {
    setRegisterModalOpen(true);
  };

  const handleRegisterModalClose = () => {
    setRegisterModalOpen(false);
    // setOTPModalOpen(true);
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
    setRegisterModalOpen(false); // Close Register Modal
    setOTPModalOpen(true); // Open OTP Modal
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bodyColor shadow-sm">
      <Container>
        <div className="flex justify-between py-4">
          <div className="flex">
            <h1 className="font-bold text-xl pr-20 py-2">Innosert</h1>
            <nav className="flex items-center">
              <Link href="#">
                <p className="font-gilroy font-normal text-lg text-textSecondaryDefault py-3 px-4 hover:text-textHoverBlue">
                  Haqqımızda
                </p>
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setImtahanlarDropdownOpen(true)}
                onMouseLeave={() => setImtahanlarDropdownOpen(false)}
              >
                <button
                  className="text-textSecondaryDefault text-lg inline-flex items-center font-gilroy font-normal focus:outline-none text-center py-3 px-4 hover:text-textHoverBlue"
                  type="button"
                >
                  Xidmətlər
                </button>
                <div
                  className={`${styles.dropdownMenu} ${
                    isImtahanlarDropdownOpen ? styles.show : ""
                  } absolute z-10 text-lg bg-white divide-y divide-gray-100 rounded-lg shadow w-64 py-3 px-4`}
                >
                  <ul className="divide-y divide-gray-200">
                    <li>
                      <Link href="#">
                        <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                          Sertifikasiya
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                          Hesabat və analitika üzrə xidmətlər
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

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
                  className="text-textSecondaryDefault text-lg inline-flex items-center font-gilroy font-normal focus:outline-none text-center py-3 px-4 hover:text-textHoverBlue"
                  type="button"
                >
                  İmtahanlar
                </button>
                <div
                  id="dropdownDelay"
                  className={`${styles.dropdownMenu} ${
                    isDropdownOpen ? styles.show : ""
                  } absolute z-10 text-lg bg-white divide-y divide-gray-100 rounded-lg shadow w-80`}
                >
                  <ul
                    className={`${styles.textDropdown} divide-y divide-gray-200`}
                    aria-labelledby="dropdownDelayButton"
                  >
                    <li
                      className="relative group"
                      onMouseEnter={() => setOpenSubmenu("sertifikasiya")}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <Link href="#">
                        <p
                          className={`${styles.textDropdown} font-gilroy my-2 text-lg font-normal block hover:bg-gray-100 hover:text-textHoverBlue flex justify-between items-center`}
                        >
                          IT
                          <MdKeyboardArrowRight className="mt-1 ml-2 fill-arrowButtonGray" />
                        </p>
                      </Link>
                      {/* Submenu */}
                      <div
                        className={`${styles.submenu} ${
                          openSubmenu === "sertifikasiya" ? styles.show : ""
                        } absolute left-full top-0 mt-0 ml-1 bg-white rounded-lg shadow-lg w-48 z-20`}
                      >
                        <ul className="text-lg divide-y divide-gray-100">
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Frontend Development
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Backend Development
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                    {/* Additional menu items */}
                    <li
                      className="relative group"
                      onMouseEnter={() => setOpenSubmenu("hesabat")}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <Link href="#">
                        <p
                          className={`${styles.textDropdown} block text-lg my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue flex justify-between items-center`}
                        >
                          Dizayn
                          <MdKeyboardArrowRight
                            className="mt-1 ml-2 fill-arrowButtonGray"
                            style={{ fontSize: "22px" }}
                          />
                        </p>
                      </Link>
                      <div
                        className={`${styles.submenu} ${
                          openSubmenu === "hesabat" ? styles.show : ""
                        } absolute left-full top-0 mt-0 ml-1 bg-white rounded-lg shadow-lg w-48 z-20`}
                      >
                        <ul className="text-lg divide-y divide-gray-100">
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                UX/UI design
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Graphic design
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Web design
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Motion design
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li
                      className="relative group"
                      onMouseEnter={() => setOpenSubmenu("option3")}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <Link href="#">
                        <p
                          className={`${styles.textDropdown} block text-lg my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue flex justify-between items-center`}
                        >
                          Digital Marketing
                          <MdKeyboardArrowRight className="mt-1 ml-2 fill-arrowButtonGray" />
                        </p>
                      </Link>
                      <div
                        className={`${styles.submenu} ${
                          openSubmenu === "option3" ? styles.show : ""
                        } absolute left-full top-0 mt-0 ml-1 bg-white rounded-lg shadow-lg w-48 z-20`}
                      >
                        <ul className="text-lg divide-y divide-gray-100">
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Option 1
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Option 2
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li
                      className="relative group"
                      onMouseEnter={() => setOpenSubmenu("option4")}
                      onMouseLeave={() => setOpenSubmenu(null)}
                    >
                      <Link href="#">
                        <p
                          className={`${styles.textDropdown} block text-lg my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue flex justify-between items-center`}
                        >
                          Data Analitika
                          <MdKeyboardArrowRight className="mt-1 ml-2 my-3 fill-arrowButtonGray" />
                        </p>
                      </Link>
                      <div
                        className={`${styles.submenu} ${
                          openSubmenu === "option4" ? styles.show : ""
                        } absolute left-full top-0 mt-0 ml-1 bg-white rounded-lg shadow-lg w-48 z-20`}
                      >
                        <ul className="text-lg divide-y divide-gray-100">
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Optionnn 1
                              </p>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <p className="block px-4 py-2 my-2 hover:bg-gray-100 font-gilroy font-normal text-textSecondaryDefault hover:text-textHoverBlue">
                                Optionnn 2
                              </p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <Link href="#">
                <p className="font-gilroy font-normal text-lg text-textSecondaryDefault py-3 px-4 hover:text-textHoverBlue">
                  Əlaqə
                </p>
              </Link>
              <Link href="#">
                <p className="font-gilroy font-normal text-lg text-textSecondaryDefault py-3 px-4 hover:text-textHoverBlue">
                  FAQ
                </p>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
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
              >
                Daxil ol
              </Button>
            </div>
            <div onClick={handleRegisterModalOpen}>
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
          />
        </div>
      )}
    </header>
  );
};

export default Header;
