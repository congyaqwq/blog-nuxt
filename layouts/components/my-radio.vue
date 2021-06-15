<template>
  <div class="my-radio middle-flex" :class="active" @click="changeTheme">
    <div :class="['button']"></div>
    <div :class="['button']"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@nuxtjs/composition-api";
import * as localData from "@/utils/localData";

export default defineComponent({
  setup() {
    const active = ref("system");

    return {
      active,
    };
  },
  methods: {
    changeTheme() {
      this.active = ["light"].includes(this.active) ? "dark" : "light";
      this.$colorMode.preference = this.active;
      if (process.browser) {
        localData.set("blog-color", this.active, 7 * 24);
      }
      // this.$emit('change',active)
    },
  },
  mounted() {
    const active = localData.get("blog-color");
    this.active = active || this.$colorMode.preference;
    if (process.browser) {
      localData.set("blog-color", this.active, 7 * 24);
    }
  },
});
</script>

<style lang="less" scoped>
.my-radio {
  position: relative;
  width: 60px;
  height: 20px;
  border: 2px solid #ccc;
  overflow: hidden;
  border-radius: 2px;
  background-color: #fff;
  user-select: none;
  color: #333;
  font-size: 12px;
  cursor: pointer;
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    content: "";
    width: 30px;
    height: 100%;
    background-color: #0d2538;
    transition: transform 0.3s;
  }
  &.light {
    &::after {
      transform: translateX(-30px);
    }
  }
  &.dark {
    &::after {
      transform: translateX(0px);
    }
  }
  .button {
    width: 40px;
    height: 100%;
    transform: translateX(0px);
  }
}
</style>