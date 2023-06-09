<template>
  <div>
    <!--            走马灯-->
    <div class="block text-center">
      <el-carousel height="540px" style="margin-left: 100px">
        <el-carousel-item v-for="item in carouseData" :key="item">
<!--          <router-link :to="`/movies/details/${movie.id}`" class="movie-link">-->
            <img :src="item.url" alt="" class="img"/>
<!--          </router-link>-->
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>

// import axios from "axios";
// import {ref} from "vue";
//
// const movies = ref([]);
// const getRecommendations = async (pageNum) => {
//
//   let url = `http://123.249.101.81:8080/movies/recommend/${pageNum}`;
//   let config = {};
//
//   try {
//     const response = await axios.get(url, config);
//     return response.data.obj.list;
//   } catch (error) {
//     console.error('Failed to get recommendations:', error);
//   }
// }
//
// // 初始化轮播图数据数组
// const carouselData = ref([]);
//
// getRecommendations(1).then((recommendations) => {
//   movies.value = recommendations;
//   recommendations.forEach(movie => {
//     // 对于每一个电影，我们取出它的 poster_path 属性，然后将其添加到 carouselData 中
//     // 在添加电影到轮播图数据之前，检查 original_title 是否存在且不为空
//     if (movie.original_title && movie.original_title.trim() !== '') {
//       const url = `http://image.tmdb.org/t/p/original/${movie.poster_path}`;
//       carouselData.value.push({ url });
//     }
//   });
// });

const getUrl = (img) => {
  return new URL(`../assets/imgs/carousel/${img}`, import.meta.url).href
}
const carouseData = [
  {url: getUrl("001.jpg")},
  {url: getUrl("002.png")},
  {url: getUrl("003.jpeg")},
  {url: getUrl("004.jpeg")},
  {url: getUrl("005.jpg")},
]

</script>

<style scoped>
.img {
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 100%;
  /*min-height: 540px;*/
  /*min-width: 700px;*/
  /*border: white solid 1px;*/
}
</style>