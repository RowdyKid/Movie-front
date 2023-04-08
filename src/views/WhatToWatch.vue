<template>
  <div style="color: #ffd04b;margin-top: 50px; margin-left: 100px; font-size: xx-large; font-weight: bold">
    为你推荐
  </div>
  <div>
    <!-- 热门影片-->
    <div>
      <HotMovie/>
    </div>
    <div>
      <ForYou/>
    </div>
    <div>
      <HotList/>
    </div>
    <div style="color: white; margin-top: 50px; margin-left: 100px; font-size: x-large; font-weight: bold">
      高分榜单
    </div>

  </div>

</template>

<script setup>

import HotMovie from "@/views/HotMovie.vue";
import ForYou from "@/views/ForYou.vue";
import HotList from "@/views/HotList.vue";

</script>

<style scoped>

</style>