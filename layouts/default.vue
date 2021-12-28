<template>
  <div>
    <!-- 防止头部固定的时候闪动 -->
    <div v-if="isHeadFixed" style="height:100px"></div>
    <base-header :isFixd="isHeadFixed" @fixed="onFixed" @cancel="onCancel" ></base-header>
    <main class="main">
      <transition name="fade">
        <!-- 130为距离顶部高度 -->
        <Nuxt
          class="main-content"
          :class="fixed ? 'fixed' : ''"
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
import { ref, defineComponent, nextTick, useContext } from "@nuxtjs/composition-api";
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
    // 页面头部固定
    const isHeadFixed = ref(false);
    // 移动端侧边栏固定
    const fixed = ref(false);
    const top = ref(0);
    const { store } = useContext();
    const mobile = store.state.isMobile;

    if (process.browser) {
      window.addEventListener("scroll", ()=>debounceScroll());
    }

    const debounceScroll = () => {
      const scroll = debounce(onPageScroll, 200);
      scroll();
    };

    function onPageScroll() {
      // 移动端固定时，不要再判断滚动
      if(fixed.value) return 
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      top.value = scrollTop;
      if(mobile) return
      if(scrollTop > 200) {
        isHeadFixed.value = true;
      } else {
        isHeadFixed.value = false;
      }
      
    }

    const onFixed = () => {
      fixed.value = true;
    };

    const onCancel = (type) => {
      if (type === 'link' && process.browser) {
        return window.scrollTo(0, 0)
      }
      fixed.value = false;
      if (process.browser) {
        nextTick(()=> {
          window.scrollTo({ top: top.value });
        })
      }
    };

    return {
      isHeadFixed,
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
