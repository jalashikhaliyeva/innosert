import React, { useState, useEffect, useRef, useContext } from "react";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import PhoneInput from "react-phone-input-2";
import InputMask from "react-input-mask";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { UserContext } from "@/shared/context/UserContext";

function MyProfiles() {
  // const [user, setUser] = useState(null);
  const { user, setUser, fetchUserData } = useContext(UserContext);
  console.log(user , " MyProfiles user teacher");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [showCompanies, setShowCompanies] = useState(false);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState("0px");
  const [companyVOEN, setCompanyVOEN] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyDetail, setCompanyDetail] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [inputError, setInputError] = useState(false);
  const [companyEmail, setCompanyEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCompanyCreation, setLoadingCompanyCreation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [companyImage, setCompanyImage] = useState(null);
  const [companyImagePreview, setCompanyImagePreview] = useState(null);
  const handleCompanyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyImage(file); // Set the file object
      setCompanyImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteCompanyImage = () => {
    setCompanyImage(null);
    setCompanyImagePreview(null);
  };

  const handleCancelCreation = () => {
    setIsCreatingCompany(false); // Cancel company creation and return to companies list
    setShowCompanies(true); // Show the companies list
  };

  const formRefs = useRef({});

  const formatMobile = (mobile) => {
    return mobile.replace(/[^\d+]/g, "");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const userToken = localStorage.getItem("token");

    if (!userToken) {
      toast.error("İstifadəçi doğrulanmayıb. Yenidən daxil olun.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("mobile", formatMobile(mobile));

      if (image) {
        formData.append("image", image);
      } else if (!imagePreview && user?.data?.profilePicture) {
        formData.append("delete_image", "true");
      }

      const profileResponse = await fetch(
        "https://innocert-admin.markup.az/api/me/update",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        }
      );

      const profileData = await profileResponse.json();

      if (profileResponse.ok) {
        toast.success("Profil uğurla yeniləndi!");


        // setUser((prevUser) => ({
        //   ...prevUser,
        //   username,
        //   email,
        //   first_name: firstName,
        //   last_name: lastName,
        //   mobile,
        //   profilePicture: image ? profileData?.data?.image : imagePreview,
        // }));

        // MyProfiles.js (updated code)
        setUser((prevUser) => ({
          ...prevUser,
          data: {
            ...prevUser.data,
            username,
            email,
            first_name: firstName,
            last_name: lastName,
            mobile,
            image: image ? profileData?.data?.image : imagePreview,
          },
        }));
        // Fetch updated user data from the server
        fetchUserData();

        if (!imagePreview) {
          setImage(null);
          setImagePreview("");
        }
      } else {
        toast.error(`Profil yenilənmədi: ${profileData.message}`);
      }
    } catch (error) {
      toast.error(`Xəta baş verdi: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading state after the request is complete
    }
  };

  const toggleDropdown = (companyId) => {
    const dropdown = formRefs.current[companyId];
    setIsOpen(!isOpen);

    if (dropdown.style.maxHeight === "0px" || !dropdown.style.maxHeight) {
      dropdown.style.maxHeight = `${dropdown.scrollHeight}px`; // Set maxHeight to content height
    } else {
      dropdown.style.maxHeight = "0px"; // Collapse the dropdown
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        alert("User is not authenticated. Please log in again.");
        return;
      }

      try {
        const response = await fetch(
          "https://innocert-admin.markup.az/api/companies",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response, "response teacher");
        

        if (response.ok) {
          const companiesData = await response.json();
          console.log(companiesData, "companiesData hesab");

          setCompanies(companiesData.data || []);
        } else {
          console.log("Failed to fetch companies");
        
        }
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
        
      }
    };

    fetchCompanies(); // Fetch the companies on component mount
  }, []); // Ensure this effect runs once on component mount

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        toast.error("İstifadəçi autentifikasiyadan keçməyib.");
        return;
      }

      try {
        const response = await fetch(
          "https://innocert-admin.markup.az/api/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          console.log(userData, "userData");

          setUser(userData);
          setUsername(userData.data.username || "");
          setEmail(userData.data.email || "");
          setFirstName(userData.data.first_name || "");
          setLastName(userData.data.last_name || "");
          setMobile(userData.data.mobile || "");
          // setImagePreview(userData.data.image || "");
          const userImage = userData.data.image;
          if (!userImage || userImage === "https://innocert-admin.markup.az") {
            setImagePreview(null); // No image available
          } else {
            setImagePreview(userImage);
          }
        } else {
          toast.error("Failed to fetch user data.");
        }
      } catch (error) {
        toast.error(`An error occurred: ${error.message}`);
      }
    };

    fetchUserData();
    // fetchCompanies();
  }, []);

  const getImageSrc = () => {
    if (!imagePreview) {
      return "/img/defaultUser.png";
    }
    return imagePreview;
  };
  useEffect(() => {
    if (isFormOpen) {
      setFormHeight(`${formRef.current.scrollHeight}px`);
    } else {
      setFormHeight("0px");
    }
  }, [isFormOpen]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const toggleShowCompanies = () => {
    setShowCompanies((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setImagePreview("");
  };

  const generateInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const toggleModal = () => {
    setIsCreatingCompany(true); // Show the company creation form
  };

  // if (
  //   !companyVOEN ||
  //   !companyName ||
  //   !companyAddress ||
  //   !companyPhoneNumber ||
  //   !companyDetail ||
  //   !companyEmail
  // ) {
  //   setInputError(true);
  //   toast.error("Zəhmət olmasa bütün sahələri doldurun.");
  //   return;
  // }

  const handleCompanyCreate = async (e) => {
    e.preventDefault();
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      toast.error(
        "İstifadəçi autentifikasiya edilməyib. Zəhmət olmasa, daxil olun."
      );
      return;
    }

    // Check for required fields
    if (
      !companyVOEN ||
      !companyName ||
      !companyAddress ||
      !companyPhoneNumber ||
      !companyDetail ||
      !companyEmail
    ) {
      setInputError(true);
      toast.error("Zəhmət olmasa, bütün sahələri doldurun.");
      return;
    }

    setLoadingCompanyCreation(true); // Start loading

    try {
      const formData = new FormData();
      formData.append("voen", companyVOEN);
      formData.append("name", companyName);
      formData.append("address", companyAddress);
      formData.append("detail", companyDetail);
      formData.append("phone_number", companyPhoneNumber);
      formData.append("email", companyEmail);

      // Append the image as "logo" if it exists
      if (companyImage) {
        formData.append("logo", companyImage); // Ensure this is a File object
      }

      const companyResponse = await fetch(
        "https://innocert-admin.markup.az/api/company/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        }
      );

      const responseData = await companyResponse.json();

      if (companyResponse.ok) {
        toast.success("Şirkət uğurla yaradıldı!");

        // Add the newly created company to the companies list
        setCompanies((prevCompanies) => [...prevCompanies, responseData.data]);

        // Automatically close the form and show the companies list
        setIsCreatingCompany(false); // Close the company creation form
        setShowCompanies(true); // Show the companies list
        // Reset form fields after successful creation
        setCompanyVOEN("");
        setCompanyName("");
        setCompanyAddress("");
        setCompanyDetail("");
        setCompanyPhoneNumber("");
        setCompanyEmail("");
        setCompanyImage(null);
        setCompanyImagePreview(null);
        setInputError(false); // Reset the error state
      } else {
        toast.error(`Xəta: ${responseData.message}`);
      }
    } catch (error) {
      toast.error(`Xəta: ${error.message}`);
    } finally {
      setLoadingCompanyCreation(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="mb-6">
        <h2
     
          className="text-2xl leading-8 font-gilroy font-medium"
        >
          {
            isCreatingCompany
              ? "Şirkət yarat" // If the company creation form is open
              : showCompanies
              ? "Şirkətlərim" // If viewing companies
              : "Hesablarım" // If viewing user profile
          }
        </h2>
      </div>
      <div className="flex justify-between">
        {!isCreatingCompany && (
          <>
            <div className="flex flex-row gap-2">
              <button
                className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
                  !showCompanies ? "bg-blue100 text-blue400" : "text-neutral700"
                }`}
                onClick={() => setShowCompanies(false)}
              >
                Hesablarım
              </button>
              <button
                className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
                  showCompanies ? "bg-blue100 text-blue400" : "text-neutral700"
                }`}
                onClick={toggleShowCompanies}
              >
                Şirkətlərim
              </button>
            </div>
            <button
              onClick={toggleModal}
              className="bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded-lg font-gilroy mr-4 flex"
            >
              <FaPlus className="mt-1 mr-2" /> Şirkət yarat
            </button>
          </>
        )}
      </div>

      {!isCreatingCompany ? (
        !showCompanies ? (
          // Profile section
          <div>
            <div className="flex justify-between items-center p-6 mt-4 bg-bodyColor rounded-3xl border px-14 ">
              <div className="flex items-center ">
                {imagePreview ? (
                  <Image
                    width={64}
                    height={64}
                    src={imagePreview}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-2xl font-gilroy font-bold mr-4">
                    {generateInitials(firstName, lastName)}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-medium font-gilroy leading-8 text-textSecondaryDefault">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-500 font-gilroy text-base font-normal leading-6">
                    {user?.data?.roles}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={toggleForm}
                  className="text-textSecondaryDefault font-gilroy text-base leading-6 font-normal cursor-pointer flex items-center px-4 py-2"
                >
                  Məlumatlar
                  <span className="ml-2">
                    {isFormOpen ? (
                      <IoChevronUpSharp className="size-3" />
                    ) : (
                      <IoChevronDownSharp className="size-3" />
                    )}
                  </span>
                </button>
              </div>
            </div>

            <div
              ref={formRef}
              style={{
                maxHeight: formHeight,
                transition: "max-height 0.3s ease",
                overflow: "hidden",
              }}
              className="overflow-hidden"
            >
              <div className="p-6 mt-4 bg-bodyColor rounded-3xl border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex justify-center">
                    <div className="relative">
                      {imagePreview ? (
                        <Image
                          width={200}
                          height={220}
                          src={imagePreview}
                          alt="Profile Large"
                          className="w-[100%] h-[220px] rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-48 h-48 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center text-4xl font-bold">
                          {generateInitials(firstName, lastName)}
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
                      />
                      <div className="relative mt-4 flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            document.querySelector('input[type="file"]').click()
                          }
                          className="px-4 py-3 text-grayButtonText bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed rounded-lg font-gilroy text-base  font-normal leading-6 relative z-10"
                          style={{ zIndex: 10 }}
                        >
                          Şəkili dəyiş
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <form onSubmit={handleSave}>
                      <div className="mb-4">
                        <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                          Ad
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor focus:border-inputRingFocus hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                          Soyad
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor focus:border-inputRingFocus hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor focus:border-inputRingFocus hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700">Nömrə</label>
                        <InputMask
                          mask="+994 99 999 99 99"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor focus:border-inputRingFocus hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                          placeholder="Mobil nömrə"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={loading} // Disable the button when loading is true
                          className={` bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 font-gilroy rounded-lg ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center">
                              <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                              </svg>
                              Gözləyin...
                            </div>
                          ) : (
                            "Yadda saxla"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Companies section
          <div className="mt-6">
            {companies.length > 0 ? (
              <ul className="mt-4">
                {companies
                  .slice() // Make a shallow copy of the companies array to avoid mutating the original array
                  .reverse() // Reverse the array so that the latest company appears first
                  .map((company) => (
                    <>
                      <li
                        key={company.id}
                        className="bg-bodyColor p-6 px-14 mt-4 mb-4 rounded-3xl border flex flex-col"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center ">
                            <Image
                              width={64}
                              height={64}
                              src={company.logo}
                              alt={`${company.name} Logo`}
                              className="w-16 h-16 rounded-full object-cover mr-4"
                            />

                            <div>
                              <h3 className="text-xl font-gilroy font-medium leading-7 text-textSecondaryDefault mb-1">
                                {company.name}
                              </h3>
                              <p
                                className={`font-medium font-gilroy text-base ${
                                  company.status
                                    ? "text-green-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {company.status ? "Yaradıldı" : "Gözləmədədir"}
                              </p>
                            </div>
                          </div>

                          <div>
                            <button
                              onClick={() => toggleDropdown(company.id)}
                              className="text-textSecondaryDefault font-gilroy text-base leading-6 font-normal cursor-pointer flex items-center px-4 py-2"
                            >
                              Məlumatlar
                              <span className="ml-2">
                                {isOpen ? (
                                  <IoChevronUpSharp className="size-3" />
                                ) : (
                                  <IoChevronDownSharp className="size-3" />
                                )}
                              </span>
                            </button>
                          </div>
                        </div>
                      </li>

                      <div
                        ref={(el) => (formRefs.current[company.id] = el)}
                        style={{
                          maxHeight: "0px",
                          transition: "max-height 0.3s ease",
                          overflow: "hidden",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 mt-4 bg-bodyColor rounded-3xl border h-full">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex justify-center">
                              <div className="relative">
                                <div className="flex items-center">
                                  {company.logo ? (
                                    <Image
                                      width={64}
                                      height={64}
                                      src={company.logo}
                                      alt={`${company.name} Logo`}
                                      className="w-48 h-40 rounded-2xl mr-4 object-cover"
                                    />
                                  ) : (
                                    <div className="w-16 h-16 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-2xl font-gilroy font-bold mr-4">
                                      {generateInitials(company.name, "")}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              <form>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                                      Şirkətin adı
                                    </label>
                                    <input
                                      readOnly
                                      type="text"
                                      value={company.name}
                                      placeholder="Şirkətin adı"
                                      className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-gray-700">
                                      VOEN
                                    </label>
                                    <input
                                      readOnly
                                      type="text"
                                      value={company.voen}
                                      className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-gray-700">
                                      Email
                                    </label>
                                    <input
                                      readOnly
                                      type="email"
                                      value={company.email}
                                      className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-gray-700">
                                      Nömrə
                                    </label>
                                    <InputMask
                                      readOnly
                                      mask="+994 99 999 99 99"
                                      value={company.phone_number}
                                      className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                                      placeholder="Mobil nömrə"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-gray-700">
                                      Adres
                                    </label>
                                    <input
                                      readOnly
                                      type="text"
                                      value={company.address}
                                      className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-gray-700">
                                      Ətraflı
                                    </label>
                                    <input
                                      readOnly
                                      type="text"
                                      value={company.detail}
                                      className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                                    />
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </ul>
            ) : (
              <p className="text-neutral700 font-gilroy text-lg flex items-center justify-center">
                Heç bir şirkət tapılmadı.
              </p>
            )}
          </div>
        )
      ) : (
        // Company creation form

        <div className="flex bg-bodyColor border w-[100%]">
          <div className="w-[40%] flex flex-col items-center justify-center p-4">
            {companyImagePreview ? (
              <div className="relative w-full flex items-center">
                <div className="w-[80%]">
                  <Image
                    width={200}
                    height={220}
                    src={companyImagePreview}
                    alt="Company Preview"
                    className="w-full h-[220px] rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-[220px] bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">Heç bir şəkil yüklənməyib</span>
              </div>
            )}
            <div className="relative mt-4 w-full flex justify-end">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("companyImageInput").click()
                }
                className="px-4 py-3 text-grayButtonText bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed rounded-lg font-gilroy text-base font-normal leading-6 flex-shrink-0"
              >
                Şəkili dəyiş
              </button>
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleCompanyImageChange}
              className="hidden"
              id="companyImageInput"
            />
          </div>

          <form
            className="w-[60%] p-8 rounded-lg"
            onSubmit={handleCompanyCreate}
          >
            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                Şirkətin adı
              </label>
              <input
                type="text"
                value={companyName}
                placeholder="Şirkətinizin adını daxil edin"
                onChange={(e) => setCompanyName(e.target.value)}
                className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover focus:outline-none ${
                  inputError && !companyName
                    ? "border-inputRingError"
                    : "border-inputBorder"
                }`}
              />
              {inputError && !companyName && (
                <p className="text-inputRingError text-sm mt-1">
                  Ad daxil edilməlidir.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                VOEN
              </label>
              <input
                type="text"
                placeholder="VOEN-inizi daxil edin"
                value={companyVOEN}
                onChange={(e) => setCompanyVOEN(e.target.value)}
                className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover focus:outline-none ${
                  inputError && !companyVOEN
                    ? "border-inputRingError"
                    : "border-inputBorder"
                }`}
              />
              {inputError && !companyVOEN && (
                <p className="text-inputRingError text-sm mt-1">
                  VOEN daxil edilməlidir.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                Email
              </label>
              <input
                type="email"
                value={companyEmail}
                placeholder="Emailinizi daxil edin"
                onChange={(e) => setCompanyEmail(e.target.value)}
                className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover focus:outline-none ${
                  inputError && !companyEmail
                    ? "border-inputRingError"
                    : "border-inputBorder"
                }`}
              />
              {inputError && !companyEmail && (
                <p className="text-inputRingError text-sm mt-1">
                  Email daxil edilməlidir.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                Nömrə
              </label>
              <InputMask
                mask="+994 99 999 99 99"
                value={companyPhoneNumber}
                onChange={(e) => setCompanyPhoneNumber(e.target.value)}
                className={`mt-2 py-3 px-4 w-full border text-textSecondaryDefault rounded-lg font-gilroy text-base bg-bodyColor focus:outline-none ${
                  inputError && !companyPhoneNumber
                    ? "border-inputRingError"
                    : "border-inputBorder"
                }`}
                placeholder="Mobil nömrənizi daxil edin"
              />
              {inputError && !companyPhoneNumber && (
                <p className="text-inputRingError text-sm mt-1">
                  Nömrə daxil edilməlidir.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                Addres
              </label>
              <input
                type="text"
                placeholder="Şirkət ünvanınızı daxil edin"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover focus:outline-none ${
                  inputError && !companyAddress
                    ? "border-inputRingError"
                    : "border-inputBorder"
                }`}
              />
              {inputError && !companyAddress && (
                <p className="text-inputRingError text-sm mt-1">
                  Addres daxil edilməlidir.
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                Ətraflı
              </label>
              <input
                type="text"
                placeholder="Ətraflı məlumatı daxil edin"
                value={companyDetail}
                onChange={(e) => setCompanyDetail(e.target.value)}
                className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover focus:outline-none ${
                  inputError && !companyDetail
                    ? "border-inputRingError"
                    : "border-inputBorder"
                }`}
              />
              {inputError && !companyDetail && (
                <p className="text-inputRingError text-sm mt-1">
                  Ətraflı məlumat daxil edilməlidir.
                </p>
              )}
            </div>

            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={handleCancelCreation}
                className="bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed text-gray-700 px-4 py-2 rounded-lg font-gilroy"
              >
                Ləğv et
              </button>
              <button
                type="submit"
                disabled={loadingCompanyCreation} // Disable button during loading
                className={`bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded-lg font-gilroy mr-4 flex ${
                  loadingCompanyCreation ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loadingCompanyCreation ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Gözləyin...
                  </div>
                ) : (
                  "Şirkət yarat"
                )}
              </button>
            </div>
          </form>
        </div>

        // Company creation end
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default MyProfiles;
