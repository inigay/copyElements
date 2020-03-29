<template>
  <md-card class="app-card">
    <md-card>
      <md-card-media>
        <img :src="card.img" :title="card.title" :alt="card.title" />
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ card.title }}</div>
      </md-card-header>

      <md-card-content>
        {{ card.description }}
      </md-card-content>

      <md-card-actions>
        <slot :card="card" :click="click">
          <md-button class="md-button" @click="click">
            Add
          </md-button>
        </slot>
      </md-card-actions>
    </md-card>
  </md-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    click() {
      this.$emit("onAction", this.card);
    }
  }
};
</script>

<style scoped lang="scss">
.app-card {
  width: 240px;

  &.empty {
    visibility: hidden;
    pointer-events: none;
  }
}
</style>
