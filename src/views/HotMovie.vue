<template>
  <div style="color: white; margin-top: 50px; margin-left: 100px; font-size: x-large; font-weight: bold">
    热门影片
  </div>
  <el-scrollbar always="true" style="width: 1200px; margin-left: 100px">
    <div style="color: white; margin-top: 20px; display: flex;">
      <div
          v-for="o in 12"
          :key="o"
      >
        <el-card :body-style="{ padding: '0px' }" class="el-card"
                 style="width: 210px; height: 500px; margin-left: 10px; margin-right: 16px">
          <img
              src="../assets/imgs/hot/1.jpeg"
              class="image"
          />
          <div style="padding: 14px">
            <span class="font" style="font-size: 17px; font-weight: bold">电影名称</span>
            <div class="bottom">
              <time class="time">2023/4/7</time>
              <el-button text class="button">Operating</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import config from "../../config";

let url = `http://`+ config.serverUrl +`/`;
const movies = ref([]);

// 使用不同的URL获取不同的电影列表
const fetchMovies = async () => {

  const data = {
    pageNum:1,
    pageSize:10
  }
  // 格式化成 json 字符串
  const _data = JSON.stringify(data)

  url += `movies/recommend`;
  const response = await fetch('http://123.249.101.81:8080/movies/recommend', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pageNum: 1,
      pageSize: 10
    }),
  })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.error('Error:', error));

  movies.value = response.data;
  // 打印获取到的数据
  console.log(movies.value);
};

// 在 mounted 钩子中调用这个方法
onMounted(fetchMovies);

</script>

<style scoped>

.el-card {
  box-shadow: white;
  margin: auto;
  border: 0;
  background-color: #111111;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

</style>