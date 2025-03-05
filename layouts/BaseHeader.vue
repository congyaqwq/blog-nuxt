<template>
  <header ref="head" class="head middle-flex between-flex" :class="fixed">
    <div class="left middle-flex">
      <div class="avatar">
        <my-image title="avatar 头像" :src="require('@/static/youdoa.png')"></my-image>
      </div>
      <div class="column-flex">
        <div class="name bold">{{ config.USERNAME }}</div>
        <div class="work">{{ config.JOB }}</div>
      </div>
      <my-search v-model="keyword" @search="search"></my-search>
    </div>
    <div class="middle-flex">
      <span class="mobile-hid">主题：</span>
      <my-radio></my-radio>
    </div>
    <div class="mobile mobile-show" @click="visible ? hideMenu() : showMenu()">
      <div class="hamburger-menu" :class="{ 'active': visible }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="right mobile-hid">
      <nav class="nav-bar middle-flex">
        <router-link
          :to="{ name: value }"
          v-for="(value, key) in navMap"
          :key="key"
          class="center-flex item"
          :class="$route.name === value ? 'active' : ''"
          >{{ key }}</router-link
        >
      </nav>
    </div>
    <transition name="fade-slide">
      <div v-if="visible" class="mobile-menu">
      <div class="bg" @click="hideMenu"></div>
      <nav class="menu" @click="hideMenu('link')">
        <router-link
          :to="{ name: value }"
          v-for="(value, key) in navMap"
          :key="key"
          class="center-flex item"
          :class="$route.name === value ? 'active' : ''"
          >{{ key }}</router-link
        >
        <search-filter v-if="$route.name == 'index'" @change="hideMenu"></search-filter>
      </nav>
    </div>
    </transition>
  </header>
</template>

<script>
import { ref, onMounted, defineComponent, useRouter } from '@nuxtjs/composition-api'
import { useRoute } from '@nuxtjs/composition-api'
import { navMap } from '@/constants/user'
import config from '@/config'

import SearchFilter from '@/components/index/search-filter'
import MyImage from '@/common/my-image'
import MySearch from '@/common/my-search'
import MyRadio from './components/my-radio.vue'

export default defineComponent({
  components: {
    SearchFilter,
    MyImage,
    MySearch,
    MyRadio,
  },
  emits: ['fixed', 'cancel'],
  setup(_) {
    const route = useRoute()
    const keyword = ref('')
    // 移动端显示背景以及左侧导航
    const visible = ref(false)
    const router = useRouter()

    const showMenu = () => {
      visible.value = true
    }

    const hideMenu = (type) => {
      visible.value = false
    }

    const search = () => {
      router.replace({
        query: {
          keyword: keyword.value,
        },
      })
    }

    onMounted(() => {
      keyword.value = route.value.query.keyword
    })
    return {
      keyword,
      visible,
      navMap,
      config,
      showMenu,
      hideMenu,
      search,
    }
  },
})
</script>

<style lang="less" scoped>
.head {
  position: relative;
  top: 0;
  padding: 0 10%;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  color: var(--color);
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000; /* Increased z-index to ensure header stays above all content */
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
    position: sticky;
    top: 0;
    .mobile {
      cursor: pointer;
      
      .hamburger-menu {
        width: 30px;
        height: 24px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.3s ease;
        
        span {
          display: block;
          height: 3px;
          width: 100%;
          border-radius: 3px;
          background-color: var(--color);
          transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: left center;
        }
        
        &.active {
          span:nth-child(1) {
            transform: rotate(45deg);
          }
          
          span:nth-child(2) {
            opacity: 0;
            transform: translateX(10px);
          }
          
          span:nth-child(3) {
            transform: rotate(-45deg);
          }
        }
      }
      
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
        transition: opacity 0.3s ease-in-out;
        animation: fadeIn 0.3s ease-in-out;
      }
      .menu {
        position: relative;
        padding-top: 10px;
        width: 60%;
        height: 100%;
        background-color: var(--bg);
        animation: slideInMenu 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        .item {
          padding: 20px;
          border-bottom: 1px solid var(--border-color);
          transition: background-color 0.2s ease;
          &.active {
            font-weight: bold;
          }
          &:hover {
            background-color: var(--bg-secondary);
          }
        }
      }
    }
  }
}

@keyframes slideInMenu {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.49;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  .menu {
    transform: translateX(-100%);
  }
}
</style>
