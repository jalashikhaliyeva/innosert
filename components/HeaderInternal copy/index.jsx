import { useState, useEffect, useRef, useContext } from "react";
import Container from "../Container";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io"; // Import close icon
import { MdKeyboardArrowRight } from "react-icons/md";
import LanguageSwitcher from "@/shared/LanguageSwitcher";
import { getSettingInfo } from "@/services/getSettingInfo";
import { useRouter } from "next/router";
import LogoutModal from "@/components/LogoutModal";
import { UserContext } from "@/shared/context/UserContext";
import CompanyContext from "@/shared/context/CompanyContext";
import Link from "next/link";

const HeaderInternal = () => {
  const { user } = useContext(UserContext);
  const { setSelectedCompany } = useContext(CompanyContext);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // Fetch categories and subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getSettingInfo();
        const mainCategories = data?.category.filter((cat) => cat.category_id === 0);
        const subCategories = data?.category.filter((cat) => cat.category_id !== 0);
        setCategories(mainCategories || []);
        setSubCategories(subCategories || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    router.push(`/kateqoriyalar/${category.slug}`);
  };

  const handleSubcategoryClick = (categorySlug, subcategorySlug) => {
    router.push(`/kateqoriyalar/${categorySlug}/${subcategorySlug}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenCategoryId(null); // Reset the submenu state when toggling the menu
  };

  const handleSubmenuToggle = (category) => {
    setOpenSubmenu(openSubmenu === category ? null : category);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-bodyColor shadow-createBox">
      <Container>
        <div className="flex justify-between items-center py-4">
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

          {/* Menu Icon for small screens */}
          <div className="lg:hidden flex-grow flex justify-end">
            {isMenuOpen ? (
              <IoMdClose
                size={24}
                className="cursor-pointer"
                onClick={toggleMenu}
              />
            ) : (
              <HiOutlineMenu
                size={24}
                className="cursor-pointer"
                onClick={toggleMenu}
              />
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={`absolute top-14 left-0 w-full h-screen bg-white z-50 transition-all duration-300 ${
              isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            }`}
          >
            <ul className="p-4">
              {categories.map((category) => (
                <li key={category.id} className="mb-4">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleSubmenuToggle(category.name)}
                  >
                    {category.name}
                    <MdKeyboardArrowRight
                      size={20}
                      className={`transform transition-transform ${
                        openSubmenu === category.name ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* Submenu */}
                  {openSubmenu === category.name && (
                    <ul className="pl-4 mt-2">
                      {subCategories
                        .filter((sub) => sub.category_id === category.name)
                        .map((sub) => (
                          <li
                            key={sub.id}
                            className="mb-2"
                            onClick={() => handleSubcategoryClick(category.slug, sub.slug)}
                          >
                            {sub.name}
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <p className="cursor-pointer" onClick={() => router.push("/bloq")}>
              Bloq
            </p>
            <LanguageSwitcher />
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default HeaderInternal;

