<template>
  <footer class="footer center-flex">
    <a target="_blank" href="https://beian.miit.gov.cn">
      赣ICP备2021002067号-1</a
    >
  </footer>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({});
</script>

<style lang="less" scoped>
.footer {
  position: relative;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: var(--bg);
  margin-top: auto;
}
</style>