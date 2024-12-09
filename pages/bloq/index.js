import BlogGrid from "@/components/BlogCard"; // BlogGrid will now render the BlogCards
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import LoginModal from "@/components/Login";
import React, { useState } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // If there is no NextAuth session, redirect to the index page
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // If session exists, proceed with the page rendering
  return {
    props: {
      // You can pass any additional props here
    },
  };
}
function Blog() {
  const { t } = useTranslation();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const closeModals = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>{t("blog")}</title>
      </Head>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <BlogGrid />
      </Container>

      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} />
      )}
      <Footer />
    </>
  );
}

export default Blog;
