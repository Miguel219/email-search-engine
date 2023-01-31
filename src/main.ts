import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "sweetalert2/src/sweetalert2.scss";

import "./assets/main.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
