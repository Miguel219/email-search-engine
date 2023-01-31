<script lang="ts">
import { useEmailStore } from "@/stores/emails";
import { mapActions } from "pinia";

export default {
  name: "EmailsView",
  methods: {
    ...mapActions(useEmailStore, ["changeTerm"]),
    goToEmails() {
      this.changeTerm("");
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div class="grid justify-items-center items-center bg-cyan-600 h-20">
    <img src="../assets/icons/logo.svg" alt="icon" width="40" class="mt-1" />
    <h5 class="text-white font-bold">Email Search Engine</h5>
  </div>
  <div
    class="mt-1 flex justify-evenly items-center bg-cyan-800 h-20 hover:bg-cyan-500 hover:font-bold cursor-pointer"
    v-on:click="goToEmails"
  >
    <img src="../assets/icons/list.svg" alt="icon" width="20" />
    <h5 class="text-white">Todos los correos</h5>
  </div>
</template>
