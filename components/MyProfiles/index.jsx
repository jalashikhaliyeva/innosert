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
import { FaRegTrashCan } from "react-icons/fa6";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useTranslation } from "next-i18next";
function MyProfiles() {
  // const [user, setUser] = useState(null);
  const { user, setUser, fetchUserData } = useContext(UserContext);
  console.log(user, " MyProfiles user teacher");
  const [initialMobileApi, setInitialMobileApi] = useState("");

  const { t } = useTranslation();
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
  const [activeTab, setActiveTab] = useState("general"); // 'general' or 'password'
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Visibility states
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [companyImagePreview, setCompanyImagePreview] = useState(null);
  const handleCompanyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyImage(file); // Set the file object
      setCompanyImagePreview(URL.createObjectURL(file));
    }
  };

  const formatMobileForDisplay = (mobile) => {
    if (!mobile || mobile.length !== 9) return "";
    return `+994 ${mobile.slice(0, 2)} ${mobile.slice(2, 5)} ${mobile.slice(
      5,
      7
    )} ${mobile.slice(7, 9)}`;
  };
  const isTeacher = user?.data?.roles === "Teacher";

  // Helper function to format mobile number for API submission
  const formatMobileForApi = (mobile) => {
    const digits = mobile.replace(/\D/g, ""); // Remove all non-digit characters
    if (digits.startsWith("994")) {
      return digits.slice(3); // Remove the '994' country code
    }
    return digits;
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

    // Always require these fields
    if (!username.trim() || !email.trim() || !firstName.trim()) {
      toast.error("Bütün sahələri doldurun.");
      return;
    }

    // When user.data.sv is not 0, require lastName (Soyad) and mobile (Nömrə)
    if (user?.data?.sv !== 0) {
      if (!lastName.trim() || !mobile.trim()) {
        toast.error("Soyad və nömrə sahələri məcburidir.");
        return;
      }
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);

      // Format the mobile number for API submission
      const formattedMobile = formatMobileForApi(mobile);

      // Append the mobile number only if it has been changed
      if (formattedMobile !== initialMobileApi) {
        formData.append("mobile", formattedMobile);
      }

      if (image) {
        formData.append("image", image);
      } else if (!imagePreview && user?.data?.profilePicture) {
        formData.append("delete_image", "true");
      }

      const profileResponse = await fetch(
        "https://api.innosert.az/api/me/update",
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
        setUser((prevUser) => ({
          ...prevUser,
          data: {
            ...prevUser.data,
            username,
            email,
            first_name: firstName,
            last_name: lastName,
            mobile:
              formattedMobile !== initialMobileApi
                ? formattedMobile
                : prevUser.data.mobile,
            image: image ? profileData?.data?.image : imagePreview,
          },
        }));

        if (formattedMobile !== initialMobileApi) {
          setInitialMobileApi(formattedMobile);
        }

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
      setLoading(false);
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
        const response = await fetch("https://api.innosert.az/api/companies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        // console.log(response, "response teacher");

        if (response.ok) {
          const companiesData = await response.json();
          // console.log(companiesData, "companiesData hesab");

          setCompanies(companiesData.data || []);
        } else {
          // console.log("Failed to fetch companies");
        }
      } catch (error) {
        // console.log(`An error occurred: ${error.message}`);
      }
    };

    fetchCompanies(); // Fetch the companies on component mount
  }, []); // Ensure this effect runs once on component mount

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("token");

      // console.log(userToken, "user token profiles");

      if (!userToken) {
        toast.error("İstifadəçi autentifikasiyadan keçməyib.");
        return;
      }

      try {
        const response = await fetch("https://api.innosert.az/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          // console.log(userData, "userData");

          setUser(userData);
          setUsername(userData.data.username || "");
          setEmail(userData.data.email || "");
          setFirstName(userData.data.first_name || "");
          setLastName(userData.data.last_name || "");

          // Store the initial mobile number in API format
          const mobileApi = userData.data.mobile || "";
          setInitialMobileApi(mobileApi);

          // Format the mobile number for display
          setMobile(formatMobileForDisplay(mobileApi));

          const userImage = userData.data.image;
          if (
            !userImage ||
            userImage === "https://api.innosert.az" ||
            userImage.endsWith("null") ||
            userImage.endsWith("/")
          ) {
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
  }, []);

  const getImageSrc = () => {
    if (
      !imagePreview ||
      imagePreview === "https://api.innosert.az" ||
      imagePreview.endsWith("null") ||
      imagePreview.endsWith("/")
    ) {
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

  const handleDeleteImage = async (e) => {
    e.stopPropagation();
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      toast.error("İstifadəçi doğrulanmayıb. Yenidən daxil olun.");
      return;
    }

    setLoading(true); // Optional: Set loading state if you want to show a loader

    try {
      const formData = new FormData();
      formData.append("delete_image", "true");

      const response = await fetch(
        "https://api.innosert.az/api/me/remove-image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Şəkil uğurla silindi.");
        setImage(null);
        setImagePreview(null);

        // Update the user state
        setUser((prevUser) => ({
          ...prevUser,
          data: {
            ...prevUser.data,
            image: null,
          },
        }));
      } else {
        toast.error(`Şəkil silinmədi: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Xəta baş verdi: ${error.message}`);
    } finally {
      setLoading(false); // Optional: Reset loading state
    }
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

  // Handler function for changing password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Reset errors
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");

    let valid = true;
    // Validate that new password meets length requirement
    if (!newPassword) {
      setNewPasswordError("Yeni şifrəni daxil edin.");
      valid = false;
    } else if (newPassword.length < 8) {
      setNewPasswordError("Yeni parol ən azı 8 simvoldan ibarət olmalıdır.");
      valid = false;
    }
    if (!oldPassword) {
      setOldPasswordError("Mövcud şifrənizi daxil edin.");
      valid = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Şifrəni təsdiqləyin.");
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Şifrələr uyğun gəlmir.");
      valid = false;
    }
    if (!valid) {
      return;
    }

    // Validate that new password and confirm password match
    if (newPassword !== confirmPassword) {
      toast.error("Yeni parollar uyğun gəlmir.");
      return;
    }

    // Retrieve the token from localStorage
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      toast.error("İstifadəçi doğrulanmayıb. Yenidən daxil olun.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Make the API request
      const response = await fetch(
        "https://api.innosert.az/api/me/password/change",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            old_password: oldPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Parol uğurla dəyişdirildi.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else if (data.message === "errors.ERROR_406") {
        // Show a custom error message for incorrect password
        toast.error("Mövcud şifrə səhvdir. Yenidən yoxlayın.");
      } else {
        // General error message for other cases
        const errorMessage = data.message || "Parol dəyişdirilə bilmədi.";
        toast.error(`Xəta: ${errorMessage}`);
      }
    } catch (error) {
      toast.error(`Xəta baş verdi: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value.length < 8) {
      setNewPasswordError("Yeni Şifrə ən azı 8 simvoldan ibarət olmalıdır.");
    } else {
      setNewPasswordError("");
    }
  };

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
      !companyEmail ||
      !companyImage
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
        "https://api.innosert.az/api/company/create",
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
        <h2 className="text-2xl leading-8 font-gilroy font-medium">
          {isCreatingCompany
            ? t("titles.createCompany")
            : showCompanies
            ? t("titles.myCompanies")
            : t("titles.myAccount")}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        {!isCreatingCompany && (
          <>
            <div className="flex flex-row gap-2 mb-3 md:mb-0">
              <button
                className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
                  !showCompanies ? "bg-blue100 text-blue400" : "text-neutral700"
                }`}
                onClick={() => setShowCompanies(false)}
              >
                {t("my_account")}
              </button>
              <button
                className={`text-base px-4 py-2 h-10 rounded-lg font-normal font-gilroy leading-6 ${
                  showCompanies ? "bg-blue100 text-blue400" : "text-neutral700"
                }`}
                onClick={toggleShowCompanies}
              >
                {t("my_companies")}
              </button>
            </div>
            {!isTeacher && (
              <button
                onClick={toggleModal}
                className="bg-buttonPrimaryDefault w-[41%] md:w-[13%] hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 rounded-lg font-gilroy mr-4 flex"
              >
                <FaPlus className="mt-1 mr-2" /> {t("create_company")}
              </button>
            )}
          </>
        )}
      </div>

      {!isCreatingCompany ? (
        !showCompanies ? (
          // Profile section
          <div className="mb-20">
            <div className="flex justify-between items-center p-6 mt-4 bg-bodyColor rounded-3xl border px-4 md:px-14 ">
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
                  <h2 className="text-base md:text-xl font-medium font-gilroy leading-4 md:leading-8 text-textSecondaryDefault">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-500 font-gilroy text-xs md:text-base font-normal leading-6">
                    {user?.data?.roles
                      ?.split(" ")
                      .map((role) => {
                        switch (role.trim()) {
                          case "Teacher":
                            return t("teacher");
                          case "Student":
                            return t("user");
                          case "Owner":
                            return t("entrepreneur");
                          default:
                            return role;
                        }
                      })
                      .join(" ; ")}{" "}
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={toggleForm}
                  className="text-textSecondaryDefault font-gilroy text-xs md:text-base leading-6 font-normal cursor-pointer flex items-center px-4 py-2"
                >
                  <span className="hidden sm:block">{t("information")}</span>
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
                {/* General Tab */}
                {activeTab === "general" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Image */}
                    <div className="flex justify-center">
                      <div className="relative">
                        {imagePreview ? (
                          <Image
                            width={200}
                            height={220}
                            src={imagePreview}
                            alt="Profile Large"
                            className="w-full h-[370px] rounded-lg object-contain"
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
                        <div className="flex items-center gap-2 relative mt-4 justify-end">
                          {/* Display the delete button only when an image is present */}
                          {imagePreview && (
                            <button
                              type="button"
                              onClick={handleDeleteImage}
                              className="px-4 py-3 text-errorButtonDefault hover:text-errorButtonHover rounded-lg font-gilroy text-base font-normal leading-6 relative z-10"
                              style={{ zIndex: 10 }}
                            >
                              {t("delete_picture")}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .querySelector('input[type="file"]')
                                .click()
                            }
                            className="px-4 py-3 text-grayButtonText bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed rounded-lg font-gilroy text-base font-normal leading-6 relative z-10"
                            style={{ zIndex: 10 }}
                          >
                            {t("change_picture")}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Right Side - Form with Tabs */}
                    <div>
                      {/* Tabs */}
                      <div className="flex justify-start mb-4">
                        <button
                          className={`mr-4 px-4 py-2 rounded-lg font-gilroy ${
                            activeTab === "general"
                              ? "bg-blue100 text-blue400"
                              : "text-neutral700"
                          }`}
                          onClick={() => setActiveTab("general")}
                        >
                          {t("information")}
                        </button>
                        <button
                          className={`px-4 py-2 rounded-lg font-gilroy ${
                            activeTab === "password"
                              ? "bg-blue100 text-blue400"
                              : "text-neutral700"
                          }`}
                          onClick={() => setActiveTab("password")}
                        >
                          {t("change_password")}
                        </button>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSave}>
                        <div className="mb-4">
                          <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                            {t("first_name")}
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
                            {t("last_name")}
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required={user?.data?.sv !== 0} // Required only if sv is not 0
                            className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor focus:border-inputRingFocus hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">
                            {t("email")}
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor focus:border-inputRingFocus hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700">
                            {t("phone_number")}
                          </label>
                          <InputMask
                            mask="+994 99 999 99 99"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required={user?.data?.sv !== 0} // Required only if sv is not 0
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
                                {t("please_wait")}
                              </div>
                            ) : (
                              t("save")
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Password Tab */}
                {activeTab === "password" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Image */}
                    <div className="flex justify-center">
                      <div className="relative">
                        {imagePreview ? (
                          <Image
                            width={200}
                            height={220}
                            src={imagePreview}
                            alt="Profile Large"
                            className="w-full h-[370px] rounded-lg object-contain"
                          />
                        ) : (
                          <div className="w-48 h-48 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center text-4xl font-bold">
                            {generateInitials(firstName, lastName)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Side - Form with Tabs */}
                    <div>
                      {/* Tabs */}
                      <div className="flex justify-start mb-4">
                        <button
                          className={`mr-4 px-4 py-2 rounded-lg font-gilroy ${
                            activeTab === "general"
                              ? "bg-blue100 text-blue400"
                              : "text-neutral700"
                          }`}
                          onClick={() => setActiveTab("general")}
                        >
                          {t("information")}
                        </button>
                        <button
                          className={`px-4 py-2 rounded-lg font-gilroy ${
                            activeTab === "password"
                              ? "bg-blue100 text-blue400"
                              : "text-neutral700"
                          }`}
                          onClick={() => setActiveTab("password")}
                        >
                          {t("change_password")}
                        </button>
                      </div>

                      <form onSubmit={handleChangePassword} noValidate>
                        {/* Old Password Field */}
                        <div className="mb-4 relative">
                          <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                            {t("current_password")}
                          </label>
                          <input
                            type={oldPasswordVisible ? "text" : "password"}
                            value={oldPassword}
                            placeholder="********"
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none pr-10 ${
                              isSubmitted && oldPasswordError
                                ? "border-red-500 bg-red-50"
                                : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setOldPasswordVisible(!oldPasswordVisible)
                            }
                            className="absolute inset-y-0 right-0 top-6 flex items-center justify-center pr-3"
                          >
                            {oldPasswordVisible ? (
                              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                            ) : (
                              <AiOutlineEye className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          {isSubmitted && oldPasswordError && (
                            <p className="mt-1 text-red-500 text-sm">
                              {oldPasswordError}
                            </p>
                          )}
                        </div>

                        {/* New Password Field */}
                        <div className="mb-4 relative">
                          <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                            {t("new_password")}
                          </label>
                          <input
                            type={newPasswordVisible ? "text" : "password"}
                            value={newPassword}
                            placeholder="********"
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none pr-10 ${
                              isSubmitted && newPasswordError
                                ? "border-red-500 bg-red-50"
                                : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setNewPasswordVisible(!newPasswordVisible)
                            }
                            className="absolute inset-y-0 right-0 top-6 flex items-center pr-3"
                          >
                            {newPasswordVisible ? (
                              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                            ) : (
                              <AiOutlineEye className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          {isSubmitted && newPasswordError && (
                            <p className="mt-1 text-red-500 text-sm">
                              {newPasswordError}
                            </p>
                          )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="mb-4 relative">
                          <label className="block text-textSecondaryDefault font-gilroy text-base leading-6">
                            {t("confirm_password")}
                          </label>
                          <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            value={confirmPassword}
                            placeholder="********"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`mt-2 py-3 px-4 w-full border rounded-lg font-gilroy text-base bg-bodyColor hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none pr-10 ${
                              isSubmitted && confirmPasswordError
                                ? "border-red-500 bg-red-50"
                                : ""
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmPasswordVisible(!confirmPasswordVisible)
                            }
                            className="absolute inset-y-0 right-0 top-6 flex items-center pr-3"
                          >
                            {confirmPasswordVisible ? (
                              <AiOutlineEyeInvisible className="h-5 w-5 text-gray-500" />
                            ) : (
                              <AiOutlineEye className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                          {isSubmitted && confirmPasswordError && (
                            <p className="mt-1 text-red-500 text-sm">
                              {confirmPasswordError}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={loading}
                            className={`bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary text-white px-4 py-2 font-gilroy rounded-lg ${
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
                              "Şifrəni dəyiş"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
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
                        className="bg-bodyColor p-6 px-6 md:px-14 mt-4 mb-4 rounded-3xl border flex flex-col"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center ">
                            <Image
                              width={64}
                              height={64}
                              src={company.logo}
                              alt={`${company.name} Logo`}
                              className="w-16 h-16 rounded-full object-contain mr-4"
                            />

                            <div>
                              <h3 className="text-md md:text-xl font-gilroy font-medium leading-7 text-textSecondaryDefault mb-1">
                                {company.name}
                              </h3>
                              <p
                                className={`font-medium font-gilroy text-sm md:text-base ${
                                  company.status
                                    ? "text-green-500"
                                    : "text-yellow-500"
                                }`}
                              >
                                {company.status ? "Yaradıldı" : "Gözləmədədir"}
                              </p>
                            </div>
                          </div>

                          <div
                            className="flex items-center justify-center "
                            onClick={() => toggleDropdown(company.id)}
                          >
                            <button className="hidden md:block text-textSecondaryDefault font-gilroy text-base leading-6 font-normal cursor-pointer flex items-center ">
                              Məlumatlar
                            </button>
                            <span className="ml-2">
                              {isOpen ? (
                                <IoChevronUpSharp className="size-3" />
                              ) : (
                                <IoChevronDownSharp className="size-3" />
                              )}
                            </span>
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
                                      className="w-48 h-40 rounded-2xl mr-4 object-contain"
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
                                      {t("form.companyName")}
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
                                      {t("form.voen")}
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
                                      {t("form.email")}
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
                                      {t("form.phone")}
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
                                      {t("form.address")}
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
                                      {t("form.details")}
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
                {t("form.noCompanyFound")}
              </p>
            )}
          </div>
        )
      ) : (
        // Company creation form

        <div className="flex bg-bodyColor border w-[100%] flex-col md:flex-row">
          <div className="w-full md:w-[40%] flex flex-col items-center justify-center p-4">
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
                <span className="text-gray-500">
                  {" "}
                  {t("form.noImageUploaded")}
                </span>
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
                {t("form.changeImage")}
              </button>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleCompanyImageChange}
              className="hidden"
              id="companyImageInput"
            />
            {/* Conditional red helper text when the image is not uploaded */}
            {!companyImage && inputError && (
              <p className="text-inputRingError text-sm mt-2">
                {t("form.uploadImage")}
              </p>
            )}
          </div>

          <form
            className="w-full md:w-[60%] p-8 rounded-lg"
            onSubmit={handleCompanyCreate}
          >
            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                {t("form.companyName")}
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
                  {t("form.nameRequired")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                {t("form.voen")}
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
                  {t("form.voenRequired")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                {t("form.email")}
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
                  {t("form.emailRequired")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                {t("form.phone")}
              </label>
              <InputMask
                mask="+999 99 999 99 99" // Escaped '9's to make '994' static
                maskChar=" " // Replaces '_' with space
                alwaysShowMask={true} // Ensures the mask is always visibl=
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
                  {t("form.phoneRequired")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                {t("form.address")}
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
                  {t("form.addressRequired")}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-textSecondaryDefault text-base leading-6 font-gilroy">
                {t("form.details")}
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
                  {t("form.detailsRequired")}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-5">
              <button
                type="button"
                onClick={handleCancelCreation}
                className="bg-buttonGhostPressed hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed text-gray-700 px-4 py-2 rounded-lg font-gilroy"
              >
                {t("form.cancel")}
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
                    {t("form.wait")}
                  </div>
                ) : (
                  t("form.createCompany")
                )}
              </button>
            </div>
          </form>
        </div>

        // Company creation end
      )}

      {/* <ToastContainer
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
      /> */}
    </div>
  );
}

export default MyProfiles;
