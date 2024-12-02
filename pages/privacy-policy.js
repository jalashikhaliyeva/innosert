// PrivacyPolicy.jsx
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Breadcrumb from "@/components/Breadcrumb"; // Ensure you have this component
import Footer from "@/components/Footer";
import withModalManagement from "@/shared/hoc/withModalManagement";
import { getSettingInfo } from "@/services/getSettingInfo";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";

function PrivacyPolicy({ openRegisterModal, openLoginModal }) {
  // State to hold all pages
  const [pages, setPages] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const lang = router.locale || "az"; 

  useEffect(() => {
    // Define an async function to fetch the pages
    const fetchPages = async () => {
      try {
        // Fetch the settings information
        const data = await getSettingInfo(lang);
        // Extract the 'pages' array from the response
        const { pages } = data;
        if (pages && Array.isArray(pages)) {
          setPages(pages);
        } else {
          console.error("No pages found in the response.");
          setPages([]);
        }
      } catch (err) {
        // Handle any errors during the fetch
        console.error("Error fetching pages:", err);
        setError(err);
      } finally {
        // Update the loading state
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchPages();
  }, [lang]);

  // Render a loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl"><Spinner /></p>
      </div>
    );
  }

  // Render an error message if fetching fails
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Error loading pages.</p>
      </div>
    );
  }

  return (
    <main>
      <Header openRegisterModal={openRegisterModal} openLoginModal={openLoginModal} />

      <Container>
        <Breadcrumb />

        <section className="my-8">
          <div className="bg-white shadow-lg p-8 rounded-lg font-gilroy">
            {pages.length > 0 ? (
              pages.map((page) => (
                <div key={page.id} className="mb-12">
                  {/* Page Title */}
                  <h1 className="text-3xl font-gilroy font-medium mb-6 text-center">
                    {page.title}
                  </h1>
                  
                  {/* Page Content */}
                  <div className="space-y-6">
                    {page.content ? (
                      // Safely render the HTML content using dangerouslySetInnerHTML
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                      />
                    ) : (
                      <p>No content available for this page.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No pages available to display.</p>
            )}
          </div>
        </section>
      </Container>

      <Footer />
    </main>
  );
}

export default withModalManagement(PrivacyPolicy);
