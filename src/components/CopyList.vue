<template>
  <div class="right-side">
    <template v-for="(copy, index) in copies">
      <div :key="index" v-slide="copy">
        <Card
          :class="{ empty: copy < 1 }"
          :card="cardByIndex(index)"
          @onAction="removeCopy"
        >
          <template v-slot:default="{ card, click }">
            <div class="actions">
              <span class="total-copies">Total: {{ copy }}</span>
              <md-button class="md-button" @click="click">
                Remove
              </md-button>
            </div>
          </template>
        </Card>
      </div>
    </template>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "CopyList",
  components: { Card },
  computed: {
    copies() {
      return this.$store.state.copies;
    }
  },
  methods: {
    removeCopy(card) {
      this.$store.dispatch("removeCopy", card);
    },
    cardByIndex(index) {
      return this.$store.getters.cardByIndex(index);
    }
  }
};
</script>

<style scoped lang="scss">
.right-side > * {
  margin-bottom: 2rem;
  position: relative;

  .shallow {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    transition: all 0.2s ease;

    .actions {
      visibility: hidden;
      pointer-events: none;
    }
  }

  .slide-bloat {
    transition: transform 0.1s ease;
  }
}

.total-copies {
  color: #e20000;
  text-transform: uppercase;
}

.actions {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
}
</style>
