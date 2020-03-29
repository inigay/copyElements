<template>
  <div class="card">
    <span>{{ card.img }}</span>
    <span>{{ card.text }}</span>
    <span>
      <button @click="click">{{ actionName }}</button>
    </span>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true
    },
    actionName: {
      type: String,
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

<style></style>
