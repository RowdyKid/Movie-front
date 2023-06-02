<template>
  <el-main>
    <!--    标题块-->
    <div class="title-block">
      <div class="title" >
        演职人员 "{{ movies.name }}"
        <!--          <div style="display: inline-block" v-for="item in searchTerm">-->
        <!--            "{{item}}"{{"\xa0"}}-->
        <!--          </div>-->
      </div>
      <br>

    </div>

    <!--    搜索列表-->
    <div style="margin-left: 30px; margin-right: 30px; background-color: #222222">
      <br>
      <div>
        <div class="font" style="margin-left: 70px; font-size: 24px; font-weight: bold">展示作为演员的搜索结果:</div>
        <!--        列表-->
        <el-card v-for="(movie, index) in movieCast" :key="index" bodystyle="{padding 0 px}" class="el-card" shadow="hover">
          <!-- <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="image">-->
          <div style="margin-left: 30px">
            <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-if="movie.movie_title">{{movie.movie_title}}</div>
            <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-else>暂无</div>
            <br>
            <div class="font" style="font-weight: bold; font-size: 17px; color: gray; margin-bottom: -8px">演员 {{ movies.name }}</div>
            <br>
            <router-link to="/" style="color: #bbbbbb; text-decoration: none">饰演角色 {{ movie.character }}</router-link>
          </div>
        </el-card>
<!--        &lt;!&ndash; 分割线 &ndash;&gt;-->
<!--        <div style="border-bottom: 1px solid #999999; margin-top: 30px"></div>-->
        <div class="font" style="margin-left: 70px; font-size: 24px; font-weight: bold; margin-top: 30px">展示作为工作人员的搜索结果:</div>
        <!--        列表-->
        <el-card v-for="(movie, index) in movieCrew" :key="index" bodystyle="{padding 0 px}" class="el-card" shadow="hover">
          <!-- <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="image">-->
          <div style="margin-left: 30px">
            <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-if="movie.movie_title">{{movie.movie_title}}</div>
            <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-else>暂无</div>
            <br>
            <div class="font" style="font-weight: bold; font-size: 17px; color: gray; margin-bottom: -8px">部门： {{ movie.department }}</div>
            <br>
            <router-link to="/" style="color: #bbbbbb; text-decoration: none">职务： {{ movie.job }}</router-link>
          </div>
        </el-card>
      </div>
    </div>
  </el-main>
</template>

<script>

import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    // 目前暂时先只展示搜到的第一个人的信息 后续再完善
    const store = useStore();
    const movies = computed(() => store.state.searchData.obj[0]);
    const movieCast = computed(() => store.state.searchData.obj[0].movieCastRelations);
    // const movieCrew = computed(() => store.state.searchData.obj[0].movieCrewRelations);
    const movieCrew = computed(() => {
      // 过滤掉movie_title为空的数据
      return store.state.searchData.obj[0].movieCrewRelations.filter((movie) => {
        return movie.movie_title !== null && movie.movie_title !== undefined && movie.movie_title.trim() !== '';
      });
    });

    // 在 setup() 中返回的任何属性或方法都将可在组件的模板中使用
    return {
      movies,
      movieCast,
      movieCrew
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
  margin-top: 20px;
  height: 150px;
  background-color: v-bind();
  border-color: v-bind();
  box-shadow: #999999;
}

</style>