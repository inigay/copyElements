import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import cardStore from "./card-store.js";
import { createCard } from "../models/Card";
import { cloneDeep } from "lodash";

//Mutations
test("Mutations/AddCard and Mutations/RemoveCard", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(cardStore));

  expect(store.state.cards.length).toBe(0);

  store.commit("addCard", createCard("testImageValue", "testTextValue"));
  expect(store.state.cards.length).toBe(1);
  expect(store.state.copies.length).toBe(1);

  store.commit("removeCard", 0);
  expect(store.state.cards.length).toBe(0);
  expect(store.state.copies.length).toBe(0);
});

test("Mutations/AddCopy and Mutations/RemoveCopy", () => {
  const localVue = createLocalVue();
  const config = cloneDeep(cardStore);

  const newCard = createCard("testValue", "testValue");
  config.state.cards = [newCard];
  config.state.copies = [0];

  const store = new Vuex.Store(config);

  localVue.use(Vuex);

  store.commit("addCopy", 0);
  store.commit("addCopy", 0);

  expect(store.state.copies[0]).toEqual(2);

  store.commit("removeCopy", 0);
  store.commit("removeCopy", 0);

  expect(store.state.copies[0]).toEqual(0);

  store.commit("removeCopy", 0);
  expect(store.state.copies[0]).toEqual(-1);
});

// Actions
test("Actions/AddCard", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const config = cloneDeep(cardStore);
  const mockFn = jest.fn();
  config.mutations.addCard = mockFn;

  const store = new Vuex.Store({
    ...cloneDeep(config),
    mutations: config.mutations
  });

  const newCard = createCard("testValue", "testValue");

  store.dispatch("addCard", newCard);
  store.dispatch("addCard", newCard);
  expect(mockFn.mock.calls.length).toBe(2);
});

test("Actions/RemoveCard", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const config = cloneDeep(cardStore);
  config.state.cards = [createCard("testValue", "testValue")];
  config.state.copies = [1];
  const store = new Vuex.Store(cloneDeep(config));

  // Card that is not in the cards list will not be deleted
  const shallowCard = createCard("", "");
  store.dispatch("removeCard", shallowCard);

  expect(store.state.cards.length).toBe(1);
  expect(store.state.copies.length).toBe(1);

  // Deleting a Card from cards list will delete its copies as well
  store.dispatch("removeCard", store.state.cards[0]);
  expect(store.state.cards.length).toBe(0);
  expect(store.state.copies.length).toBe(0);
});

test("Actions/AddCopy", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const config = cloneDeep(cardStore);
  config.state.cards = [createCard("testValue", "testValue")];
  config.state.copies = [0];
  const store = new Vuex.Store(cloneDeep(config));

  const index = 0;
  store.dispatch("addCopy", store.state.cards[index]);

  expect(store.state.copies[index]).toBe(1);
});

test("Actions/RemoveCopy", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const config = cloneDeep(cardStore);
  config.state.cards = [createCard("testValue", "testValue")];
  config.state.copies = [1];
  const store = new Vuex.Store(cloneDeep(config));

  const index = 0;
  store.dispatch("removeCopy", store.state.cards[index]);

  expect(store.state.copies[index]).toBe(0);

  // Will not dicrement 0 copies
  store.dispatch("removeCopy", store.state.cards[index]);
  expect(store.state.copies[index]).toBe(0);
});
