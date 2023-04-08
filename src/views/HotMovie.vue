<template>
  <div style="color: white; margin-top: 50px; margin-left: 100px; font-size: x-large; font-weight: bold">
    热门影片
  </div>
  <el-scrollbar always="true" style="width: 1400px; margin-left: 100px">
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