<template>
  <!--  PersonalRecommend 个性化推荐-->
  <div class="personal" style="margin-right: 100px; margin-top: 10px">
    <!--        个性化推荐-->
    <span style="font-weight: bold; font-size: x-large; color: #ffd04b; margin-left: 20px;"> 个性化推荐</span>
    <div >
      <el-scrollbar
          v-loading="loading"
          element-loading-background="rgba(122, 122, 122, 0.8)"
          v-if="!flag" always="true" style="height: 500px; width: 460px">
        <div v-if="!flag" v-for="(movie, index) in movies" :key="index" style="margin-top: 20px; flex-direction: column; margin-left: 30px">
          <el-card v-if="movie.title" :body-style="{ padding: '0px' }" class="el-card-p" shadow="hover">
            <router-link :to="`/movies/details/${movie.id}`" class="movie-link">
              <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="image">
              <div class="up-movie-block">
                      <span class="font"
                            style="font-weight: bold; font-size: 17px">{{movie.title}} </span>
                <div class="bottom clearfix">
                  <div class="bfi">
                    <p class="ellipsis">{{movie.overview}}</p>
                  </div>
                </div>
              </div>
            </router-link>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
    <div v-if="flag">
      <el-card class="box-card" style="position: relative;">
        <div style="display: flex; justify-content: space-between;">
          <span style="margin-top: 3px; color: white; font-size: 17px">还没有登录？</span>
          <el-button text style="color: #ffd04b; font-size: 17px" @click="router.push('/login')">去登录&nbsp;></el-button>
        </div>
        <div class="text">
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本网站致力于为用户提供个性化的电影推荐
          </div>
          <div style="margin-top: 10px">
            服务，同时你可以在网站中搜索想看的电影，查
          </div>
          <div style="margin-top: 10px">
            看他人对这部电影的评分，或是为看过的电影打
          </div>
          <div style="margin-top: 10px">
            分。
          </div>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;快去登录享受个性化的推荐服务吧~
          </div>
        </div>
        <router-link class="personal-link" to="/register" style="position: absolute; right: 20px; bottom: 20px;">
          点击此处前往注册账号
        </router-link>
      </el-card>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import axios from 'axios';
import router from "@/router";

const loading = ref(true)
const movies = ref([]);
const token = localStorage.getItem('token');
const flag = ref('');

const getRecommendations = async (pageNum) => {

  let url = `http://123.249.101.81:8080/movies/recommend/${pageNum}`;
  let config = {};

  // 实现有登录推荐取消注释
  if (token) {
    config.headers = { 'token': token };
  } else {
    flag.value = 'No token found.';
  }
  // const config = {
  //   headers: { 'token': token },
  // };

  try {
    const response = await axios.get(url, config);
    loading.value = false;
    return response.data.obj.list;
  } catch (error) {
    flag.value = 'Failed to get recommendations.';
    console.error('Failed to get recommendations:', error);
  }
}

getRecommendations(1).then((recommendations) => {
  movies.value = recommendations;
});

</script>

<style scoped>
.bfi {
  font-size: 14px;
  color: #bbb;
}

.bottom {
  margin-top: 0px;
  line-height: 15px;
}

.image {
  display: block;
  width: 90px;
  height: 140px;
  object-fit: fill;
  float: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.el-card-p {
  height: 140px;
  width: 430px;
  box-shadow: white;
  margin: auto;
  border: 0;
  background-color: #111111;
}

.up-movie-block {
  padding: 5px;
  height: 30px;
  width: 330px;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 15px;
}

.text {
  font-size: 14px;
  margin-top: 30px;
  margin-left: 20px;
  color: #999;
}

.box-card {
  width: 400px;
  height: 300px;
  background-color: #222222;
  border: none;
  margin-top: 30px;
  margin-left: 20px;
}

.personal-link {
  color: #ffd04b;  /* 字体颜色 */
}

.personal-link, .personal-link:visited {
  color: rgba(255, 208, 75, 0.7);  /* 字体颜色 */
}

.ellipsis {
  display: -webkit-box; /* 使用弹性盒子布局 */
  -webkit-box-orient: vertical; /* 垂直方向排列 */
  -webkit-line-clamp: 5; /* 设置最大行数为5 */
  max-height: 6em; /* 设置文本框的最大高度 */
  overflow: hidden; /* 隐藏溢出的部分 */
  text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
}


</style>