import Vue from "vue";
import Vuex from "vuex";

import { createCard } from "../models/Card";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: [],
    copies: []
  },
  getters: {
    cardByIndex: state => index => {
      return state.cards[index] ? state.cards[index] : false;
    },
    cardIndex: state => card => {
      return state.cards.findIndex(value => card === value);
    }
  },
  mutations: {
    addCard(state, card) {
      state.cards.push(card);
      state.copies.push(0);
    },
    removeCard(state, cardIndex) {
      if (cardIndex !== -1) state.cards.splice(cardIndex, 1);
    },
    addCopy(state, cardIndex) {
      state.copies[cardIndex]++;
      state.copies = [...state.copies];
    },
    removeCopy(state, cardIndex) {
      state.copies[cardIndex]--;
      state.copies = [...state.copies];
    }
  },
  actions: {
    addCard({ commit }, card) {
      commit("addCard", card);
    },
    removeCard({ commit, getters }, card) {
      const cardIndex = getters.cardIndex(card);
      if (cardIndex !== -1) commit("removeCard", cardIndex);
    },
    addCopy({ commit, getters }, card) {
      const cardIndex = getters.cardIndex(card);
      if (cardIndex !== -1) commit("addCopy", cardIndex);
    },
    removeCopy({ state, commit, getters }, card) {
      const cardIndex = getters.cardIndex(card);
      if (cardIndex !== -1 && state.copies[cardIndex] > 0) {
        commit("removeCopy", cardIndex);
      }
    },
    init({ commit }) {
      commit("addCard", createCard("aa", "aa"));
      commit("addCard", createCard("bb", "bb"));
      commit("addCard", createCard("cc", "cc"));
      commit("addCard", createCard("dd", "dd"));
    }
  },
  modules: {}
});
