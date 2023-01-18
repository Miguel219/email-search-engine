<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <body>
    <div class="flex">
      <header
        class="fixed h-20 w-full pl-60 top-0 bg-white drop-shadow-md z-10"
      >
        <Header />
      </header>
      <aside class="w-60 fixed left-0 top-0 h-screen bg-cyan-900 z-10">
        <Sidebar />
      </aside>
      <main class="flex-1 ml-60 mt-20 p-10">
        <RouterView />
      </main>
    </div>
  </body>
</template>
