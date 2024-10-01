import React from "react";
import Container from "../Container";
import style from "./style.module.css";
import Button from "../Button";
import Image from "next/image";

function ConnectOrCreateExamSection({ title }) {
  console.log(title, "title connect or create");
  const modifiedTitle = title?.title
    .replace("iştirak et", '<span class="text-brandBlue200 font-extralight">iştirak et</span>')
    .replace("yarat", '<span class="text-brandBlue100 font-extralight">yarat</span>');

  return (
    <div  className="bg-grayBox pt-10 md:py-14 2xl:mt-20">
      <Container>
        <div className="md:mt-14 flex flex-col lg:flex-row justify-between gap-5">
          <div  className="flex flex-col justify-center w-full sm:w-[527px]">
            {/* <h2 className="mb-5 font-gilroy text-4xl font-medium leading-normal">
          İmtahanda <span className="text-textHoverBlue"> iştirak et</span> və ya{" "}
          imtahan  <span className="text-textHoverBlue"> yarat</span>
            </h2> */}
            <h2
              className="mb-5 font-gilroy text-2xl sm:text-4xl font-medium leading-normal"
              dangerouslySetInnerHTML={{ __html: modifiedTitle }}
            ></h2>
            <p className="font-normal text-lg font-gilroy text-grayText">
              {title.desc}
            </p>
          </div>
          <div data-aos="zoom-in" className="  xl:w-[37%]  bg-lightPurpleBg rounded-lg">
            <div style={{ position: "relative", display: "inline-block" }}>
              <Image
                width={272}
                height={100}
                className="w-[272px] rounded-b-md ml-14"
                src="/img/half-imtahancard.png"
                alt="exam-card"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="59"
                height="59"
                viewBox="0 0 59 59"
                fill="none"
                className={style.movableSvg}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.6338 6.50914C23.605 5.89097 23.3319 5.30953 22.8745 4.89273C22.4171 4.47593 21.8128 4.25792 21.1946 4.28665C20.5765 4.31538 19.995 4.5885 19.5782 5.04593C19.1614 5.50335 18.9434 6.10762 18.9721 6.72579L19.1888 11.3874C19.2175 12.0056 19.4906 12.587 19.9481 13.0038C20.4055 13.4206 21.0098 13.6386 21.6279 13.6099C22.2461 13.5812 22.8275 13.3081 23.2443 12.8506C23.6611 12.3932 23.8791 11.7889 23.8504 11.1708L23.6338 6.50914ZM13.1749 9.44786C12.9496 9.23524 12.6841 9.06962 12.3941 8.96068C12.104 8.85174 11.7952 8.80166 11.4856 8.81335C11.176 8.82505 10.8718 8.89828 10.5908 9.02879C10.3098 9.1593 10.0576 9.34447 9.84891 9.57348C9.64024 9.8025 9.47926 10.0708 9.37538 10.3627C9.2715 10.6546 9.22679 10.9642 9.24386 11.2736C9.26093 11.583 9.33945 11.8858 9.47482 12.1645C9.61019 12.4432 9.79971 12.6921 10.0323 12.8968L13.4815 16.0441C13.7083 16.2507 13.9735 16.4107 14.2621 16.5148C14.5507 16.6189 14.857 16.6652 15.1635 16.6509C15.4699 16.6367 15.7706 16.5622 16.0483 16.4318C16.326 16.3013 16.5753 16.1175 16.7819 15.8907C16.9886 15.6639 17.1485 15.3986 17.2526 15.11C17.3568 14.8215 17.403 14.5152 17.3888 14.2087C17.3745 13.9022 17.3001 13.6016 17.1696 13.3239C17.0392 13.0462 16.8553 12.7969 16.6285 12.5902L13.1749 9.44786ZM23.711 18.6753C21.3961 18.0214 19.3315 20.2874 20.1948 22.5294L29.5776 46.8487C30.5258 49.3087 33.9917 49.3485 34.9973 46.9098L39.3098 36.4176L49.3568 31.1505C51.6918 29.9255 51.3306 26.4758 48.7933 25.7599L23.711 18.6753ZM32.9542 8.52862C33.4115 8.9454 33.6845 9.52674 33.7133 10.1448C33.742 10.7628 33.5241 11.367 33.1074 11.8244L29.965 15.278C29.7585 15.5046 29.5094 15.6884 29.2319 15.8187C28.9544 15.9491 28.654 16.0235 28.3477 16.0377C28.0415 16.0519 27.7354 16.0057 27.447 15.9017C27.1586 15.7976 26.8935 15.6378 26.6669 15.4313C26.4403 15.2248 26.2566 14.9757 26.1262 14.6982C25.9959 14.4207 25.9215 14.1202 25.9072 13.814C25.893 13.5077 25.9392 13.2017 26.0433 12.9133C26.1473 12.6249 26.3071 12.3598 26.5136 12.1332L29.6586 8.68412C30.0754 8.22684 30.6567 7.95382 31.2747 7.9251C31.8928 7.89638 32.4968 8.11197 32.9542 8.52862ZM5.63718 21.3606C5.60845 20.7425 5.82647 20.1382 6.24326 19.6808C6.66006 19.2234 7.2415 18.9502 7.85967 18.9215L12.5213 18.7049C13.1395 18.6761 13.7437 18.8941 14.2012 19.3109C14.6586 19.7277 14.9317 20.3092 14.9604 20.9273C14.9892 21.5455 14.7712 22.1498 14.3544 22.6072C13.9376 23.0646 13.3561 23.3378 12.738 23.3665L8.07632 23.5831C7.45815 23.6119 6.85389 23.3938 6.39646 22.9771C5.93903 22.5603 5.66591 21.9788 5.63718 21.3606ZM17.3923 29.0739C17.5988 28.8473 17.7586 28.5822 17.8627 28.2938C17.9667 28.0054 18.0129 27.6994 17.9987 27.3931C17.9845 27.0868 17.91 26.7864 17.7797 26.5089C17.6493 26.2314 17.4656 25.9823 17.239 25.7758C17.0124 25.5693 16.7473 25.4095 16.4589 25.3054C16.1705 25.2014 15.8645 25.1551 15.5582 25.1694C15.2519 25.1836 14.9515 25.258 14.674 25.3884C14.3965 25.5187 14.1474 25.7024 13.9409 25.9291L10.7984 29.3803C10.5858 29.6057 10.4202 29.8712 10.3112 30.1612C10.2023 30.4512 10.1522 30.7601 10.1639 31.0697C10.1756 31.3793 10.2488 31.6835 10.3793 31.9645C10.5098 32.2455 10.695 32.4977 10.924 32.7064C11.153 32.915 11.4213 33.076 11.7132 33.1799C12.0051 33.2838 12.3148 33.3285 12.6241 33.3114C12.9335 33.2943 13.2363 33.2158 13.515 33.0805C13.7937 32.9451 14.0427 32.7556 14.2473 32.523L17.3923 29.0739Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="shadow-[0px_4px_8px_0px_rgba(93,97,114,0.08)] xl:w-[234px] h-[142px] px-2 bg-white flex justify-center items-center rounded-lg mt-[50px] ml-[240px] mb-[33px] relative">
              <Button
                className="flex items-center justify-center relative"
                color="var(--buttonDefaultPrimary)"
                hoverColor="var(--buttonHoverPrimary)"
                pressedColor="var(--buttonPressedPrimary)"
                disabledColor="var(--buttonDisabledPrimary)"
                textColor="var(--buttonTextWhite)"
                hoverTextColor="var(--buttonTextWhite)"
                disabledTextColor="var(--buttonTextDisabled)"
                width="136px"
                height="44px"
                borderRadius="8px"
                fontFamily="var(--fontGilroy)"
                fontSize="14px"
              >
                Imtahan yarat
              </Button>
              <Image
                width={200}
                height={350}
                src="/icon/arrowButtonDown.png"
                alt="arrowButtonDown"
                className={`${style.animatebounce}  absolute top-[-110px] right-[-14px]`}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ConnectOrCreateExamSection;

// w-[37%]
