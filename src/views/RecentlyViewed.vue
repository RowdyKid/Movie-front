<template>
  <div style="color: #ffd04b;margin-top: 50px; margin-left: 100px; font-size: xx-large; font-weight: bold">
    最近浏览
  </div>
  <div v-if="!flag">
    <div>
      <el-scrollbar always="true" style="width: 1200px; margin-left: 100px">
        <div style="color: white; margin-top: 20px; display: flex;">
          <div
              v-for="(movie, index) in movies"
              :key="index"
          >
            <el-card v-if="movie.movie.title" :body-style="{ padding: '0px' }" class="el-card"
                     style="width: 210px; height: 500px; margin-left: 10px; margin-right: 16px">
              <router-link :to="`/movies/details/${movie.movie_id}`" class="movie-link">
                <img
                    :src="`https://image.tmdb.org/t/p/w500${movie.movie.poster_path}`"
                    class="image"
                />
              </router-link>
              <div style="padding: 14px">
                <router-link :to="`/movies/details/${movie.movie_id}`" class="movie-link">
                  <div class="font" style="font-size: 19px; font-weight: bold; height: 60px">{{ movie.movie.title }}</div>
                  <div class="tagline">{{movie.movie.tagline}}</div>
                </router-link>
                <div class="bottom">
                  <time class="time">{{ movie.movie.release_date }}</time>
                  <el-button text class="button" @click="scoreMovie(movie.movie_id)">去打分</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-scrollbar>

      <el-dialog title="打分" v-model="dialogVisible">
        <!-- 在这里添加你的打分表单 -->
        <el-input v-model.number="score" placeholder="请输入你的分数"></el-input>
        <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitScore">确 定</el-button>
    </span>
      </el-dialog>

      <el-dialog
          title="请登录"
          v-model="loginDialogVisible"
          width="30%"
          @close="closeLoginDialog"
      >
        <span>您必须登录才能打分，请<a href="/login">点击这里</a>登录。</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="closeLoginDialog">我知道了</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
  <div v-if="flag">
    <router-link to="/login">
    <div class="font" style="margin-top: 40px; margin-left: 110px; font-size: 20px; height: 80px; text-decoration: underline;">
      请先前往登录~
    </div>
    </router-link>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {ElMessage} from "element-plus";

const movies = ref([]);
const token = localStorage.getItem('token');
const dialogVisible = ref(false);
const loginDialogVisible = ref(false);
const score = ref(0);
const selectedMovieId = ref(null);
const flag = ref('');

const getViewed = async (pageNum) => {
  // const token = localStorage.getItem('token');
  let url = `http://123.249.101.81:8080/users/movies/${pageNum}`;
  let config = {};

  if (token) {
    config.headers = { 'token': token };
  } else {
    flag.value = 'No token found.';
  }

  try {
    const response = await axios.get(url, config);
    return response.data.obj.list;
  } catch (error) {
    flag.value = 'Failed to get recommendations.';
    console.error('Failed to get recommendations:', error);
  }
}

getViewed(1).then((recommendations) => {
  movies.value = recommendations;
  console.log(movies.value)
});

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
}

const scoreMovie = (movieId) => {
  if (!isLoggedIn()) {
    loginDialogVisible.value = true;
  } else {
    selectedMovieId.value = movieId;
    dialogVisible.value = true;
  }
}

const closeLoginDialog = () => {
  loginDialogVisible.value = false;
}

const submitScore = async () => {
  const url = `http://123.249.101.81:8080/movies/score`;
  const token = localStorage.getItem('token');
  const data = {
    movie_id: selectedMovieId.value,
    rating: score.value,
  };
  const config = {
    headers: { 'token': token },
  };

  try {
    await axios.post(url, data, config);
    dialogVisible.value = false;
    score.value = 0;
    console.log('success')
    ElMessage({
      message: '打分成功',
      type: 'success',
    });
  } catch (error) {
    console.error('Failed to submit score:', error);
    ElMessage({
      message: '打分失败',
      type: 'error',
    });
  }
}
</script>

<style scoped>

.font {
  color: white;
}

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
  width: 210px;
  height: 300px;
  display: block;
}

.tagline {
  height: 60px;
}

.movie-link {
  color: #aaa;  /* 字体颜色 */
}

.movie-link, .movie-link:visited {
  color: #aaa;  /* 字体颜色 */
}

</style>