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
    }),
  },
  created() {
    if (this.selectedEmail == undefined) this.$router.push("/");
  },
};
</script>

<template>
  <div v-if="selectedEmail" class="drop-shadow-2xl bg-white px-8 rounded-lg">
    <div class="border-b-4 py-4">
      <h3 class="font-bold">
        {{ selectedEmail._source.Subject }}
      </h3>
      <div class="flex">
        <p class="font-bold mr-1">Message-ID:</p>
        <p>
          {{ selectedEmail._source["Message-ID"] }}
        </p>
      </div>
    </div>
    <div class="border-b-4 py-4">
      <div class="flex justify-between">
        <div class="flex items-center">
          <InitialsImage :name="selectedEmail._source['X-From']" />
          <div class="ml-1">
            <h5>
              {{ selectedEmail._source["X-From"] }}
            </h5>
            <p>
              {{ `<${selectedEmail._source.From}>` }}
            </p>
          </div>
        </div>
        <p>
          {{ selectedEmail._source.Date }}
        </p>
      </div>
      <div class="flex mt-1">
        <p class="font-bold mr-1">Para:</p>
        <p>
          {{ selectedEmail._source.To }}
        </p>
      </div>
    </div>
    <p class="py-4" style="white-space: pre-line">
      {{ selectedEmail._source.Body }}
    </p>
  </div>
</template>
