<template>
  <div ref="tag" class="tag-list">
    <div class="tag-wrap flex" :class="isFixed ? 'fixed' : ''">
      <div
        v-for="it in list"
        :key="it.id"
        class="tag-item"
        :class="current == it.id ? 'active' : ''"
        @click="findByTag(it)"
      >
        {{ it.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, defineComponent } from "@nuxtjs/composition-api";
import { useRoute } from "@nuxtjs/composition-api";

import * as Api from "@/api/tags";

export default defineComponent({
  emits: ["change"],
  setup() {
    const route = useRoute();
    const { tags = "" } = route.value.query;
    const current = ref(tags);
    watch(
      () => route.value.query,
      (query) => {
        const { tags = "" } = query;
        current.value = tags;
      }
    );
    const list = ref([]);
    const top = ref(0);
    const isFixed = ref(false);
    const fetchData = async () => {
      list.value = [{ id: "", name: "全部" }];
      const { list: tagsList } = await Api.list();
      list.value = list.value.concat(tagsList);
    };
    return { list, top, isFixed, fetchData, current };
  },
  mounted() {
    this.fetchData();
    window.addEventListener("scroll", this.onPageScroll);
  },
  methods: {
    onPageScroll() {
      if (!this.$refs.tag || this.isMobile()) return;
      const top = this.$refs.tag.getBoundingClientRect().top;
      // this.top = window.scrollY || document.documentElement.scrollTop;
      if (top < -200) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
    findByTag({ id }) {
      this.$router.replace({ query: { tags: id } });
      this.$emit("change", { tags: id });
    },
  },
});
</script>

<style lang="less" scoped>
.tag-list {
  height: fit-content;
  width: 300px;
  margin-left: 20px;
  min-height: 40px;
  .tag-wrap {
    flex-wrap: wrap;
    width: 300px;
    height: fit-content;
    padding: 10px;
    background-color: #eee;
    border-radius: 12px;
    &.fixed {
      position: fixed;
      top: 130px;
      right: calc(10% - 20px);
      animation: fade 0.8s;
    }
  }
  .tag-item {
    text-align: center;
    padding: 5px 10px;
    min-width: 50px;
    height: 40px;
    line-height: 40px;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    &:hover {
      font-weight: bold;
    }
    &.active {
      font-weight: bold;
    }
  }
}
@media (max-width: 768px) {
  .tag-list {
    margin-top: 30px;
    width: 60%;
    .tag-wrap {
      width: 100%;
      .tag-item {
        width: 100%;
      }
    }
  }
}
</style>