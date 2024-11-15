// BlogGrid.jsx
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import Spinner from "../Spinner";
import { ViewCountContext } from "@/shared/context/ViewCountContext";

function BlogCard({ blog }) {
  const router = useRouter();
  const { viewCounts } = useContext(ViewCountContext);

  const handleClick = () => {
    router.push(`/bloq/${blog.slug}`);
  };

  const formattedDate = new Date(blog.created_at).toLocaleDateString();
  const views =
    viewCounts[blog.slug] !== undefined
      ? viewCounts[blog.slug]
      : blog.views || 0;

  return (
    <div
      className="border rounded-lg font-gilroy p-5 bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      <div className="relative w-full h-48 sm:h-56 md:h-48 lg:h-56 xl:h-64">
        <Image
          layout="fill"
          objectFit="cover"
          src={blog.image || "/img/excel.png"}
          alt={blog.title}
          className="rounded-sm"
        />
      </div>
      <div className="mt-4 text-grayButtonText text-sm font-normal flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <FaRegCalendarAlt className="text-grayButtonText" size={18} />
          <p>{formattedDate}</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <MdOutlineRemoveRedEye className="text-grayButtonText" size={18} />
          <p>{views} views</p>
        </div>
      </div>
      <h3 className="mt-4  text-lg sm:text-xl font-medium text-textSecondaryDefault">
        {blog.title.substring(0, 78)}...
      </h3>
      <p
        className="mt-2 text-grayButtonText text-sm sm:text-base font-normal"
        dangerouslySetInnerHTML={{
          __html: blog.content.substring(0, 100) + "...",
        }}
      ></p>
    </div>
  );
}

function BlogGrid() {
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { viewCounts } = useContext(ViewCountContext);
  const router = useRouter();
  const { locale } = router;

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://innocert-admin.markup.az/api/blogs?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": locale,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();
      setBlogs(data.data);
      setMeta(data.meta);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.head.appendChild(link);
  }, [locale]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchBlogs(selectedPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <div className="p-4">
      {blogs.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p>No blogs available.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {blogs.map((blog) => {
              const updatedBlog = viewCounts[blog.slug]
                ? { ...blog, views: viewCounts[blog.slug] }
                : blog;
              return <BlogCard key={blog.id} blog={updatedBlog} />;
            })}
          </div>

          {meta && meta.last_page > 1 && (
            <div className="flex justify-center mt-6">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={meta.last_page}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={meta.current_page - 1}
                containerClassName="flex flex-wrap justify-center items-center gap-2"
                pageLinkClassName="bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy transition-colors duration-200"
                activeLinkClassName="bg-grayLineFooter text-buttonPrimaryDefault font-gilroy"
                previousLinkClassName={`${
                  meta.current_page === 1
                    ? "cursor-not-allowed text-gray-300"
                    : ""
                } bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy transition-colors duration-200`}
                nextLinkClassName={`${
                  meta.current_page === meta.last_page
                    ? "cursor-not-allowed text-gray-300"
                    : ""
                } bg-boxGrayBodyColor text-grayButtonText rounded-md px-3 py-1 hover:bg-gray-200 font-gilroy transition-colors duration-200`}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BlogGrid;
