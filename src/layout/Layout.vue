<script setup>

import {ref} from 'vue'
import {Expand,} from '@element-plus/icons-vue'
import axios from 'axios';
import router from "@/router";
import config from "../../config";
import {useStore} from "vuex";

let drawer = ref(false)
const keyword = ref('')
const searchType = ref('')
const store = useStore()

const search = async () => {
  let url = `http://`+ config.serverUrl +`/`;
  console.log(searchType.value)
  if (searchType.value === 'movie') {
    url += `movies/${keyword.value}`;
  } else if (searchType.value === 'actor') {
    url += `person/${keyword.value}/movies`;
  } else if (searchType.value === 'company') {
    url += `companies/${keyword.value}/movies`;
  } else if (searchType.value === 'keyword') {
    url += `keywords/${keyword.value}/movies`;
  }

  console.log(url)

  try {
    const response = await axios.get(url);
    console.log(response.data)

    // 将搜索结果存储在 Vuex store 中
    store.commit('setSearchData', response.data);
    console.log(store.state.searchData.obj);
    // 在成功获取搜索结果后，跳转到新页面
    if (searchType.value === 'movie') {
      await router.push('/searchResults');
    } else if (searchType.value === 'actor') {
      await router.push('/searchPerson');
    } else if (searchType.value === 'company') {
      await router.push('/searchCompanies');
    } else if (searchType.value === 'keyword') {
      await router.push('/searchKeywords');
    }

  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
  <div class="background"></div>
  <div class="common-layout" style="background-color: black">
    <el-container>
      <el-header style="display:flex; background-color: #111; height: 70px">
        <router-link to="/home" class="font"
             style="padding-top: 30px; padding-right: 20px; margin-left: 30px; display: flex; width: 250px; text-decoration: none">
          <img src="../assets/imgs/logo/logo-home.png" style="width: 35px; height: 35px; margin-top: -5px">
          <div style="color: #ffd04b; font-size: 24px;
          margin-left: 10px; font-weight: bold; margin-top: -2px;">
            电影推荐系统
          </div>
        </router-link>
        <el-menu
            :default-active = "$route.path"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#111"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="width: 100%; height: 70px; border: 0"
            router
        >
          <el-menu-item index="">
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
          <el-menu-item index="">
            <!-- 搜索框-->
            <el-form style="margin-top: 10px">
              <el-form-item>
                <el-input
                    v-model="keyword"
                    placeholder="输入搜索关键字"
                    class="input-with-select"
                    style="padding-top:20px; width: 650px; height: 55px; border: 0 white; border-radius: 0"
                >
                  <template #prepend>
                    <el-select class="my-el-select" v-model="searchType" placeholder="选择搜索类型"
                               style="width: 115px; color: white; background-color: white; border: 0 white">
                      <el-option label="按电影名称搜索" value="movie"/>
                      <el-option label="按人员搜索" value="actor"/>
                      <el-option label="按公司搜索" value="company"/>
                      <el-option label="按关键词搜索" value="keyword"/>
                    </el-select>
                  </template>
                  <template #append>
                    <el-button style="padding-top: 5px; background-color: white" @click="search">
                      <img src="../assets/imgs/icon/Search.png" alt="" style="width: 20px;">
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="/watchList">
            <img src="../assets/imgs/icon/StarList.png" alt="" style="width: 25px; margin-top: 10px">
            <div style="margin-top: 5px; margin-left: 10px; font-size: large; font-weight: bold; text-decoration: none">
              影片列表
            </div>
          </el-menu-item>
          <el-sub-menu index="">
            <template #title>
              <div style="display:flex; font-size: large; font-weight: bold; margin-top: 5px; margin-left: 5px;">
                <img src="../assets/imgs/icon/User.png" alt="" style="width: 25px; height: 25px; margin-top: 17px">
                <div style="margin-left: 10px">个人中心</div>
              </div>
            </template>
            <el-menu-item index="/personCenter?page=myInfo">个人中心</el-menu-item>
            <el-menu-item index="">退出系统</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <router-view />
      <!--      页脚-->
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
