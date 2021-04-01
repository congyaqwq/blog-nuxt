<template>
  <div class="blog-detail">
    <h1 class="title">{{ data.title }}</h1>
    <div class="info flex">
      <div class="view-wrap middle-flex">
        <div class="icon">
          <img src="@/static/eyes.svg" alt />
        </div>
        <div class="view">{{ data.views }}</div>
      </div>
      <div class="thumbs-wrap middle-flex" @click="thumb">
        <div class="icon">
          <img v-if="data.is_thumb" src="@/static/thumb_fill.svg" alt />
          <img v-else src="@/static/thumb.svg" alt />
        </div>
        <div class="thumbs">{{ data.thumbs }}</div>
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
import marked from "marked";

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
      detail.content = marked(detail.content);
      data.value = detail;
    });
    const thumb = async () => {
      const { id, is_thumb } = data.value;
      await Api.thumb({ blog_id: id, is_thumb });
      this.data.is_thumb = !is_thumb;
      this.data.thumbs += is_thumb ? -1 : 1;
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
}
.info {
  margin-top: 30px;
  .view-wrap {
    margin-right: 15px;
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
</style>