<script setup>
import Carousel from "@/views/Carousel.vue";
import UpNext from "@/views/UpNext.vue";
import FeaturedToday from "@/views/FeaturedToday.vue";
import WhatToWatch from "@/views/WhatToWatch.vue";
import RecentlyViewed from "@/views/RecentlyViewed.vue";

</script>

<template>
  <!-- 主页-->
  <el-main>
    <!-- 轮播图与即将上映-->
    <div>
      <el-row gutter="20" style="height: auto">
        <el-col :span="16">
          <!-- 轮播图-->
          <Carousel/>
        </el-col>
        <el-col :span="8">
          <!-- 即将上映-->
          <UpNext/>
        </el-col>
      </el-row>
    </div>
    <!-- 今日精选-->
    <div>
      <FeaturedToday/>
    </div>
    <!-- 为你推荐-->
    <div>
      <WhatToWatch/>
    </div>
    <!--        &lt;!&ndash; 探索更多&ndash;&gt;-->
    <!--        <div>-->
    <!--          <ExploreMore/>-->
    <!--        </div>-->
    <!-- 最近浏览-->
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
