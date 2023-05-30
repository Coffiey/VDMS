import axios from "axios";
const BASE_URL = "https://vdms.onrender.com/";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
