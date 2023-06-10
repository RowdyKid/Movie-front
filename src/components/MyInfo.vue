<template>
  <div style="padding-top: 15px; padding-left: 50px; color: #ffd04b">
    <h2>个人资料</h2>
  </div>
  <div style="padding-top: 5px">
    <el-form :model="state.user" label-width="80px" style="margin-left: 40px; margin-top: 20px">
      <el-row :gutter="50">
        <el-col :span="15">
          <el-form-item style="padding-bottom: 12px; margin-left: -50px">
            <span slot="label">
              <span style="color: white; margin-right: 10px">用户名</span>
            </span>
            <el-input style="width: 450px" v-model="state.user.username" disabled></el-input>
          </el-form-item>
          <el-form-item style="padding-bottom: 12px; margin-left: -50px">
            <span slot="label">
              <span style="color: white; margin-right: 19px">昵 称</span>
            </span>
            <el-input style="width: 450px" v-model="state.user.name"/>
          </el-form-item>
          <el-form-item style="padding-bottom: 12px; margin-left: -50px">
            <span slot="label">
              <span style="color: white; margin-right: 19px">邮 箱</span>
            </span>
            <el-input style="width: 450px" v-model="state.user.email"/>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="">
            <el-upload
                class="avatar-uploader"
                :action="url"
                :headers="state.headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                style="margin-left: -15px"
            >
              <img v-if="state.user.avatar" :src="state.user.avatar" class="avatar"/>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus/>
              </el-icon>
            </el-upload>
          </el-form-item>
          <div>
            <div style="font-size: 14px;padding-left: 30%">
              上传头像
            </div>
            <div style="font-size: 12px; color: #aaa; padding-left: 16%; margin-top: 10px">
              支持jpg、png、jpeg格式图片
            </div>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="">
        <el-button style="background-color:#ffd04b; color: white; font-weight: bold; border: none" @click="save">保 存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--  测试-->
<!--  <div class="font">{{ user }}</div>-->

</template>

<script setup>
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const user = computed(() => store.state.userData.obj);

import {Plus} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {reactive, ref} from "vue";
import request from "@/utils/request";


let state = reactive({
  user: user,
  headers: {
    Authorization: user.token
  }
})

const handleAvatarSuccess = (res) => {
  if (res.code === '200') {
    state.user.avatar = res.data
  } else {
    ElMessage.error('上传失败')
  }
}

const save = () => {
  request.put('/user', state.user).then(res => {
    if (res.code === '200') {
      ElMessage.success('保存成功')
      store.setUser(state.user)
    } else {
      ElMessage.error(res.msg)
    }
  })
}

const loadUser = () => {
  request.get('/users').then(res => {
    state.user = res.data
  })
}
loadUser()

</script>

<style scoped>

.font {
  color: white;
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.whiteItem .el-form-item__label {
  color: white;
}
</style>