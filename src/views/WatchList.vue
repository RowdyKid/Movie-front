<script setup>

</script>

<template>
  <!--  主页面-->
  <el-main>
    <!--    标题块-->
    <div class="title-block">
      <div class="title">
        Your Watchlist
        <div
            style="margin-left: 5px; margin-right: 10px; margin-top: 15px; height: 40px; width: 100%; background-color: v-bind()">
          <img src="../../src/assets/imgs/icon/private.png"
               style="object-fit: cover; vertical-align: top; height:25px; width: 25px" alt="Submit">
          <span style="font-size: large; vertical-align: top ; color: #aaaaaa;">private</span>
        </div>
      </div>
      <div class="button-block1">
        <div class="button-block2">
          <el-button class="shareButton"></el-button>
          <span style="font-weight: bold;color: #aaaaaa"> SHARE </span>
        </div>
        <div class="button-block2">
          <el-button class="editButton"></el-button>
          <span style="font-weight: bold;color: #aaaaaa"> EDIT </span>
        </div>
      </div>
      <br>

    </div>
    <!--    观影列表-->
    <div style="margin-left: 30px; margin-right: 30px; background-color: #222222">
      <br>
      <!--      标题-->
      <div style="display: flex">
        <div style="font-size: 40px; color: #aaaaaa; margin-left: 20px; margin-top: 10px">2 titles</div>
        <div style="flex-grow: 1">
          <div style="margin-left: 270px">
            <el-text style="font-size: large;font-weight: bold; margin-left: 68%">SORT BY</el-text>
          </div>
          <div>
            <el-select class="my-el-select" v-model="select" placeholder="List Order"
                       style="width: 300px; float: right; margin-left: 25px; margin-top: 10px;margin-right: 80px;border-radius: 10px; color: gainsboro; background-color: white">
              <el-option label="List Order" value="1"/>
              <el-option label="IMDb Rating" value="2"/>
              <el-option label="Your Rating" value="3"/>
              <el-option label="Popularity" value="4"/>
              <el-option label="Add Date" value="5"/>
            </el-select>
          </div>
        </div>
      </div>
      <div>
        <div
            v-for="o in 2"
            :key="o"
        >
          <!--        列表-->
          <el-card bodystyle="{padding 0 px}" class="el-card" shadow="hover">
            <img src="../assets/imgs/watchList/movie4.jpg" class="image">
            <div style="margin-left: 140px">
              <span class="font" style="font-weight: bold; font-size: 27px">'Friends' </span>
              <br>
              <span class="font" style="font-weight: bold; font-size: 17px; color: gray">1994-2004TV Series234epsComedy, Romance</span>
              <br>
              <router-link to="/" style="color: #bbbbbb;">Rate</router-link>
              <!--                          <time class="time">{{ currentDate }}</time>-->
              <br>
              <router-link to="/" style="color: #bbbbbb;">Jennifer Aniston</router-link>
              <text v-html="' , '" style="color: #bbbbbb;"></text>
              <router-link to="/" style="color: #bbbbbb;">Courteney Cox</router-link>
              <text v-html="' , '" style="color: #bbbbbb;"></text>
              <router-link to="/" style="color: #bbbbbb;">Lisa Kudrow</router-link>
              <br>
              <span class="font" style="font-weight: bold; font-size: 17px; color: #bbbbbb">Follows the personal and professional lives of six twenty to thirty year-old friends living in the Manhattan borough of New York City.</span>

            </div>
          </el-card>
        </div>
      </div>
    </div>
  </el-main>

</template>


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
  height: 150px;
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
  color: white;
}

.button-block1 {
  margin-left: 55%;
  height: 130px;
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: v-bind();
  float: right;
  margin-top: 10px;
}

.button-block2 {
  height: 100px;
  width: 85px;
  background-color: v-bind();
  display: flex;
  flex-direction: column;
  align-items: center;
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

.shareButton {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-image: url("../../src/assets/imgs/icon/share.png");
  background-size: 90%;
  background-position-y: 5px;
  background-color: v-bind();
  --el-button-active-border-color: #ffd04b;
  --el-button-outline-color: #ffd04b;
}

.editButton {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-image: url("../../src/assets/imgs/icon/edit.png");
  background-size: 88%;
  background-position: center;
  background-position-y: 2px;
  background-color: v-bind();
  --el-button-active-border-color: #ffd04b;
  --el-button-outline-color: #ffd04b;
}

.image {
  display: block;
  width: 110px;
  height: 165px;
  object-fit: fill;
  float: left;
}

.bfi {
  font-size: 14px;
  color: #bbb;
}


</style>