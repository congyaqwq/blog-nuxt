<template>
  <aside ref="tagDom" class="tag-list">
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
      list.value = list.value.concat(tagsList || []);
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
    display: flex;
    flex-wrap: wrap;
    width: 300px;
    height: fit-content;
    padding: 15px;
    background-color: var(--bg-filter);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    gap: 10px;
    
    &.fixed {
      position: fixed;
      top: 130px;
      right: calc(10% - 20px);
      animation: fade 0.8s;
      z-index: 10;
    }
  }
  .tag-item {
    text-align: center;
    padding: 6px 14px;
    min-width: 50px;
    height: auto;
    line-height: 1.5;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    background-color: var(--bg-secondary);
    border-radius: 20px;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    &.active {
      background-color: var(--color-primary);
      color: white;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
}
@media (max-width: 768px) {
  .tag-list {
    margin-top: 30px;
    width: 100%;
    margin-left: 20px;
    
    .tag-wrap {
      width: 150px;
      padding: 12px;
      justify-content: center;
      
      .tag-item {
        margin-bottom: 8px;
        font-size: 0.85rem;
      }
    }
  }
}

@keyframes fade {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
