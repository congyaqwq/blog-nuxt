<template>
  <div class="search mobile-hid">
    <div class="search-container">
      <i class="icon iconfont">&#xe619;</i>
      <input 
        :value="value" 
        type="text" 
        placeholder="搜索文章..."
        @input="changeText" 
        @keyup.enter="$emit('search')" 
      />
      <button class="search-btn" @click="$emit('search')">
        <span>搜索</span>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  emits: ["search", "input", "update:keyword"],
  setup(props, { emit }) {
    const changeText = (e) => {
      const { value } = e.target;
      emit("input", value);
      emit("update:keyword", value);
    };
    return { changeText };
  },
});
</script>

<style lang="less" scoped>
@media (max-width: 768px) {
  .search {
    display: none;
  }
}

.search {
  position: relative;
  margin-left: 20px;
  
  .search-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 220px;
    height: 36px;
    border-radius: 18px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:focus-within {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
      border-color: var(--color-primary);
      transform: translateY(-1px);
    }
  }
  
  input {
    flex: 1;
    height: 100%;
    width: 100%;
    border: none;
    background: transparent;
    padding: 0 10px 0 35px;
    font-size: 14px;
    color: var(--color);
    
    &::placeholder {
      color: var(--color);
      opacity: 0.5;
    }
    
    &:focus {
      outline: none;
      border: none;
    }
  }
  
  .icon {
    position: absolute;
    left: 10px;
    font-size: 16px;
    color: var(--color);
    opacity: 0.7;
    z-index: 1;
  }
  
  .search-btn {
    height: 100%;
    padding: 0 12px;
    background: var(--color-primary);
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background: darken(#3e88ea, 5%);
    }
    
    span {
      display: inline-block;
      transform: translateY(0);
      transition: transform 0.2s ease;
    }
    
    &:hover span {
      transform: translateY(-1px);
    }
  }
}
</style>