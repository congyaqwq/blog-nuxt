<template>
  <div>
    <h2>grid gridTemplateAreas属性， 仅提供a-i的值，.代表此位置为空</h2>
    <textarea name="" id="" cols="30" rows="10" v-model="template"></textarea>
    <div class="container" :style="{ gridTemplateAreas: template }">
      <div
        v-for="it in list"
        :key="it"
        :class="it"
        class="item"
        :style="{ gridArea: it }"
      ></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const template = ref(`
     "a . . . e f"
     "b . . g . ."
     "c d . . h i"
    `);
    return { list: ["a", "b", "c", "d", "e", "f", "g", "h", "i"], template };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 250px;
  height: 250px;
  display: grid;
  place-items: center;
  grid-template-rows: repeat(3, 50px);
  grid-template-areas:
    "a . . . e f"
    "b . . g . ."
    "c d . . h i";
}
.item {
  width: 50px;
  height: 50px;
  background-color: #4a99ff;
  border-radius: 12px;
}
</style>