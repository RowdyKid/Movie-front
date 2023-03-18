<script setup>
import { RouterView } from 'vue-router'
import {nextTick, provide, ref} from "vue";

const isRouterAlive = ref(true)

// 让页面在不刷新的情况下 重新渲染一次
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

// 供子页面调用
provide('reload', reload)

</script>

<template>
  <RouterView  v-if="isRouterAlive" />
</template>
