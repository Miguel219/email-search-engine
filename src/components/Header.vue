<script lang="ts">
import { mapActions, mapState } from "pinia";
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
  computed: {
    ...mapState(useEmailStore, {
      term: "getTerm",
    }),
  },
  watch: {
    searchValue(newValue) {
      if (this.term != newValue) this.changeTerm(newValue);
    },
    term(newValue) {
      if (this.searchValue != newValue) this.searchValue = newValue;
    },
  },
  methods: {
    ...mapActions(useEmailStore, ["changeTerm"]),
  },
};
</script>

<template>
  <div class="flex">
    <div class="md:hidden grid justify-items-center items-center h-20 w-15">
      <img src="../assets/icons/logo.svg" alt="icon" width="40" />
    </div>
    <Search class="w-full" v-model:text="searchValue" />
  </div>
</template>
