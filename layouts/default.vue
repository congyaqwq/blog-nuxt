<template>
  <div class="page-container">
    <!-- 防止头部固定的时候闪动 -->
    <base-header></base-header>
    <main class="main">
      <transition name="fade">
        <!-- 130为距离顶部高度 -->
        <Nuxt
          class="main-content"
          :class="fixed ? 'fixed' : ''"
          :style="{
            top: `${130 - top}px`,
          }"
        />
      </transition>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script>
import {
  ref,
  defineComponent,
  nextTick,
  useContext,
} from "@nuxtjs/composition-api";
import { debounce } from "lodash";

import BaseHeader from "./BaseHeader";
import BaseFooter from "./BaseFooter";

export default defineComponent({
  name: "App",
  middleware: "isMobile",
  components: {
    BaseHeader,
    BaseFooter,
  },
  setup() {
    // 移动端侧边栏固定
    const fixed = ref(false);
    const top = ref(0);
    const { store } = useContext();
    const mobile = store.state.isMobile;

    if (process.browser) {
      window.addEventListener("scroll", () => debounceScroll());
    }

    const debounceScroll = () => {
      const scroll = debounce(onPageScroll, 200);
      scroll();
    };

    function onPageScroll() {
      // 移动端固定时，不要再判断滚动
      if (fixed.value) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      top.value = scrollTop;
      if (mobile) return;
    }

    return {
      top,
      fixed,
    };
  },
});
</script>

<style lang="less">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color);
  background-color: var(--bg);
  overflow-y: auto; /* Allow vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  min-height: 100vh;
  margin: 0;
}

.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.main-content {
  padding: 30px 10%;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
  background-color: var(--bg);
  overflow-y: auto; /* Allow vertical scrolling */
  &.fixed {
    position: fixed;
  }
}

@media (max-width: 768px) {
}

.main > .main-content:nth-child(2) {
  display: none;
}
</style>
