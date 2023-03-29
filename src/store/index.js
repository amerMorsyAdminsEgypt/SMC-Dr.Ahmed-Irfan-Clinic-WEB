import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

import UserData from "./UserData";
import SharedTokens from "./SharedTokens";
import Reservations from "./Reservations";

const ls = new SecureLS({ isCompression: false });
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserData,
    SharedTokens,
    Reservations,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
