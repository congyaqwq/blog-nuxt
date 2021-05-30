<template>
  <div class="relationship">
    {{ $colorMode.value }}
    <h1 @click="$colorMode.preference = 'dark'">正在开发中...</h1>
    <grid></grid>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import Grid from "@/components/fun/grid.vue";

export default defineComponent({
  components: {
    Grid,
  },
});
</script>

<style lang="less" scopde>
.relationship {
  color:var(--color);
  background-color: var(--bg);
}
</style>