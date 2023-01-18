<script lang="ts">
import { mapActions, mapState } from "pinia";
import Button from "../components/Button.vue";
import type { ColumnTypes } from "../components/Table.vue";
import Table from "../components/Table.vue";
import { useEmailStore } from "../stores/emails";

export default {
  name: "EmailsView",
  components: { Table: Table, Button: Button },
  data() {
    return {
      columns: [
        {
          name: "Fecha",
          key: "date",
        },
        {
          name: "De",
          key: "from",
        },
        {
          name: "Para",
          key: "to",
        },
        {
          name: "Asunto",
          key: "subject",
        },
        {
          name: "Acciones",
          key: "actions",
          type: "button",
        },
      ] as ColumnTypes[],
    };
  },
  computed: {
    ...mapState(useEmailStore, {
      emails: "getEmails",
      page: "getPage",
      pageSize: "getPageSize",
      total: "getTotal",
      term: "getTerm",
      isLoading: "getIsLoading",
    }),
  },
  methods: {
    ...mapActions(useEmailStore, [
      "fetchEmails",
      "prevPage",
      "nextPage",
      "selectEmail",
    ]),
    goToEmailDetail(_: any, email: any) {
      this.selectEmail(email._id);
      this.$router.push("/email");
    },
  },
  created() {
    this.fetchEmails();
  },
};
</script>

<template>
  <div class="flex-1">
    <div class="pb-5">
      <h3 class="text-gray-600 font-semibold">Correos:</h3>
      <span
        class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
      >
        <span
          aria-hidden
          class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
        ></span>
        <span class="relative">{{
          term ? `Resultados de "${term}"` : "Todos los correos"
        }}</span>
      </span>
    </div>
    <Table
      :columns="columns"
      :data="
        emails.map((email) => ({
          _id: email._id,
          from: email._source.from ?? 'N/A',
          to: email._source.to ?? 'N/A',
          date: email._source.date ?? 'N/A',
          subject: email._source.subject ?? 'N/A',
          actions: 'Ver detalle',
        }))
      "
      :is-loading="isLoading"
      :page="page"
      :page-size="pageSize"
      :total="total"
      :prev-function="prevPage"
      :next-function="nextPage"
      :button-function="goToEmailDetail"
    />
  </div>
</template>
