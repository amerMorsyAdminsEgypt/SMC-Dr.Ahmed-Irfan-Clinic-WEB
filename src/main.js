import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/functions";
import "@/utils/axios";
import i18n from "@/i18n/index";
import firebase from "firebase/app";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import APlayer from "@moefe/vue-aplayer";
import VueFileAgent from "vue-file-agent";
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-search-select/dist/VueSearchSelect.css";

import "vue-multiselect/dist/vue-multiselect.min.css";
import "@/assets/css/app.scss";
import "@/assets/css/main.css";
import "@/assets/css/style-sidebar.css";

Vue.use(VueFileAgent);
Vue.use(VueFileAgentStyles);
Vue.use(APlayer);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueBottomSheet);
Vue.config.productionTip = false;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDXoybmv1OIgoAAaYppVhym6nnzyRhTZ4A",
  authDomain: "premco-ea302.firebaseapp.com",
  projectId: "premco-ea302",
  storageBucket: "premco-ea302.appspot.com",
  messagingSenderId: "431856949123",
  appId: "1:431856949123:web:8cadb0bd525dcadcea48b6",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
