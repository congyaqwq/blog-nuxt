<template>
  <div v-if="initialized" class="my-radio middle-flex" :class="active" @click="changeTheme">
    <div :class="['button']"></div>
    <div :class="['button']"></div>
  </div>
  <div v-else class="my-radio-placeholder"></div>
</template>

<script>
import { defineComponent, ref, useContext, onMounted, nextTick } from '@nuxtjs/composition-api'
import * as localData from '@/utils/localData'

export default defineComponent({
  setup() {
    const { $colorMode } = useContext()
    const active = ref('system')
    const initialized = ref(false)

    onMounted(async () => {
      if (process.browser) {
        // First check if there's a saved preference in localStorage
        const savedTheme = localData.get('blog-color')
        
        if (savedTheme) {
          active.value = savedTheme
          $colorMode.preference = savedTheme
        } else {
          // If no saved preference, check system preference
          const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          active.value = isDarkMode ? 'dark' : 'light'
          $colorMode.preference = active.value
          localData.set('blog-color', active.value, 7 * 24)
        }
        
        // Wait for the next tick to ensure the theme is applied before showing the component
        await nextTick()
        initialized.value = true
      }
    })

    return {
      active,
      initialized,
    }
  },
  methods: {
    changeTheme() {
      // Toggle between light and dark
      this.active = this.active === 'light' ? 'dark' : 'light'
      
      // Apply the theme change
      this.$colorMode.preference = this.active
      
      // Save to localStorage
      if (process.browser) {
        localData.set('blog-color', this.active, 7 * 24)
      }
    },
  },
})
</script>

<style lang="less" scoped>
.my-radio-placeholder {
  width: 60px;
  height: 20px;
  border-radius: 12px;
  background-color: var(--border-color);
  opacity: 0.5;
}
.my-radio {
  position: relative;
  width: 60px;
  height: 20px;
  border: 2px solid var(--border-color);
  overflow: hidden;
  border-radius: 12px;
  background-color: var(--bg-secondary);
  user-select: none;
  color: var(--color);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    content: '';
    width: 30px;
    height: 100%;
    background-color: #0d2538;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    opacity: 0.9;
  }
  
  &.light {
    &::after {
      transform: translateX(-30px);
      background-color: #f8d568; /* Sun color */
    }
    
    &::before {
      content: '☀️';
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      z-index: 1;
    }
  }
  
  &.dark {
    &::after {
      transform: translateX(0px);
      background-color: #0d2538;
    }
    
    &::before {
      content: '🌙';
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      z-index: 1;
    }
  }
  
  .button {
    width: 40px;
    height: 100%;
    transform: translateX(0px);
  }
}
</style>
