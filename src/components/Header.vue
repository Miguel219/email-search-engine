<script lang="ts">
import { mapActions } from "pinia";
import { useEmailStore } from "../stores/emails";
import Search from "./Search.vue";
export default {
  name: "Header",
  components: {
    Search: Search,
  },
  data() {
    return {
      searchValue: "",
    };
  },
  watch: {
    searchValue(newValue) {
      this.changeTerm(newValue);
    },
  },
  methods: {
    ...mapActions(useEmailStore, ["changeTerm"]),
  },
};
</script>

<template>
  <Search v-model:text="searchValue" />
</template>
