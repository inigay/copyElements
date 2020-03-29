import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import cardStore from "./card-store";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({ ...cardStore, plugins: [vuexLocal.plugin] });
