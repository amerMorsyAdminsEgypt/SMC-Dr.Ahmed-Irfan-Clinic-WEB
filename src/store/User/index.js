// import state from "./state";
// import mutations from "./mutations";
// import actions from "./actions";
// import getters from "./getters";

const state = {
  user: null,
};

export default {
  state,
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    UPDATE_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    user(context, user) {
      context.commit("UPDATE_USER", user);
    },
  },
  modules: {},
};
