// src/contexts/UserContext.js
import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Memoize fetchUserData to prevent it from changing on every render
  const fetchUserData = useCallback(async () => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      // toast.error("User is not authenticated. Please log in again.");
      console.log("User is not authenticated");

      return;
    }

    try {
      const response = await fetch(
        "https://innocert-admin.markup.az/api/user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        console.log(userData, "userData contect");
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
