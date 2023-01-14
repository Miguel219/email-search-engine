<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <body>
    <RouterView />
  </body>
</template>

<style scoped>
body {
  max-height: 100vh;
  min-width: 100vw;
}
</style>
