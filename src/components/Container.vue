<template>
  <div class="container">
    <CardList />
    <CopyList />
  </div>
</template>

<script>
import CardList from "./CardList";
import CopyList from "./CopyList";

export default {
  name: "Container",
  components: { CopyList, CardList },
  beforeCreate() {
    this.$store.dispatch("init");
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
