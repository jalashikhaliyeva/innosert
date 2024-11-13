// components/NotificationsDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { TbBell } from "react-icons/tb";
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "next-i18next";

const NotificationsDropdown = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const hideTimeout = useRef(null);
  const router = useRouter();
  const { t } = useTranslation();
  const handleNotificationMouseEnter = () => {
    clearTimeout(hideTimeout.current);
    setIsNotificationOpen(true);
  };

  const handleNotificationMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsNotificationOpen(false), 300);
    }, 100);
  };

  useEffect(() => {
    if (isNotificationOpen) {
      setTimeout(() => setIsVisible(true), 10);
    }
  }, [isNotificationOpen]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://innocert-admin.markup.az/api/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          setNotifications(response.data.data.notifications);
          console.log(
            response.data.data.notifications,
            "response.data.data.notifications"
          );
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const calculateDaysAgo = (createdDate) => {
    const currentDate = new Date();
    const notificationDate = new Date(createdDate);
    const differenceInTime = currentDate - notificationDate;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) return t("today");
    if (differenceInDays === 1) return t("yesterday");
    return `${differenceInDays} ${t("days_ago_suffix")}`;
  };

  const handleNotificationClick = async (id, link, type) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `https://innocert-admin.markup.az/api/me/notifications/view/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the notification as read locally
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );

      // Redirect based on the notification type
      if (type === "Nəticələrim") {
        router.push("/neticelerim");
      } else if (type === "Category") {
        router.push("/home");
      } else if (type === "Blog") {
        router.push("/bloq");
      } else if (link) {
        router.push(link);
      }
    } catch (error) {
      console.error("Failed to mark notification as viewed:", error);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleNotificationMouseEnter}
      onMouseLeave={handleNotificationMouseLeave}
    >
      <TbBell className="size-5 cursor-pointer" />

      {isNotificationOpen && (
        <div
          className={`absolute font-gilroy right-0 mt-2 w-[560px] h-[300px] overflow-y-auto bg-white shadow-lg rounded-lg py-3 px-5 z-50 transition-all duration-300 ease-in-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <h2 className="font-medium text-lg mb-2 pb-2 text-center border-b">
            {t("notifications")}
          </h2>
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="py-2  flex justify-between items-center pb-2 cursor-pointer"
                onClick={() =>
                  handleNotificationClick(
                    notification.id,
                    notification.link,
                    notification.type
                  )
                }
              >
                <div className="flex">
                  <span
                    className={`h-2 w-2 ${
                      notification.is_read ? "bg-gray-200" : "bg-blue-500"
                    } rounded-full mt-2 mr-2`}
                  ></span>
                  <p
                    className={`text-sm ${
                      notification.is_read ? "text-gray-400" : "text-green900"
                    }`}
                  >
                    <span className="font-medium ">{notification.title}</span>
                    {notification.link && (
                      <span
                        className={`${
                          notification.is_read
                            ? "text-gray-400"
                            : "text-blue-600"
                        } underline mx-1`}
                      >
                        {notification.type}
                      </span>
                    )}
                  </p>
                </div>
                <span className="text-gray-400 ml-2 font-gilroy text-sm whitespace-nowrap">
                  {calculateDaysAgo(notification.created_at)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
