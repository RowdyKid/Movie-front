<template>
  <div>
    <!--            走马灯-->
    <div class="block text-center">
      <el-carousel height="550px" style="margin-left: 100px">
        <el-carousel-item v-for="item in carouseData" :key="item">
          <img :src="item.url" alt=""
               style="max-width: 100%; max-height: 100%; min-width: 100%; min-height: 100%"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>

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

</style>