import { searchEmailsService, fetchEmailsService } from "@/services/emails";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

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
      state.emails.filter((email) => email.id === state.selectedEmailId)[0],
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
      this.selectedEmailId = undefined;
      this.fetchEmails();
    },
    selectEmail(id: number) {
      this.selectedEmailId = id;
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
      [this.emails, this.total, this.error] = await (this.term
        ? searchEmailsService(
            this.term,
            this.page * this.pageSize,
            this.pageSize
          )
        : fetchEmailsService(this.page * this.pageSize, this.pageSize)
      )
        .then((response: any): [any[], number, any] => {
          if (response) {
            return [
              response.data.emails.map((email: any) => ({
                ...email,
                date: new Date(email.date).toLocaleString(),
              })),
              response.data.total,
              {},
            ];
          }
          return [[], 0, {}];
        })
        .catch((error) => {
          Swal.fire({
            text: "Error de conexión con el servidor",
            icon: "error",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          return [[], 0, error];
        });
      this.isLoading = false;
    },
  },
});
