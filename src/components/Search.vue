<script lang="ts">
import { debounce } from "lodash";
export default {
  name: "Search",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateInternalValue(event: any) {
      this.updateValue(event.target.value);
    },
    updateValue(value: string) {
      this.$emit("update:text", value);
    },
  },
  emits: ["update:text"],
  created() {
    this.updateValue = debounce(this.updateValue, 1000);
  },
};
</script>

<template>
  <div
    class="flex bg-gray-100 items-center mx-12 my-5 p-2 shadow rounded-lg overflow-hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
    <input
      class="bg-gray-100 outline-none ml-1 block w-full"
      type="text"
      :value="text"
      @input="updateInternalValue"
      placeholder="Search..."
    />
  </div>
</template>
