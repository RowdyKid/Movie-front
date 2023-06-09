<script setup>
import Carousel from "@/views/Carousel.vue";
import PersonalRecommend from "@/views/PersonalRecommend.vue";
import WhatToWatch from "@/views/WhatToWatch.vue";
import RecentlyViewed from "@/views/RecentlyViewed.vue";

</script>

<template>
  <!-- 主页-->
  <el-main>
    <!-- 轮播图与个性化推荐-->
    <div>
      <el-row gutter="20" style="height: auto">
        <el-col :span="16">
          <!-- 轮播图-->
          <Carousel/>
        </el-col>
        <el-col :span="8">
          <!-- 个性化推荐-->
          <PersonalRecommend/>
        </el-col>
      </el-row>
    </div>
    <!-- 为你推荐-->
    <div>
      <WhatToWatch/>
    </div>
    <div>
      <RecentlyViewed/>
    </div>
  </el-main>
</template>

<style>

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

</style>
