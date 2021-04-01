<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <base-header @fixed="onFixed" @cancel="onCancel"></base-header>
    <main class="main">
      <transition name="fade">
        <Nuxt
          class="main-content"
          :class="isFixed ? 'fixed' : ''"
          :style="{
            top: `-${top - (fixed ? 0 : 100)}px`,
          }"
        />
      </transition>
      <!-- <router-view
        class="main-content"
        v-slot="{ Component }"
        :class="isFixed ? 'fixed' : ''"
        :style="{
          top: `-${top - (fixed ? 0 : 100)}px`,
          paddingTop: isMobile() ? '130px' : '30px',
        }"
      >
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view> -->
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script>
import { ref, defineComponent } from "@nuxtjs/composition-api";
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
      window.addEventListener("scroll", debounceScroll);
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
      fixed.value = fixed;
    };
    const onCancel = () => {
      isFixed.value = false;
      fixed.value = false;
      if (process.browser) {
        // this.$nextTick(() => {
        window.scrollTo({ top: this.top });
        // });
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
  color: #2c3e50;
}
.main-content {
  padding: 30px 10%;
  width: 100%;
  min-height: calc(100vh - 160px);
  box-sizing: border-box;
  padding-top: 30px;
  &.fixed {
    position: fixed;
  }
}

@media (max-width: 768px) {
  .main-content {
    min-height: calc(100vh - 60px);
    padding-top: 130px;
    &.fixed {
      padding-top: 30px;
    }
  }
}

.main > .main-content:nth-child(2) {
  display: none;
}
</style>
