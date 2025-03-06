<template>
  <div class="blog-detail">
    <h1 class="title">{{ data.title }}</h1>
    <div class="info flex">
      <div class="view-wrap middle-flex">
        <div class="icon">
          <i style="font-size:20px" class="iconfont">&#xe64b;</i>
        </div>
        <div class="view">{{ data.views }}</div>
      </div>
    </div>
    <section class="content" v-html="data.content"></section>
  </div>
</template>

<script>
import * as Api from "@/api/blog";
import {
  ref,
  defineComponent,
  useFetch,
  useRoute,
  useMeta,
  computed,
} from "@nuxtjs/composition-api";
import { marked } from "marked";

export default defineComponent({
  head: {},
  setup() {
    const route = useRoute();
    const data = ref({});
    const { id = "" } = route.value.params;
    const title = computed(() => data.value.title);
    const content = computed(() => data.value.content);
    useMeta(() => ({
      title: title.value,
      content: content.value,
    }));
    const { fetch } = useFetch(async () => {
      let detail = await Api.detail(id);
      if (detail && detail.content) {
        try {
          detail.content = marked.parse(detail.content);
        } catch (e) {
          console.error('Error parsing markdown:', e);
          // Fallback to raw content if parsing fails
          detail.content = detail.content || '';
        }
      }
      data.value = detail;
    });
    const thumb = async () => {
      const { id, is_thumb } = data.value;
      await Api.thumb({ blog_id: id, is_thumb });
      data.value.is_thumb = !is_thumb;
      data.value.thumbs += is_thumb ? -1 : 1;
    };

    return {
      data,
      fetchData: fetch,
      thumb,
    };
  },
});
</script>

<style lang="less" scoped>
.blog-detail {
  width: 100%;
  box-sizing: border-box;
  a {
    color: #4a99ff;
  }
}
.info {
  margin-top: 30px;
  .view-wrap {
    margin-right: 15px;
    user-select: none;
    cursor: pointer;
  }
}
.content {
  display: block;
  margin-top: 30px;
  line-height: 1.8;
}

.icon {
  margin-right: 3px;
  width: 20px;
  height: 20px;
}
a {
  :hover {
    color: #4abbff;
  }
}
</style>