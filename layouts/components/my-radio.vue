<template>
  <div class="my-radio middle-flex" :class="active" @click="changeTheme">
    <div :class="['button']"></div>
    <div :class="['button']"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const active = ref("light");

    return {
      active,
    };
  },
  methods: {
    changeTheme() {
      this.active = this.active === "light" ? "dark" : "light";
      console.log(this.active, 1);
      this.$colorMode.preference = this.active;
      // this.$emit('change',active)
    },
  },
  mounted() {
    this.active = this.$colorMode.preference;
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
    cursor: pointer;
    transform: translateX(0px);
  }
}
</style>