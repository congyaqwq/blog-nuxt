<template>
  <ul class="container column-flex">
    <article v-for="it in data" :key="it.id" class="item">
      <router-link :to="{ name: 'detail-id', params: { id: it.id } }">
        <h6 class="title ellipsis">{{ it.title }}</h6>
        <p class="content">{{ it.content }}</p>
      </router-link>
      <div class="info flex">
        <div class="view-wrap middle-flex">
          <div class="icon">
            <i style="font-size:20px" class="iconfont">&#xe64b;</i>
          </div>
          <div class="view">{{ it.views }}</div>
        </div>
        <div class="thumbs-wrap middle-flex" @click.stop="thumb(it)">
          <div class="icon">
            <i v-if="it.is_thumb" class="iconfont">&#xe6e4;</i>
            <i v-else class="iconfont">&#xe708;</i>
          </div>
          <div class="thumbs">{{ it.thumbs }}</div>
        </div>
      </div>
    </article>
  </ul>
</template>

<script>
import * as Api from "@/api/blog";
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  emits: ["change"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const thumb = async (record) => {
      const { id, is_thumb } = record;
      await Api.thumb({ blog_id: id, is_thumb });
      record.is_thumb = !is_thumb;
      record.thumbs += is_thumb ? -1 : 1;
    };
    return {
      thumb,
    };
  },
});
</script>

<style lang="less" scoped>
@borderColor: rgba(150, 150, 150, 0.7);

.container {
  .item {
    position: relative;
    padding: 15px 20px;
    margin: 5px 0;
    background-color: var(--bg);
    transition: all 0.5s;
    color: var(--color);
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      transition: all 0.6s;
      border-radius: 1px;
    }
    &::before {
      top: -2px;
      left: -2px;
      border-top: 1px solid @borderColor;
      border-left: 1px solid @borderColor;
      z-index: -1;
    }
    &::after {
      bottom: -2px;
      right: -2px;
      border-bottom: 1px solid @borderColor;
      border-right: 1px solid @borderColor;
      z-index: -1;
    }
    &:hover {
      box-shadow: 3px 3px 20px #ccc;
      &::before,
      &::after {
        width: calc(100% + 3px);
        height: calc(100% + 2px);
      }
    }
    .title {
      margin-bottom: 5px;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
    }
    .content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      word-break: break-all;
      overflow: hidden;
    }
  }
}

.info {
  margin-top: 8px;
  .view-wrap {
    margin-right: 15px;
    width:50px;
  }
  .thumbs-wrap {
    cursor: pointer;
    user-select: none;
  }
}

.icon {
  margin-right: 3px;
  width: 20px;
  height: 20px;
}
</style>