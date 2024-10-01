import { instanceAxios } from "../shared/helpers/instanceAxios";

export const getUserInfo = async (lang) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No auth token found, please login.");
    }

    const response = await instanceAxios.get("user", {
      headers: {
        "Accept-Language": lang,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
