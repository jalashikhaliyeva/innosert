import Image from "next/image";
import { FaShareFromSquare } from "react-icons/fa6";
import { HiOutlineSave } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaLinkedin, FaFacebook } from "react-icons/fa6"; // Import LinkedIn and Facebook icons
import { useTranslation } from "react-i18next";
import Head from "next/head";

function CertificateDetail({ certificate }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificateURL, setCertificateURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  if (!certificate) {
    return <div>Loading...</div>;
  }

  // Function to open the modal and set the certificate URL
  const openModal = () => {
    setCertificateURL(window.location.href);
    setIsModalOpen(true);
  };

  // Function to close the modal and reset copy success state
  const closeModal = () => {
    setIsModalOpen(false);
    setCopySuccess(false);
  };

  // Function to copy the certificate URL to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(certificateURL).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  // Function to handle LinkedIn Share
  const shareOnLinkedIn = () => {
    const linkedInShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      certificateURL
    )}`;
    window.open(linkedInShareURL, "_blank", "noopener,noreferrer");
  };

  // Function to handle Facebook Share
  const shareOnFacebook = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      certificateURL
    )}`;
    window.open(facebookShareURL, "_blank", "noopener,noreferrer");
  };

  // Function to handle the download
  const downloadCertificate = () => {
    const imageUrl = `${window.location.origin}${certificate.src}`;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "certificate.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
     <Head>
        <title>{t("titles.sertifikatlarim")}</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Image
          src={certificate.src}
          width={700}
          height={500}
          alt="Certificate"
          className="object-contain"
        />

        <div className="lg:w-[30%] w-[80%] m-5 flex flex-row gap-4 pt-3 mt-8">
          <button
            className="flex items-center justify-center gap-3 py-3 px-4 h-11 w-full font-gilroy leading-6 rounded-md bg-buttonSecondaryDefault text-grayButtonText hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
            onClick={openModal}
          >
            <FaShareFromSquare className="size-5" />
            Paylaş
          </button>
          <button
            className="flex items-center justify-center gap-3 py-3 px-4 h-11 w-full text-white font-gilroy leading-6 rounded-md bg-buttonPrimaryDefault hover:bg-buttonPrimaryHover active:bg-buttonPressedPrimary"
            onClick={downloadCertificate}
          >
            <HiOutlineSave className="size-5" />
            {t("actions.download")}
          </button>
        </div>

        {isModalOpen && (
          <div
            className="flex flex-col fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50"
            onClick={closeModal}
          >
            <div
              className="bg-white p-5 rounded-lg m-5 md:m-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <p className="font-gilroy text-lg text-textSecondaryDefault font-medium">
                  {t("actions.shareCertificate")}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="rounded-full bg-gray-100 p-4 hover:bg-gray-200 transition-colors"
                  onClick={shareOnLinkedIn}
                >
                  <FaLinkedin className="h-8 w-8 fill-[#0A66C2]" />
                </button>
                <button
                  className="rounded-full bg-gray-100 p-4 hover:bg-gray-200 transition-colors"
                  onClick={shareOnFacebook}
                >
                  <FaFacebook className="h-8 w-8 fill-[#0866FF]" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-5 mt-8">
                <div className="relative w-full max-w-md">
                  <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

                  <input
                    type="text"
                    value={certificateURL}
                    readOnly
                    className="w-full pl-10 pr-28 py-2 rounded border border-gray-300 bg-buttonSecondaryDefault text-gray-600 cursor-not-allowed focus:outline-none"
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-buttonPrimaryDefault text-white rounded"
                    onClick={copyToClipboard}
                  >
                    {copySuccess ? t("actions.copied") : t("actions.copy")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CertificateDetail;
