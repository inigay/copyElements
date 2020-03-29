<template>
  <div class="left-side">
    <template v-for="(card, index) in cards">
      <Card :key="index" :card="card" @onAction="addCopy" />
    </template>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "CardList",
  components: { Card },
  computed: {
    cards() {
      return this.$store.state.cards;
    }
  },
  methods: {
    addCopy(card) {
      this.$store.dispatch("addCopy", card);
    }
  }
};
</script>

<style lang="scss" scoped>
.left-side > * {
  margin-bottom: 2rem;
}
</style>
