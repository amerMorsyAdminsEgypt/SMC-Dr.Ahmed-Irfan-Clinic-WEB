import { checkLoginForShowSidebar } from "@/utils/functions";
import UserPrivilege from "@/models/privileges/UserPrivilege";

export default {
  state: {
    userData: null,
    usersPrivilegeData: null,
    currentTab: null,
  },
  getters: {
    userData: (state) => state.userData,
    usersPrivilegeData: (state) => state.usersPrivilegeData,
    currentTab: (state) => state.currentTab,
  },
  mutations: {
    UPDATE_USER_DATA: (state, userData) => {
      state.userData = userData;
      state.usersPrivilegeData = new UserPrivilege();
      if (userData) {
        state.usersPrivilegeData.fillData(userData.usersPrivilegeData);
      }
      checkLoginForShowSidebar();
    },
    UPDATE_HISTORICAL_CURRENT_TAB: (state, currentTab) => {
      state.currentTab = currentTab;
    },
  },
  actions: {
    loginUser(context, userData) {
      context.commit("UPDATE_USER_DATA", userData);
    },
    updateUserData(context, userData) {
      context.commit("UPDATE_USER_DATA", userData);
    },
    updateCurrentTab(context, currentTab) {
      context.commit("UPDATE_HISTORICAL_CURRENT_TAB", currentTab);
    },
  },
  modules: {},
};
