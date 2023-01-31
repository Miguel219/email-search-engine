import { axiosInstance } from "@/axios/AxiosInstance";
import { inject } from "vue";

const route = "emails";

export const fetchEmailsService = async (from: number, max_results: number) => {
  const axios = axiosInstance;
  return axios.post(`${route}/list`, {
    from,
    max_results,
  });
};

export const searchEmailsService = async (
  term: string,
  from: number,
  max_results: number
) => {
  const axios = axiosInstance;
  return axios.post(`${route}/search`, {
    term,
    from,
    max_results,
  });
};
