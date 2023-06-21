import axios from "axios";
console.log(window.location.origin);
const BASE_URL = window.location.origin;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
