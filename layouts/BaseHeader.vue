
<template>
  <div
    ref="head"
    class="head middle-flex between-flex"
    :class="fixed ? 'fixed' : ''"
  >
    <div class="left middle-flex">
      <div class="avatar">
        <my-image
          title="莱纳你坐啊"
          :src="require('@/static/youdoa.png')"
        ></my-image>
      </div>
      <div class="column-flex">
        <div class="name bold">{{ config.USERNAME }}</div>
        <!-- Front End Engineer -->
        <div class="work">{{ config.JOB }}</div>
      </div>
      <my-search v-model="keyword" @search="search"></my-search>
    </div>
    <div v-if="!isMobile()" class="right">
      <div class="nav-bar middle-flex">
        <router-link
          :to="{ name: value }"
          v-for="(value, key) in navMap"
          :key="key"
          class="center-flex item"
          :class="$route.name === value ? 'active' : ''"
          >{{ key }}</router-link
        >
      </div>
    </div>
    <div v-else class="mobile" @click="showMenu">
      <img src="@/static/功能.svg" />
    </div>
    <div v-if="visible" class="mobile-menu">
      <div class="bg" @click="hideMenu"></div>
      <div class="menu">
        <router-link
          :to="{ name: value }"
          v-for="(value, key) in navMap"
          :key="key"
          class="center-flex item"
          :class="$route.name === value ? 'active' : ''"
          @click="hideMenu('link')"
          >{{ key }}</router-link
        >
        <search-filter
          v-if="$route.name == 'index'"
          @change="hideMenu"
        ></search-filter>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, defineComponent } from "@nuxtjs/composition-api";
import { useRoute } from "@nuxtjs/composition-api";
import { debounce } from "lodash";
import { navMap } from "@/constants/user";
import config from "@/config";
import SearchFilter from "@/pages/components/search-filter";
import MyImage from "@/common/my-image";
import MySearch from "@/common/my-search";

export default defineComponent({
  components: {
    SearchFilter,
    MyImage,
    MySearch,
  },
  emits: ["fixed", "cancel"],
  setup() {
    const route = useRoute();
    const keyword = ref("");
    const fixed = ref(false);
    const visible = ref(false);

    onMounted(() => {
      setTimeout(() => {
        keyword.value = route.value.query.keyword;
      }, 200);
    });
    return {
      keyword,
      fixed,
      visible,
      navMap,
      config,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.debounceScroll);
  },
  methods: {
    onPageScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 200) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
    debounceScroll() {
      const scroll = debounce(this.onPageScroll, 200);
      scroll();
    },
    showMenu() {
      this.visible = true;
      this.$emit("fixed", this.fixed);
    },
    hideMenu(type) {
      if (type === "link") {
        window.scrollTo(0, 0);
      }
      this.visible = false;
      this.$emit("cancel");
    },
    search() {
      const { keyword } = this;
      // this.$router.replace({ query: { tags: id } });
      this.$router.replace({
        query: {
          keyword,
        },
      });
    },
  },
});
</script>

<style lang="less" scoped>
.head {
  position: relative;
  top: 0;
  padding: 0 10%;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  z-index: 2;
  &.fixed {
    animation: fadeInDown 0.3s linear;
    position: fixed;
    top: 0;
    z-index: 10;
  }
  .left {
    .avatar {
      margin-right: 10px;
    }
    .name {
      margin-bottom: 3px;
      font-size: 20px;
    }
  }
  .right {
    .nav-bar {
      height: 100%;
      .item {
        position: relative;
        width: 110px;
        padding: 35px 20px;
        line-height: 30px;
        cursor: pointer;
        transition: all 0.3s;
        box-sizing: border-box;
        &.active {
          font-weight: bold;
        }
        &:hover {
          font-weight: bold;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .head {
    padding: 0 5%;
    position: fixed;
    &.fixed {
      animation: none;
    }
    .mobile {
      img {
        width: 30px;
        height: 30px;
      }
    }
    .mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.49;
        transition: opacity 0.5s;
      }
      .menu {
        position: relative;
        padding-top: 10px;
        width: 60%;
        height: 100%;
        background-color: #fff;
        animation: leftToRight 0.3s linear;
        .item {
          padding: 20px;
          border-bottom: 2px solid #eee;
          &.active {
            font-weight: bold;
          }
        }
      }
    }
  }
}

@keyframes leftToRight {
  0% {
    width: 40%;
    opacity: 0.5;
  }
  100% {
    width: 60%;
    opacity: 1;
  }
}
</style>