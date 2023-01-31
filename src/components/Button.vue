<script lang="ts">
export default {
  name: "Button",
  props: {
    condition: {
      type: Boolean,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    buttonFunction: {
      type: Function,
      required: true,
    },
  },
};
</script>

<template>
  <button
    v-if="condition"
    @click="buttonFunction()"
    class="text-xs md:text-sm text-indigo-50 transition duration-150 hover:bg-green-500 bg-cyan-600 font-semibold py-2 px-4"
    :class="customClass"
  >
    {{ text }}
  </button>
  <button
    v-else
    class="text-xs md:text-sm text-indigo-50 bg-gray-400 cursor-default font-semibold py-2 px-4"
    :class="customClass"
  >
    {{ text }}
  </button>
</template>
