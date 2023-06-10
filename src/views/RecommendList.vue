<template>
  <!--  主页面-->
  <el-main>
    <!--    标题块-->
    <div class="title-block">
      <div class="title" >
        推荐
      </div>
      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :pager-count="3"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="pager, jumper"
            :total="30"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div style="margin-left: 30px; margin-right: 30px; background-color: #222222">
      <el-scrollbar v-loading="loading"
                    element-loading-background="rgba(122, 122, 122, 0.8)"
                    always="true" style="height: 900px">
        <!--        列表-->
        <div v-for="(movie, index) in movies" :key="index">
          <el-card v-if="movie.title" bodystyle="{padding 0 px}" class="el-card" shadow="hover">
            <router-link :to="`/movies/details/${movie.id}`">
              <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="image">
              <div style="margin-left: 140px">
                <span class="font" style="font-weight: bold; font-size: 27px">{{movie.title}}</span>
                <br>
                <span class="font" style="font-weight: bold; font-size: 17px; color: gray">发行日期 {{ movie.release_date }}</span>
                <br>
                <span style="color: #bbbbbb; text-decoration: none">流行度 {{ movie.popularity }}</span>
                <br>
                <span class="font" style="font-weight: bold; font-size: 17px; color: #bbbbbb">平均得分: {{ movie.vote_average }}</span>
                <br>
                <div class="font" style="font-weight: bold; font-size: 17px; color: #bbbbbb; margin-top: -10px">
                  <p class="ellipsis">{{movie.overview}}</p>
                </div>
              </div>
            </router-link>
          </el-card>
        </div>
      </el-scrollbar>

    </div>
    <div class="foot-block"></div>
  </el-main>
</template>

<script>

import {ref} from 'vue';
import axios from "axios";

export default {
  setup() {

    const currentPage = ref(1);
    const pageSize = ref(10);
    const small = ref(false);
    const disabled = ref(false);
    const background = ref(true);
    const movies = ref([]);
    const token = localStorage.getItem('token');
    const loading = ref(true)

    const getRecommendations = async (pageNum) => {

      let url = `http://123.249.101.81:8080/movies/recommend/${pageNum}`;
      let config = {};

      // 实现有登录推荐取消注释
      if (token) {
        config.headers = { 'token': token };
      }

      try {
        const response = await axios.get(url, config);
        loading.value = false;
        return response.data.obj.list;
      } catch (error) {
        console.error('Failed to get recommendations:', error);
      }
    }

    const handleCurrentChange = function(val) {
      loading.value = true;
      console.log(`current page: ${val}`);
      currentPage.value = val;
      console.log(currentPage.value)

      getRecommendations(currentPage.value).then((recommendations) => {
        movies.value = recommendations;
        console.log(movies.value);
      });
    };

    getRecommendations(currentPage.value).then((recommendations) => {
      movies.value = recommendations;
      console.log(movies.value);
    });

    // 在 setup() 中返回的任何属性或方法都将可在组件的模板中使用
    return {currentPage, pageSize, small, disabled, background, handleCurrentChange, movies, loading};
  }
};


</script>

<style scoped>

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

/*主页面样式*/

.title-block {
  position: relative;
  padding-bottom: 20px; /* 分页组件的高度加上底部间距 */
  display: flex;
  height: 100px;
  margin-left: 30px;
  margin-right: 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #222222;
  border-bottom: 1px solid #999999;
}

.foot-block {
  min-height: 20px;
  margin-left: 30px;
  margin-right: 30px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #222222;
}

.title {
  margin-top: 20px;
  margin-left: 25px;
  margin-right: 10px;
  font-weight: bold;
  font-size: 40px;
  display: inline-block;
  color: white;
}

.el-card {
  margin: 20px 80px auto 20px;
  height: 200px;
  background-color: v-bind();
  border-color: v-bind();
  box-shadow: #999999;
}

.image {
  display: block;
  width: 110px;
  height: 165px;
  object-fit: fill;
  float: left;
}

.demo-pagination-block {
  margin-top: 10px;
  margin-bottom: 16px;
  position: absolute;
  bottom: 10px;
  right: 70px;
}

.ellipsis {
  display: -webkit-box; /* 使用弹性盒子布局 */
  -webkit-box-orient: vertical; /* 垂直方向排列 */
  -webkit-line-clamp: 3; /* 设置最大行数为5 */
  max-height: 4em; /* 设置文本框的最大高度 */
  overflow: hidden; /* 隐藏溢出的部分 */
  text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
}

</style>
