<script lang="ts">
import InitialsImage from "@/components/InitialsImage.vue";
import { useEmailStore } from "@/stores/emails";
import { mapState } from "pinia";

export default {
  name: "EmailDetailView",
  components: { InitialsImage: InitialsImage },
  computed: {
    ...mapState(useEmailStore, {
      selectedEmail: "getSelectedEmail",
      term: "getTerm",
    }),
  },
  created() {
    if (this.selectedEmail == undefined) this.$router.push("/");
  },
  watch: {
    term() {
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div
    v-if="selectedEmail"
    class="truncate drop-shadow-2xl bg-white px-8 rounded-lg"
  >
    <div class="border-b-4 py-4">
      <h3 class="text-xs md:text-sm font-bold">
        {{ selectedEmail.subject }}
      </h3>
      <div class="flex">
        <p class="text-xs md:text-sm font-bold mr-1">messageID:</p>
        <p class="text-xs md:text-sm">
          {{ selectedEmail.messageID }}
        </p>
      </div>
    </div>
    <div class="border-b-4 py-4">
      <div class="flex justify-between">
        <div class="flex items-center">
          <InitialsImage
            class="w-10 md:w-12 mt-1"
            :name="selectedEmail.xFrom"
          />
          <div class="ml-1">
            <h6 class="md:text-xl">
              {{ selectedEmail.xFrom }}
            </h6>
            <p class="text-xs md:text-sm">
              {{ `<${selectedEmail.from}>` }}
            </p>
          </div>
        </div>
        <p class="text-xs md:text-sm">
          {{ selectedEmail.date }}
        </p>
      </div>
      <div class="flex mt-1">
        <p class="text-xs md:text-sm font-bold mr-1">Para:</p>
        <p class="text-xs md:text-sm">
          {{ selectedEmail.to }}
        </p>
      </div>
    </div>
    <p class="py-4" style="white-space: pre-line">
      {{ selectedEmail.body }}
    </p>
  </div>
</template>
