import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // ✅ relative path since it's served from same origin
});
