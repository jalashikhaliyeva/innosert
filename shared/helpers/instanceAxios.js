import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "https://innocert-admin.markup.az/api/",
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});
