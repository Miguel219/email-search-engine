<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Search from "./components/Search.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
  <body>
    <div class="flex">
      <header class="fixed h-16 w-full pl-44 top-0 bg-red-400 z-10">
        <Search />
      </header>
      <aside class="w-44 fixed left-0 top-0 h-screen bg-slate-700 z-10">
        <Sidebar />
      </aside>
      <main class="flex-1 ml-44 mt-16 p-10">
        <RouterView />
      </main>
    </div>
  </body>
</template>
