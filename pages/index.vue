<template>
  <div>
    <div class="flex">
      <blog-list class="blog-list" :data="list"></blog-list>
      <search-filter class="mobile-hid"></search-filter>
    </div>
    <div v-if="showTips" class="bottom">暂时没有更多啦～</div>
    <div
      :class="top > 500 && !mobile ? '' : 'hidden'"
      class="top-icon"
      @click="toTop"
    >
      <img src="@/static/top.svg" alt />
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, useContext } from "@nuxtjs/composition-api";
import useBlog from "@/composables/useBlog";
import { debounce } from "lodash";

import BlogList from "@/components/index/blog-list";
import SearchFilter from "@/components/index/search-filter";

export default defineComponent({
  middleware: "isMobile",
  components: {
    BlogList,
    SearchFilter,
  },
  setup() {
    const { store } = useContext();
    const mobile = ref(store.state.isMobile);

    const { list, payload, total, hasMore, fetch } = useBlog();
    const top = ref(0);
    const showTips = ref(!hasMore.value || true);

    function onPageScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const getWindowHeight = document.documentElement.clientHeight;
      const getDocumentTop = document.documentElement.offsetHeight;
      top.value = scrollTop;
      // 到底部了
      if (scrollTop + getWindowHeight >= getDocumentTop) {
        if (!hasMore.value) return;
        payload.page += 1;
        fetch();
      }
    }
    const debounceScroll = () => {
      const scroll = debounce(onPageScroll, 200);
      scroll();
    };

    if (process.browser) {
      window.addEventListener("scroll", debounceScroll);
    }

    const toTop = () => {
      if (process.browser) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    // return total之后才可以在服务端返回
    return {
      mobile,
      showTips,
      list,
      top,
      payload,
      total,
      toTop,
    };
  },
});
</script>

<style lang="less" scoped>
.top-icon {
  position: fixed;
  bottom: 100px;
  right: 100px;
  padding: 10px;
  width: 50px;
  height: 50px;
  background-color: #333;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.5s;
  opacity: 1;
  &.hidden {
    opacity: 0;
  }
}
.bottom {
  padding: 30px 0;
  margin-right: 300px;
  text-align: center;
}
.blog-list {
  flex: 1;
}
@media (max-width: 768px) {
  .blog-list {
    width: 100%;
  }
  .bottom {
    margin-right: 0px;
  }
}
</style>