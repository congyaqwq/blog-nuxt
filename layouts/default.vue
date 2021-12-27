<template>
  <div>
    <base-header @fixed="onFixed" @cancel="onCancel"></base-header>
    <main class="main">
      <transition name="fade">
        <!-- 130为距离顶部高度 -->
        <Nuxt
          class="main-content"
          :class="isFixed ? 'fixed' : ''"
          :style="{
            top: `${130-top}px`,
          }"
        />
      </transition>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from "@nuxtjs/composition-api";
import { debounce } from "lodash";

import BaseHeader from "../layouts/BaseHeader";
import BaseFooter from "../layouts/BaseFooter";

export default defineComponent({
  name: "App",
  components: {
    BaseHeader,
    BaseFooter,
  },
  setup() {
    const isFixed = ref(false);
    const fixed = ref(false);
    const top = ref(0);

    if (process.browser) {
      window.addEventListener("scroll", ()=>debounceScroll());
    }

    const debounceScroll = () => {
      const scroll = debounce(onPageScroll, 200);
      scroll();
    };

    function onPageScroll() {
      if (isFixed.value) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      top.value = scrollTop;
    }

    const onFixed = () => {
      isFixed.value = true;
      fixed.value = true;
    };

    const onCancel = () => {
      isFixed.value = false;
      fixed.value = false;
      if (process.browser) {
        nextTick(()=> {
          window.scrollTo({ top: top.value });
        })
      }
    };

    return {
      isFixed,
      top,
      fixed,
      onFixed,
      onCancel,
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
}
.main-content {
  padding: 30px 10%;
  width: 100%;
  min-height: calc(100vh - 160px);
  box-sizing: border-box;
  background-color: var(--bg);
  &.fixed {
    position: fixed;
    padding-top: 0;
  }
}

@media (max-width: 768px) {
  .main-content {
    min-height: calc(100vh - 60px);
    padding-top: 130px;
  }
}

.main > .main-content:nth-child(2) {
  display: none;
}
</style>
