import { axiosInstance } from "@/axios/AxiosInstance";
import { inject } from "vue";

export const fetchEmailsService = async (
  term: string,
  from: number,
  max_results: number
) => {
  const axios = axiosInstance;
  return axios.post(
    "emails/_search",
    JSON.stringify({
      search_type: term ? "matchphrase" : "alldocuments",
      query: {
        term,
        start_time: "2023-01-01T19:14:45-06:00",
      },
      sort_fields: ["-@timestamp"],
      from,
      max_results,
      _source: [],
    })
  );
};
