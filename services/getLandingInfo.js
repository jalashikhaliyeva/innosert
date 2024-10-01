import { instanceAxios } from "../shared/helpers/instanceAxios";

export const getLandingInfo = async (lang) => {
  try {
    const response = await instanceAxios.get("", {
      headers: {
        "Accept-Language": lang,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching landing info:", error);
    throw error;
  }
};
