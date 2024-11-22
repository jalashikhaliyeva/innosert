// services/landingService.js
import { instanceAxios } from "../shared/helpers/instanceAxios";

export const getSettingInfo = async (lang) => {
  try {
    const response = await instanceAxios.get("settings", {
      headers: {
        "Accept-Language": lang, // Set the Accept-Language header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching landing info:", error);
    throw error;
  }
};
