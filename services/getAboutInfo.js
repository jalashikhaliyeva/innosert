import { instanceAxios } from "../shared/helpers/instanceAxios";

export const getAboutInfo = async (lang) => {
  try {
    const response = await instanceAxios.get("about", {
      headers: {
        "Accept-Language": lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching about info:", error);
    throw error;
  }
};
