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
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  // 1) If there's no NextAuth session, not logged in => redirect to '/'
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 2) We do a server-side fetch to check if the user is verified
  //    Usually you'd pass the user's token from session.accessToken or similar.
  const userResponse = await fetch(
    "https://api.innosert.az/api/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`, // or wherever your token is
      },
    }
  );

  if (!userResponse.ok) {
    // If the fetch fails, treat it like "not verified"
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const userData = await userResponse.json();

  // 3) If user is unverified => redirect to '/', or /haqqimizda
  if (userData?.data?.sv === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 4) If everything's OK, let them proceed
  return {
    props: {
      // pass anything you want to the component
      userBalance: userData?.data?.balance || 0,
    },
  };
}
function BlogPost() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query; // Changed from 'id' to 'slug'

  // console.log(router.query, "router.query");

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
