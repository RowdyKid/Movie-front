<template>
  <el-main>
    <!--    标题块-->
    <div class="title-block">
      <div class="title">
        Result
      </div>
      <br>
    </div>

    <!--    搜索列表-->
    <div style="margin-left: 30px; margin-right: 30px; background-color: #222222">
      <br>
      <div>
        <!--        <div class="font" style="margin-left: 70px; font-size: 24px; font-weight: bold">展示作为演员的搜索结果:</div>-->
        <!--        列表-->
        <el-card v-for="(movie, index) in moviesWithPerson" :key="index" bodystyle="{padding 0 px}" class="el-card"
                 shadow="hover">
          <router-link :to="`/movies/details/${movie.movie_id}`">
            <div style="margin-left: 30px" v-if="movie.source === 'movieCastRelations'">
              <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-if="movie.movie_title">{{ movie.movie_title }}</div>
              <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-else>暂无</div>
              <br>
              <div class="font" style="font-weight: bold; font-size: 17px; color: gray; margin-bottom: -8px">演员 {{ movie.personName }}</div>
              <br>
              <div style="color: #bbbbbb; text-decoration: none">饰演角色 {{ movie.character }}</div>
            </div>
            <div style="margin-left: 30px" v-if="movie.source === 'movieCrewRelations'">
              <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-if="movie.movie_title">{{movie.movie_title}}</div>
              <div class="font" style="font-weight: bold; font-size: 27px; margin-bottom: -5px" v-else>暂无</div>
              <br>
              <div class="font" style="font-weight: bold; font-size: 17px; color: gray; margin-bottom: -8px">职员 {{ movie.personName }}</div>
              <br>
              <div class="font" style="font-weight: bold; font-size: 17px; color: gray; margin-bottom: -8px">部门： {{ movie.department }}&nbsp;&nbsp;&nbsp;&nbsp;职务： {{ movie.job }}</div>
            </div>
          </router-link>
        </el-card>
      </div>
    </div>
    <div class="foot-block"></div>

  </el-main>
</template>

<script>

import {computed} from 'vue';
import {useStore} from 'vuex';

export default {
  setup() {
    const store = useStore();
    const moviesWithPerson = computed(() => {
      const personList = store.state.searchData.obj;
      //使用map reduce
      // 这次我们不仅提取每个人员的电影列表
      // 还将每部电影与其所属的人员名称一起保存
      const movies = personList.reduce((acc, person) => {
        const personMoviesCast = person.movieCastRelations.map(movie => ({
          ...movie,
          personName: person.name,
          source: 'movieCastRelations',  // 添加 source 属性
        }));
        const personMoviesCrew = person.movieCrewRelations.map(movie => ({
          ...movie,
          personName: person.name,
          source: 'movieCrewRelations',  // 添加 source 属性
        }));
        return [...acc, ...personMoviesCast, ...personMoviesCrew];
      }, []);
      return movies;
    });
    return {
      moviesWithPerson
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
  margin-top: 20px;
  height: 150px;
  background-color: v-bind();
  border-color: v-bind();
  box-shadow: #999999;
}

</style>