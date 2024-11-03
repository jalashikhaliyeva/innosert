import BlogGrid from "@/components/BlogCard"; // BlogGrid will now render the BlogCards
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HeaderInternal from "@/components/HeaderInternal";
import LoginModal from "@/components/Login";
import React, { useState } from "react";

function Blog() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const closeModals = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
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
