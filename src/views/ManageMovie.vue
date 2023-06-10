<template>
  <div>
    <div style="margin-left: 20px; margin-top: 20px; position: relative; padding-bottom: 30px;">
      <el-button type="success" @click="handleAdd">新增数据</el-button>

      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :pager-count="3"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="pager, jumper"
            :total="total"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div style="margin: 0px 20px 20px 20px">
      <el-table :data="state.tableData">
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

    <el-dialog v-model="dialogFormVisible" title="新增电影信息" width="40%">
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">
          保 存
        </el-button>
      </span>
      </template>
    </el-dialog>

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

<script>

import {nextTick, reactive, ref} from 'vue';
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  setup() {

    const formLabelWidth = '120px'
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const small = ref(false);
    const disabled = ref(false);
    const background = ref(true);
    const movies = ref([]);
    // const token = localStorage.getItem('token');
    const dialogFormVisible = ref(false)
    const updateVisible = ref(false)
    const state = reactive({
      tableData: [],
      form: {},
    })

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

    const getRecommendations = async (pageNum) => {

      let url = `http://123.249.101.81:8080/movies/recommend/${pageNum}`;
      let config = {};

      // 实现有登录推荐取消注释
      // if (token) {
      //   config.headers = { 'token': token };
      // }

      try {
        const response = await axios.get(url, config);
        total.value = response.data.obj.total;
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
        state.tableData = recommendations;
        console.log(movies.value);
      });
    };

    getRecommendations(currentPage.value).then((recommendations) => {
      movies.value = recommendations;
      state.tableData = recommendations;
      console.log(movies.value);
    });

    // 新增
    const handleAdd = () => {
      dialogFormVisible.value = true
      nextTick(() => {
        state.form = {}
      })
    };

    // 编辑
    const handleEdit = (row) => {
      updateVisible.value = true
      nextTick(() => {
        console.log(row)
        state.form = JSON.parse(JSON.stringify(row))
      })
    }

    // 保存
    const save = async () => {
      const url = `http://123.249.101.81:8080/movies`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {'token': token},
      }
      try {
        await axios.post(url, state.form, config);
        dialogFormVisible.value = false;
        ElMessage({
          message: '保存成功',
          type: 'success',
        });
        window.location.reload();  // 刷新页面
      } catch (error) {
        console.error('保存失败', error);
      }
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

    // 在 setup() 中返回的任何属性或方法都将可在组件的模板中使用
    return {currentPage, pageSize, small, disabled, background,
      handleCurrentChange, movies, handleAdd, dialogFormVisible,
      state, formLabelWidth, save, rules, total, updateVisible,
      handleEdit, update, del };
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