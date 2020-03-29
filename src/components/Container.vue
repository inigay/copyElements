<template>
  <div class="container">
    <div class="left-side">
      <template v-for="(card, index) in cards">
        <Card
          :key="index"
          :card="card"
          @onAction="addCopy"
          :action-name="'Add'"
        />
      </template>
    </div>
    <div>
      <h1>Copies</h1>
      <div>{{ copies }}</div>
    </div>
    <div class="right">
      <template v-for="(copy, index) in copies">
        <div :key="index">
          <Card
            :card="cardByIndex(index)"
            :action-name="'Remove'"
            @onAction="removeCopy"
          />
          <span>{{ copy }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Container",
  components: { Card },
  props: {
    msg: String
  },
  beforeCreate() {
    this.$store.dispatch("init");
  },
  computed: {
    cards() {
      return this.$store.state.cards;
    },
    copies() {
      return this.$store.state.copies;
    }
  },
  methods: {
    addCopy(card) {
      this.$store.dispatch("addCopy", card);
    },
    removeCopy(card) {
      this.$store.dispatch("removeCopy", card);
    },
    cardByIndex(index) {
      return this.$store.getters.cardByIndex(index);
    }
  }
};
</script>

<style scoped lang="scss"></style>
