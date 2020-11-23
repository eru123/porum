import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    user: {},
    requireAuth: false
  },
  mutations: {
    changeAuth(state, value) {
      state.auth = value;
    },
    changeUser(state, value) {
      state.user = value;
    },
    changeRequireAuth(state, value) {
      state.requireAuth = value;
    }
  },
  actions: {},
  modules: {}
});
