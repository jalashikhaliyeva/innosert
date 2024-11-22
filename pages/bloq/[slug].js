// pages/bloq/[slug].jsx

import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import BlogDetails from "@/components/BlogDetails";
import Breadcrumb from "@/components/Breadcrumb";
import Spinner from "@/components/Spinner";
import { useTranslation } from "react-i18next";

function BlogPost() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query; // Changed from 'id' to 'slug'

  console.log(router.query, "router.query");

  // Optional: Handle cases where slug might not be immediately available
  if (!slug) {
    return (
      <>
        <Head>
        <title>{t("blog")}</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <HeaderInternal />
        <Container>
          <Breadcrumb />
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
      <title>{t("blog")}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <HeaderInternal />
      <Container>
        <Breadcrumb />
        <BlogDetails dynamicName={slug} /> {/* Pass 'slug' instead of 'id' */}
      </Container>
      <Footer />
    </>
  );
}

export default BlogPost;
