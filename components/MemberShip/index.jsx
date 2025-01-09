// src/components/MemberShip.jsx

import React, { useState, useEffect } from "react";
import { FiCopy } from "react-icons/fi";
import { MdOutlinePhone } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles
import axios from "axios"; // We'll use axios for HTTP requests
import { ImSpinner2 } from "react-icons/im"; // Import a spinner icon
import InputMask from "react-input-mask"; // Import react-input-mask
import { getSettingInfo } from "@/services/getSettingInfo";

export default function MemberShip() {
  const [copied, setCopied] = useState(false);
  const [settingInfo, setSettingInfo] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettingInfo = async () => {
      try {
        const data = await getSettingInfo();
        // console.log(data.contact, "data footer");
        setSettingInfo(data.contact);
      } catch (error) {
        console.error("Failed to fetch setting info:", error);
        setFetchError(true);
      }
    };

    fetchSettingInfo();
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    company: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  // Email validation regex
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  // Phone number validation
  const validatePhone = (phone) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    // Azerbaijani phone numbers have 12 digits including the country code
    return digits.length === 12;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Bu sahə mütləqdir.";
      }
    });

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Zəhmət olmasa, etibarlı email ünvanı daxil edin.";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Zəhmət olmasa, düzgün telefon nömrəsi daxil edin.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare data for API
    const payload = {
      name: formData.name,
      surname: formData.surname,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
    };

    // console.log(payload, "payload");

    setIsSubmitting(true); // Start loading

    try {
      const response = await axios.post(
        "https://innocert-admin.markup.az/api/cooperations",
        payload
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Forma uğurla göndərildi!");
        // Reset form
        setFormData({
          name: "",
          surname: "",
          company: "",
          email: "",
          phone: "",
        });
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Formu göndərərkən səhv baş verdi.");
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  // Handle copying email to clipboard
  const handleCopyEmail = () => {
    if (settingInfo && settingInfo.email) {
      const email = settingInfo.email;
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setCopied(true);
          toast.info("Email kopyalandı!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Email kopyalanmadı.");
        });
    } else {
      toast.error("Email məlumatı mövcud deyil.");
    }
  };

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="min-h-screen my-14 flex items-center justify-center">
      {/* <ToastContainer /> Toast Container */}
      <div className="bg-white font-gilroy justify-center p-8 lg:p-14 rounded-2xl shadow-sm flex gap-12 flex-col lg:flex-row max-w-6xl w-full mx-auto space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left Form Section */}
        <div className="w-full lg:w-[400px] font-gilroy">
          <h1 className="text-3xl font-medium text-gray-800 mb-2">
            Əməkdaşlıq
          </h1>
          <p className="text-grayButtonText text-base leading-6 mb-6">
            Əməkdaşlıq üçün formu dolduraraq bizə müraciət edə bilərsiniz
          </p>
          <form onSubmit={handleSubmit} noValidate>
            {/* Form Fields */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-grayButtonText mb-1">
                Ad
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ad"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-boxGrayBodyColor lg:w-[380px] text-textSecondaryDefault border ${
                  errors.name ? "border-red-500" : "border-arrowButtonGray"
                } rounded-md py-3 px-4 hover:bg-inputBgHover hover:border-inputBorderHover`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="surname"
                className="block text-grayButtonText mb-1"
              >
                Soyad
              </label>
              <input
                id="surname"
                type="text"
                placeholder="Soyad"
                value={formData.surname}
                onChange={handleChange}
                className={`w-full bg-boxGrayBodyColor lg:w-[380px] text-textSecondaryDefault border ${
                  errors.surname ? "border-red-500" : "border-arrowButtonGray"
                } rounded-md py-3 px-4 hover:bg-inputBgHover hover:border-inputBorderHover`}
              />
              {errors.surname && (
                <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-grayButtonText mb-1"
              >
                Şirkət adı
              </label>
              <input
                id="company"
                type="text"
                placeholder="Şirkət adı"
                value={formData.company}
                onChange={handleChange}
                className={`w-full bg-boxGrayBodyColor lg:w-[380px] text-textSecondaryDefault border ${
                  errors.company ? "border-red-500" : "border-arrowButtonGray"
                } rounded-md py-3 px-4 hover:bg-inputBgHover hover:border-inputBorderHover`}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-grayButtonText mb-1">
                Nömrə
              </label>
              {/* Phone Input with Mask */}
              <InputMask
                mask="+999 99 999 99 99"
                maskChar=""
                id="phone"
                type="tel"
                placeholder="+994 99 999 99 99"
                value={formData.phone}
                onChange={handleChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    className={`w-full bg-boxGrayBodyColor lg:w-[380px] text-textSecondaryDefault border ${
                      errors.phone ? "border-red-500" : "border-arrowButtonGray"
                    } rounded-md py-3 px-4 hover:bg-inputBgHover hover:border-inputBorderHover`}
                  />
                )}
              </InputMask>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-grayButtonText mb-1">
                Mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Mail"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-boxGrayBodyColor lg:w-[380px] text-textSecondaryDefault border ${
                  errors.email ? "border-red-500" : "border-arrowButtonGray"
                } rounded-md py-3 px-4 hover:bg-inputBgHover hover:border-inputBorderHover`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting} // Disable button when submitting
              className={`w-full lg:w-[380px] bg-buttonPrimaryDefault text-white py-2 text-lg px-4 rounded-md transition duration-300 flex items-center justify-center ${
                isSubmitting
                  ? "bg-buttonPrimaryHover cursor-not-allowed"
                  : "hover:bg-buttonPrimaryHover active:bg-buttonPrimaryPressed"
              }`}
            >
              {isSubmitting ? (
                <>
                  <ImSpinner2 className="animate-spin mr-2" />
                  Gözləyin...
                </>
              ) : (
                "Göndər"
              )}
            </button>
          </form>
        </div>

        {/* Right Info Section */}
        <div className="flex flex-col items-start justify-start">
          <div className="flex items-center mb-6">
            <div>
              <img
                src="/logo/dark-logo-innosert.png"
                alt="Logo"
                className="w-40"
              />
            </div>
          </div>
          {/* Email Section */}
          <div
            className="flex items-center mb-4 py-3 px-6 bg-boxGrayBodyColor rounded-xl cursor-pointer"
            onClick={handleCopyEmail}
            aria-label="Copy email to clipboard"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCopyEmail();
              }
            }}
          >
            <div className="mr-4 text-gray-800">
              {copied ? (
                <FaRegCheckCircle className="text-2xl " />
              ) : (
                <FiCopy className="text-2xl" />
              )}
            </div>
            <div className="font-gilroy">
              {settingInfo ? (
                <a
                  href={`mailto:${settingInfo.email}?subject=Əməkdaşlıq&body=Salam Innosert komandası,`}
                  className="text-gray-800 font-medium text-lg md:text-xl hover:underline"
                >
                  {settingInfo.email}
                </a>
              ) : fetchError ? (
                <p className="text-red-500">Email məlumatı mövcud deyil.</p>
              ) : (
                <div className="bg-gray-200 animate-pulse w-48 h-4"></div>
              )}
              <p className="text-gray-500">Mail</p>
            </div>
          </div>
          {/* Phone Section */}
          <div className="flex items-center mb-4 py-3 px-6 bg-boxGrayBodyColor rounded-xl">
            <div className="mr-4 text-gray-800 text-lg md:text-lg">
              <MdOutlinePhone className="text-3xl" />
            </div>
            <div className="font-gilroy">
              {settingInfo ? (
                <p className="text-gray-800 font-medium text-xl">
                  {settingInfo.phone}
                </p>
              ) : fetchError ? (
                <p className="text-red-500">Telefon məlumatı mövcud deyil.</p>
              ) : (
                <div className="bg-gray-200 animate-pulse w-40 h-4"></div>
              )}
              <p className="text-gray-500">Əlaqə</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
