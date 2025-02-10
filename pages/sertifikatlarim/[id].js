import Image from "next/image";
import { FaShareFromSquare } from "react-icons/fa6";
import { HiOutlineSave } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { useState, useRef } from "react";
import { FaLinkedin, FaFacebook } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import Certificate from "@/components/Certificate"; // Adjust path as needed
import Spinner from "@/components/Spinner"; // if you want a loading spinner

function CertificateDetail({ certificateData }) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificateURL, setCertificateURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Create a ref for the certificate container.
  const certificateRef = useRef(null);

  const openModal = () => {
    setCertificateURL(window.location.href);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCopySuccess(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(certificateURL).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const shareOnLinkedIn = () => {
    const linkedInShareURL = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      certificateURL
    )}`;
    window.open(linkedInShareURL, "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      certificateURL
    )}`;
    window.open(facebookShareURL, "_blank", "noopener,noreferrer");
  };

  // Updated download function using dynamic import of html2canvas.
  const downloadCertificate = async () => {
    if (certificateRef.current) {
      try {
        const html2canvas = (await import("html2canvas")).default;
        const canvas = await html2canvas(certificateRef.current, {
          useCORS: true,
          logging: true,
        });
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "certificate.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating certificate image:", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{t("titles.sertifikatlarim")}</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Wrap the Certificate component with a container we can capture */}
        <div
          ref={certificateRef}
          className="inline-block relative w-[800px] h-[600px]"
        >
          <Certificate {...certificateData} />
        </div>

        <div className="lg:w-[30%] w-[80%] m-5 flex flex-row gap-4 pt-3 mt-8">
          <button
            className="flex items-center justify-center gap-3 py-3 px-4 h-11 w-full font-gilroy leading-6 rounded-md bg-buttonSecondaryDefault text-grayButtonText hover:bg-buttonSecondaryHover active:bg-buttonSecondaryPressed"
            onClick={openModal}
          >
            <FaShareFromSquare className="size-5" />
            {t("actions.share")}
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

// Fetch certificate details using the certificate_id from the URL.
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const response = await fetch(
      `https://api.innosert.az/api/certificate/${id}`
    );
    if (!response.ok) {
      return { notFound: true };
    }
    const data = await response.json();

    return {
      props: {
        certificateData: data.certificate,
      },
    };
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return { notFound: true };
  }
}

export default CertificateDetail;
