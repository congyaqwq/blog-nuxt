<template>
  <div>
    <h1>正在开发中...</h1>
    <h2>grid gridTemplateAreas属性， 仅提供a-i的值，.代表此位置为空</h2>
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

<style>
</style>