import { CREDS_BASE64, HOST } from "@/types/server_host";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Authorization: `Basic ${CREDS_BASE64}`,
  },
});
