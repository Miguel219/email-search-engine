import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { CREDS_BASE64, HOST } from "../types/server_host";

export const useEmailStore = defineStore({
  id: "emails",
  state: () => ({
    emails: [],
    email: {},
    page: 0,
    loading: false,
    error: {},
  }),
  getters: {
    getEmails: (state) => state.emails,
    getEmail: (state) => state.email,
    getPage: (state) => state.page,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  actions: {
    async fetchEmails() {
      this.loading = true;
      try {
        var emailsss = await fetch(HOST + "/api/emails/_search", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Authorization: "Basic " + CREDS_BASE64,
          },
          body: JSON.stringify({
            search_type: "matchphrase",
            query: {
              term: "hello",
              start_time: "2023-01-01T19:14:45-06:00",
            },
            sort_fields: ["-@timestamp"],
            from: 0,
            max_results: 20,
            _source: [],
          }),
        })
          .then((response) => {
            if (!response.ok) throw response.statusText;
            return response.json();
          })
          .then((data) => {
            console.log("Dataaa");
            console.log(data);
          });
      } catch (error: any) {
        console.log(error);
        this.emails = [];
        this.error = error;
      } finally {
        this.loading = false;
        console.log("FIN");
      }
    },
  },
});
