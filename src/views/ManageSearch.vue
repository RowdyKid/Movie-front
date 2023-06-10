<template>
  <div>
    <!-- 搜索框-->
    <div style="width:800px; margin: 10px auto">
      <el-form>
        <el-form-item>
          <el-input
              v-model="keyword"
              placeholder="输入搜索关键字"
              style="padding-top:20px; width: 600px; height: 55px;"
          >
            <template #prepend>
              <el-select v-model="searchType" placeholder="选择搜索类型" style="width: 150px">
                <el-option label="按电影名称搜索" value="movie"/>
                <el-option label="按公司搜索" value="company"/>
                <el-option label="按关键词搜索" value="keyword"/>
              </el-select>
            </template>
            <template #append>
              <el-button style="padding-top: 5px;" @click="search">
                <img src="../assets/imgs/icon/Search.png" alt="" style="width: 20px;">
              </el-button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin: 0px 20px 20px 20px">
      <el-table :data="state.tableData">
        <el-table-column v-if="searchType === 'company'" prop="companyName" label="公司"></el-table-column>
        <el-table-column v-if="searchType === 'keyword'" prop="keyword" label="公司"></el-table-column>
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
          <template #default="scope">
            <div>
              <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            </div>
            <div>
              <el-popconfirm title="确认删除？" @confirm="del(scope.row.id)">
                <template #reference>
                  <el-button  size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="updateVisible" title="更新电影信息" width="40%">
      <el-form
          :rules="rules"
          :model="state.form"
          :label-width="formLabelWidth"
          style="margin-right: 60px"
          status-icon
      >
        <el-form-item prop="title" label="电影名">
          <el-input v-model="state.form.title" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="original_language" label="原始语言">
          <el-input v-model="state.form.original_language" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="tagline" label="标语">
          <el-input v-model="state.form.tagline" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="overview" label="电影概述">
          <el-input type="textarea" v-model="state.form.overview" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="popularity" label="流行程度">
          <el-input v-model="state.form.popularity" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="release_date" label="发行日期">
          <el-input v-model="state.form.release_date" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="status" label="电影状态">
          <el-input v-model="state.form.status" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="budget" label="预算">
          <el-input v-model="state.form.budget" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="adult" label="成人级">
          <el-input v-model="state.form.adult" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="updateVisible = false">取 消</el-button>
        <el-button type="primary" @click="update(state.form.id)">
          保 存
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import {computed, nextTick, reactive, ref} from 'vue'
import axios from 'axios';
import config from "../../config";
import {useStore} from "vuex";
import {ElMessage} from "element-plus";

const keyword = ref('')
const searchType = ref('')
const store = useStore()

const token = localStorage.getItem('token');
const movies = ref([])
const state = reactive({
  tableData: [],
  form: {},
})
const updateVisible = ref(false)
const rules = reactive({
  title: [
    {required: true, message: '请输入电影名称', trigger: 'blur'},
  ],
  original_language: [
    {required: true, message: '请输入原始语言', trigger: 'blur'},
  ],
  overview: [
    {required: true, message: '请输入电影概述', trigger: 'blur'},
  ],
  adult: [
    {required: true, message: '请输入成人级', trigger: 'blur'},
  ],
})

const search = async () => {
  let url = `http://`+ config.serverUrl +`/`;
  console.log(searchType.value)
  if (searchType.value === 'movie') {
    url += `movies/${keyword.value}`;
  } else if (searchType.value === 'company') {
    url += `companies/${keyword.value}/movies`;
  } else if (searchType.value === 'keyword') {
    url += `keywords/${keyword.value}/movies`;
  }

  try {
    const response = await axios.get(url);
    console.log(response.data)
    // 成功获取搜索结果后
    if (searchType.value === 'movie') {
      movies.value = response.data.obj;
      state.tableData = response.data.obj;
    } else if (searchType.value === 'company') {

      const moviesWithCompany = computed(() => {
        const companies = response.data.obj;

        //使用map reduce
        // 这次我们不仅提取每个公司的电影列表
        // 还将每部电影与其所属的公司名称一起保存
        const movies = companies.reduce((acc, company) => {
          const companyMovies = company.movieList.map(movie => ({
            ...movie,
            companyName: company.name
          }));

          return [...acc, ...companyMovies];
        }, []);
        return movies;
      });

      console.log(moviesWithCompany.value)
      state.tableData = moviesWithCompany.value;

    } else if (searchType.value === 'keyword') {

      const moviesWithKeyword = computed(() => {
        const keywords = response.data.obj;

        //使用map reduce
        // 这次我们不仅提取每个关键词的电影列表
        // 还将每部电影与关键词一起保存
        const movies = keywords.reduce((acc, keyword) => {
          const keywordMovies = keyword.movies.map(movie => ({
            ...movie,
            keyword: keyword.name
          }));

          return [...acc, ...keywordMovies];
        }, []);

        return movies;
      });
      console.log(moviesWithKeyword.value);
      state.tableData = moviesWithKeyword.value;

    }
  } catch (err) {
    console.error(err);
  }
};

// 编辑
const handleEdit = (row) => {
  updateVisible.value = true
  nextTick(() => {
    console.log(row)
    state.form = JSON.parse(JSON.stringify(row))
  })
}

// 更新电影信息
const update = async (id) => {
  const url = `http://123.249.101.81:8080/movies/${id}`;
  const token = localStorage.getItem('token');
  const config = {
    headers: {'token': token},
  }
  try {
    await axios.put(url, state.form, config)
    updateVisible.value = false;
    ElMessage({
      message: '保存成功',
      type: 'success',
    });
    window.location.reload();  // 刷新页面
  } catch (error) {
    console.error('保存失败', error);
  }
  console.log(url)
}

// 删除
const del = async (id) => {
  const url = `http://123.249.101.81:8080/movies/${id}`;
  console.log(url);
  const token = localStorage.getItem('token');
  const config = {
    headers: {'token': token},
  }
  try {
    await axios.delete(url, config)
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
    window.location.reload();  // 刷新页面
  } catch (error) {
    console.error('删除失败', error);
  }
  console.log(url)
}

</script>

<style scoped>

</style>