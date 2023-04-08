<script setup>
import Carousel from "@/views/Carousel.vue";
import UpNext from "@/views/UpNext.vue";
import FeaturedToday from "@/views/FeaturedToday.vue";
import WhatToWatch from "@/views/WhatToWatch.vue";
import ExploreMore from "@/views/ExploreMore.vue";
import RecentlyViewed from "@/views/RecentlyViewed.vue";

import {ref} from 'vue'
import {Expand,} from '@element-plus/icons-vue'

const activeIndex2 = ref('1')
const drawer = ref(false)
const input = ref('')
const select = ref('')


</script>

<template>
  <div class="background"></div>
  <div class="common-layout" style="background-color: black">
    <el-container>
      <el-header style="display:flex; background-color: #111; height: 70px">
        <div class="font" style="padding-top: 30px; padding-right: 20px; margin-left: 30px; display: flex; width: 250px">
          <img src="../assets/imgs/logo/logo-home.png" style="width: 35px; height: 35px; margin-top: -5px">
          <div style="color: #ffd04b; font-size: 24px; margin-left: 10px; font-weight: bold; margin-top: -2px">电影推荐系统</div>
        </div>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#111"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="width: 100%; height: 70px; border: 0"
        >
          <el-menu-item>
            <!-- 菜单抽屉-->
            <el-button class="font"
                       style="padding-top: 20px; background-color: #111; border: 0; font-size: large;
                       font-weight: bold; --el-button-active-text-color: #ffd04b; --el-button-hover-text-color: #ffd04b"
                       @click="drawer = true">
              <el-icon>
                <Expand/>
              </el-icon>
              菜单
            </el-button>
            <el-drawer class="font" style="background-color: #222" direction="ttb" size="80%" v-model="drawer"
                       :with-header="true">
              <div style="width: 30%; text-align: center">LOGO</div>
              <div style="text-align: center">菜单内容</div>
            </el-drawer>
          </el-menu-item>
          <el-menu-item>
            <!-- 搜索框-->
            <el-form style="margin-top: 10px">
              <el-form-item>
                <el-input
                    v-model="input"
                    placeholder="搜索"
                    class="input-with-select"
                    style="padding-top:20px; width: 650px; height: 55px; border: 0 white; border-radius: 0"
                >
                  <template #prepend>
                    <el-select class="my-el-select" v-model="select" placeholder="Select"
                               style="width: 115px; color: white; background-color: white; border: 0 white">
                      <el-option label="Restaurant" value="1"/>
                      <el-option label="Order No." value="2"/>
                      <el-option label="Tel" value="3"/>
                    </el-select>
                  </template>
                  <template #append>
                    <el-button style="padding-top: 5px; background-color: white">
                      <img src="../assets/imgs/icon/Search.png" alt="" style="width: 20px;">
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="1">
            <img src="../assets/imgs/icon/StarList.png" alt="" style="width: 25px; margin-top: 10px">
            <div style="margin-top: 5px; margin-left: 10px; font-size: large; font-weight: bold">影片列表</div>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <div style="display:flex; font-size: large; font-weight: bold; margin-top: 5px; margin-left: 5px;">
                <img src="../assets/imgs/icon/User.png" alt="" style="width: 25px; height: 25px; margin-top: 17px">
                <div style="margin-left: 10px">个人中心</div>
              </div>
            </template>
            <el-menu-item index="2-1">未登录</el-menu-item>
            <el-menu-item index="2-2">退出系统</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
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
        <!-- 探索更多-->
        <div>
          <ExploreMore/>
        </div>
        <!-- 最近浏览-->
        <div>
          <RecentlyViewed/>
        </div>
      </el-main>
      <el-footer>
        <div style="text-align: center">
          <a href="https://github.com/Low-Keyy/Project4/" target="_blank">
            <img style="height: 35px"
                 src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
          </a>
        </div>
      </el-footer>
    </el-container>
  </div>
  <el-backtop :bottom="150" :right="100">
    <div
        style="
        height: 100%;
        width: 100%;
        border-radius: 30%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: black;
        font-weight: bold;
      "
    >
      UP
    </div>
  </el-backtop>
</template>

<style>
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  background-color: black;
  background-size: 100% 100%;
  background-attachment: fixed;

  justify-content: center;
  align-items: center;
}

.font {
  color: white;
}

.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}


.flex-grow {
  flex-grow: 0.35;
}

</style>
