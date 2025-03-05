<template>
  <div class="ai-page" :class="{ 'expanded': isExpanded }">
    <div class="toggle-expand" @click="toggleExpand">
      <span v-if="isExpanded">显示介绍 ▼</span>
      <span v-else>隐藏介绍 ▲</span>
    </div>
    
   
    <div class="iframe-container">
      <div class="iframe-loading" v-if="loading">
        <div class="loader"></div>
        <div>加载中...</div>
      </div>
      <iframe 
        ref="aiFrame"
        src="https://www.congyaqwq.top/static/qwen/index.html" 
        @load="onIframeLoad"
        :class="{ 'loaded': !loading }"
        scrolling="yes"
        allow="fullscreen"
      ></iframe>
    </div>
    
    <transition name="slide">
      <div class="ai-footer" v-if="!isExpanded">
        <div class="tips">
          <h3>使用小技巧</h3>
          <ul>
            <li>尝试提问具体的问题以获得更精确的回答</li>
            <li>可以要求AI解释复杂概念或提供教程</li>
            <li>尝试让AI帮你创作内容或提供创意灵感</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const loading = ref(true)
    const aiFrame = ref(null)
    const isExpanded = ref(false)
    
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value
    }
    
    const onIframeLoad = () => {
      loading.value = false
    }
    
    onMounted(() => {
      // Add a timeout in case the iframe load event doesn't fire
      setTimeout(() => {
        loading.value = false
      }, 5000)
    })
    
    return {
      loading,
      aiFrame,
      isExpanded,
      toggleExpand,
      onIframeLoad
    }
  },
  head() {
    return {
      title: 'AI 助手 - 智能对话体验',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '体验强大的AI助手，可以回答问题、提供建议、进行创意写作等。'
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.ai-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 40px; /* Add extra padding for the header */
  transition: all 0.3s ease;
  overflow: auto; /* Ensure content can be scrolled */
  
  &.expanded {
    max-width: 100%;
    padding: 0;
    padding-top: 60px; /* Space for the header */
    position: static; /* Ensure proper scrolling */
    
    .iframe-container {
      height: calc(100vh - 120px); /* Adjusted for header space */
      border-radius: 0;
      margin-bottom: 0;
      box-shadow: none;
    }
  }
  
  .toggle-expand {
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 100; /* Ensure button stays above content */
    background-color: var(--color-primary);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
  
  .iframe-container {
    position: relative;
    width: 100%;
    height: 800px;
    border-radius: 12px;
    overflow: visible; /* Allow iframe content to be scrollable */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    margin-bottom: 30px;
    background-color: var(--bg-secondary);
    z-index: 1; /* Lower z-index to prevent overlapping with header */
    
    .iframe-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--bg);
      z-index: 2;
      
      .loader {
        width: 48px;
        height: 48px;
        border: 5px solid var(--color-primary);
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        margin-bottom: 15px;
      }
    }
    
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      opacity: 0;
      transition: opacity 0.5s ease;
      overflow: auto; /* Enable scrolling within iframe */
      z-index: 1; /* Lower z-index to prevent overlapping with header */
      
      &.loaded {
        opacity: 1;
      }
    }
  }
  
  .ai-footer {
    padding: 20px;
    background-color: var(--bg-secondary);
    border-radius: 12px;
    
    .tips {
      h3 {
        margin-bottom: 15px;
        color: var(--color-primary);
      }
      
      ul {
        padding-left: 20px;
        
        li {
          margin-bottom: 10px;
          line-height: 1.5;
          position: relative;
          
          &::before {
            content: "•";
            color: var(--color-primary);
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .ai-page {
    padding: 15px;
    padding-top: 20px; /* Reduced padding since header is sticky */
    
    &.expanded {
      padding: 0;
      padding-top: 0; /* No padding needed with sticky header */
    }
    
    .toggle-expand {
      top: 110px; /* Adjusted for sticky header */
      right: 10px;
      padding: 6px 12px;
      font-size: 12px;
    }
    
    .ai-header {
      flex-direction: column;
      
      .ai-title, .ai-description {
        width: 100%;
        margin-bottom: 20px;
      }
    }
    
    .iframe-container {
      height: 700px;
    }
    
    &.expanded .iframe-container {
      height: calc(100vh - 100px); /* Adjusted for sticky header on mobile */
      overflow: visible;
    }
    
    &.expanded iframe {
      position: relative;
      z-index: 1; /* Lower z-index to prevent overlapping with header */
    }
  }
}
</style>
