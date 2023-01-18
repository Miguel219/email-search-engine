import { fetchEmailsService } from "@/services/emails";
import { defineStore } from "pinia";

interface EmailStore {
  emails: any[];
  selectedEmailId?: number;
  term: string;
  page: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
  error: any;
}

export const useEmailStore = defineStore({
  id: "emails",
  state: () =>
    ({
      emails: [],
      selectedEmailId: undefined,
      term: "",
      page: 0,
      pageSize: 20,
      total: 0,
      isLoading: false,
      error: {},
    } as EmailStore),
  getters: {
    getEmails: (state) => state.emails,
    getSelectedEmail: (state) =>
      state.emails.filter((email) => email._id === state.selectedEmailId)[0],
    getTerm: (state) => state.term,
    getPage: (state) => state.page,
    getPageSize: (state) => state.pageSize,
    getTotal: (state) => state.total,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error,
  },
  actions: {
    changeTerm(newValue: string) {
      this.term = newValue;
      this.page = 0;
      this.fetchEmails();
    },
    selectEmail(id: number) {
      this.selectedEmailId = id;
      console.log(
        this.emails.filter((email) => email._id === this.selectedEmailId)[0]
      );
    },
    prevPage() {
      this.page--;
      this.fetchEmails();
    },
    nextPage() {
      this.page++;
      this.fetchEmails();
    },
    async fetchEmails() {
      this.isLoading = true;
      [this.emails, this.total, this.error] = await fetchEmailsService(
        this.term,
        this.page * this.pageSize,
        this.pageSize
      )
        .then((response): [any[], number, any] => {
          if (response) {
            const emails = response.data.hits.hits;
            return [
              emails.map((email: any) => ({
                ...email,
                _source: {
                  ...email._source,
                  date: new Date(email._source.date).toLocaleString(),
                },
              })),
              response.data.hits.total.value,
              {},
            ];
          }
          return [[], 0, {}];
        })
        .catch((error) => {
          return [[], 0, error];
        });
      this.isLoading = false;
    },
  },
});
