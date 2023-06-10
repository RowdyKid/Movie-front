<template>
  <el-main>
    <!--    标题块-->
    <div class="title-block">
      <div class="title" >
        搜索
      </div>
      <br>

    </div>
    <!-- 测试一下 -->
<!--    <div class="font">{{ movies }}</div>-->
<!--    <div>-->
<!--      <el-button style="background-color: white" @click="search1">-->
<!--        测试-->
<!--      </el-button>-->
<!--    </div>-->
    <!--    搜索列表-->
    <div style="margin-left: 30px; margin-right: 30px; background-color: #222222">
      <br>
      <div>
        <!--        列表-->
        <el-card v-for="(movie, index) in movies" :key="index" bodystyle="{padding 0 px}" class="el-card" shadow="hover">
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
    </div>
    <div class="foot-block"></div>
  </el-main>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

// const store = useStore();
// // console.log(store.state.searchData);
// const movies = computed(() => store.state.searchData.obj);
// // let movies = store.state.searchData.obj

export default {
  setup() {
    const store = useStore();
    const movies = computed(() => store.state.searchData.obj);

    // 在 setup() 中返回的任何属性或方法都将可在组件的模板中使用
    return {
      movies
    };
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
  display: flex;
  height: 100px;
  margin-left: 30px;
  margin-right: 30px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
  font-size: xxx-large;
  display: inline-block;
  color: white;
}

.el-card {
  margin-left: 20px;
  margin-right: 80px;
  margin-top: 30px;
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

.ellipsis {
  display: -webkit-box; /* 使用弹性盒子布局 */
  -webkit-box-orient: vertical; /* 垂直方向排列 */
  -webkit-line-clamp: 3; /* 设置最大行数为5 */
  max-height: 4em; /* 设置文本框的最大高度 */
  overflow: hidden; /* 隐藏溢出的部分 */
  text-overflow: ellipsis; /* 使用省略号表示溢出部分 */
}

</style>