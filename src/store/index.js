import Vue from "vue";
import Vuex from "vuex";
import cardStore from "./card-store";

Vue.use(Vuex);

export default new Vuex.Store(cardStore);
