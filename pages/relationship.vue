<template>
  <div class="relationship-page">
    <h1 class="page-title">友情链接</h1>
    
    <div class="links-container">
      <div class="link-card">
        <div class="link-header">
          <h2 class="link-title">多人账单</h2>
          <div class="link-tags">
            <span class="tag">工具</span>
            <span class="tag">账单管理</span>
          </div>
        </div>
        <p class="link-description">
          多人账单管理工具，帮助您轻松管理和分摊团队、朋友或家庭的共享费用。简单易用的界面让记账和分摊变得轻松愉快。
        </p>
        <a href="https://www.congyaqwq.top/static/account/" target="_blank" class="link-button">
          访问网站
          <span class="arrow">→</span>
        </a>
      </div>
      
      <div class="link-card">
        <div class="link-header">
          <h2 class="link-title">贪吃蛇</h2>
          <div class="link-tags">
            <span class="tag">游戏</span>
            <span class="tag">休闲</span>
          </div>
        </div>
        <p class="link-description">
          经典贪吃蛇游戏，简单而有趣。控制蛇移动方向，吃掉食物让它变长，同时避免撞到墙壁或自己的身体。挑战高分，享受休闲时光。
        </p>
        <a href="https://www.congyaqwq.top/static/snake-game/" target="_blank" class="link-button">
          访问网站
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  head() {
    return {
      title: '友情链接',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '精选优质网站链接，包括实用工具和有趣游戏。'
        }
      ]
    }
  }
})
</script>

<style lang="less" scoped>
.relationship-page {
  max-width: 800px;
  margin: 0 auto;
  
  .page-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--color-primary);
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40%;
      height: 3px;
      background-color: var(--color-primary);
    }
  }
  
  .links-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    
    .link-card {
      background-color: var(--bg-secondary);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      }
      
      .link-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1rem;
        
        .link-title {
          font-size: 1.5rem;
          margin: 0;
        }
        
        .link-tags {
          display: flex;
          gap: 0.5rem;
          
          .tag {
            font-size: 0.75rem;
            padding: 0.25rem 0.5rem;
            background-color: var(--bg);
            border-radius: 20px;
            color: var(--color);
          }
        }
      }
      
      .link-description {
        margin-bottom: 1.5rem;
        line-height: 1.6;
        color: var(--color);
        opacity: 0.9;
      }
      
      .link-button {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.25rem;
        background-color: var(--color-primary);
        color: white;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 500;
        transition: background-color 0.2s ease;
        
        .arrow {
          margin-left: 0.5rem;
          transition: transform 0.2s ease;
        }
        
        &:hover {
          background-color: darken(#4a99ff, 10%);
          
          .arrow {
            transform: translateX(3px);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .relationship-page {
    padding: 0 1rem;
    
    .links-container {
      grid-template-columns: 1fr;
    }
  }
}
</style>
