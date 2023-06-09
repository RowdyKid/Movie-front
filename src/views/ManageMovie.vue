<template>
  <div>
    <div style="margin-left: 20px; margin-top: 20px; position: relative; padding-bottom: 30px;">
      <el-button type="success">新增数据</el-button>

      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :pager-count="3"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="pager, jumper"
            :total="1000"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div style="margin: 0px 20px 20px 20px">
      <el-table :data="movies">
        <el-table-column prop="original_title" label="原始标题"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="original_language" label="原始语言"></el-table-column>
        <el-table-column prop="overview" label="概述"></el-table-column>
        <el-table-column prop="release_date" label="上映日期"></el-table-column>
        <el-table-column prop="tagline" label="标语"></el-table-column>
        <el-table-column prop="revenue" label="票房收入"></el-table-column>
        <el-table-column prop="runtime" label="电影时长"></el-table-column>
        <el-table-column prop="popularity" label="受欢迎程度"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="budget" label="预算"></el-table-column>
        <el-table-column prop="adult" label="成人电影"></el-table-column>
        <el-table-column label="操作">
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>

import {ref} from 'vue';
import axios from "axios";

export default {
  setup() {

    const currentPage = ref(1);
    const pageSize = ref(100);
    const small = ref(false);
    const disabled = ref(false);
    const background = ref(true);
    const movies = ref([]);
    const token = localStorage.getItem('token');

    const getRecommendations = async (pageNum) => {

      let url = `http://123.249.101.81:8080/movies/recommend/${pageNum}`;
      let config = {};

      // 实现有登录推荐取消注释
      if (token) {
        config.headers = { 'token': token };
      }

      try {
        const response = await axios.get(url, config);
        return response.data.obj.list;
      } catch (error) {
        console.error('Failed to get recommendations:', error);
      }
    }

    const handleCurrentChange = function(val) {
      console.log(`current page: ${val}`);
      currentPage.value = val;
      console.log(currentPage.value)

      getRecommendations(currentPage.value).then((recommendations) => {
        movies.value = recommendations;
        console.log(movies.value);
      });
    };

    getRecommendations(currentPage.value).then((recommendations) => {
      movies.value = recommendations;
      console.log(movies.value);
    });

    // 在 setup() 中返回的任何属性或方法都将可在组件的模板中使用
    return {currentPage, pageSize, small, disabled, background, handleCurrentChange, movies};
  }
};

</script>

<style scoped>
.demo-pagination-block {
  margin-top: 10px;
  margin-bottom: 16px;
  position: absolute;
  bottom: 10px;
  right: 70px;
}
</style>