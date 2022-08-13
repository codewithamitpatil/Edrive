import axios from "axios";

const base_url = "http://localhost:3005";

export default axios.create({
  baseURL: base_url,
});

export const axiosPrivate = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
