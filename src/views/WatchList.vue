<script setup>

</script>

<template>
  <div class="background"></div>
<!--  菜单栏-->
  <div class="common-layout" style="background-color: black">
    <el-container>
      <el-header style="display:flex; background-color: #111; height: 70px">
        <div class="font" style="padding-top: 30px; padding-right: 20px; margin-left: 30px; display: flex; width: 250px">
          <img src="../assets/imgs/logo/logo-home.png" style="width: 35px; height: 35px; margin-top: -5px">
          <div style="color: #ffd04b; font-size: 24px; margin-left: 10px; font-weight: bold; margin-top: -2px">电影推荐系统</div>
        </div>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#111"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="width: 100%; height: 70px; border: 0"
        >
          <el-menu-item>
            <!-- 菜单抽屉-->
            <el-button class="font"
                       style="padding-top: 20px; background-color: #111; border: 0; font-size: large;
                       font-weight: bold; --el-button-active-text-color: #ffd04b; --el-button-hover-text-color: #ffd04b"
                       @click="drawer = true">
              <el-icon>
                <Expand/>
              </el-icon>
              菜单
            </el-button>
            <el-drawer class="font" style="background-color: #222" direction="ttb" size="80%" v-model="drawer"
                       :with-header="true">
              <div style="width: 30%; text-align: center">LOGO</div>
              <div style="text-align: center">菜单内容</div>
            </el-drawer>
          </el-menu-item>
          <el-menu-item>
            <!-- 搜索框-->
            <el-form style="margin-top: 10px">
              <el-form-item>
                <el-input
                    v-model="input"
                    placeholder="搜索"
                    class="input-with-select"
                    style="padding-top:20px; width: 650px; height: 55px; border: 0 white; border-radius: 0"
                >
                  <template #prepend>
                    <el-select class="my-el-select" v-model="select" placeholder="List Order"
                               style="width: 115px; color: white; background-color: white; border: 0 white">
                      <el-option label="Restaurant" value="1"/>
                      <el-option label="Order No." value="2"/>
                      <el-option label="Tel" value="3"/>
                    </el-select>
                  </template>
                  <template #append>
                    <el-button style="padding-top: 5px; background-color: white">
                      <img src="../assets/imgs/icon/Search.png" alt="" style="width: 20px;">
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </el-menu-item>
          <div class="flex-grow"/>
          <el-menu-item index="1">
            <img src="../assets/imgs/icon/StarList.png" alt="" style="width: 25px; margin-top: 10px">
            <div style="margin-top: 5px; margin-left: 10px; font-size: large; font-weight: bold">影片列表</div>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <div style="display:flex; font-size: large; font-weight: bold; margin-top: 5px; margin-left: 5px;">
                <img src="../assets/imgs/icon/User.png" alt="" style="width: 25px; height: 25px; margin-top: 17px">
                <div style="margin-left: 10px">个人中心</div>
              </div>
            </template>
            <el-menu-item index="2-1">未登录</el-menu-item>
            <el-menu-item index="2-2">退出系统</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
    </el-container>
  </div>
<!--  主页面-->
  <el-main>
    <!--    标题块-->
    <div class="titleblcok">
      <span class="title">Your Watchlist</span>
      <div class="buttonblock1">
        <div class="buttonblock2">
          <el-button class="shareButton"></el-button>
          <span style="font-weight: bold;color: #aaaaaa"> SHARE </span>
        </div>
        <div class="buttonblock2">
          <el-button class="editButton"></el-button>
          <span style="font-weight: bold;color: #aaaaaa"> EDIT </span>
        </div>
      </div>
      <br>
      <div style="margin-left: 10px; margin-right: 10px; height: 40px; width: 100%; background-color: v-bind()">
        <img src="../../src/assets/imgs/icon/private.png" style="object-fit: cover; vertical-align: top; height:25px; width: 25px" alt="Submit">
        <span style="font-size: large; vertical-align: top ; color: #aaaaaa;">private</span>
      </div>
    </div>
    <!--    观影列表-->
    <div style="margin-left: 30px; margin-right: 30px; background-color: #222222">
      <br>
      <!--      标题-->
      <div>
        <span style="font-size: xx-large; color: #aaaaaa; margin-left: 20px">2 titles</span>
        <el-text style="font-size: large;font-weight: bold; margin-left: 1080px">SORT BY</el-text>
        <el-select class="my-el-select" v-model="select" placeholder="List Order"
                         style="width: 300px; float: right;  margin-top: 10px;margin-right: 80px;border-radius: 10px; color: gainsboro; background-color: white">
          <el-option label="List Order" value="1"/>
          <el-option label="IMDb Rating" value="2"/>
          <el-option label="Your Rating" value="3"/>
          <el-option label="Popularity" value="4"/>
          <el-option label="Add Date" value="5"/>
        </el-select>
      </div>
      <div>
        <div
            v-for="o in 2"
            :key="o"
        >
        <!--        列表-->
        <el-card bodystyle="{padding 0 px}" class="elcard" shadow="hover">
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
/*菜单栏样式*/
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  background-color: black;
  background-size: 100% 100%;
  background-attachment: fixed;

  justify-content: center;
  align-items: center;
}

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


.flex-grow {
  flex-grow: 0.35;
}

/*主页面样式*/

.titleblcok{
  height: 150px;
  margin-left: 30px;
  margin-right: 30px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #222222;
  border-bottom: 1px solid #999999;
}

.title{
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  font-size: xxx-large;
  color: white;
}

.buttonblock1{
  height: 130px;
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: v-bind();
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}

.buttonblock2{
  height: 100px;
  width: 85px;
  background-color: v-bind();
  display: flex;
  flex-direction: column;
  align-items: center;
}

.elcard{
  margin-top: 30px;
  height: 200px;
  background-color: v-bind();
  border-color: v-bind();
  box-shadow: #999999;
}

.shareButton{
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-image: url("../../src/assets/imgs/icon/share.png");
  background-size: 90%;
  background-position-y: 5px;
  background-color: v-bind();
}

.editButton{
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-image: url("../../src/assets/imgs/icon/edit.png");
  background-size: 88%;
  background-position-x: 3px;
  background-color: v-bind();
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