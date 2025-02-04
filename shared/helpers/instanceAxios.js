import axios from "axios";

export const instanceAxios = axios.create({
  baseURL: "https://api.innosert.az/api/",
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});
