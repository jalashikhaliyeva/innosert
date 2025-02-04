// BlogDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsShare } from "react-icons/bs";
import { FiLink } from "react-icons/fi";
import { FaLinkedin, FaFacebook } from "react-icons/fa6"; // LinkedIn and Facebook icons
import Image from "next/image";
import Spinner from "../Spinner";
import { ViewCountContext } from "@/shared/context/ViewCountContext";

function BlogDetails({ dynamicName }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateViewCount } = useContext(ViewCountContext);
  const router = useRouter();
  const { locale } = router;

  // States and functions for Share Modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [currentURL, setCurrentURL] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentURL(window.location.href);
    }
  }, []);

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setCopySuccess(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentURL).then(
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
      currentURL
    )}`;
    window.open(linkedInShareURL, "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}`;
    window.open(facebookShareURL, "_blank", "noopener,noreferrer");
  };

  const fetchBlogDetails = async (slug) => {
    setLoading(true);
    setError(null);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      const response = await fetch(
        `https://api.innosert.az/api/blog/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": locale,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch blog details.");
      }

      const data = await response.json();

      if (data.status) {
        setBlog(data.data);
        updateViewCount(slug, data.data.views);
      } else {
        throw new Error(data.message || "Failed to fetch blog details.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching blog details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dynamicName) {
      fetchBlogDetails(dynamicName);
    }
  }, [dynamicName, locale]);

  useEffect(() => {
    if (dynamicName && blog) {
      updateViewCount(dynamicName, blog.views);
    }
  }, [dynamicName, blog]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString(locale);

  return (
    <div className="max-w-4xl mx-auto">
      {blog.image && (
        <div className="w-full h-auto rounded-md px-4">
          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={600}
            layout="responsive"
            className="rounded-md"
          />
        </div>
      )}
      <div className="bg-white font-gilroy px-10 py-8 rounded-lg shadow-md relative">
        {/* Top Info Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-7 items-center">
            <div className="flex items-center space-x-2">
              <FaRegCalendarAlt className="text-grayButtonText" size={18} />
              <p>{formattedDate}</p>
            </div>
            <div className="flex items-center space-x-2">
              <MdOutlineRemoveRedEye className="text-grayButtonText" size={18} />
              <p>{blog.view_count}</p>
            </div>
          </div>
          {/* "Paylaş" Button */}
          <button
            onClick={openShareModal}
            className="flex items-center gap-2 p-2 rounded-md hover:text-blue-600 transition-colors duration-300 focus:outline-none"
            aria-label="Share blog post"
          >
            <BsShare className="text-2xl" />
            <span className="font-semibold">Paylaş</span>
          </button>
        </div>

        <h1 className="text-h4 text-3xl font-medium text-neutralBlack mb-4">
          {blog.title}
        </h1>
        <div
          className="text-gray300 text-body font-normal leading-normal tracking-wide mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Share Modal */}
        {isShareModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={closeShareModal}
          >
            <div
              className="bg-white p-6 rounded-lg max-w-md w-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-textSecondaryDefault">
                  Paylaş
                </h2>
                <button
                  onClick={closeShareModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
                >
                  &times;
                </button>
              </div>

              <div className="flex justify-center gap-4 mb-4">
                {/* LinkedIn Share Button */}
                <button
                  onClick={shareOnLinkedIn}
                  className="rounded-full bg-gray-100 p-4 hover:bg-gray-200 transition-colors duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedin className="h-8 w-8 fill-[#0A66C2]" />
                </button>

                {/* Facebook Share Button */}
                <button
                  onClick={shareOnFacebook}
                  className="rounded-full bg-gray-100 p-4 hover:bg-gray-200 transition-colors duration-300"
                  aria-label="Share on Facebook"
                >
                  <FaFacebook className="h-8 w-8 fill-[#0866FF]" />
                </button>
              </div>

              <div className="relative mb-4">
                <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={currentURL}
                  readOnly
                  className="w-full font-gilroy pl-10 pr-28 py-2 rounded border border-gray-300 bg-buttonSecondaryDefault text-gray-600 cursor-not-allowed focus:outline-none"
                />
                <button
                  className="absolute font-gilroy right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 bg-buttonPrimaryDefault text-white rounded hover:bg-buttonPrimaryHover transition-colors duration-300"
                  onClick={copyToClipboard}
                >
                  {copySuccess ? "Kopyalandı" : "Kopyala"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogDetails;
