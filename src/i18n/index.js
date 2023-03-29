import Vue from "vue";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";
import VueI18n from "vue-i18n";
import { mapGetters } from "vuex";

Vue.use(VueI18n);

const messages = {
  ar: ar,
  en: en,
  und: ar,
};

export default new VueI18n({
  locale: localStorage.getItem("userLanguage") || "ar",
  messages: messages,
  computed: {
    ...mapGetters(["userLanguage"]),
  },
});
