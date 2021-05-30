<template>
  <aside ref="tagDom" class="tag-list">
    <ul class="tag-wrap flex" :class="isFixed ? 'fixed' : ''">
      <li
        v-for="it in list"
        :key="it.id"
        class="tag-item"
        :class="current == it.id ? 'active' : ''"
        @click="findByTag(it)"
      >
        {{ it.name }}
      </li>
    </ul>
  </aside>
</template>

<script>
import {
  ref,
  watch,
  defineComponent,
  useFetch,
  useRouter,
  useContext,
  onMounted,
} from "@nuxtjs/composition-api";
import { useRoute } from "@nuxtjs/composition-api";
import { debounce } from "lodash";

import * as Api from "@/api/tags";

export default defineComponent({
  middleware: "isMobile",
  emits: ["change"],
  setup(props, { emit }) {
    const { store } = useContext();
    const mobile = store.state.isMobile;

    const route = useRoute();
    const { tags = "" } = route.value.query;
    const current = ref(tags);
    const router = useRouter();

    const tagDom = ref(null);

    const list = ref([]);
    const top = ref(0);
    const isFixed = ref(false);

    watch(
      () => route.value.query,
      (query) => {
        const { tags = "" } = query;
        current.value = tags;
      }
    );

    const { fetch } = useFetch(async () => {
      list.value = [{ id: "", name: "全部" }];
      const { list: tagsList } = await Api.list();
      list.value = list.value.concat(tagsList);
    });
    const findByTag = ({ id }) => {
      router.replace({ query: { tags: id } });
      emit("change", { tags: id });
    };

    const onPageScroll = () => {
      if (!tagDom || mobile) return;
      const top = tagDom.value.getBoundingClientRect().top;
      if (top < -200) {
        isFixed.value = true;
      } else {
        isFixed.value = false;
      }
    };

    const debounceScroll = () => {
      const scroll = debounce(onPageScroll, 200);
      scroll();
    };

    onMounted(() => {
      if (process.browser) {
        window.addEventListener("scroll", debounceScroll);
      }
    });

    return {
      list,
      top,
      isFixed,
      fetchData: fetch,
      current,
      mobile,
      findByTag,
      tagDom,
    };
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
    background-color: var(--bg-filter);
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