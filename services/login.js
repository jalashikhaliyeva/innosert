import { instanceAxios } from "@/shared/helpers/instanceAxios";

export const getPhotos = async () => {
  const response = await instanceAxios({ method: "GET", url: "login" });
  return response;
};
