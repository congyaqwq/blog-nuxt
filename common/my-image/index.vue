<template>
  <div
    class="img-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <img v-if="src" :src="src" alt :title="title" />
    <span v-else>🈚️</span>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    src: {
      type: String,
    },
    title: {
      type: String,
    },
    width: {
      type: Number,
      default: 60,
    },
    height: {
      type: Number,
      default: 60,
    },
  },
});
</script>

<style lang="less" scoped>
.img-container {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>