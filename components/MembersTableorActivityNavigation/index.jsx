import React from "react";
import { TbUsers } from "react-icons/tb";
import { useTranslation } from "react-i18next";

function MembersTableorActivityNavigation({
  activeView,
  setActiveView,
  memberCount,
}) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-row gap-4 mb-6 font-gilroy mt-5 lg:mt-0">
        <button
          className={`flex items-center gap-2 text-base  lg:text-lg px-4 py-3 rounded-lg font-normal leading-6 ${
            activeView === "edit"
              ? "bg-blue100 text-blue400"
              : "text-neutral700"
          }`}
          onClick={() => setActiveView("edit")}
        >
          <TbUsers className="size-6" />
          {t("members.memberList")} ({memberCount})
        </button>
        <button
          className={`flex items-center gap-2 text-base  lg:text-lg px-4 py-3 rounded-lg font-gilroy font-normal leading-6 ${
            activeView === "preview"
              ? "bg-blue100 text-blue400"
              : "text-neutral700"
          }`}
          onClick={() => setActiveView("preview")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
              stroke={activeView === "preview" ? "#3366FF" : "#79797A"} // Blue when active, neutral when not
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <g clipPath="url(#clip0_3504_8333)">
              <rect
                width="15"
                height="9"
                transform="translate(9 13)"
                fill="#F5F5F5"
              />
              <path
                d="M23.3828 13.3213L17.4453 19.9374L14.3203 16.4552L9.63281 21.6784M23.3828 13.3213H19.6328M23.3828 13.3213V17.4999"
                stroke={activeView === "preview" ? "#3366FF" : "#79797A"} // Blue when active, neutral when not
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3504_8333">
                <rect
                  width="15"
                  height="9"
                  fill="white"
                  transform="translate(9 13)"
                />
              </clipPath>
            </defs>
          </svg>
          {t("members.memberActivity")}
        </button>
      </div>
    </>
  );
}

export default MembersTableorActivityNavigation;
