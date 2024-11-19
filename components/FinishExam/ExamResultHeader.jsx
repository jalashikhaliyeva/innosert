import React from "react";
import Container from "../Container";
import Image from "next/image";
import { Link } from "react-router-dom";
import { useRouter } from "next/router";

function ExamResultHeader() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/neticelerim");
  };
  return (
    <div className="py-5 shadow-Cardshadow">
      <Container>
        <div className="flex items-center justify-between">
          <div onClick={handleClick}>
            <Image
              style={{
                objectFit: "cover",
                width: "120px",
                height: "30px",
              }}
              className="cursor-pointer"
              src="/logo/dark-logo-innosert.png"
              alt="dark-logo-innosert"
              width={100}
              height={32}
            />
          </div>
          <div
            onClick={handleClick}
            className="flex items-center gap-2 font-gilroy cursor-pointer"
          >
            <p className="text-base text-textSecondaryDefault leading-6">
              Bağla
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M8.82126 9.99977L2.32715 3.50566L3.50566 2.32715L9.99976 8.82119L16.4938 2.32715L17.6723 3.50566L11.1783 9.99977L17.6723 16.4938L16.4938 17.6724L9.99976 11.1783L3.50566 17.6724L2.32715 16.4938L8.82126 9.99977Z"
                fill="#000A33"
              />
            </svg>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ExamResultHeader;
