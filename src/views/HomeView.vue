<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useEmailStore } from "../stores/emails";
import Table from "../components/Table.vue";
export default {
  components: { Table: Table },
  computed: {
    ...mapState(useEmailStore, [
      "getEmails",
      "getEmail",
      "getPage",
      "isLoading",
      "getError",
    ]),
  },
  methods: {
    ...mapActions(useEmailStore, ["fetchEmails"]),
  },
  created() {
    this.fetchEmails();
  },
};
</script>

<template>
  <div class="flex-1">
    <div class="flex items-center justify-between pb-6">
      <div>
        <h1 class="text-2xl text-gray-600 font-semibold">Correos:</h1>
        <span class="text-s text-gray-500">All products item</span>
      </div>
    </div>
    <Table />
  </div>
</template>
