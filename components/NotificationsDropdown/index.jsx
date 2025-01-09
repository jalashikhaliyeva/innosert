// components/NotificationsDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { TbBell } from "react-icons/tb";
import { useRouter } from "next/router";
import axios from "axios";
import { useTranslation } from "next-i18next";
import useMediaQuery from "@/shared/hooks/useMediaQuery"; // Ensure this path is correct
import { FaTimes } from "react-icons/fa"; // Import a close icon for mobile overlay

const NotificationsDropdown = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();
  const hideTimeout = useRef(null);

  // Detect if the device is mobile (width <= 768px)
  const isMobile = useMediaQuery(768);

  // Fetch notifications on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const fetchNotifications = async () => {
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
          setNotifications(response?.data?.data?.notifications);
          // console.log(
          //   response?.data?.data?.notifications,
          //   "response.data.data.notifications"
          // );
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Handle mouse enter to open dropdown (desktop)
  const handleNotificationMouseEnter = () => {
    if (!isMobile) {
      clearTimeout(hideTimeout.current);
      setIsNotificationOpen(true);
    }
  };

  // Handle mouse leave to initiate closing with delay (desktop)
  const handleNotificationMouseLeave = () => {
    if (!isMobile) {
      hideTimeout.current = setTimeout(() => {
        setIsNotificationOpen(false);
      }, 200); // Adjust delay as needed for smooth transition
    }
  };

  // Handle click to toggle notifications (mobile)
  const handleNotificationClick = () => {
    if (isMobile) {
      setIsNotificationOpen(!isNotificationOpen);
    }
  };

  // Calculate how many days ago the notification was created
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

  // Handle notification click to mark as read and navigate
  const handleNotificationItemClick = async (id, link, type) => {
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
      } else if (type === "Şirkətlərim") {
        router.push("/hesablarim");
      } else if (link) {
        router.push(link);
      }

      // Close the mobile overlay after navigation
      if (isMobile) {
        setIsNotificationOpen(false);
      }
    } catch (error) {
      console.error("Failed to mark notification as viewed:", error);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(hideTimeout.current);
    };
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={handleNotificationMouseEnter}
      onMouseLeave={handleNotificationMouseLeave}
    >
      {/* Notification Icon */}
      <TbBell
        className="size-6 md:size-5 cursor-pointer"
        onClick={handleNotificationClick}
      />

      {/* Desktop Dropdown */}
      {!isMobile && (
        <div
          className={`absolute right-0 mt-2 w-[560px] h-[300px] bg-white shadow-lg rounded-lg py-3 px-5 z-50 flex flex-col transition-all duration-300 ease-in-out transform ${
            isNotificationOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {/* Header */}
          <h2 className="font-medium text-lg mb-2 pb-2 text-center border-b flex-none">
            {t("notifications")}
          </h2>

          {/* Notification List */}
          {notifications?.length > 0 ? (
            <ul className="flex-grow overflow-y-auto divide-y divide-gray-200">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="py-2 flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    handleNotificationItemClick(
                      notification.id,
                      notification.link,
                      notification.type
                    )
                  }
                >
                  <div className="flex items-center">
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
                      <span className="font-medium">{notification.title}</span>
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
                  <span className="text-gray-400 ml-2 font-gilroy md:text-sm whitespace-nowrap">
                    {calculateDaysAgo(notification.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              {t("no_notifications")}
            </div>
          )}
        </div>
      )}

      {/* Mobile Full-Screen Overlay */}
      {isMobile && isNotificationOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">{t("notifications")}</h2>
            <FaTimes
              className="text-lg cursor-pointer text-gray-500"
              onClick={() => setIsNotificationOpen(false)}
            />
          </div>

          {notifications.length > 0 ? (
            <ul className="flex-grow overflow-y-auto p-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="py-2 flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    handleNotificationItemClick(
                      notification.id,
                      notification.link,
                      notification.type
                    )
                  }
                >
                  <div className="flex items-center">
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
                      <span className="font-medium">{notification.title}</span>
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
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              {t("no_notifications")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
