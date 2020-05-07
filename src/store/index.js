import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const LocalStorage = window.localStorage;

export default new Vuex.Store({
  state: {
    test: "Hello world",
  },
  mutations: {
    mutateTest(state, value) {
      state.test = value;
    },
    mutateState(state, value) {
      Object.assign(state, value);
    },
  },
  actions: {
    setTest({ commit, dispatch }, value) {
      commit("mutateTest", value);
      dispatch("saveState");
    },
    saveState({ state }) {
      LocalStorage.setItem("settings", JSON.stringify(state));
    },
    getState({ commit }) {
      if (LocalStorage.getItem("state"))
        commit("mutateState", JSON.parse(LocalStorage.getItem("state")));
    },
  },
  getters: {
    test: (state) => {
      return state.test;
    },
  },
  modules: {},
});
