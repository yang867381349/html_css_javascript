<template>
  <div>
    <!-- 显示数字 -->
    <strong class="ani-num" :style="numStyle" :key="num">{{ num }}</strong>

    <!-- 更新数字按钮 -->
    <button @click="changeNumber(8888)">更新数字</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 响应式的 num 值
const num = ref(0);

// 计算属性，绑定动态样式
const numStyle = computed(() => ({
  '--num': num.value,
}));

// 更新数字并触发动画
const changeNumber = (newValue) => {
  num.value = newValue;
};
</script>

<style scoped>
/* 定义自定义属性 --seed */
@property --seed {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0;
}

/* 使用 keyframes 定义从 0 到目标值的动画 */
@keyframes seed {
  from {
    --seed: 0;
  }
  to {
    --seed: 100;
  }
}

/* 定义数字动画样式 */
.ani-num {
  font-size: 500%;
  color: transparent;
  position: relative;
}

.ani-num::before {
  content: calc(var(--num));
  position: absolute;
  color: #000;
  transition: var(--seed) 2s linear;
}

.ani-num {
  animation: seed 2s linear forwards;
}
</style>