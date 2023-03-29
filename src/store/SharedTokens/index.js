export default {
  state: {
    branchToken: null,
    storeToken: null,
    clientToken: null,
  },
  getters: {
    branchToken: (state) => state.branchToken,
    storeToken: (state) => state.storeToken,
    clientToken: (state) => state.clientToken,
  },
  mutations: {
    UPDATE_BRANCH_TOKEN: (state, branchToken) => {
      state.branchToken = branchToken;
    },
    UPDATE_STORE_TOKEN: (state, storeToken) => {
      state.storeToken = storeToken;
    },
    UPDATE_CLIENT_TOKEN: (state, clientToken) => {
      state.clientToken = clientToken;
    },
  },
  actions: {
    updateBranchToken(context, branchToken) {
      context.commit("UPDATE_BRANCH_TOKEN", branchToken);
    },
    updateStoreToken(context, storeToken) {
      context.commit("UPDATE_STORE_TOKEN", storeToken);
    },
    updateClientToken(context, clientToken) {
      context.commit("UPDATE_CLIENT_TOKEN", clientToken);
    },
  },
  modules: {},
};
