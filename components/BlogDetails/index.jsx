// BlogDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
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
        `https://innocert-admin.markup.az/api/blog/${slug}`,
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
      // console.log(data, "blog details");

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
      <div className="bg-white font-gilroy px-10 py-8 rounded-lg shadow-md">
        <div className="text-grayButtonText font-normal text-sm flex gap-7 items-center mb-4">
          <div className="flex items-center space-x-2">
            <FaRegCalendarAlt className="text-grayButtonText" size={18} />
            <p>{formattedDate}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MdOutlineRemoveRedEye className="text-grayButtonText" size={18} />
            <p>
              {blog.view_count}
            </p>
          </div>
        </div>
        <h1 className="text-h4 text-3xl font-medium text-neutralBlack mb-4">
          {blog.title}
        </h1>
        <div
          className="text-gray300 text-body font-normal leading-normal tracking-wide mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
}

export default BlogDetails;
