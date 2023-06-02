<template>
  <!--  UpNext 即将上映-->
  <div class="upNext" style="margin-right: 100px; margin-top: 10px">
    <!--        即将上映-->
    <span style="font-weight: bold; font-size: x-large; color: #ffd04b; margin-left: 20px;"> 即将上映</span>
    <div style="margin-top: 20px; flex-direction: column; margin-left: 30px">
      <!--               <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">&ndash;&gt;-->
      <el-card :body-style="{ padding: '0px' }" class="el-card" shadow="hover" @click.native="showDetail">
        <img src="../assets/imgs/comingMovie/movie1.png" class="image">
        <div class="up-movie-block">
                    <span class="font"
                          style="font-weight: bold; font-size: 17px">'How Do You Know Your IMDb Page?' </span>
          <div class="bottom clearfix">
            <!--                          <time class="time">{{ currentDate }}</time>-->
            <span class="bfi">简介1:xxxxxxxxxxxxxxxxxxxx</span>
            <el-button type="text" class="button"></el-button>
          </div>
        </div>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }" class="el-card" shadow="hover" @click.native="showDetail">
        <img src="/src/assets/imgs/comingMovie/movie2.png" class="image">
        <div class="up-movie-block">
          <span class="font" style="font-weight: bold; font-size: 17px">'Beau Is Afraid' </span>
          <div class="bottom clearfix">
            <!--                          <time class="time">{{ currentDate }}</time>-->
            <span class="bfi">简介2:xxxxxxxxxxxxxxxxxxxx</span>
            <el-button type="text" class="button"></el-button>
          </div>
        </div>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }" class="el-card" shadow="hover" @click.native="showDetail">
        <img src="/src/assets/imgs/comingMovie/movie3.png" class="image">
        <div class="up-movie-block">
          <span class="font" style="font-weight: bold; font-size: 17px">'Secret Invision' </span>
          <div class="bottom clearfix">
            <!--                          <time class="time">{{ currentDate }}</time>-->
            <span class="bfi">简介3:xxxxxxxxxxxxxxxxxxxx</span>
            <el-button type="text" class="button"></el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>

import router from "@/router";

const showDetail = () => {
  router.push('/detail')
}

</script>

<style scoped>
.bfi {
  font-size: 14px;
  color: #bbb;
}

.bottom {
  margin-top: 14px;
  line-height: 12px;
}

.button {
  height: 50px;
  width: 50px;
  background-image: url("../assets/imgs/icon/Play.png");
  background-size: cover;
  padding: 0;
  float: right;
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

.el-card {
  height: 140px;
  width: 430px;
  box-shadow: white;
  margin: auto;
  border: 0;
  background-color: #111111;
}

.up-movie-block {
  padding: 5px;
  height: 120px;
  width: 330px;
  float: right;
  margin-right: 10px;
  margin-top: 20px;
  border-radius: 15px;
}

</style>