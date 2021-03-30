<template>
  <div class="blog-detail">
    <h1 class="title">{{ data.title }}</h1>
    <div class="info flex">
      <div class="view-wrap middle-flex">
        <div class="icon">
          <img src="@/static/轮回眼.svg" alt />
        </div>
        <div class="view">{{ data.views }}</div>
      </div>
      <div class="thumbs-wrap middle-flex" @click="thumb">
        <div class="icon">
          <img v-if="data.is_thumb" src="@/static/点赞_fill.svg" alt />
          <img v-else src="@/static/点赞.svg" alt />
        </div>
        <div class="thumbs">{{ data.thumbs }}</div>
      </div>
    </div>
    <section class="content" v-html="data.content"></section>
  </div>
</template>

<script>
import * as Api from "@/api/blog";
import { ref, onMounted, defineComponent } from "@nuxtjs/composition-api";
import { useRoute } from "@nuxtjs/composition-api";
import marked from "marked";

export default defineComponent({
  data() {
    return {};
  },
  setup() {
    const route = useRoute();
    const data = ref({});
    const { id } = route.query;
    const fetchData = async () => {
      let detail = await Api.detail(id);
      detail.content = marked(detail.content);
      data.value = detail;
    };

    onMounted(fetchData);

    return {
      data,
      fetchData,
    };
  },
  methods: {
    async thumb() {
      const { id, is_thumb } = this.data;
      await Api.thumb({ blog_id: id, is_thumb });
      this.data.is_thumb = !is_thumb;
      this.data.thumbs += is_thumb ? -1 : 1;
    },
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