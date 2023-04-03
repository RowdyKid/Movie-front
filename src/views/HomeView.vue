<script setup>

import {ref} from 'vue'
import {Expand, Search} from '@element-plus/icons-vue'

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const drawer = ref(false)
const input = ref('')
const select = ref('')
const getUrl = (img) => {
  return new URL(`../assets/imgs/${img}`, import.meta.url).href
}
const carouseData = [
  {url: getUrl("001.jpg")},
  {url: getUrl("002.png")},
  {url: getUrl("003.jpeg")},
  {url: getUrl("004.jpeg")},
  {url: getUrl("005.jpg")},
]

</script>

<template>
  <div class="background"></div>
  <div class="common-layout">
    <el-container>
      <el-header style="display:flex; background-color: #111; height: 70px">
        <div class="font" style="padding-top: 30px; padding-right: 20px; margin-left: 100px">
          LOGO
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
                       style="padding-top: 20px; margin-left: 16px; background-color: black; border: 0; font-size: large; font-weight: bold; --el-button-active-text-color: #ffd04b; --el-button-hover-text-color: #ffd04b"
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
                      <img src="../assets/imgs/Search.png" alt="" style="width: 20px;">
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">
            <img src="../assets/imgs/StarList.png" alt="" style="width: 25px; margin-top: 10px">
            <div style="margin-top: 5px; margin-left: 10px; font-size: large; font-weight: bold">影片列表</div>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <div style="display:flex; font-size: large; font-weight: bold; margin-top: 5px; margin-left: 5px;">
                <img src="../assets/imgs/user.png" alt="" style="width: 25px; height: 25px; margin-top: 17px">
                <div style="margin-left: 10px">个人中心</div>
              </div>
            </template>
            <el-menu-item index="2-1">未登录</el-menu-item>
            <el-menu-item index="2-2">退出系统</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <!--      主页-->
      <el-main>
        <div>
          <!--        走马灯-->
          <div class="block text-center">
            <el-carousel height="550px" style="width: 60%; margin-left: 100px">
              <el-carousel-item v-for="item in carouseData" :key="item">
                <img :src="item.url" alt="" style="max-width: 100%; max-height: 100%; min-width: 100%; min-height: 100%"/>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
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

  min-width: 900px;
  min-height: 1000px;

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
  flex-grow: 0.7;
}

</style>