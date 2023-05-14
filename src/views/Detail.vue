<template>
  <!--  主页面-->
  <el-main>
    <!-- title-->
    <div class="font" style="margin-left: 150px; margin-top: 20px;">
      <div style="font-size: xxx-large">
        Barbie
      </div>
      <div style="color: #bbb; font-weight: bold">
        2023
      </div>
    </div>
    <!-- 播放栏-->
    <div style="height: 400px; width: 800px; border: 1px solid white; margin: 20px auto">

    </div>
    <!-- 信息-->
    <div style="margin-left: 150px; width: 1050px">
      <!-- tag-->
      <div style="margin-top: 10px">
        <el-tag type="info" effect="plain" round style="background-color: black; color: white; font-size: 17px;"
                color="white" size="large"> # Adventure
        </el-tag>
      </div>
      <!-- 简介-->
      <div style="margin-top: 20px; font-size: 19px; color: #bbb; font-weight: bold">
        To live in Barbie Land is to be a perfect being in a perfect place. Unless you have a full-on existential
        crisis. Or you're a Ken.
      </div>
      <!-- 分割线-->
      <div class="divider"></div>
      <!-- 导演-->
      <div style="margin-top: 20px; display: flex; color: white;">
        <div style="font-size: 19px; font-weight: bold; margin-right: 10px">
          Director
        </div>
        <div style="margin-left: 20px; margin-top: 3px">
          Greta Gerwig
        </div>
      </div>
      <!-- 分割线-->
      <div class="divider"></div>
      <!-- 演员-->
      <div style="margin-top: 20px; display: flex; color: white">
        <div style="font-size: 19px; font-weight: bold; margin-right: 10px">
          Stars
        </div>
        <div style="margin-left: 20px; margin-top: 3px">
          Margot Robbie
        </div>
        <div style="margin-left: 20px; margin-top: 3px">
          Ryan Gosling
        </div>
        <div style="margin-left: 20px; margin-top: 3px">
          Ariana Greenblatt
        </div>
      </div>
    </div>

    <!-- 评价-->
    <div>

    </div>

  </el-main>
</template>

<script setup>

</script>

<style scoped>
.font {
  color: white;
}

.divider {
  position: relative;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: rgba(50, 50, 50, 1);
  font-size: 16px;
  color: rgba(50, 50, 50, 1);
}
</style>