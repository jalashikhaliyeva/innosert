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

function BlogPost() {
  const router = useRouter();
  const { slug } = router.query; // Changed from 'id' to 'slug'

  console.log(router.query, "router.query");

  // Optional: Handle cases where slug might not be immediately available
  if (!slug) {
    return (
      <>
        <Head>
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
